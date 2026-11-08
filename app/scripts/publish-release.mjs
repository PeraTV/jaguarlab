import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const repo=process.env.GH_REPO;
if(repo!=='PeraTV/onca3d-atualizacoes')throw Error('Canal de distribuição inesperado.');
const {version}=JSON.parse(fs.readFileSync('package.json','utf8'));
const android=JSON.parse(fs.readFileSync('../distribution/android.json','utf8'));
if(android.version!==version)throw Error('Gere e assine o APK desta versão antes de publicar.');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const exe=path.resolve(`release/Onca3D-${version}-Setup.exe`);
const apk=path.resolve(`../distribution/Onca3D-${version}-Android.apk`);
const apkHash=hash(apk);
if(apkHash!==android.sha256)throw Error('O APK não corresponde ao hash validado localmente.');
const exeHash=hash(exe),tag=`v${version}`;
const notes=`JAGUAR LAB ${version} — calculadora e Android corrigidos.\n\nAgora o percentual de lucro fica visível, com margem sobre a venda ou acréscimo sobre o custo. É possível calcular sem projeto, arquivo ou carretel, informando o preço por kg. G-code exportado do fatiador permite ler tempo e gramas e visualizar trajetórias por camadas. Esses valores continuam sendo estimativas do fatiador.\n\nNome alterado para JAGUAR LAB, mantendo a logo escolhida. Corrigidos o ícone amarelo no Android, o cabeçalho sob a barra de notificações e a consulta de atualizações. Dados locais, backups e assinatura foram preservados.\n\nQuem usa uma versão anterior com falha na consulta deve instalar este APK por cima uma vez, sem desinstalar.\n\nGuia: https://github.com/${repo}/blob/main/app/README.md\n`;

fs.writeFileSync('release/NOTAS.md',notes);
fs.writeFileSync('release/SHA256SUMS.txt',`${exeHash}  ${path.basename(exe)}\n${apkHash}  ${path.basename(apk)}\n`);
function gh(args,options={}){return execFileSync('gh',args,{stdio:'inherit',...options});}
let existing=null;try{existing=JSON.parse(gh(['release','view',tag,'--json','isDraft'],{encoding:'utf8',stdio:['ignore','pipe','pipe']}));}catch{}
if(existing&&!existing.isDraft)throw Error('Esta versão já foi publicada. Aumente a versão antes de distribuir novos arquivos.');
if(!existing)gh(['release','create',tag,'--draft','--prerelease','--target',process.env.GITHUB_SHA,'--title',`JAGUAR LAB ${version} — prévia para avaliação`,'--notes-file','release/NOTAS.md']);
gh(['release','upload',tag,exe,apk,path.resolve('release/SHA256SUMS.txt'),'--clobber']);
gh(['release','edit',tag,'--draft=false','--prerelease','--notes-file','release/NOTAS.md']);
const asset=name=>`https://github.com/${repo}/releases/download/${tag}/${name}`;
fs.writeFileSync('../updates/stable.json',JSON.stringify({schemaVersion:1,appId:'onca3d',channel:'preview',available:true,status:'preview',release:{version,notes:'Prévia para avaliação. Faça backup antes de atualizar.',publishedAt:new Date().toISOString()},platforms:{windows:{url:asset(path.basename(exe)),sha256:exeHash},android:{url:asset(path.basename(apk)),sha256:apkHash}}},null,2)+'\n');
execFileSync('git',['config','user.name','github-actions[bot]']);
execFileSync('git',['config','user.email','41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git',['add','../updates/stable.json']);
execFileSync('git',['commit','-m',`Publica canal de atualização JAGUAR LAB ${version}`],{stdio:'inherit'});
execFileSync('git',['push'],{stdio:'inherit'});
