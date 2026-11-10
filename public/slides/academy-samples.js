/* Explicit actions only; no new storage or completion rules. */
document.getElementById('copyPractice')?.addEventListener('click',async()=>{
 const output=document.getElementById('copyFeedback');
 try{await navigator.clipboard.writeText(document.getElementById('practicePrompt').textContent);output.textContent='已复制，可粘贴到你使用的 AI 工具中练习。';}
 catch{output.textContent='当前浏览器不支持复制，请选中上方提示词手动复制。';}
});
document.getElementById('academyQuiz')?.addEventListener('submit',event=>{
 event.preventDefault();const values=new FormData(event.currentTarget);
 const score=Number(values.get('q1')==='b')+Number(values.get('q2')==='a')+Number(values.get('q3')==='b');
 document.getElementById('quizFeedback').textContent=`答对 ${score} / 3 题。${score===3?'你已抓住事实核验与人工判断的要点。':'对照下方解析，回看材料后再试一次。'}`;
 document.getElementById('quizExplanations').hidden=false;
});
