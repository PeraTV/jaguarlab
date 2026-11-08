const fs=require('node:fs/promises');
const path=require('node:path');
const crypto=require('node:crypto');
const {spawn}=require('node:child_process');
const {createInstaller,finalizeInstaller}=require('./update-files.cjs');
const CHANNEL='https://api.github.com/repos/PeraTV/jaguarlab/contents/updates/stable.json?ref=main';
function newer(a,b){if(!/^\d+\.\d+\.\d+$/.test(a))return false;const aa=a.split('.').map(Number),bb=b.split('.').map(Number);for(let i=0;i<3;i++)if(aa[i]!==bb[i])return aa[i]>bb[i];return false;}
function validAsset(asset,ext){if(!asset||!/^[a-f0-9]{64}$/i.test(asset.sha256||''))return false;try{const u=new URL(asset.canonicalUrl||asset.url);return u.protocol==='https:'&&u.hostname==='github.com'&&!u.username&&!u.password&&/^\/PeraTV\/(?:jaguarlab|onca3d-atualizacoes)\/releases\/download\/v\d+\.\d+\.\d+\/[^/]+$/.test(u.pathname)&&u.pathname.endsWith(ext)&&!u.search&&!u.hash;}catch{return false;}}
async function manifest(){const response=await fetch(CHANNEL+'&check='+Date.now(),{signal:AbortSignal.timeout(30000),cache:'no-store',headers:{Accept:'application/vnd.github+json','Cache-Control':'no-cache'}});if(!response.ok)throw Error('Não foi possível verificar a atualização.');const file=await response.json();if(file.encoding!=='base64'||typeof file.content!=='string')throw Error('Canal oficial inválido.');const data=JSON.parse(Buffer.from(file.content,'base64').toString('utf8'));if(data.schemaVersion!==1||data.appId!=='onca3d')throw Error('Identidade do canal inválida.');return data;}
module.exports={newer,validAsset,register(app,ipcMain,win){let downloading=false;ipcMain.handle('install-update',async(event,backup)=>{
 if(event.sender!==win.webContents||typeof backup!=='string'||backup.length>150000000)throw Error('Solicitação inválida');
 if(downloading)throw Error('Já há uma atualização em andamento.');downloading=true;let file,complete=false;
 try{
  const info=await manifest();if(!info.available||!newer(info.release?.version||'',app.getVersion())||!validAsset(info.platforms?.windows,'.exe'))throw Error('Nenhuma atualização Windows válida disponível.');
  const backupData=JSON.parse(backup);if(backupData.schemaVersion!==1||!Array.isArray(backupData.projects))throw Error('Cópia de segurança inválida.');
  const folder=path.join(app.getPath('userData'),'recovery');await fs.mkdir(folder,{recursive:true});await fs.writeFile(path.join(folder,`before-update-${Date.now()}.json`),backup,'utf8');
  const asset=info.platforms.windows;const res=await fetch(asset.canonicalUrl||asset.url,{signal:AbortSignal.timeout(300000)});if(!res.ok||!res.body)throw Error('Falha ao baixar a atualização.');
  file=await createInstaller(app.getPath('temp'),info.release.version);const hash=crypto.createHash('sha256');let size=0;
  try{for await(const chunk of res.body){size+=chunk.length;if(size>500*1024*1024||(asset.sizeBytes>0&&size>asset.sizeBytes))throw Error('Tamanho do instalador inválido.');hash.update(chunk);await file.handle.write(chunk);}}finally{await file.handle.close();}
  if((asset.sizeBytes>0&&size!==asset.sizeBytes)||hash.digest('hex').toLowerCase()!==asset.sha256.toLowerCase())throw Error('A integridade do instalador não confere. Tente novamente.');
  const installer=await finalizeInstaller(file);complete=true;
  await new Promise((resolve,reject)=>{const child=spawn(installer,[],{detached:true,stdio:'ignore',windowsHide:true});child.once('error',reject);child.once('spawn',()=>{child.unref();resolve();});});
  setTimeout(()=>app.quit(),500);return true;
 }catch(e){if(['EBUSY','EACCES','EPERM'].includes(e.code))throw Error('O Windows está usando ou verificando o instalador. Feche outra instalação aberta e tente novamente. Seus dados foram preservados.');throw e;}
 finally{downloading=false;if(file&&!complete)await fs.unlink(file.partial).catch(()=>{});}
 });}};
