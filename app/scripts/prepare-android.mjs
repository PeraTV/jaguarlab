import fs from 'node:fs';
const dir='android/app/src/main';
const java=`${dir}/java/br/com/onca3d/app`;
fs.mkdirSync(java,{recursive:true});
fs.copyFileSync('native/OncaUpdaterPlugin.java',`${java}/OncaUpdaterPlugin.java`);
fs.writeFileSync(`${java}/MainActivity.java`, `package br.com.onca3d.app;
import android.os.Bundle;
import android.view.View;
import android.graphics.Rect;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;
public class MainActivity extends BridgeActivity {
 private Boolean lastKeyboardVisible = null;
 @Override public void onCreate(Bundle state) {
  registerPlugin(OncaUpdaterPlugin.class);
  super.onCreate(state);
  WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
  View content = findViewById(android.R.id.content);
  content.setBackgroundColor(0xff0b0c0e);
  WindowCompat.getInsetsController(getWindow(), content).setAppearanceLightStatusBars(false);
  WindowCompat.getInsetsController(getWindow(), content).setAppearanceLightNavigationBars(false);
  ViewCompat.setOnApplyWindowInsetsListener(content, (view, windowInsets) -> {
   Insets bars = windowInsets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
   Insets keyboard = windowInsets.getInsets(WindowInsetsCompat.Type.ime());
   boolean keyboardVisible = windowInsets.isVisible(WindowInsetsCompat.Type.ime());
   Rect visibleFrame = new Rect();
   view.getWindowVisibleDisplayFrame(visibleFrame);
   int[] position = new int[2];
   view.getLocationOnScreen(position);
   int imePadding = keyboardVisible ? keyboard.bottom : 0;
   if (keyboardVisible && view.getHeight() > 0 && visibleFrame.height() > 0) {
    imePadding = Math.min(keyboard.bottom, Math.max(0, position[1] + view.getHeight() - visibleFrame.bottom));
   }
   view.setPadding(bars.left, bars.top, bars.right, Math.max(bars.bottom, imePadding));
   if (lastKeyboardVisible == null || lastKeyboardVisible.booleanValue() != keyboardVisible) {
    lastKeyboardVisible = keyboardVisible;
    if (getBridge() != null) getBridge().getWebView().post(() -> getBridge().getWebView().evaluateJavascript(
     "window.dispatchEvent(new CustomEvent('jaguar-keyboard',{detail:{visible:" + keyboardVisible + "}}));", null));
   }
   int handled = WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout() | WindowInsetsCompat.Type.ime();
   return new WindowInsetsCompat.Builder(windowInsets).setInsets(handled, Insets.NONE).build();
  });
  content.getViewTreeObserver().addOnGlobalLayoutListener(new android.view.ViewTreeObserver.OnGlobalLayoutListener() {
   private int previousBottom = -1;
   @Override public void onGlobalLayout() {
    Rect frame = new Rect(); content.getWindowVisibleDisplayFrame(frame);
    if (previousBottom != frame.bottom) { previousBottom = frame.bottom; ViewCompat.requestApplyInsets(content); }
   }
  });
  ViewCompat.requestApplyInsets(content);
 }
}
`);
const manifest=`${dir}/AndroidManifest.xml`;let text=fs.readFileSync(manifest,'utf8');if(!text.includes('REQUEST_INSTALL_PACKAGES'))text=text.replace('<application','<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />\n    <application');fs.writeFileSync(manifest,text);
const {version}=JSON.parse(fs.readFileSync('package.json','utf8'));const [a,b,c]=version.split('.').map(Number);const gradle='android/app/build.gradle';fs.writeFileSync(gradle,fs.readFileSync(gradle,'utf8').replace(/versionCode \d+/,`versionCode ${a*1000000+b*1000+c}`).replace(/versionName "[^"]+"/,`versionName "${version}"`));
fs.writeFileSync(`${dir}/res/drawable/onca.xml`,`<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="108dp" android:height="108dp" android:viewportWidth="100" android:viewportHeight="100"><path android:fillColor="#FFCA08" android:pathData="M0,0h100v100h-100z"/><path android:fillColor="#151810" android:pathData="M22,38L16,15 37,24Q50,18 63,24L84,15 78,38 83,58 66,77H34L17,58Z"/><path android:fillColor="#FFCA08" android:pathData="M27,38L23,25 38,30Q50,24 62,30L77,25 73,38 77,56 63,71H37L23,56Z"/><path android:fillColor="#151810" android:pathData="M26,44L42,49 33,57ZM74,44L58,49 67,57ZM40,65H60L50,74ZM43,82H57L50,93ZM50,29L55,38 50,43 45,38Z"/></vector>`);
for(const d of ['mipmap-anydpi-v26','mipmap-anydpi']){fs.mkdirSync(`${dir}/res/${d}`,{recursive:true});for(const name of ['ic_launcher','ic_launcher_round'])fs.writeFileSync(`${dir}/res/${d}/${name}.xml`,`<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@drawable/onca"/><foreground android:drawable="@drawable/onca"/></adaptive-icon>`);}
console.log('Android preparado: identidade, versão e atualização integrada.');

fs.writeFileSync(`${dir}/res/mipmap-anydpi/ic_launcher.xml`,fs.readFileSync(`${dir}/res/drawable/onca.xml`));
fs.writeFileSync(`${dir}/res/mipmap-anydpi/ic_launcher_round.xml`,fs.readFileSync(`${dir}/res/drawable/onca.xml`));

fs.copyFileSync('public/onca-foreground.png',`${dir}/res/drawable/onca_mark.png`);
fs.writeFileSync(`${dir}/res/drawable/onca.xml`, '<bitmap xmlns:android="http://schemas.android.com/apk/res/android" android:src="@drawable/onca_mark" android:gravity="fill" />');
fs.writeFileSync(`${dir}/res/values/onca_colors.xml`,'<resources><color name="onca_background">#101114</color></resources>');
for(const name of ['ic_launcher','ic_launcher_round']){
 fs.writeFileSync(`${dir}/res/mipmap-anydpi-v26/${name}.xml`,'<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@color/onca_background"/><foreground android:drawable="@drawable/onca"/></adaptive-icon>');
 fs.writeFileSync(`${dir}/res/mipmap-anydpi/${name}.xml`,fs.readFileSync(`${dir}/res/drawable/onca.xml`));
}

const strings=`${dir}/res/values/strings.xml`;
fs.writeFileSync(strings,fs.readFileSync(strings,'utf8').replace(/(<string name="(?:app_name|title_activity_main)">)[^<]*/g,'$1JAGUAR LAB'));

const activityManifest=`${dir}/AndroidManifest.xml`;
let activityXml=fs.readFileSync(activityManifest,'utf8');
activityXml=activityXml.replace(/\s+android:windowSoftInputMode="[^"]*"/g,'');
activityXml=activityXml.replace('<activity','<activity android:windowSoftInputMode="adjustResize"');
fs.writeFileSync(activityManifest,activityXml);
