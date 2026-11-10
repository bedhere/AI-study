import test from 'node:test';
import assert from 'node:assert/strict';
import {stepStrapSpring,strapSag} from '../components/Lanyard/spring-strap.mjs';

test('release has a bounded spring overshoot and settles instead of drifting',()=>{
  const state={value:3,velocity:0};let minimum=Infinity;
  for(let i=0;i<360;i++){stepStrapSpring(state,1,1/120);minimum=Math.min(minimum,state.value);}
  assert.ok(minimum<1 && minimum>.85);
  assert.ok(Math.abs(state.value-1)<.000001);assert.ok(Math.abs(state.velocity)<.000001);
});
test('the same spring has equal response at 30, 60 and 120 frames per second',()=>{
  const values=[30,60,120].map(fps=>{
    const state={value:1,velocity:0};for(let i=0;i<fps;i++)stepStrapSpring(state,4,1/fps);return state;
  });
  for(const state of values){assert.ok(Math.abs(state.value-values[0].value)<1e-10);assert.ok(Math.abs(state.velocity-values[0].velocity)<1e-10);}
});
test('curvature stays visible but never grows into a deep hanging loop',()=>{
  for(const span of [.01,1,10,100])for(const velocity of [-100,0,100]){
    const sag=strapSag(span,1.6,velocity);assert.ok(sag>0 && sag<=1.6*.14);
  }
  assert.ok(strapSag(100,1.6,0)<strapSag(10,1.6,10));
});
