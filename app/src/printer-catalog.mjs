export const PRINTER_PRESETS=[
{id:'custom',brand:'',model:'Personalizada',volume:[0,0,0],nozzle:.4,source:''},
{id:'bambu-a1-mini',brand:'Bambu Lab',model:'A1 mini',volume:[180,180,180],nozzle:.4,source:'https://bambulab.com/en/a1-mini/tech-specs'},
{id:'bambu-a1',brand:'Bambu Lab',model:'A1',volume:[256,256,256],nozzle:.4,source:'https://bambulab.com/en/a1/tech-specs'},
{id:'anycubic-kobra3',brand:'Anycubic',model:'Kobra 3',volume:[250,250,260],nozzle:.4,source:'https://store.anycubic.com/products/anycubic-kobra-3'},
{id:'creality-ender3v3',brand:'Creality',model:'Ender-3 V3',volume:[220,220,250],nozzle:.4,source:'https://www.creality.com/products/creality-ender-3-v3'},
{id:'anycubic-kobra4',brand:'Anycubic',model:'Kobra 4 — revisar volume',volume:[0,0,0],nozzle:.4,source:'',note:'Modelo incluído conforme o perfil mostrado no seu fatiador. Informe o volume da sua máquina.'}
];
export function printerFromPreset(preset,watts=150){return {presetId:preset.id,name:([preset.brand,preset.model].filter(Boolean).join(' ')),brand:preset.brand,model:preset.model,nozzle:preset.nozzle,volume:[...preset.volume],watts,layerHeight:.2,machineRate:0,notes:preset.note||''};}
