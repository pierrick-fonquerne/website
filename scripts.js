// Intersection reveal and simple parallax for hero avatar
document.addEventListener('DOMContentLoaded', ()=>{
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  },{threshold:0.15});

  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Parallax on avatar
  const avatarWrap = document.querySelector('.avatar-wrap');
  const avatar = document.querySelector('.avatar');
  if(avatarWrap && avatar){
    const onScroll = ()=>{
      const rect = avatarWrap.getBoundingClientRect();
      const offset = Math.max(-60, Math.min(60, (window.innerHeight/2 - rect.top - rect.height/2) * 0.08));
      avatar.style.transform = `translateY(${offset}px)`;
    };
    onScroll();
    window.addEventListener('scroll', throttle(onScroll, 16));
  }

  // Update active nav link
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.topnav a');
  const obsNav = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href')===('#'+e.target.id)));
      }
    });
  },{threshold:0.6});
  sections.forEach(s=>obsNav.observe(s));
});

function throttle(fn, wait){let last=0;return function(...args){const now=Date.now();if(now-last>wait){last=now;fn.apply(this,args);}}}
