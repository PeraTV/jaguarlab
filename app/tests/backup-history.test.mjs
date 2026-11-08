import test from 'node:test';import assert from 'node:assert/strict';
globalThis.window={};const {githubBackup}=await import('../src/services.mjs');
test('lista somente cópias completas e permite restaurar uma anterior sem alterar a mais recente',async()=>{
 const files=new Map(),prior=globalThis.fetch;let revision=0,fail=false;
 globalThis.fetch=async(url,options={})=>{
  if(url.endsWith('/user'))return Response.json({login:'maker'});
  if(url.endsWith('/repos/maker/private'))return Response.json({private:true,owner:{login:'maker'}});
  const path=url.split('/contents/')[1];
  if(options.method==='PUT'){
   const body=JSON.parse(options.body);
   if(fail&&path.endsWith('part-0001.txt'))return new Response('',{status:503});
   if(path==='backups/onca3d-latest.json'&&files.has(path)&&body.sha!==files.get(path).sha)return new Response('',{status:409});
   files.set(path,{content:body.content,sha:String(++revision)});return Response.json({content:{sha:String(revision)}});
  }
  return files.has(path)?Response.json(files.get(path)):new Response('',{status:404});
 };
 try{
  const input={token:'fake',repo:'maker/private'};
  assert.deepEqual(await githubBackup({...input,list:true}),[]);
  await githubBackup({...input,body:'first encrypted copy'});
  const first=(await githubBackup({...input,list:true}))[0];
  await githubBackup({...input,body:'second encrypted copy'});
  const copies=await githubBackup({...input,list:true});
  assert.equal(copies.length,2);assert.equal(copies[0].latest,true);assert.equal(copies[1].latest,false);assert.equal(copies[1].id,first.id);
  assert.equal(await githubBackup({...input,restore:true,snapshotId:first.id}),'first encrypted copy');
  assert.equal(await githubBackup({...input,restore:true}),'second encrypted copy');
  await assert.rejects(()=>githubBackup({...input,restore:true,snapshotId:'backups/arbitrary'}),/não está mais/);
  fail=true;await assert.rejects(()=>githubBackup({...input,body:'x'.repeat(510000)}),/503/);
  assert.equal((await githubBackup({...input,list:true})).length,2);
  const path=first.id+'/part-0000.txt';files.get(path).content=btoa('corrupted');
  await assert.rejects(()=>githubBackup({...input,restore:true,snapshotId:first.id}),/incompleto/);
 }finally{globalThis.fetch=prior;}
});
test('compatibilidade do índice antigo sem histórico e acesso somente à conta privada correta',async()=>{
 const prior=globalThis.fetch;
 globalThis.fetch=async url=>url.endsWith('/user')?Response.json({login:'maker'}):Response.json({private:false,owner:{login:'maker'}});
 try{await assert.rejects(()=>githubBackup({repo:'maker/public',token:'fake',list:true}),/privado/);}finally{globalThis.fetch=prior;}
});
