import {Unzip,UnzipInflate} from 'fflate';
import {encodeBytes} from './model-tools.mjs';
// Read fixed-size windows, never a base64 copy of the original large STL.
export async function binaryStlPreview(file){
 const header=new DataView(await file.slice(0,84).arrayBuffer());
 if(header.byteLength<84)throw Error('STL incompleto.');
 const count=header.getUint32(80,true);
 if(84+count*50!==file.size)throw Error('Para STL grande, exporte no formato STL binário.');
 let min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
 const scan=async fn=>{for(let start=0;start<count;start+=12000){const n=Math.min(12000,count-start),v=new DataView(await file.slice(84+start*50,84+(start+n)*50).arrayBuffer());for(let t=0;t<n;t++){const points=[];for(let j=0;j<3;j++){const point=[0,1,2].map(k=>v.getFloat32(t*50+12+j*12+k*4,true));if(!point.every(Number.isFinite))throw Error('Coordenadas inválidas no STL.');points.push(point);}fn(points);}await new Promise(resolve=>setTimeout(resolve,0));}};
 await scan(points=>{for(const p of points)for(let k=0;k<3;k++){min[k]=Math.min(min[k],p[k]);max[k]=Math.max(max[k],p[k]);}});
 const dimensions=max.map((x,k)=>x-min[k]),span=Math.max(...dimensions);
 if(!span||span>100000)throw Error('Dimensões inválidas no STL.');
 let triangles;
 for(let divisions=512;divisions>=8;divisions/=2){const cell=span/divisions,seen=new Set();triangles=[];let overflow=false;
  await scan(points=>{if(overflow)return;const grid=points.map(p=>p.map((x,k)=>Math.round((x-min[k])/cell))),keys=grid.map(p=>p.join(','));if(new Set(keys).size<3)return;const key=[...keys].sort().join('|');if(seen.has(key))return;seen.add(key);triangles.push(grid.map(p=>p.map((x,k)=>min[k]+x*cell)));if(triangles.length>180000)overflow=true;});
  if(!overflow)break;triangles=null;
 }
 if(!triangles?.length)throw Error('Não foi possível criar uma prévia leve deste STL.');
 const result=new ArrayBuffer(84+triangles.length*50),v=new DataView(result);v.setUint32(80,triangles.length,true);
 triangles.forEach((points,t)=>points.forEach((p,j)=>p.forEach((x,k)=>v.setFloat32(84+t*50+12+j*12+k*4,x,true))));
 return {name:file.name,format:'stl',size:file.size,data:encodeBytes(new Uint8Array(result)),localOnly:true,plates:[],geometry:{dimensions,triangles:triangles.length,volume:0,area:0,closed:false},previewNote:' Prévia simplificada para economizar memória; use peso e tempo do fatiador na calculadora.'};
}

export async function large3mfMetadata(file){
 const files={};let count=0,total=0,error;
 const unzip=new Unzip(entry=>{
  if(++count>2000)throw Error('O 3MF contém entradas demais.');
  if(!/(?:\.png$|slice_info\.config$)/i.test(entry.name))return;
  if(entry.originalSize>2000000)return;
  let length=0;const chunks=[];
  entry.ondata=(err,data,final)=>{if(err){error=err;return;}length+=data.length;total+=data.length;if(length>2000000||total>8000000)throw Error('As imagens do 3MF excedem o limite de prévia.');chunks.push(data);if(final){const result=new Uint8Array(length);let offset=0;for(const c of chunks){result.set(c,offset);offset+=c.length;}files[entry.name]=result;}};
  entry.start();
 });
 unzip.register(UnzipInflate);
 for(let offset=0;offset<file.size;offset+=1024*1024){unzip.push(new Uint8Array(await file.slice(offset,offset+1024*1024).arrayBuffer()),offset+1024*1024>=file.size);if(error)throw error;await new Promise(resolve=>setTimeout(resolve,0));}
 return files;
}

