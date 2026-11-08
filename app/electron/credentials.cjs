const fs=require('node:fs/promises');const path=require('node:path');
function validate(value){if(!value||typeof value.repo!=='string'||!/^[-\w]+\/[-\w.]+$/.test(value.repo)||typeof value.token!=='string'||!value.token||value.token.length>2000||typeof value.password!=='string'||value.password.length<10||value.password.length>1000)throw Error('Preencha repositório, token e senha de backup (mínimo 10 caracteres).');return {repo:value.repo,token:value.token,password:value.password};}
function createVault({directory,safeStorage,platform=process.platform}){
 const file=path.join(directory,'backup-access.bin');
 const available=async()=>{if(!['win32','darwin','linux'].includes(platform)||!await safeStorage.isAsyncEncryptionAvailable())return false;return platform!=='linux'||!['basic_text','unknown',undefined].includes(safeStorage.getSelectedStorageBackend?.());};
 const clear=async()=>{await fs.rm(file,{force:true});};
 const write=async value=>{if(!await available())throw Error('Proteção do sistema indisponível. O acesso não foi salvo.');const encrypted=await safeStorage.encryptStringAsync(JSON.stringify(validate(value)));await fs.mkdir(directory,{recursive:true});const temp=file+'.tmp';await fs.writeFile(temp,encrypted,{mode:0o600});await fs.rename(temp,file);};
 const read=async()=>{if(!await available())return {supported:false};let encrypted;try{encrypted=await fs.readFile(file);}catch(e){if(e.code==='ENOENT')return {supported:true};throw e;}try{const decrypted=await safeStorage.decryptStringAsync(encrypted);const value=validate(JSON.parse(decrypted.result));if(decrypted.shouldReEncrypt)await write(value);return {supported:true,value};}catch{throw Error('Não foi possível abrir o acesso protegido. Desconecte e configure novamente.');}};
 return {read,write,clear};
}
module.exports={createVault,validate};
