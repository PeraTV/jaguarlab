import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const repo=process.env.GH_REPO;
if(repo!=='PeraTV/jaguarlab')throw Error('Canal de distribuição inesperado.');
const {version}=JSON.parse(fs.readFileSync('package.json','utf8'));
const android=JSON.parse(fs.readFileSync('../distribution/android.json','utf8'));
if(android.version!==version)throw Error('Gere e assine o APK desta versão antes de publicar.');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const exe=path.resolve(`release/JaguarLab-${version}-Setup.exe`);
const apk=path.resolve(`../distribution/JaguarLab-${version}-Android.apk`);
const apkHash=hash(apk);
if(apkHash!==android.sha256)throw Error('O APK não corresponde ao hash validado localmente.');
const exeHash=hash(exe),tag=`v${version}`;
const legacyApk=path.resolve(`release/Onca3D-${version}-Android.apk`);fs.copyFileSync(apk,legacyApk);
const notes=`JAGUAR LAB ${version} — instalador Windows e novo endereço.\n\nCorrige o EBUSY ao atualizar no Windows: cada download usa um caminho exclusivo, sem sobrescrever um instalador antigo em uso. Arquivo é conferido antes de abrir; bloqueios temporários têm tentativas limitadas.\n\nDownloads principais agora se chamam JaguarLab. Repositório oficial: https://github.com/PeraTV/jaguarlab. Links de compatibilidade são mantidos para versões anteriores. Nenhum identificador de dados ou assinatura Android foi alterado.\n\nBackup entre aparelhos com Buscar backups, seleção de cópias e Importar do GitHub. Manter conectado opcional guarda token e senha com a proteção do Android/Windows; Desconectar remove o acesso. Ajuda de backup revisada: repositório privado e token são individuais; modelos 3D ficam fora do backup. Inclui guia completo de 4min40 com 21 capítulos, tutorial de backup com o fluxo atual do GitHub, legendas e apresentação ilustrada. Os campos de repositório, token e senha são explicados separadamente.\n\nInstale por cima, sem desinstalar. Faça backup antes. Guia: https://github.com/${repo}/blob/main/docs/GUIA.md\n`;

fs.writeFileSync('release/NOTAS.md',notes);
fs.writeFileSync('release/SHA256SUMS.txt',`${exeHash}  ${path.basename(exe)}\n${apkHash}  ${path.basename(apk)}\n`);
function gh(args,options={}){return execFileSync('gh',args,{stdio:'inherit',...options});}
let existing=null;try{existing=JSON.parse(gh(['release','view',tag,'--json','isDraft'],{encoding:'utf8',stdio:['ignore','pipe','pipe']}));}catch{}
if(existing&&!existing.isDraft)throw Error('Esta versão já foi publicada. Aumente a versão antes de distribuir novos arquivos.');
if(!existing)gh(['release','create',tag,'--draft','--prerelease','--target',process.env.GITHUB_SHA,'--title',`JAGUAR LAB ${version} — prévia para avaliação`,'--notes-file','release/NOTAS.md']);
gh(['release','upload',tag,exe,apk,legacyApk,path.resolve('release/SHA256SUMS.txt'),'--clobber']);
gh(['release','edit',tag,'--draft=false','--prerelease','--notes-file','release/NOTAS.md']);
const asset=name=>`https://github.com/${repo}/releases/download/${tag}/${name}`;
fs.writeFileSync('../updates/stable.json',JSON.stringify({schemaVersion:1,appId:'onca3d',channel:'preview',available:true,status:'preview',release:{version,notes:'Prévia para avaliação. Faça backup antes de atualizar.',publishedAt:new Date().toISOString()},platforms:{windows:{url:asset(path.basename(exe)).replace('/PeraTV/jaguarlab/','/PeraTV/onca3d-atualizacoes/'),canonicalUrl:asset(path.basename(exe)),sha256:exeHash,sizeBytes:fs.statSync(exe).size},android:{url:asset(path.basename(legacyApk)).replace('/PeraTV/jaguarlab/','/PeraTV/onca3d-atualizacoes/'),canonicalUrl:asset(path.basename(apk)),sha256:apkHash,sizeBytes:fs.statSync(apk).size}}},null,2)+'\n');
execFileSync('git',['config','user.name','github-actions[bot]']);
execFileSync('git',['config','user.email','41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git',['add','../updates/stable.json']);
execFileSync('git',['commit','-m',`Publica canal de atualização JAGUAR LAB ${version}`],{stdio:'inherit'});
execFileSync('git',['push'],{stdio:'inherit'});
