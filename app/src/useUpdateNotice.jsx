import {useEffect,useState} from 'react';
import {checkUpdate} from './services.mjs';
import {createUpdateNotice} from './update-notice.mjs';
// This visual fixture is removed from production builds.
const demo=import.meta.env.DEV&&new URLSearchParams(location.search).has('guide-test')&&new URLSearchParams(location.search).has('update-notice-demo');
const notice=createUpdateNotice(demo?async()=>({version:'0.5.9'}):checkUpdate);
export const recordUpdateCheck=next=>notice.accept(next);
export default function useUpdateNotice(){
 const [next,setNext]=useState(notice.get);
 useEffect(()=>{
  const unsubscribe=notice.subscribe(setNext);let lastAttempt=0;
  const check=()=>{if(document.visibilityState==='hidden'||Date.now()-lastAttempt<60000)return;lastAttempt=Date.now();void notice.refresh();};
  check();const timer=setInterval(check,30*60*1000);
  window.addEventListener('focus',check);window.addEventListener('online',check);document.addEventListener('visibilitychange',check);
  return()=>{unsubscribe();clearInterval(timer);window.removeEventListener('focus',check);window.removeEventListener('online',check);document.removeEventListener('visibilitychange',check);};
 },[]);
 return !!next;
}
