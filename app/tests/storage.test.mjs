import 'fake-indexeddb/auto';
import test from 'node:test';
import assert from 'node:assert/strict';
import {load,save} from '../src/storage.mjs';
test('persistência atômica mantém dados e rejeita escrita com revisão antiga',async()=>{const initial=await load();const next=await save({...initial,settings:{...initial.settings,shop:'Ateliê teste'}},0);assert.equal(next.revision,1);assert.equal((await load()).settings.shop,'Ateliê teste');await assert.rejects(()=>save(initial,0),/outra janela/);assert.equal((await load()).settings.shop,'Ateliê teste');});
