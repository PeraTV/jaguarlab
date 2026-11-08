package br.com.onca3d.app;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.AtomicFile;
import android.util.Base64;
import com.getcapacitor.*;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import javax.crypto.*;
import javax.crypto.spec.GCMParameterSpec;
import org.json.JSONObject;

@CapacitorPlugin(name="BackupAccess")
public class BackupAccessPlugin extends Plugin {
 private static final String ALIAS="jaguarlab-backup-access-v1";
 private AtomicFile file(){return new AtomicFile(new File(getContext().getNoBackupFilesDir(),"backup-access.bin"));}
 private KeyStore store() throws Exception{KeyStore k=KeyStore.getInstance("AndroidKeyStore");k.load(null);return k;}
 private javax.crypto.SecretKey key(boolean create) throws Exception{
  KeyStore k=store();if(k.containsAlias(ALIAS))return (javax.crypto.SecretKey)k.getKey(ALIAS,null);
  if(!create)throw new IOException("Acesso protegido indisponível. Configure novamente.");
  KeyGenerator generator=KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES,"AndroidKeyStore");
  generator.init(new KeyGenParameterSpec.Builder(ALIAS,KeyProperties.PURPOSE_ENCRYPT|KeyProperties.PURPOSE_DECRYPT).setKeySize(256).setBlockModes(KeyProperties.BLOCK_MODE_GCM).setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE).build());return generator.generateKey();
 }
 @PluginMethod public synchronized void read(PluginCall call){try{JSObject result=new JSObject();result.put("supported",true);if(file().getBaseFile().exists()){
  byte[] bytes=file().readFully();if(bytes.length>20000)throw new IOException();JSONObject packed=new JSONObject(new String(bytes,StandardCharsets.UTF_8));
  Cipher cipher=Cipher.getInstance("AES/GCM/NoPadding");cipher.init(Cipher.DECRYPT_MODE,key(false),new GCMParameterSpec(128,Base64.decode(packed.getString("iv"),Base64.NO_WRAP)));
  String plain=new String(cipher.doFinal(Base64.decode(packed.getString("data"),Base64.NO_WRAP)),StandardCharsets.UTF_8);result.put("value",new JSObject(plain));
 }call.resolve(result);}catch(Exception e){call.reject("Não foi possível abrir o acesso protegido. Desconecte e configure novamente.");}}
 @PluginMethod public synchronized void write(PluginCall call){FileOutputStream out=null;try{
  String repo=call.getString("repo"),token=call.getString("token"),password=call.getString("password");
  if(repo==null||!repo.matches("[\\w-]+/[\\w.-]+")||token==null||token.isEmpty()||token.length()>2000||password==null||password.length()<10||password.length()>1000)throw new IOException();
  JSONObject plain=new JSONObject();plain.put("repo",repo);plain.put("token",token);plain.put("password",password);
  Cipher cipher=Cipher.getInstance("AES/GCM/NoPadding");cipher.init(Cipher.ENCRYPT_MODE,key(true));
  JSONObject packed=new JSONObject();packed.put("iv",Base64.encodeToString(cipher.getIV(),Base64.NO_WRAP));packed.put("data",Base64.encodeToString(cipher.doFinal(plain.toString().getBytes(StandardCharsets.UTF_8)),Base64.NO_WRAP));
  out=file().startWrite();out.write(packed.toString().getBytes(StandardCharsets.UTF_8));file().finishWrite(out);call.resolve();
 }catch(Exception e){if(out!=null)file().failWrite(out);call.reject("Não foi possível salvar com a proteção do aparelho. Confira os campos e tente novamente.");}}
 @PluginMethod public synchronized void clear(PluginCall call){try{file().delete();KeyStore k=store();if(k.containsAlias(ALIAS))k.deleteEntry(ALIAS);if(file().getBaseFile().exists())throw new IOException();call.resolve();}catch(Exception e){call.reject("Não foi possível remover o acesso salvo. Tente novamente.");}}
}
