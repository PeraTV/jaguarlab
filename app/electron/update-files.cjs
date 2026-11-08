const fs=require('node:fs/promises');
const path=require('node:path');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const locked=e=>['EBUSY','EACCES','EPERM'].includes(e?.code);
async function createInstaller(root,version,deps={}){
 if(!/^\d+\.\d+\.\d+$/.test(version))throw Error('Versão de instalador inválida.');
 const extension=deps.extension||'.exe';if(!['.exe','.dmg','.deb','.AppImage'].includes(extension))throw Error('Formato de instalador inválido.');
 const io=deps.fs||fs,pause=deps.sleep||sleep;
 for(let attempt=0;attempt<4;attempt++){
  const folder=await io.mkdtemp(path.join(root,'JaguarLab-update-'));
  const installer=path.join(folder,`JaguarLab-${version}-Setup${extension}`),partial=installer+'.part';
  try{return {folder,installer,partial,handle:await io.open(partial,'wx')};}
  catch(e){if(!locked(e)||attempt===3)throw e;await pause(250*(attempt+1));}
 }
}
async function finalizeInstaller(file,deps={}){const io=deps.fs||fs,pause=deps.sleep||sleep;for(let attempt=0;attempt<4;attempt++){try{await io.rename(file.partial,file.installer);return file.installer;}catch(e){if(!locked(e)||attempt===3)throw e;await pause(250*(attempt+1));}}}
module.exports={createInstaller,finalizeInstaller};
