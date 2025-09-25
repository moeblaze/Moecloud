/* same as v1, unchanged */ 
const COURSES = [
  { id: "nocode-infra", title: "No-Code Infrastructure Implementer", level: "Pro",
    blurb: "Deploy MBCC's zero-code cloud playbook (Security, CI/CD, FinOps).",
    lessons: [
      {id:"intro", title:"Introduction", html:`<div class="lesson"><p>Welcome to MBCC's No-Code Infrastructure course. You'll learn to deploy our enterprise playbook with zero code.</p></div>`},
      {id:"security", title:"Zero-Trust Security", html:`<div class="lesson"><h3>Policy Foundations</h3><p>Least privilege, SSO, short-lived creds, network segmentation.</p></div>`},
      {id:"cicd", title:"CI/CD & Serverless", html:`<div class="lesson"><h3>Pipelines</h3><p>Drag-and-drop steps, blue/green, artifact signing.</p></div>`},
      {id:"finops", title:"FinOps & Cost Control", html:`<div class="lesson"><h3>Budgets</h3><p>Rightsizing, spend alerts, egress guardrails.</p></div>`},
      {id:"quiz", title:"Module Quiz", quiz: {
        questions: [
          {q:"Which principle enforces minimal necessary permissions?", a:["Zero Trust","Least Privilege","Defense in Depth"], correct:1},
          {q:"Which deployment strategy compares new and old in parallel?", a:["Blue/Green","Big Bang","Cold Start"], correct:0},
          {q:"What do budgets and alerts primarily protect?", a:["Aesthetics","Costs","Latency"], correct:1}
        ],
        pass: 2
      }}
    ]
  },
  { id: "playbook-architect", title: "Certified MBCC Playbook Architect", level: "Elite",
    blurb: "Design, adapt, and certify entire MBCC playbooks for clients.",
    lessons: [
      {id:"frame", title:"Value Frameworks", html:`<div class="lesson"><p>Codify outcomes, metrics, and guarantees.</p></div>`},
      {id:"tooling", title:"Tooling & Templates", html:`<div class="lesson"><p>Bundle living tools, policy generators, blueprints.</p></div>`},
      {id:"delivery", title:"Enterprise Delivery", html:`<div class="lesson"><p>SLAs, change mgmt, stakeholder comms.</p></div>`},
      {id:"quiz", title:"Certification Quiz", quiz:{
        questions:[
          {q:"Why bundle tools with playbooks?", a:["Looks pretty","Increases implementation success","Reduces SEO"], correct:1},
          {q:"What supports repeatability?", a:["Custom work each time","Codified templates","Ignoring feedback"], correct:1}
        ],
        pass: 2
      }}
    ]
  }
];

function currentUser(){ const name=localStorage.getItem("mbcc_user_name")||null; const email=localStorage.getItem("mbcc_user_email")||null; const tier=localStorage.getItem("mbcc_tier")||"free"; return {name,email,tier}; }
function signIn(){ const name=prompt("Your name?"); const email=prompt("Your email?"); if(!name||!email) return; localStorage.setItem("mbcc_user_name",name); localStorage.setItem("mbcc_user_email",email); alert("Signed in as "+name); location.reload(); }
function ensureAccess(level){ const map={free:0,pro:1,elite:2}; const need={Free:0,Pro:1,Elite:2}[level]??0; const have=map[currentUser().tier]??0; return have>=need; }

function renderCatalog(){
  const grid=document.getElementById("courseGrid"); if(!grid) return;
  document.getElementById("loginBtn")?.addEventListener("click",(e)=>{e.preventDefault();signIn();});
  grid.innerHTML = COURSES.map(c=>{
    const locked=!ensureAccess(c.level); const prog=progressPercent(c.id);
    return `<div class="card">
      <div class="badge">${c.level}</div>
      <h3>${c.title}</h3>
      <p>${c.blurb}</p>
      <div class="progress" title="${prog}%"><span style="width:${prog}%"></span></div>
      <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
        <a class="btn" href="course.html?course=${encodeURIComponent(c.id)}">${locked?"Preview":"Open"}</a>
        ${locked?`<a class="btn btn-primary" href="#" data-upgrade="${c.level}">Upgrade to ${c.level}</a>`:`<a class="btn btn-primary" href="#" data-enroll="${c.id}">Enroll</a>`}
      </div>
      <p class="small">Progress: ${prog}%</p>
    </div>`;
  }).join("");
  grid.addEventListener("click",(e)=>{
    const up=e.target.closest("[data-upgrade]"); const en=e.target.closest("[data-enroll]");
    if(up){e.preventDefault(); const tier=up.getAttribute("data-upgrade").toLowerCase(); localStorage.setItem("mbcc_tier",tier); alert("Tier set to "+tier.toUpperCase()+" (stub)."); location.reload();}
    if(en){e.preventDefault(); enroll(en.getAttribute("data-enroll")); alert("Enrolled!"); location.reload();}
  });
}

function enroll(courseId){ const key="mbcc_enrollments"; const s=JSON.parse(localStorage.getItem(key)||"{}"); s[courseId]=s[courseId]||{lessonsDone:[],completed:false}; localStorage.setItem(key,JSON.stringify(s)); }
function getEnrollment(courseId){ const s=JSON.parse(localStorage.getItem("mbcc_enrollments")||"{}"); return s[courseId]||null; }
function setLessonDone(courseId,lessonId){ const key="mbcc_enrollments"; const s=JSON.parse(localStorage.getItem(key)||"{}"); if(!s[courseId]) s[courseId]={lessonsDone:[],completed:false}; if(!s[courseId].lessonsDone.includes(lessonId)) s[courseId].lessonsDone.push(lessonId); localStorage.setItem(key,JSON.stringify(s)); }
function progressPercent(courseId){ const c=COURSES.find(x=>x.id===courseId); if(!c) return 0; const e=getEnrollment(courseId); if(!e) return 0; const total=c.lessons.length; const done=e.lessonsDone?.length||0; return Math.floor((done/total)*100); }
function completeCourse(courseId){ const key="mbcc_enrollments"; const s=JSON.parse(localStorage.getItem(key)||"{}"); if(!s[courseId]) return; s[courseId].completed=true; localStorage.setItem(key,JSON.stringify(s)); }

function renderCourse(){
  const params=new URLSearchParams(location.search); const id=params.get("course"); const course=COURSES.find(c=>c.id===id)|| COURSES[0];
  document.getElementById("courseTitle").textContent=course.title;
  const toc=document.getElementById("toc"); const content=document.getElementById("content");
  const enrollBtn=document.getElementById("enrollBtn");
  enrollBtn.addEventListener("click",(e)=>{e.preventDefault(); if(!ensureAccess(course.level)){localStorage.setItem("mbcc_tier",course.level.toLowerCase()); alert("Upgraded tier to "+course.level+" (stub). Now enrolled.");} enroll(course.id); location.reload(); });
  toc.innerHTML = `<h3>Contents</h3>` + course.lessons.map(ls=>`<a href="#${ls.id}">${ls.title}</a>`).join("");
  const enrolled=!!getEnrollment(course.id);
  content.innerHTML = course.lessons.map(ls=>{
    const gate=!enrolled && ls.id!=="intro";
    if(ls.quiz){ return `<article id="${ls.id}" class="quiz"><h3>${ls.title}</h3>${gate?lockBox(course.level):quizHtml(course.id,ls)}</article>`; }
    return `<article id="${ls.id}" class="lesson"><h3>${ls.title}</h3>${gate?lockBox(course.level):ls.html}${gate?"":`<div style="margin-top:10px"><a class="btn btn-primary" href="#" data-done="${ls.id}">Mark Done</a></div>`}</article>`;
  }).join("");

  content.addEventListener("click",(e)=>{
    const done=e.target.closest("[data-done]"); if(done){ e.preventDefault(); setLessonDone(course.id,done.getAttribute("data-done")); e.target.textContent="Done ✓"; }
  });

  content.addEventListener("submit",(e)=>{
    const form=e.target.closest("form[data-quiz]"); if(!form) return; e.preventDefault();
    const cid=form.getAttribute("data-course"); const lid=form.getAttribute("data-lesson"); const idxs=JSON.parse(form.getAttribute("data-indexes"));
    let score=0; idxs.forEach((i,qi)=>{ const val=form.querySelector(`input[name="q${qi}"]:checked`); if(val && Number(val.value)===i) score++; });
    const pass=Number(form.getAttribute("data-pass"));
    if(score>=pass){ alert(`Pass! ${score}/${idxs.length}`); setLessonDone(cid,lid); if(progressPercent(cid)>=100){ completeCourse(cid); const name=encodeURIComponent(localStorage.getItem("mbcc_user_name")||"Student"); const ctitle=encodeURIComponent(course.title); window.open(`certificate.html?name=${name}&course=${ctitle}`,'_blank'); } }
    else{ alert(`Score ${score}/${idxs.length}. Try again.`); }
  });
}
function lockBox(level){ return `<div class="card" style="text-align:center"><p>This lesson is available in <strong>${level}</strong>. Enroll to unlock.</p><a class="btn btn-primary" href="#" onclick="alert('Stub checkout — set tier in localStorage'); return false;">Upgrade</a></div>`; }
function quizHtml(courseId,lesson){ const q=lesson.quiz; const idxs=q.questions.map(x=>x.correct); return `<form data-quiz data-course="${courseId}" data-lesson="${lesson.id}" data-pass="${q.pass}" data-indexes='${JSON.stringify(idxs)}'>${q.questions.map((qq,qi)=>`<fieldset style="margin:10px 0"><legend><strong>Q${qi+1}.</strong> ${qq.q}</legend>${qq.a.map((opt,oi)=>`<label><input type="radio" name="q${qi}" value="${oi}"> ${opt}</label>`).join("")}</fieldset>`).join("")}<button class="btn btn-primary" type="submit">Submit Quiz</button></form>`; }

document.addEventListener("DOMContentLoaded", ()=>{
  if(location.pathname.endsWith("courses.html")) renderCatalog();
  if(location.pathname.endsWith("course.html")) renderCourse();
  document.getElementById("loginBtn")?.addEventListener("click",(e)=>{e.preventDefault();signIn();});
});