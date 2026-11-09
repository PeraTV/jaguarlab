// Successful checks are shared by the header and the update screen.
// A manual result supersedes an older background request; errors preserve known state.
export function createUpdateNotice(check){
 let value=null,pending=null,revision=0;const listeners=new Set();
 const accept=next=>{revision++;value=next;for(const listener of listeners)listener(value);};
 return {
  get:()=>value,
  subscribe(listener){listeners.add(listener);return()=>listeners.delete(listener);},
  accept,
  refresh(){if(pending)return pending;const before=revision;pending=Promise.resolve().then(check).then(next=>{if(before===revision)accept(next);return value;}).catch(()=>value).finally(()=>{pending=null;});return pending;}
 };
}
