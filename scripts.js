// Smooth parallax, reveal on scroll and i18n (particles removed for a cleaner professional look)
const TRANSLATIONS = {
  fr: {
    title: "Pierrick Fonquerne — Développeur .NET full‑stack",
    "nav.home": "Accueil",
    "nav.experience": "Expérience",
    "nav.projects": "Projets",
    "nav.contact": "Contact",
    "hero.name": "Pierrick Fonquerne",
    "hero.role": "Développeur .NET full‑stack — depuis juillet 2012 • France",
    "hero.bio": "Développeur passionné par les architectures robustes et les interfaces fluides. J'aime relier le backend .NET avec des frontends modernes pour créer des expériences performantes et maintenables.",
    "cta.github": "GitHub",
    "cta.linkedin": "LinkedIn",
    "cta.cv": "Télécharger CV",
    "section.experience": "Expérience",
    "job1.title": "Lead Developer — Acme Corp",
    "job1.years": "2018 — Présent",
    "job1.desc": "Conception d'API REST performantes en ASP.NET Core, migration vers Azure, mise en place de CI/CD et amélioration de la couverture de tests.",
    "job2.title": "Senior .NET Engineer — Beta Solutions",
    "job2.years": "2014 — 2018",
    "job2.desc": "Refonte d'une application monolithique vers une architecture modulaire, optimisation des requêtes SQL et coaching des équipes juniors.",
    "job3.title": "Développeur .NET — Freelancer",
    "job3.years": "2012 — 2014",
    "job3.desc": "Projets variés: solutions web, intégrations tierces et développements sur mesure pour PME.",
    "section.skills": "Compétences",
    "section.contact": "Contact",
    "location": "Localisation: Lyon, France",
    "section.projects": "Projets",
    "proj1.title": "Collaborateur.Pro (SaaS)",
    "proj1.desc": "Plateforme de gestion d'équipes — ASP.NET Core, React, Azure. Intégration SSO et reporting temps réel.",
    "proj2.title": "Facturo (ERP léger)",
    "proj2.desc": "Solution de facturation et gestion commerciale — C#, EF Core, SQL Server.",
    "proj3.title": "Portfolio animé",
    "proj3.desc": "Site portfolio personnel avec animations CSS et optimisations de performance.",
    "proj4.title": "API Payments",
    "proj4.desc": "API sécurisée pour paiements et gestion d'abonnements — intégration Stripe, tests E2E.",
    "proj.view": "Voir le repo",
    "contact.name": "Votre nom",
    "contact.email": "Votre email",
    "contact.message": "Message...",
    "contact.send": "Envoyer",
    "footer": "© 2025 Pierrick Fonquerne — Généré automatiquement (fake content). Modifie-moi pour mettre tes vraies infos."
  },
  en: {
    title: "Pierrick Fonquerne — .NET Full‑stack Developer",
    "nav.home": "Home",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.name": "Pierrick Fonquerne",
    "hero.role": ".NET Full‑stack Developer — since July 2012 • France",
    "hero.bio": "Developer focused on robust architectures and fluid interfaces. I connect .NET backends with modern frontends to build performant, maintainable experiences.",
    "cta.github": "GitHub",
    "cta.linkedin": "LinkedIn",
    "cta.cv": "Download CV",
    "section.experience": "Experience",
    "job1.title": "Lead Developer — Acme Corp",
    "job1.years": "2018 — Present",
    "job1.desc": "Designed high‑performance REST APIs with ASP.NET Core, migrated to Azure, implemented CI/CD and improved test coverage.",
    "job2.title": "Senior .NET Engineer — Beta Solutions",
    "job2.years": "2014 — 2018",
    "job2.desc": "Refactored a monolithic app into a modular architecture, optimized SQL queries and mentored junior engineers.",
    "job3.title": ".NET Developer — Freelancer",
    "job3.years": "2012 — 2014",
    "job3.desc": "Various projects: web solutions, third‑party integrations and custom development for SMBs.",
    "section.skills": "Skills",
    "section.contact": "Contact",
    "location": "Location: Lyon, France",
    "section.projects": "Projects",
    "proj1.title": "Collaborateur.Pro (SaaS)",
    "proj1.desc": "Team management platform — ASP.NET Core, React, Azure. SSO and real‑time reporting.",
    "proj2.title": "Facturo (Light ERP)",
    "proj2.desc": "Billing and business management solution — C#, EF Core, SQL Server.",
    "proj3.title": "Animated Portfolio",
    "proj3.desc": "Personal portfolio site with CSS animations and performance optimizations.",
    "proj4.title": "Payments API",
    "proj4.desc": "Secure payments and subscription API — Stripe integration, E2E tests.",
    "proj.view": "View repo",
    "contact.name": "Your name",
    "contact.email": "Your email",
    "contact.message": "Message...",
    "contact.send": "Send",
    "footer": "© 2025 Pierrick Fonquerne — Generated automatically (fake content). Edit me to add your real info."
  }
};

function applyTranslations(lang){
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  if(document.querySelector('title')) document.title = dict.title;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.getAttribute('data-i18n-placeholder');
    if(dict[key]) el.setAttribute('placeholder', dict[key]);
  });
  document.documentElement.lang = (lang==='en')? 'en' : 'fr';
}

function setLang(lang){
  localStorage.setItem('site_lang', lang);
  applyTranslations(lang);
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
}

function setTheme(theme){
  if(theme==='dark') document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');
  localStorage.setItem('site_theme', theme);
}

// PDF generation using html2canvas + jsPDF
async function generatePDF(){
  const { jsPDF } = window.jspdf;
  const resumeEl = document.createElement('div');
  // build a minimal resume snapshot from DOM
  resumeEl.style.padding = '20px';
  resumeEl.style.maxWidth = '780px';
  resumeEl.style.background = '#fff';
  resumeEl.innerHTML = document.querySelector('header')? document.querySelector('header').outerHTML : '<h1>'+document.querySelector('[data-i18n="hero.name"]').textContent+'</h1>';
  // append key sections
  ['experience','projects','contact'].forEach(id=>{
    const sec = document.getElementById(id);
    if(sec){
      const copy = sec.cloneNode(true);
      copy.style.marginTop='12px';
      // remove interactive elements
      copy.querySelectorAll('a,button,input,textarea').forEach(n=>n.removeAttribute('href'));
      resumeEl.appendChild(copy);
    }
  });
  document.body.appendChild(resumeEl);
  const canvas = await html2canvas(resumeEl, {scale:1.6, useCORS:true, backgroundColor:'#ffffff'});
  const imgData = canvas.toDataURL('image/jpeg',0.95);
  const pdf = new jsPDF({unit:'px',format:'a4'});
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, 'JPEG', 20, 20, pdfWidth-40, pdfHeight);
  pdf.save('Pierrick_Fonquerne_CV.pdf');
  document.body.removeChild(resumeEl);
}

// Main behavior
document.addEventListener('DOMContentLoaded', ()=>{
  // i18n init
  const preferred = localStorage.getItem('site_lang') || (navigator.language && navigator.language.startsWith('en')? 'en' : 'fr');
  setLang(preferred);
  document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click', ()=>setLang(b.dataset.lang)));

  // theme init
  const savedTheme = localStorage.getItem('site_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches? 'dark' : 'light');
  setTheme(savedTheme);
  const themeBtn = document.querySelector('.theme-btn');
  if(themeBtn) themeBtn.addEventListener('click', ()=>{ const now = document.documentElement.classList.contains('dark')? 'light' : 'dark'; setTheme(now); });

  // Reveal observer
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('in-view');
    });
  },{threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Side nav active state
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.sidenav-link');
  const obsNav = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href')===('#'+e.target.id)));
      }
    });
  },{threshold:0.6});
  sections.forEach(s=>obsNav.observe(s));

  // Parallax smoothing: lerp between positions
  let ticking=false;
  const parallaxEls = Array.from(document.querySelectorAll('.parallax'));
  function updateParallax(){
    parallaxEls.forEach(el=>{
      const speed = parseFloat(el.dataset.speed) || 0.08;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight/2) * -0.06 * (speed*3);
      el.style.transform = `translateY(${offset}px) translateZ(0)`;
    });
    ticking=false;
  }
  window.addEventListener('scroll', ()=>{ if(!ticking){ticking=true;requestAnimationFrame(updateParallax)} }, {passive:true});
  updateParallax();

  // Advanced lazy-loading for images (art-direction)
  const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
  const imgObserver = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const img = entry.target;
        // if data-srcset present, assign
        const srcset = img.getAttribute('data-srcset');
        if(srcset) img.setAttribute('srcset', srcset);
        const src = img.getAttribute('data-src');
        if(src) img.setAttribute('src', src);
        obs.unobserve(img);
      }
    });
  },{rootMargin:'200px 0px 200px 0px',threshold:0.01});
  lazyImgs.forEach(i=>imgObserver.observe(i));

  // Smooth scrolling for anchor clicks
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const hash = a.getAttribute('href');
      if(hash.length>1){
        e.preventDefault();
        const target = document.querySelector(hash);
        if(!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({top,behavior:'smooth'});
      }
    });
  });

  // Download CV button
  const dl = document.getElementById('download-cv');
  if(dl) dl.addEventListener('click', (e)=>{e.preventDefault(); generatePDF();});

  // keyboard accessibility for lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn=>btn.addEventListener('keydown', (e)=>{if(e.key==='Enter' || e.key===' ') {e.preventDefault(); btn.click();}}));
  // ensure sidenav links are focusable and activate on Enter
  document.querySelectorAll('.sidenav-link').forEach(a=>{
    a.setAttribute('tabindex','0');
    a.addEventListener('keydown', (e)=>{ if(e.key==='Enter') { e.preventDefault(); a.click(); }});
  });
  // make skip link visible on focus
  const skip = document.querySelector('.skip-link');
  if(skip){ skip.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); document.querySelector('#hero').focus(); }}); }

});

function throttle(fn, wait){let last=0;return function(...args){const now=Date.now();if(now-last>wait){last=now;fn.apply(this,args);last=now;}}}
