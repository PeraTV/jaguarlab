package br.com.onca3d.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.*;
import java.net.*;
import java.security.MessageDigest;
import org.json.JSONObject;

@CapacitorPlugin(name="OncaUpdater")
public class OncaUpdaterPlugin extends Plugin {
  private boolean running=false;
  private static final String CHANNEL="https://api.github.com/repos/PeraTV/onca3d-atualizacoes/contents/updates/stable.json?ref=main";
  private HttpURLConnection connect(String address) throws Exception {
    String current=address;
    for(int i=0;i<6;i++){
      URL u=new URL(current);String host=u.getHost();
      if(!"https".equals(u.getProtocol())||!(host.equals("api.github.com")||host.equals("github.com")||host.equals("raw.githubusercontent.com")||host.equals("release-assets.githubusercontent.com")||host.equals("objects.githubusercontent.com")))throw new IOException("Destino de atualização inválido");
      HttpURLConnection c=(HttpURLConnection)u.openConnection();c.setConnectTimeout(30000);c.setReadTimeout(60000);c.setInstanceFollowRedirects(false);c.setUseCaches(false);c.setRequestProperty("Cache-Control","no-cache");c.setRequestProperty("User-Agent","JaguarLab");c.setRequestProperty("Accept","application/vnd.github+json");
      int status=c.getResponseCode();if(status>=300&&status<400){String next=c.getHeaderField("Location");c.disconnect();current=new URL(u,next).toString();continue;}if(status!=200){c.disconnect();throw new IOException("Falha no download: "+status);}return c;
    }throw new IOException("Redirecionamentos excessivos");
  }
  @PluginMethod public void install(PluginCall call){
    if(running){call.reject("Atualização em andamento");return;}
    if(Build.VERSION.SDK_INT>=26&&!getContext().getPackageManager().canRequestPackageInstalls()){
      getActivity().runOnUiThread(()->getActivity().startActivity(new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,Uri.parse("package:"+getContext().getPackageName()))));
      call.reject("Autorize o JAGUAR LAB a instalar atualizações nesta tela e toque em Atualizar novamente.");return;
    }
    running=true;
    new Thread(()->{try{
      HttpURLConnection mc=connect(CHANNEL+"&check="+System.currentTimeMillis());ByteArrayOutputStream buffer=new ByteArrayOutputStream();try(InputStream in=mc.getInputStream()){byte[] b=new byte[8192];int n;while((n=in.read(b))!=-1){if(buffer.size()+n>1000000)throw new IOException("Canal inválido");buffer.write(b,0,n);}}finally{mc.disconnect();}
      JSONObject channelFile=new JSONObject(buffer.toString("UTF-8"));if(!"base64".equals(channelFile.optString("encoding")))throw new IOException("Canal oficial inválido");JSONObject manifest=new JSONObject(new String(android.util.Base64.decode(channelFile.getString("content"),android.util.Base64.DEFAULT),java.nio.charset.StandardCharsets.UTF_8));if(manifest.optInt("schemaVersion")!=1||!"onca3d".equals(manifest.optString("appId")))throw new IOException("Identidade do canal inválida");if(!manifest.optBoolean("available"))throw new IOException("Nenhuma atualização disponível");
      JSONObject asset=manifest.getJSONObject("platforms").getJSONObject("android");String address=asset.getString("url"),expected=asset.getString("sha256");
      if(!address.startsWith("https://github.com/PeraTV/onca3d-atualizacoes/releases/download/v")||!address.endsWith(".apk")||!expected.matches("[a-fA-F0-9]{64}"))throw new IOException("APK inválido");
      File dir=new File(getContext().getCacheDir(),"updates");dir.mkdirs();File apk=new File(dir,"onca3d-update.apk");MessageDigest digest=MessageDigest.getInstance("SHA-256");HttpURLConnection ac=connect(address);
      try(InputStream in=ac.getInputStream();OutputStream out=new FileOutputStream(apk)){byte[] b=new byte[65536];long size=0;int n;while((n=in.read(b))!=-1){size+=n;if(size>300L*1024*1024)throw new IOException("APK muito grande");digest.update(b,0,n);out.write(b,0,n);}}finally{ac.disconnect();}
      StringBuilder actual=new StringBuilder();for(byte b:digest.digest())actual.append(String.format("%02x",b));if(!actual.toString().equalsIgnoreCase(expected)){apk.delete();throw new IOException("Integridade do APK não confere");}
      Uri uri=FileProvider.getUriForFile(getContext(),getContext().getPackageName()+".fileprovider",apk);
      Intent intent=new Intent(Intent.ACTION_VIEW);intent.setDataAndType(uri,"application/vnd.android.package-archive");intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
      getActivity().runOnUiThread(()->{try{getActivity().startActivity(intent);call.resolve(new JSObject().put("opened",true));}catch(Exception e){call.reject("Não foi possível abrir o instalador",e);}});
    }catch(Exception e){call.reject(e.getMessage(),e);}finally{running=false;}}).start();
  }
}
