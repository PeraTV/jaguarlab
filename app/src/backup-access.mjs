import {Capacitor,registerPlugin} from '@capacitor/core';
const native=registerPlugin('BackupAccess');
function bridge(){if(globalThis.window?.oncaDesktop?.backupAccess)return window.oncaDesktop.backupAccess;if(Capacitor.isNativePlatform())return native;return null;}
export async function readAccess(){const b=bridge();return b?b.read():{supported:false};}
export async function saveAccess(value){const b=bridge();if(!b)throw Error('Manter conectado está disponível nos aplicativos Android e Windows.');return b.write(value);}
export async function clearAccess(){const b=bridge();if(b)await b.clear();}
