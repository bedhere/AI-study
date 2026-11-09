import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const baselineArgument=process.argv.find(arg=>arg.startsWith('--record-baseline='));
const root=path.resolve(baselineArgument?baselineArgument.slice('--record-baseline='.length):'public/slides');
const files=fs.readdirSync(root,{recursive:true}).map(f=>path.join(root,f)).filter(f=>fs.statSync(f).isFile());
const failures=[];
const curricula=[];
for(const lang of ['', '.en','.ko','.tw','.hk']){
  const file=path.join(root,`course-data${lang}.js`);
  const context={window:{}};
  vm.runInNewContext(fs.readFileSync(file,'utf8'),context,{timeout:1000});
  const lessons=context.window.COURSE_FLAT;
  curricula.push({language:lang||'zh-CN',parts:context.window.COURSE.parts.length,lessons:lessons.length});
  for(const lesson of lessons){
    if(!fs.existsSync(path.resolve(root,lesson.file)))failures.push({file:path.basename(file),error:`Missing curriculum page: ${lesson.file}`});
    if(lang){
      const translated=lesson.file.replace(/\.html$/,lang+'.html');
      if(!fs.existsSync(path.resolve(root,translated)))failures.push({file:path.basename(file),error:`Missing translation: ${translated}`});
    }
  }
}
let inlineScripts=0;
for(const file of files){
  const name=path.relative(root,file).replaceAll('\\','/');
  if(file.endsWith('.js')){
    try{new vm.Script(fs.readFileSync(file,'utf8'),{filename:name});}
    catch(e){failures.push({file:name,error:e.message});}
  }
  if(!file.endsWith('.html'))continue;
  const content=fs.readFileSync(file,'utf8');
  if(/https?:\/\/方片/.test(content))failures.push({file:name,error:'Invalid placeholder domain'});
  for(const match of content.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)){
    const attrs=match[1];
    if(/\bsrc\s*=/.test(attrs))continue;
    const type=attrs.match(/\btype\s*=\s*['"]([^'"]+)/i)?.[1];
    if(type&&!['text/javascript','application/javascript'].includes(type))continue;
    if(!match[2].trim())continue;
    inlineScripts++;
    try{new vm.Script(match[2],{filename:`${name}:inline-${inlineScripts}`});}
    catch(e){failures.push({file:name,error:e.message});}
  }
}
const baselineFile=path.resolve('reports/known-script-issues.json');
if(baselineArgument){
  fs.writeFileSync(baselineFile,JSON.stringify({baselineCommit:'612564f',source:'Read-only original slides snapshot; recorded before course content edits.',issues:failures},null,2)+'\n');
  console.log(JSON.stringify({recordedExistingIssues:failures.length,curricula},null,2));
}else{
  const known=fs.existsSync(baselineFile)?JSON.parse(fs.readFileSync(baselineFile,'utf8')).issues:[];
  const knownKeys=new Set(known.map(issue=>JSON.stringify(issue)));
  const introduced=failures.filter(issue=>!knownKeys.has(JSON.stringify(issue)));
  console.log(JSON.stringify({htmlPages:files.filter(f=>f.endsWith('.html')).length,jsFiles:files.filter(f=>f.endsWith('.js')).length,inlineScripts,curricula,newFailures:introduced.length,existingIssues:failures.length-introduced.length,examples:introduced.slice(0,10)},null,2));
  // All open translations must now parse, including issues inherited from the baseline.
  if(failures.length)process.exitCode=1;
}
