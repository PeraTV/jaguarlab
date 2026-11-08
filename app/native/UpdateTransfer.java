package br.com.onca3d.app;

import java.io.*;
import java.net.*;
import java.security.MessageDigest;
import java.util.Locale;

/** Public APK transfer: bounded waits, exact origin rules, fallback and SHA-256. */
public final class UpdateTransfer {
 public interface Progress { void update(String phase,long bytes,long total,int attempt); }
 public static final class Cancellation {
  public volatile boolean cancelled; public volatile HttpURLConnection connection;
  public void cancel(){cancelled=true;HttpURLConnection c=connection;if(c!=null)c.disconnect();}
  void check() throws IOException {if(cancelled)throw new IOException("Download cancelado.");}
 }
 public static String direct(String version){if(!version.matches("\\d+\\.\\d+\\.\\d+"))throw new IllegalArgumentException("Versão inválida");return "https://raw.githubusercontent.com/PeraTV/onca3d-atualizacoes/v"+version+"/distribution/Onca3D-"+version+"-Android.apk";}
 public static boolean initial(URL u){if(!"https".equals(u.getProtocol())||u.getUserInfo()!=null||u.getPort()!=-1||u.getQuery()!=null||u.getRef()!=null)return false;String p=u.getPath();return (u.getHost().equals("raw.githubusercontent.com")&&p.matches("/PeraTV/onca3d-atualizacoes/v\\d+\\.\\d+\\.\\d+/distribution/Onca3D-\\d+\\.\\d+\\.\\d+-Android\\.apk"))||(u.getHost().equals("github.com")&&p.matches("/PeraTV/onca3d-atualizacoes/releases/download/v\\d+\\.\\d+\\.\\d+/Onca3D-\\d+\\.\\d+\\.\\d+-Android\\.apk"));}
 public static boolean redirect(URL u){if(!"https".equals(u.getProtocol())||u.getUserInfo()!=null||u.getPort()!=-1||u.getRef()!=null)return false;String h=u.getHost();return h.equals("github.com")||h.equals("raw.githubusercontent.com")||h.equals("release-assets.githubusercontent.com")||h.equals("objects.githubusercontent.com");}
 public static String digest(File file) throws Exception {MessageDigest digest=MessageDigest.getInstance("SHA-256");try(InputStream in=new FileInputStream(file)){byte[] b=new byte[65536];int n;while((n=in.read(b))!=-1)digest.update(b,0,n);}StringBuilder out=new StringBuilder();for(byte b:digest.digest())out.append(String.format(Locale.ROOT,"%02x",b&255));return out.toString();}
 public static void download(String[] sources,File target,String sha,long expectedSize,Progress progress,Cancellation cancel) throws Exception {
  if(!sha.matches("[a-fA-F0-9]{64}")||expectedSize<0||expectedSize>300L*1024*1024)throw new IOException("Dados de integridade inválidos.");
  if(target.isFile()&&(expectedSize==0||target.length()==expectedSize)&&digest(target).equalsIgnoreCase(sha)){progress.update("verifying",target.length(),target.length(),0);return;}
  Exception failure=null;long started=System.currentTimeMillis();
  for(int attempt=0;attempt<sources.length;attempt++){
   cancel.check();URL url=new URL(sources[attempt]);if(!initial(url))throw new IOException("Origem do APK inválida.");File partial=new File(target.getParentFile(),target.getName()+".part");HttpURLConnection connection=null;
   try {
    progress.update(attempt==0?"connecting":"retrying",0,expectedSize,attempt+1);
    for(int redirects=0;;redirects++){
     cancel.check();if(!redirect(url)||redirects>5)throw new IOException("Redirecionamento de APK inválido.");
     connection=(HttpURLConnection)url.openConnection();cancel.connection=connection;connection.setConnectTimeout(8000);connection.setReadTimeout(15000);connection.setInstanceFollowRedirects(false);connection.setUseCaches(false);connection.setRequestProperty("User-Agent","JaguarLab-updater");connection.setRequestProperty("Accept","application/octet-stream");connection.setRequestProperty("Accept-Encoding","identity");
     int status=connection.getResponseCode();if(status>=300&&status<400){String location=connection.getHeaderField("Location");if(location==null)throw new IOException("Link do arquivo sem destino.");URL next=new URL(url,location);connection.disconnect();url=next;continue;}if(status!=200)throw new IOException("Servidor do APK respondeu "+status+".");break;
    }
    long header=connection.getContentLengthLong(),total=expectedSize>0?expectedSize:Math.max(header,0);if(header>300L*1024*1024)throw new IOException("Arquivo excede o tamanho permitido.");long size=0,last=0;MessageDigest hash=MessageDigest.getInstance("SHA-256");progress.update("downloading",0,total,attempt+1);
    try(InputStream in=connection.getInputStream();OutputStream out=new FileOutputStream(partial)){byte[] b=new byte[65536];int n;while((n=in.read(b))!=-1){cancel.check();if(System.currentTimeMillis()-started>180000)throw new IOException("O download excedeu o tempo de espera. Tente novamente.");size+=n;if(size>300L*1024*1024||(expectedSize>0&&size>expectedSize))throw new IOException("Tamanho do APK inválido.");hash.update(b,0,n);out.write(b,0,n);long now=System.currentTimeMillis();if(now-last>=150){progress.update("downloading",size,total,attempt+1);last=now;}}}
    cancel.check();progress.update("verifying",size,total,attempt+1);StringBuilder actual=new StringBuilder();for(byte b:hash.digest())actual.append(String.format(Locale.ROOT,"%02x",b&255));if(expectedSize>0&&size!=expectedSize)throw new IOException("O download ficou incompleto.");if(!actual.toString().equalsIgnoreCase(sha))throw new IOException("A integridade do APK não confere.");if(target.exists()&&!target.delete())throw new IOException("Não foi possível substituir o arquivo de atualização.");if(!partial.renameTo(target))throw new IOException("Não foi possível concluir o arquivo de atualização.");return;
   }catch(Exception e){failure=e;partial.delete();cancel.check();}finally{if(connection!=null)connection.disconnect();cancel.connection=null;}
  }
  throw new IOException("Não foi possível baixar pelos dois links públicos. "+(failure==null?"":failure.getMessage()),failure);
 }
}
