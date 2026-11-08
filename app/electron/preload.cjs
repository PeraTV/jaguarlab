const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('oncaDesktop',{publicGet:url=>ipcRenderer.invoke('public-get',url),installUpdate:backup=>ipcRenderer.invoke('install-update',backup),saveFile:data=>ipcRenderer.invoke('save-file',data)});
