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
const notes=`JAGUAR LAB ${version} — orçamento, temas e atualização.\n\nAtalho visível para ganhar 100% sobre o custo. Sugestões editáveis de orçamento para peças funcionais, decorativas ou personalizadas, incluindo trabalho adicional e taxas. Os percentuais são referências editáveis, não uma pesquisa de mercado.\n\nPintas do estoque acompanham a cor do tema. Download Android prioriza GitHub Releases e reduz a espera em conexões sem resposta. Após baixar e conferir, abre o instalador automaticamente. Se o Android pedir autorização, a instalação é retomada ao voltar. A confirmação final continua no sistema.\n\nTutorial substituído por vídeo de 1min40s com voz neural em português e legendas: https://raw.githubusercontent.com/${repo}/v${version}/guides/tutorial-backup.mp4\n\nInstale por cima, sem desinstalar. Faça backup antes. Modelos 3D ficam no aparelho e fora do backup. Guia: https://github.com/${repo}/blob/main/app/README.md\n`;

fs.writeFileSync('release/NOTAS.md',notes);
fs.writeFileSync('release/SHA256SUMS.txt',`${exeHash}  ${path.basename(exe)}\n${apkHash}  ${path.basename(apk)}\n`);
function gh(args,options={}){return execFileSync('gh',args,{stdio:'inherit',...options});}
let existing=null;try{existing=JSON.parse(gh(['release','view',tag,'--json','isDraft'],{encoding:'utf8',stdio:['ignore','pipe','pipe']}));}catch{}
if(existing&&!existing.isDraft)throw Error('Esta versão já foi publicada. Aumente a versão antes de distribuir novos arquivos.');
if(!existing)gh(['release','create',tag,'--draft','--prerelease','--target',process.env.GITHUB_SHA,'--title',`JAGUAR LAB ${version} — prévia para avaliação`,'--notes-file','release/NOTAS.md']);
gh(['release','upload',tag,exe,apk,path.resolve('release/SHA256SUMS.txt'),'--clobber']);
gh(['release','edit',tag,'--draft=false','--prerelease','--notes-file','release/NOTAS.md']);
const asset=name=>`https://github.com/${repo}/releases/download/${tag}/${name}`;
fs.writeFileSync('../updates/stable.json',JSON.stringify({schemaVersion:1,appId:'onca3d',channel:'preview',available:true,status:'preview',release:{version,notes:'Prévia para avaliação. Faça backup antes de atualizar.',publishedAt:new Date().toISOString()},platforms:{windows:{url:asset(path.basename(exe)),sha256:exeHash,sizeBytes:fs.statSync(exe).size},android:{url:asset(path.basename(apk)),sha256:apkHash,sizeBytes:fs.statSync(apk).size}}},null,2)+'\n');
execFileSync('git',['config','user.name','github-actions[bot]']);
execFileSync('git',['config','user.email','41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git',['add','../updates/stable.json']);
execFileSync('git',['commit','-m',`Publica canal de atualização JAGUAR LAB ${version}`],{stdio:'inherit'});
execFileSync('git',['push'],{stdio:'inherit'});

