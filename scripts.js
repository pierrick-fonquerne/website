// Smooth parallax, reveal on scroll, lightweight particles and i18n
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
  // update document title
  if(document.querySelector('title')) document.title = dict.title;
  // update elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(dict[key]) el.textContent = dict[key];
  });
  // placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.getAttribute('data-i18n-placeholder');
    if(dict[key]) el.setAttribute('placeholder', dict[key]);
  });
  // set html lang
  document.documentElement.lang = (lang==='en')? 'en' : 'fr';
}

function setLang(lang){
  localStorage.setItem('site_lang', lang);
  applyTranslations(lang);
  // update active button
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
}

// Main behavior
document.addEventListener('DOMContentLoaded', ()=>{
  // i18n init
  const preferred = localStorage.getItem('site_lang') || (navigator.language && navigator.language.startsWith('en')? 'en' : 'fr');
  setLang(preferred);
  document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click', ()=>setLang(b.dataset.lang)));

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
  let lastScroll = window.scrollY; let ticking=false;
  const parallaxEls = Array.from(document.querySelectorAll('.parallax'));
  function updateParallax(){
    parallaxEls.forEach(el=>{
      const speed = parseFloat(el.dataset.speed) || 0.08;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight/2) * -0.08 * (speed*4);
      el.style.transform = `translateY(${offset}px)`;
    });
    ticking=false;
  }
  window.addEventListener('scroll', ()=>{
    lastScroll = window.scrollY;
    if(!ticking){ticking=true;requestAnimationFrame(updateParallax)}
  }, {passive:true});
  updateParallax();

  // Simple particle system on canvas
  const canvas = document.getElementById('particle-canvas');
  if(canvas){
    const ctx = canvas.getContext('2d');
    let w=canvas.width=window.innerWidth; let h=canvas.height=window.innerHeight;
    const particles=[]; const P_COUNT = Math.round((w*h)/60000*40)+30; // scale count by viewport
    const mouse = {x:-9999,y:-9999};

    function rand(min,max){return Math.random()*(max-min)+min}
    function initParticles(){particles.length=0;for(let i=0;i<P_COUNT;i++){particles.push({x:rand(0,w),y:rand(0,h),vx:rand(-0.2,0.5),vy:rand(-0.2,0.5),r:rand(0.8,2.6),alpha:rand(0.2,0.9)})}}
    initParticles();

    function resize(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;initParticles();}
    window.addEventListener('resize', throttle(resize,200));
    window.addEventListener('mousemove', (e)=>{mouse.x=e.clientX;mouse.y=e.clientY});
    window.addEventListener('mouseleave', ()=>{mouse.x=-9999;mouse.y=-9999});

    function render(){
      ctx.clearRect(0,0,w,h);
      for(let p of particles){
        // interaction
        const dx = p.x - mouse.x; const dy = p.y - mouse.y; const dist = Math.sqrt(dx*dx+dy*dy);
        if(mouse.x>-9998 && dist<120){
          const force = (120-dist)/120*2.4;
          p.vx += (dx/dist||0)*force*0.04;
          p.vy += (dy/dist||0)*force*0.04;
        }
        p.x += p.vx; p.y += p.vy;
        // bounce/wrap
        if(p.x< -10) p.x = w+10; if(p.x> w+10) p.x = -10; if(p.y< -10) p.y = h+10; if(p.y> h+10) p.y = -10;
        // draw
        ctx.beginPath(); ctx.fillStyle = `rgba(11,99,255,${p.alpha})`; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      }
      requestAnimationFrame(render);
    }
    render();
  }

  // Smooth scrolling for anchor clicks
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const hash = a.getAttribute('href');
      if(hash.length>1){
        e.preventDefault();
        const target = document.querySelector(hash);
        if(!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({top,behavior:'smooth'});
      }
    });
  });

});

function throttle(fn, wait){let last=0;return function(...args){const now=Date.now();if(now-last>wait){last=now;fn.apply(this,args);last=now;}}}
