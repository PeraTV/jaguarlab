package br.com.onca3d.app;
import java.io.*;import java.net.*;import java.nio.file.*;import java.nio.charset.StandardCharsets;
public final class UpdateTransferTest {
 static void require(boolean condition){if(!condition)throw new AssertionError("Transfer policy regression");}
 public static void main(String[] args) throws Exception {
  String direct=UpdateTransfer.direct("0.4.3");require(UpdateTransfer.initial(new URL(direct)));require(UpdateTransfer.initial(new URL("https://github.com/PeraTV/onca3d-atualizacoes/releases/download/v0.4.3/Onca3D-0.4.3-Android.apk")));
  for(String bad:new String[]{"http://raw.githubusercontent.com/PeraTV/onca3d-atualizacoes/v0.4.3/distribution/Onca3D-0.4.3-Android.apk","https://github.com/outro/app/releases/download/v0.4.3/Onca3D-0.4.3-Android.apk",direct+".exe",direct+"?token=x",direct.replace("https://","https://user@")})require(!UpdateTransfer.initial(new URL(bad)));
  require(!UpdateTransfer.redirect(new URL("https://example.com/file.apk")));require(!UpdateTransfer.redirect(new URL("http://release-assets.githubusercontent.com/file.apk")));
  Path folder=Files.createTempDirectory("jaguar-transfer-test-");File file=folder.resolve("cached.apk").toFile();Files.write(file.toPath(),"abc".getBytes(StandardCharsets.UTF_8));String sha="ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";require(UpdateTransfer.digest(file).equals(sha));
  final boolean[] verified={false};UpdateTransfer.download(new String[]{},file,sha,3,(phase,b,t,a)->verified[0]="verifying".equals(phase),new UpdateTransfer.Cancellation());require(verified[0]);
  boolean rejected=false;try{UpdateTransfer.download(new String[]{},file,"0".repeat(64),3,(p,b,t,a)->{},new UpdateTransfer.Cancellation());}catch(IOException expected){rejected=true;}require(rejected);
  UpdateTransfer.Cancellation cancelled=new UpdateTransfer.Cancellation();cancelled.cancel();rejected=false;try{UpdateTransfer.download(new String[]{direct},folder.resolve("absent.apk").toFile(),sha,3,(p,b,t,a)->{},cancelled);}catch(IOException expected){rejected=true;}require(rejected);
  if(args.length==4){String version=args[0],hash=args[1];long size=Long.parseLong(args[2]);File target=new File(args[3]);UpdateTransfer.download(new String[]{UpdateTransfer.direct(version),"https://github.com/PeraTV/onca3d-atualizacoes/releases/download/v"+version+"/Onca3D-"+version+"-Android.apk"},target,hash,size,(phase,b,t,a)->System.out.println(phase+" "+b+"/"+t+" attempt "+a),new UpdateTransfer.Cancellation());require(UpdateTransfer.digest(target).equals(hash));require(target.length()==size);System.out.println("LIVE_DOWNLOAD_VERIFIED");}
  System.out.println("TRANSFER_POLICY_TESTS_PASSED");
 }
}
