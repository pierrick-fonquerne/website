// Smooth parallax, reveal on scroll and lightweight particles
document.addEventListener('DOMContentLoaded', ()=>{
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

  // Smooth scrolling for anchor clicks (ensures offset for sidenav on small screens)
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
