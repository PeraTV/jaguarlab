export async function downloadAndOpenInstaller(state,{download,install,onDownloaded}){const result=await download(state);onDownloaded?.(result);const opened=await install();return {...opened,version:result.version};}

