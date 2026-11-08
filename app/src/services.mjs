import {readUpdateChannel} from './channel-fresh.mjs';
import {decodeJsonResponse,availableUpdate} from './update-channel.mjs';
import {tariffReferences} from './tariffs.mjs';
import {Capacitor,CapacitorHttp,registerPlugin} from '@capacitor/core';
import {VERSION} from './domain.mjs';
export async function request(url,options={}){if(window.oncaDesktop?.publicGet&&!options.method&&!options.headers?.Authorization)return window.oncaDesktop.publicGet(url);if(Capacitor.isNativePlatform()){const r=await CapacitorHttp.request({url,method:options.method||'GET',headers:options.headers||{},data:options.body?JSON.parse(options.body):undefined,connectTimeout:20000,readTimeout:30000,responseType:'json'});if(r.status<200||r.status>=300)throw Error(`Serviço respondeu ${r.status}. Confira conexão e permissões.`);return decodeJsonResponse(r.data);}const r=await fetch(url,{...options,signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error(`Serviço respondeu ${r.status}. Confira conexão e permissões.`);return r.json();}
export async function cities(uf){return request(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${encodeURIComponent(uf)}/municipios?orderBy=nome`);}
export async function checkUpdate(){const manifest=await readUpdateChannel(request);return availableUpdate(manifest,VERSION);}
export async function githubBackup({token,repo,body,restore=false}){
  if(!/^[\w-]+\/[\w.-]+$/.test(repo)||repo.toLowerCase()==='peratv/onca3d-atualizacoes')throw Error('Informe seu repositório privado de backup, diferente do canal de atualizações.');
  const headers={Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'};
  const user=await request('https://api.github.com/user',{headers});
  const metadata=await request(`https://api.github.com/repos/${repo}`,{headers});
  if(!metadata.private||metadata.owner.login.toLowerCase()!==user.login.toLowerCase())throw Error('Use um repositório privado da sua própria conta.');
  const root=`https://api.github.com/repos/${repo}/contents/`;
  const pointerPath='backups/onca3d-latest.json';
  let pointer=null;
  try{pointer=await request(root+pointerPath,{headers});}catch(e){if(!e.message.includes('404'))throw e;}
  const hash=async text=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text)))).map(x=>x.toString(16).padStart(2,'0')).join('');
  if(restore){
    if(!pointer?.content)throw Error('Nenhum backup encontrado.');
    const info=JSON.parse(atob(pointer.content.replace(/\n/g,'')));
    if(info.format!=='onca3d-parts-v1'||!Array.isArray(info.parts)||!info.parts.length||info.parts.length>300)throw Error('Índice de backup inválido.');
    let text='';
    for(const path of info.parts){
      if(!/^backups\/snapshots\/[a-zA-Z0-9-]+\/part-\d{4}\.txt$/.test(path))throw Error('Caminho de backup inválido.');
      const part=await request(root+path,{headers});
      if(typeof part.content!=='string')throw Error('Parte do backup indisponível.');
      text+=atob(part.content.replace(/\n/g,''));
      if(text.length>150000000)throw Error('Backup excede o limite permitido.');
    }
    if(text.length!==info.size||await hash(text)!==info.sha256)throw Error('Backup incompleto. Tente recuperar novamente.');
    return text;
  }
  if(body.length>150000000)throw Error('Backup acima de 150 MB. Exporte o arquivo local.');
  const snapshot=`backups/snapshots/${Date.now()}-${crypto.randomUUID()}`;
  const parts=[];
  for(let i=0;i<body.length;i+=500000){
    const path=`${snapshot}/part-${String(parts.length).padStart(4,'0')}.txt`;
    await request(root+path,{method:'PUT',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({message:'Parte de backup pessoal criptografado ONÇA 3D',content:btoa(body.slice(i,i+500000))})});
    parts.push(path);
  }
  const info={format:'onca3d-parts-v1',createdAt:new Date().toISOString(),parts,size:body.length,sha256:await hash(body)};
  await request(root+pointerPath,{method:'PUT',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({message:'Conclui backup pessoal ONÇA 3D',content:btoa(JSON.stringify(info)),...(pointer?{sha:pointer.sha}:{})})});
}
export async function exportFile(name,body){if(window.oncaDesktop)return window.oncaDesktop.saveFile({name,body});if(Capacitor.isNativePlatform()){const {Filesystem,Directory,Encoding}=await import('@capacitor/filesystem');const {Share}=await import('@capacitor/share');const file=await Filesystem.writeFile({path:name,data:body,directory:Directory.Cache,encoding:Encoding.UTF8});await Share.share({title:'Backup ONÇA 3D',url:file.uri,dialogTitle:'Salvar backup'});return true;}const url=URL.createObjectURL(new Blob([body],{type:'application/octet-stream'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return true;}
export async function photo(file){if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw Error('Escolha uma foto JPG, PNG ou WebP.');if(file.size>20*1024*1024)throw Error('A foto deve ter até 20 MB.');const bitmap=await createImageBitmap(file);try{const scale=Math.min(1,960/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/jpeg',0.82);}finally{bitmap.close();}}

export async function installUpdate(state){
  if(window.oncaDesktop)return window.oncaDesktop.installUpdate(JSON.stringify(state));
  if(Capacitor.isNativePlatform()){
    const {Filesystem,Directory,Encoding}=await import('@capacitor/filesystem');
    await Filesystem.writeFile({path:`recovery/before-update-${Date.now()}.json`,data:JSON.stringify(state),directory:Directory.Data,encoding:Encoding.UTF8,recursive:true});
    return registerPlugin('OncaUpdater').install();
  }
  window.open('https://github.com/PeraTV/onca3d-atualizacoes/releases','_blank','noopener');
}

export async function fetchTariffs(){
  const filters={DscSubGrupo:'B1',DscClasse:'Residencial',DscSubClasse:'Residencial',DscModalidadeTarifaria:'Convencional',DscBaseTarifaria:'Tarifa de Aplicação',DscDetalhe:'Não se aplica',DscUnidadeTerciaria:'MWh'};
  const records=[];
  for(let offset=0;offset<30000;offset+=10000){
    const url='https://dadosabertos.aneel.gov.br/api/3/action/datastore_search?resource_id=fcf2906c-7c32-4b9b-a637-054e7a5234f4&limit=10000&offset='+offset+'&filters='+encodeURIComponent(JSON.stringify(filters));
    const data=await request(url);if(!data.success||!Array.isArray(data.result?.records))throw Error('A fonte de tarifas não está disponível.');
    records.push(...data.result.records);if(records.length>=data.result.total)break;
    if(!data.result.records.length)throw Error('A fonte de tarifas retornou dados incompletos.');
  }
  const values=tariffReferences(records,new Date().toLocaleDateString('en-CA'));
  if(!values.length)throw Error('Não há referências vigentes para esta consulta. Use o valor da conta.');
  return values;
}
