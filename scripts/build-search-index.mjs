import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { gzipSync } from 'node:zlib';
import ts from 'typescript';

const root=path.resolve('public/slides');
const entities={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',mdash:'—',ndash:'–',hellip:'…',middot:'·',times:'×',rarr:'→',larr:'←'};
function textOf(html){
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi,'').replace(/<!--[\s\S]*?-->/g,'')
    .replace(/<\/?(?:p|div|h[1-6]|li|br|tr|section|article|header|footer|aside)\b[^>]*>/gi,' ').replace(/<[^>]+>/g,'')
    .replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi,(all,key)=>{if(key[0]==='#'){const n=key[1].toLowerCase()==='x'?parseInt(key.slice(2),16):parseInt(key.slice(1),10);return n>0&&n<=0x10ffff?String.fromCodePoint(n):' ';}return entities[key]??all;})
    .normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim();
}
const summary=[];
function interactiveText(html){
  const strings=[];
  for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)){
    if(/\bsrc\s*=|application\/json|application\/ld\+json/.test(match[1]))continue;
    const source=ts.createSourceFile('lesson.js',match[2],ts.ScriptTarget.Latest,false,ts.ScriptKind.JS);
    function visit(node){
      if(ts.isStringLiteralLike(node)||[ts.SyntaxKind.TemplateHead,ts.SyntaxKind.TemplateMiddle,ts.SyntaxKind.TemplateTail].includes(node.kind)){
        if(node.text.length>1&&/[\s\u0080-\uffff]/.test(node.text))strings.push(node.text);
      }
      ts.forEachChild(node,visit);
    }
    visit(source);
  }
  return strings.join(' ');
}
for(const lang of ['zh','en','ko','tw','hk']){
  const suffix=lang==='zh'?'':'.'+lang;
  const context={window:{}};
  vm.runInNewContext(fs.readFileSync(path.join(root,'course-data'+suffix+'.js'),'utf8'),context,{timeout:1000});
  const documents=Array.from(context.window.COURSE_FLAT,lesson=>{
    const translated=lesson.file.replace(/\.html$/,suffix+'.html');
    const name=fs.existsSync(path.join(root,translated))?translated:lesson.file;
    const html=fs.readFileSync(path.join(root,name),'utf8');
    const body=html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1]??html;
    return {file:lesson.file,text:textOf(lesson.title+' '+lesson.desc+' '+lesson.topicTitle+' '+body+' '+interactiveText(body))};
  });
  const json=JSON.stringify({version:1,language:lang,documents});
  fs.writeFileSync(path.join(root,'search-index.'+lang+'.json'),json+'\n');
  summary.push({language:lang,documents:documents.length,bytes:Buffer.byteLength(json),gzipBytes:gzipSync(json).length});
}
console.log(JSON.stringify({localSearchIndexes:summary},null,2));
