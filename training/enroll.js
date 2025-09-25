
(function(){
  const title = (document.title || '').split(' — ')[0];
  const courseId = (title||'').toLowerCase().replace(/[^\w]+/g,'_');
  const now = new Date().toISOString();
  const entry = { courseId, ts: now, path: location.pathname };
  try {
    const key = 'mbcc_enrollments';
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    const today = now.slice(0,10);
    const exists = arr.some(e => e.courseId===courseId && (e.ts||'').slice(0,10)===today);
    if(!exists){ arr.push(entry); localStorage.setItem(key, JSON.stringify(arr)); }
  } catch(e){}
  const orig = window.mbccTrack;
  window.mbccTrack = function(evt, data){
    try {
      if(evt==='quiz_answer'){
        const q = {courseId, evt, correct: !!(data&&data.correct), question: (data&&data.question)||'', ts: new Date().toISOString()};
        const qKey = 'mbcc_quiz_events';
        const qa = JSON.parse(localStorage.getItem(qKey) || '[]');
        qa.push(q);
        localStorage.setItem(qKey, JSON.stringify(qa));
      }
    } catch(e){}
    if(typeof orig === 'function'){ try{ orig(evt,data); }catch(e){} }
  };
})();
