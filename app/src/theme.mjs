const valid=color=>typeof color==='string'&&/^#[0-9a-f]{6}$/i.test(color);
const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
const luminance=hex=>rgb(hex).map(x=>{const v=x/255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
const mix=(a,b,t)=>'#'+rgb(a).map((x,i)=>Math.round(x*(1-t)+rgb(b)[i]*t).toString(16).padStart(2,'0')).join('');
export function themeVars(theme={}){const base=valid(theme.base)?theme.base:'#0b0c0e',accent=valid(theme.accent)?theme.accent:'#ffc400',light=luminance(base)>.179,ink=light?'#101114':'#f3f3f5',toward=light?'#000000':'#ffffff';return {'--base':base,'--yellow':accent,'--accent':accent,'--accent-hover':mix(accent,toward,.12),'--on-accent':luminance(accent)>.179?'#101114':'#ffffff','--text':ink,'--muted':mix(base,ink,.65),'--panel':mix(base,toward,light?.025:.06),'--panel-raised':mix(base,toward,light?.06:.1),'--input':mix(base,toward,.02),'--border':mix(base,ink,.2),'--accent-soft':mix(base,accent,.14),'--accent-border':mix(base,accent,.5)};}
export function applyTheme(theme){for(const [key,value]of Object.entries(themeVars(theme)))document.documentElement.style.setProperty(key,value);document.documentElement.style.setProperty('--logo-filter',theme?.logoFollow===true?'url(#jaguar-theme-filter)':'none');document.getElementById('jaguar-theme-matrix')?.setAttribute('values',logoColorMatrix(theme?.accent));}

export function logoColorMatrix(accent){const [r,g,b]=rgb(valid(accent)?accent:'#ffc400').map(x=>x/255);return [r,0,1-r,0,0,g,0,1-g,0,0,b,0,1-b,0,0,0,0,0,1,0].join(' ');}

