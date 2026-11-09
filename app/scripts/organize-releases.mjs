import fs from 'node:fs';
const repo=process.env.GH_REPO,token=process.env.GH_TOKEN;
if(repo!=='PeraTV/jaguarlab'||!token)throw Error('Repositório ou acesso inválido.');
const manifest=JSON.parse(fs.readFileSync('../updates/stable.json','utf8'));
if(manifest.appId!=='onca3d'||!manifest.available||!/^\d+\.\d+\.\d+$/.test(manifest.release?.version||''))throw Error('Canal atual inválido.');
const version=manifest.release.version,tag='v'+version;
async function api(route,method='GET',body){const response=await fetch(`https://api.github.com/repos/${repo}/${route}`,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});if(!response.ok)throw Error(`GitHub respondeu ${response.status} em ${method} ${route}`);return response.json();}
const releases=[];for(let page=1;page<=20;page++){const items=await api(`releases?per_page=100&page=${page}`);releases.push(...items);if(items.length<100)break;if(page===20)throw Error('Lista de releases muito extensa.');}
const current=releases.find(r=>r.tag_name===tag&&!r.draft);if(!current)throw Error('A versão do canal ainda não está publicada. Nada foi ocultado.');
// Verify every currently advertised installer before hiding any previous release.
for(const asset of Object.values(manifest.platforms||{})){
 const url=asset.canonicalUrl||asset.url;const file=current.assets.find(a=>a.browser_download_url===url);
 if(!file||file.size!==asset.sizeBytes||(file.digest&&file.digest!==`sha256:${asset.sha256}`))throw Error('Instalador atual ausente ou divergente. Nada foi ocultado.');
}
function older(value){if(!/^v\d+\.\d+\.\d+$/.test(value))return false;const a=value.slice(1).split('.').map(Number),b=version.split('.').map(Number);for(let i=0;i<3;i++)if(a[i]!==b[i])return a[i]<b[i];return false;}
const snapshot=releases.map(r=>({id:r.id,tag:r.tag_name,name:r.name,draft:r.draft,prerelease:r.prerelease}));fs.mkdirSync('release',{recursive:true});fs.writeFileSync('release/release-visibility-before.json',JSON.stringify(snapshot,null,2));
const banner=`> **VERSÃO ATUAL PARA DOWNLOAD: ${version}**\n> Use os arquivos desta versão. Releases anteriores foram ocultadas da página pública; as tags e os tutoriais foram preservados. Esta distribuição continua sendo uma prévia para avaliação.\n\n`;
const body=(current.body||'').replace(/^> \*\*VERSÃO ATUAL PARA DOWNLOAD:[\s\S]*?\n\n/,'');
await api(`releases/${current.id}`,'PATCH',{name:`JAGUAR LAB ${version} — VERSÃO ATUAL (prévia)`,body:banner+body});
let hidden=0;for(const release of releases.filter(r=>!r.draft&&older(r.tag_name))){await api(`releases/${release.id}`,'PATCH',{draft:true});hidden++;console.log(`Oculta da página pública, sem apagar tag: ${release.tag_name}`);}
console.log(`Versão visível: ${tag}. Releases antigas ocultadas: ${hidden}. Tags, código, vídeos e o canal atual preservados.`);
