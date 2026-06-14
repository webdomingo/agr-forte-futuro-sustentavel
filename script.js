/* ═══════════════════════════════════════════════════════
   AGRINHO 2026 — script.js 
═══════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────
   1. ACESSIBILIDADE
────────────────────────────────────────────────────── */
const html = document.documentElement;
let fontScale = 1;

// Painel toggle
const a11yToggle = document.getElementById('a11yToggle');
const a11yMenu   = document.getElementById('a11yMenu');
a11yToggle?.addEventListener('click', () => {
  const open = a11yMenu.hidden;
  a11yMenu.hidden = !open;
  a11yToggle.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', e => {
  if (!e.target.closest('.a11y-panel')) {
    a11yMenu.hidden = true;
    a11yToggle?.setAttribute('aria-expanded','false');
  }
});

// Tema claro/escuro
const themeToggle = document.getElementById('themeToggle');
const themeLabel  = document.getElementById('themeLabel');
const themeIcon   = document.getElementById('themeIcon');
const MOON = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>`;
const SUN  = `<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>`;
function applyTheme(t) {
  html.setAttribute('data-theme', t);
  if (t === 'light') {
    if(themeLabel) themeLabel.textContent = 'Modo Escuro';
    if(themeIcon)  themeIcon.innerHTML = MOON;
    themeToggle?.setAttribute('aria-pressed','true');
  } else {
    if(themeLabel) themeLabel.textContent = 'Modo Claro';
    if(themeIcon)  themeIcon.innerHTML = SUN;
    themeToggle?.setAttribute('aria-pressed','false');
  }
  localStorage.setItem('theme', t);
}
themeToggle?.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});
applyTheme(localStorage.getItem('theme') || 'dark');

// Tamanho de fonte
function setFontScale(v) {
  fontScale = Math.min(1.5, Math.max(0.8, v));
  html.style.setProperty('--scale', fontScale);
  const fv = document.getElementById('fontVal');
  if(fv) fv.textContent = Math.round(fontScale*100)+'%';
  localStorage.setItem('fontScale', fontScale);
}
document.getElementById('fontDown')?.addEventListener('click', () => setFontScale(fontScale - 0.1));
document.getElementById('fontUp')  ?.addEventListener('click', () => setFontScale(fontScale + 0.1));
setFontScale(parseFloat(localStorage.getItem('fontScale') || '1'));

// Alto contraste
let hcOn = localStorage.getItem('hc') === '1';
const contrastToggle = document.getElementById('contrastToggle');
function applyHC(v) {
  html.setAttribute('data-hc', String(v));
  contrastToggle?.setAttribute('aria-pressed', String(v));
  localStorage.setItem('hc', v ? '1' : '0');
}
contrastToggle?.addEventListener('click', () => { hcOn = !hcOn; applyHC(hcOn); });
applyHC(hcOn);

// Reduzir animações
let rmOn = localStorage.getItem('rm') === '1';
const motionToggle = document.getElementById('motionToggle');
function applyRM(v) {
  html.setAttribute('data-rm', String(v));
  motionToggle?.setAttribute('aria-pressed', String(v));
  localStorage.setItem('rm', v ? '1' : '0');
}
motionToggle?.addEventListener('click', () => { rmOn = !rmOn; applyRM(rmOn); });
applyRM(rmOn);

/* ──────────────────────────────────────────────────────
   2. CURSOR
────────────────────────────────────────────────────── */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx=0, my=0, rx=0, ry=0;
if (dot && ring && window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx+'px'; dot.style.top = my+'px';
  });
  document.querySelectorAll('a,button,[tabindex="0"],.game-slot,.pr-region,.tech-card,.pratica-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
  (function animRing() { rx += (mx-rx)*.12; ry += (my-ry)*.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(animRing); })();
} else {
  if(dot)  dot.style.display  = 'none';
  if(ring) ring.style.display = 'none';
}

/* ──────────────────────────────────────────────────────
   3. SCROLL PROGRESS + NAV ACTIVE
────────────────────────────────────────────────────── */
const progressBar = document.querySelector('.scroll-progress');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
function onScroll() {
  const st = window.scrollY, dh = document.body.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.width = (dh > 0 ? Math.min(100,(st/dh)*100) : 0)+'%';
  nav?.classList.toggle('scrolled', st > 60);
  let cur = '';
  document.querySelectorAll('section[id],div[id]').forEach(s => { if (st >= s.offsetTop - 220) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+cur));
}
window.addEventListener('scroll', onScroll, { passive:true });

/* ──────────────────────────────────────────────────────
   4. HAMBURGER MOBILE
────────────────────────────────────────────────────── */
const hamburger     = document.getElementById('navHamburger');
const mobileOverlay = document.getElementById('mobileOverlay');
function closeMobile() {
  mobileOverlay?.classList.remove('open');
  mobileOverlay?.setAttribute('aria-hidden','true');
  hamburger?.setAttribute('aria-expanded','false');
}
hamburger?.addEventListener('click', () => {
  const open = !mobileOverlay?.classList.contains('open');
  mobileOverlay?.classList.toggle('open', open);
  mobileOverlay?.setAttribute('aria-hidden', String(!open));
  hamburger.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.mobile-nav-link').forEach(a => a.addEventListener('click', closeMobile));
document.getElementById('mobileClose')?.addEventListener('click', closeMobile);

/* ──────────────────────────────────────────────────────
   5. INTERSECTION OBSERVER — CORRIGIDO
   threshold baixo para pegar elementos grandes,
   e tratamento correto de cycle-visual e tech-cards
────────────────────────────────────────────────────── */
let countersStarted = false;
let paranaStarted   = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');

    if (e.target.classList.contains('counter-card') && !countersStarted) {
      countersStarted = true;
      startCounters();
    }
    if (e.target.classList.contains('parana-destaque') && !paranaStarted) {
      paranaStarted = true;
      startParanaCounter();
    }
    observer.unobserve(e.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

// Registra todos os elementos animáveis
['.counter-card','.terra-quote','.tech-card','.pratica-card',
 '.voz-card','.timeline-item','.voce-cta',
 '.parana-destaque'].forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.style.transitionDelay = (i * 0.07) + 's';
    observer.observe(el);
  });
});

/* ──────────────────────────────────────────────────────
   6. COUNTERS
────────────────────────────────────────────────────── */
function startCounters() {
  document.querySelectorAll('.counter-val').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const dur = 1800, t0 = performance.now();
    function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e).toLocaleString('pt-BR');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

function startParanaCounter() {
  const el = document.querySelector('.parana-num-val');
  if (!el) return;
  const target = 3, dur = 1200, t0 = performance.now();
  function step(now) {
    const p = Math.min((now - t0) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ──────────────────────────────────────────────────────
   7. HERO CANVAS
────────────────────────────────────────────────────── */
(function heroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', () => { resize(); init(); });

  class P {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random()*W; this.y = Math.random()*H;
      this.size = Math.random()*3+0.5;
      this.vx = (Math.random()-.5)*.3; this.vy = (Math.random()-.5)*.15-.08;
      this.life = Math.random(); this.maxLife = .6+Math.random()*.4;
      this.type = Math.random()<.5?'soil':'seed';
      this.rot = Math.random()*Math.PI*2; this.rv = (Math.random()-.5)*.03;
      this.grow = this.type==='seed'?Math.random()*.8:0;
    }
    update() {
      this.x+=this.vx; this.y+=this.vy; this.life+=.003; this.rot+=this.rv;
      if(this.type==='seed') this.grow=Math.min(1,this.grow+.004);
      if(this.life>=this.maxLife||this.y<-20) this.reset();
    }
    draw() {
      const fade=Math.sin((this.life/this.maxLife)*Math.PI);
      ctx.save(); ctx.globalAlpha=fade*.7; ctx.translate(this.x,this.y); ctx.rotate(this.rot);
      if(this.type==='soil'){
        ctx.fillStyle=`hsl(25,60%,${30+this.size*5}%)`;
        ctx.beginPath(); ctx.ellipse(0,0,this.size*1.4,this.size*.9,0,0,Math.PI*2); ctx.fill();
      } else {
        const g=this.grow;
        ctx.fillStyle=`hsla(${88+g*20},${60+g*30}%,${45+g*20}%,1)`;
        ctx.beginPath(); ctx.ellipse(0,0,this.size*(.6+g*.8),this.size*(1+g*1.4),0,0,Math.PI*2); ctx.fill();
        if(g>.4){
          ctx.strokeStyle=`hsla(${100+g*20},70%,55%,${g*.6})`; ctx.lineWidth=.8;
          ctx.beginPath(); ctx.moveTo(0,this.size*-1.5*g);
          ctx.quadraticCurveTo(this.size*.8*g,this.size*-2.5*g,this.size*1.2*g,this.size*-2*g); ctx.stroke();
        }
      }
      ctx.restore();
    }
  }

  function drawLandscape() {
    const g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#071310'); g.addColorStop(.5,'#0d2b0a'); g.addColorStop(1,'#1a3a0f');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    const sx=W*.72, sy=H*.38;
    const sg=ctx.createRadialGradient(sx,sy,0,sx,sy,180);
    sg.addColorStop(0,'rgba(200,232,122,.18)'); sg.addColorStop(.4,'rgba(200,232,122,.06)'); sg.addColorStop(1,'rgba(200,232,122,0)');
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H);
    const sc=ctx.createRadialGradient(sx,sy,0,sx,sy,40);
    sc.addColorStop(0,'rgba(240,220,100,.55)'); sc.addColorStop(1,'rgba(200,232,122,0)');
    ctx.fillStyle=sc; ctx.beginPath(); ctx.arc(sx,sy,40,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#0d2208'; ctx.beginPath(); ctx.moveTo(0,H*.72);
    ctx.quadraticCurveTo(W*.15,H*.52,W*.3,H*.62); ctx.quadraticCurveTo(W*.45,H*.72,W*.55,H*.58);
    ctx.quadraticCurveTo(W*.7,H*.44,W*.85,H*.6); ctx.quadraticCurveTo(W,H*.68,W,H*.72);
    ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();
    ctx.strokeStyle='rgba(200,232,122,.08)'; ctx.lineWidth=1;
    for(let i=0;i<9;i++){ const p=i/8,y1=H*.73+p*(H-H*.73)*.5; ctx.beginPath(); ctx.moveTo(W*.05,y1); ctx.lineTo(W*.95,y1+(H-H*.73)*p*.3); ctx.stroke(); }
    const sl=ctx.createLinearGradient(0,H*.72,0,H);
    sl.addColorStop(0,'#2d1a08'); sl.addColorStop(1,'#1a0d04');
    ctx.fillStyle=sl; ctx.fillRect(0,H*.72,W,H*.28);
    ctx.strokeStyle='rgba(139,69,19,.22)'; ctx.lineWidth=.7;
    for(let r=0;r<12;r++){ const rx=W*(.08+r*.076),ry=H*.75; ctx.beginPath(); ctx.moveTo(rx,ry); ctx.bezierCurveTo(rx+12*Math.sin(r),ry+20,rx-8,ry+35,rx+5*Math.sin(r*2),H*.92); ctx.stroke(); }
  }

  function init() { particles=[]; const n=Math.floor(W*H/5500); for(let i=0;i<n;i++) particles.push(new P()); }
  init();
  function loop() { ctx.clearRect(0,0,W,H); drawLandscape(); particles.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(loop); }
  loop();
})();

/* ──────────────────────────────────────────────────────
   8. PARTICLES CANVAS
────────────────────────────────────────────────────── */
(function particlesCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize(); window.addEventListener('resize', () => { resize(); initPts(); });
  function initPts() {
    pts = [];
    const n = Math.floor(W*H/12000);
    for(let i=0;i<n;i++) pts.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+.5,vx:(Math.random()-.5)*.15,vy:-(Math.random()*.2+.05),life:Math.random(),alpha:Math.random()*.5+.2});
  }
  initPts();
  function loop() {
    ctx.clearRect(0,0,W,H);
    pts.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.life+=.004;
      const fade=Math.sin(p.life*Math.PI);
      ctx.save(); ctx.globalAlpha=p.alpha*fade; ctx.fillStyle='#C8E87A';
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); ctx.restore();
      if(p.y<-10||p.life>1){ p.y=H+10; p.x=Math.random()*W; p.life=0; }
    });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ──────────────────────────────────────────────────────
   9. SOIL CANVAS
────────────────────────────────────────────────────── */
(function soilCanvas() {
  const canvas = document.getElementById('soil-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const dots = Array.from({length:150}, () => ({x:Math.random()*100,y:Math.random()*100,r:Math.random()*2+.5,alpha:Math.random()*.4+.1,color:Math.random()>.5?'#8B4513':'#C8E87A'}));
  function resize() { W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; }
  resize(); window.addEventListener('resize', resize);
  function loop() {
    ctx.clearRect(0,0,W,H);
    const t=Date.now()*.0003;
    dots.forEach(d => { const x=((d.x+t*3)%100)*W/100, y=d.y*H/100; ctx.save(); ctx.globalAlpha=d.alpha; ctx.fillStyle=d.color; ctx.beginPath(); ctx.arc(x,y,d.r,0,Math.PI*2); ctx.fill(); ctx.restore(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ──────────────────────────────────────────────────────
   10. VOCE CANVAS
────────────────────────────────────────────────────── */
(function voceCanvas() {
  const canvas = document.getElementById('voce-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const rings = [];
  function resize() { W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; }
  resize(); window.addEventListener('resize', resize);
  class Ring {
    constructor() { this.reset(); }
    reset() { this.x=W/2+(Math.random()-.5)*W*.6; this.y=H/2+(Math.random()-.5)*H*.5; this.r=10+Math.random()*30; this.maxR=80+Math.random()*180; this.speed=.4+Math.random()*.6; this.alpha=.5; this.color=Math.random()>.4?'#C8E87A':'#8B4513'; }
    update() { this.r+=this.speed; this.alpha=.5*(1-this.r/this.maxR); if(this.r>=this.maxR) this.reset(); }
    draw() { ctx.save(); ctx.globalAlpha=Math.max(0,this.alpha); ctx.strokeStyle=this.color; ctx.lineWidth=1; ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.stroke(); ctx.restore(); }
  }
  for(let i=0;i<12;i++){ const rr=new Ring(); rr.r=Math.random()*rr.maxR; rings.push(rr); }
  function loop() { ctx.clearRect(0,0,W,H); rings.forEach(r=>{r.update();r.draw();}); requestAnimationFrame(loop); }
  loop();
})();

/* ──────────────────────────────────────────────────────
   11. TECH CARDS — TILT 3D
   Aplicado apenas quando o card já está visível (.visible),
   evitando conflito com a animação de reveal (translateY).
────────────────────────────────────────────────────── */
document.querySelectorAll('.tech-card[data-tilt]').forEach(card => {
  // Aguarda o card estar visível antes de ativar o tilt
  let tiltActive = false;
  const activateTilt = () => { tiltActive = true; };

  // Observa quando o card se torna visível
  new MutationObserver((mutations) => {
    mutations.forEach(m => {
      if (m.target.classList.contains('visible')) activateTilt();
    });
  }).observe(card, { attributes: true, attributeFilter: ['class'] });

  card.addEventListener('mousemove', e => {
    if (!tiltActive) return;
    const r  = card.getBoundingClientRect();
    const cx = r.width  / 2;
    const cy = r.height / 2;
    const dx = (e.clientX - r.left - cx) / cx;   // -1 a +1
    const dy = (e.clientY - r.top  - cy) / cy;   // -1 a +1
    const rotX = -dy * 7;   // inclinação vertical
    const rotY =  dx * 7;   // inclinação horizontal
    card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px) scale(1.01)`;
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
  });

  card.addEventListener('mouseleave', () => {
    if (!tiltActive) return;
    // Volta suavemente para o estado normal
    card.style.transition = 'transform .4s var(--ease), border-color .3s, box-shadow .3s';
    card.style.transform  = '';
    setTimeout(() => { card.style.transition = ''; }, 400);
  });

  card.addEventListener('mouseenter', () => {
    if (!tiltActive) return;
    // Desativa a transition durante o tilt para resposta imediata
    card.style.transition = 'border-color .3s, box-shadow .3s, opacity .4s';
  });
});

/* ──────────────────────────────────────────────────────
   12. MAPA INTERATIVO — CORRIGIDO
   - tooltip posicionado relativo ao container via pageX/Y
   - clique mostra painel lateral
   - hover highlight via CSS (.active)
────────────────────────────────────────────────────── */
(function mapaInterativo() {
  const regions    = document.querySelectorAll('.pr-region');
  const tooltip    = document.getElementById('mapaTooltip');
  const tName      = document.getElementById('tooltipName');
  const tHigh      = document.getElementById('tooltipHighlight');
  const tProd      = document.getElementById('tooltipProd');
  const tArea      = document.getElementById('tooltipArea');
  const iName      = document.getElementById('infoName');
  const iHigh      = document.getElementById('infoHighlight');
  const iProd      = document.getElementById('infoProd');
  const iArea      = document.getElementById('infoArea');
  const infoDetail = document.getElementById('mapaInfoDetail');
  const infoEmpty  = document.getElementById('mapaInfoEmpty');
  const container  = document.querySelector('.mapa-svg-container');

  if (!regions.length || !container) return;

  function fillInfo(el) {
    if(iName)  iName.textContent  = el.dataset.name;
    if(iHigh)  iHigh.textContent  = el.dataset.highlight;
    if(iProd)  iProd.textContent  = el.dataset.prod;
    if(iArea)  iArea.textContent  = el.dataset.area;
    if(infoDetail) infoDetail.hidden = false;
    if(infoEmpty)  infoEmpty.style.display = 'none';
  }

  function showTooltip(el, e) {
    if (!tooltip || window.innerWidth < 769) return;
    if(tName) tName.textContent = el.dataset.name;
    if(tHigh) tHigh.textContent = el.dataset.highlight;
    if(tProd) tProd.textContent = el.dataset.prod;
    if(tArea) tArea.textContent = el.dataset.area;
    tooltip.hidden = false;
    posTooltip(e);
  }

  function posTooltip(e) {
    if (!tooltip || window.innerWidth < 769) return;
    const cr = container.getBoundingClientRect();
    // posição relativa ao container
    let tx = e.clientX - cr.left + 16;
    let ty = e.clientY - cr.top  - 8;
    // evita sair pela direita
    if (tx + 280 > cr.width)  tx = e.clientX - cr.left - 290;
    // evita sair por baixo
    if (ty + 220 > cr.height) ty = e.clientY - cr.top  - 230;
    if (ty < 0) ty = 4;
    tooltip.style.left = tx + 'px';
    tooltip.style.top  = ty + 'px';
  }

  regions.forEach(r => {
    // hover: mostra tooltip
    r.addEventListener('mouseenter', e => { showTooltip(r, e); });
    r.addEventListener('mousemove',  e => { posTooltip(e); });
    r.addEventListener('mouseleave', () => { if(tooltip) tooltip.hidden = true; });
    // clique: destaca região + mostra painel lateral
    r.addEventListener('click', () => {
      regions.forEach(x => x.classList.remove('active'));
      r.classList.add('active');
      fillInfo(r);
    });
    // teclado
    r.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        regions.forEach(x => x.classList.remove('active'));
        r.classList.add('active');
        fillInfo(r);
      }
    });
  });
})();

/* ──────────────────────────────────────────────────────
   13. JOGO — CORRIGIDO
   - init correto: slots populados ANTES de render()
   - sem bug na primeira jogada
   - cesta visual, placar, reiniciar, conquistas
────────────────────────────────────────────────────── */
(function gameSetup() {
  const SVG = {
    empty:  `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="22" r="8" fill="#5C2E00" opacity="0.18"/><line x1="16" y1="10" x2="16" y2="22" stroke="#8B4513" stroke-width="1.5" opacity="0.18" stroke-linecap="round"/></svg>`,
    seed:   `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="21" rx="7" ry="5" fill="#8B4513" opacity="0.4"/><ellipse cx="16" cy="17" rx="5" ry="6" fill="#8B4513"/><ellipse cx="16" cy="14" rx="3.5" ry="4.5" fill="#C17F3A" opacity="0.8"/></svg>`,
    sprout: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="14" y="20" width="4" height="8" fill="#5C2E00" rx="1"/><ellipse cx="16" cy="19" rx="7" ry="8" fill="#2D5A1B"/><ellipse cx="16" cy="13" rx="5" ry="5.5" fill="#3D7A20"/><ellipse cx="16" cy="9" rx="3" ry="3.5" fill="#C8E87A" opacity="0.8"/></svg>`,
    plant:  `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="14" y="22" width="4" height="7" fill="#5C2E00" rx="1"/><path d="M16 22 L16 10" stroke="#8BC34A" stroke-width="2" stroke-linecap="round"/><ellipse cx="10" cy="14" rx="5" ry="3" fill="#C8E87A" opacity="0.7" transform="rotate(-25,10,14)"/><ellipse cx="22" cy="16" rx="5" ry="3" fill="#C8E87A" opacity="0.7" transform="rotate(25,22,16)"/><ellipse cx="16" cy="10" rx="4" ry="5" fill="#C8E87A" opacity="0.9"/></svg>`,
    ready:  `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="14" y="24" width="4" height="5" fill="#5C2E00" rx="1"/><path d="M16 24 L16 10" stroke="#8BC34A" stroke-width="2" stroke-linecap="round"/><ellipse cx="10" cy="15" rx="5.5" ry="3" fill="#F0C040" opacity="0.8" transform="rotate(-20,10,15)"/><ellipse cx="22" cy="17" rx="5.5" ry="3" fill="#F0C040" opacity="0.8" transform="rotate(20,22,17)"/><circle cx="16" cy="9" r="5" fill="#F0C040" opacity="0.9"/><circle cx="16" cy="9" r="2.5" fill="#C17F3A"/></svg>`,
    basketItem: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="4" fill="#F0C040" opacity="0.9"/><rect x="8" y="11" width="2" height="5" fill="#5C2E00" rx="1"/></svg>`
  };

  const COLS=6, ROWS=3, TOTAL=COLS*ROWS, WATER_MAX=100;

  function freshState() {
    return {
      slots: Array.from({length:TOTAL}, () => ({stage:0, watered:0})),
      water: WATER_MAX, score:0, day:1, basket:0,
      action:'seed', achievements:new Set()
    };
  }

  let state = freshState();

  const field      = document.getElementById('gameField');
  const msgEl      = document.getElementById('gameMessage');
  const scoreEl    = document.getElementById('gameScore');
  const dayEl      = document.getElementById('gameDay');
  const waterBar   = document.getElementById('waterBar');
  const waterLbl   = document.getElementById('waterLabel');
  const basketCnt  = document.getElementById('basketCount');
  const basketItems= document.getElementById('basketItems');
  const achsEl     = document.getElementById('gameAchievements');
  const btnSeed    = document.getElementById('btnSeed');
  const btnWater   = document.getElementById('btnWater');
  const btnHarvest = document.getElementById('btnHarvest');
  const btnNext    = document.getElementById('btnNextDay');
  const btnRestart = document.getElementById('btnRestart');

  if (!field) return;

  // labels de stage
  const STAGE_LABELS = ['Parcela vazia','Semente plantada','Semente regada','Broto crescendo','Planta jovem','Pronto para colher'];
  const STAGE_SVG    = ['empty','seed','seed','sprout','plant','ready'];

  function slotHTML(s) {
    const svgKey = STAGE_SVG[s.stage] || 'empty';
    const prog = s.stage>0 ? (s.stage/5)*100 : 0;
    return `${SVG[svgKey]}<div class="slot-progress"><div class="slot-progress-fill" style="width:${prog}%"></div></div>`;
  }

  // Cria os elementos do campo UMA VEZ
  function buildField() {
    field.innerHTML = '';
    for (let i=0; i<TOTAL; i++) {
      const el = document.createElement('div');
      el.className = 'game-slot';
      el.setAttribute('role','gridcell');
      el.setAttribute('tabindex','0');
      el.dataset.i = i;
      el.addEventListener('click', () => handleSlot(i));
      el.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();handleSlot(i);} });
      field.appendChild(el);
    }
  }

  // Atualiza apenas a aparência (sem recriar os elementos)
  function render() {
    const slotEls = field.querySelectorAll('.game-slot');
    slotEls.forEach((el, i) => {
      const s = state.slots[i];
      el.innerHTML = slotHTML(s);
      el.className = 'game-slot';
      if (s.stage === 5) el.classList.add('ready');
      if (s.watered > 0 && s.stage > 0 && s.stage < 5) el.classList.add('watered');
      el.setAttribute('aria-label', STAGE_LABELS[s.stage] || 'Parcela');
    });
    // HUD
    const wp = (state.water / WATER_MAX) * 100;
    if (waterBar) waterBar.style.width = wp + '%';
    if (waterLbl) waterLbl.textContent = 'Água: ' + state.water;
    if (scoreEl)  scoreEl.textContent  = state.score + ' pts';
    if (dayEl)    dayEl.textContent    = 'Dia ' + state.day;
    if (basketCnt) basketCnt.textContent = state.basket + (state.basket === 1 ? ' item' : ' itens');
    if (basketItems) {
      basketItems.innerHTML = '';
      const max = Math.min(state.basket, 8);
      for (let i=0; i<max; i++) basketItems.innerHTML += SVG.basketItem;
      if (state.basket > 8) basketItems.innerHTML += `<span style="font-size:.7rem;color:var(--ambar)">+${state.basket-8}</span>`;
    }
  }

  function setMsg(text, type='') {
    if (!msgEl) return;
    msgEl.textContent = text;
    msgEl.className = 'game-message' + (type ? ' '+type : '');
  }

  function handleSlot(i) {
    const s = state.slots[i];
    if (state.action === 'seed') {
      if (s.stage !== 0) { setMsg('Esta parcela já tem algo plantado. Escolha outra!', 'error'); return; }
      s.stage = 1; s.watered = 0;
      state.score += 10;
      setMsg('Semente plantada! Agora regue para ela crescer.', 'success');
      unlock('primeira_semente', 'Primeira Semente Plantada!');
    }
    else if (state.action === 'water') {
      if (s.stage === 0) { setMsg('Plante uma semente primeiro!', 'error'); return; }
      if (s.stage === 5) { setMsg('Esta planta está pronta — use a ação Colher!', 'error'); return; }
      if (state.water < 5) { setMsg('Água insuficiente! Avance para o próximo dia.', 'error'); return; }
      state.water = Math.max(0, state.water - 5);
      s.watered++;
      state.score += 5;
      // progressão de estágio
      if (s.stage === 1 && s.watered >= 1) s.stage = 2;
      if (s.stage === 2 && s.watered >= 2) s.stage = 3;
      if (s.stage === 3 && s.watered >= 4) s.stage = 4;
      if (s.stage === 4 && s.watered >= 6) s.stage = 5;
      setMsg('Regado com cuidado! A planta está crescendo.', 'success');
      unlock('primeiro_regaramento', 'Primeiro Regaramento!');
    }
    else if (state.action === 'harvest') {
      if (s.stage !== 5) { setMsg('Ainda não está maduro. Continue regando!', 'error'); return; }
      s.stage = 0; s.watered = 0;
      state.basket++;
      state.score += 50;
      setMsg('Colhido! +50 pontos adicionados à sua cesta.', 'success');
      unlock('primeira_colheita', 'Primeira Colheita!');
      if (state.basket >= 5)  unlock('cesta5',  '5 itens na cesta!');
      if (state.basket >= 10) unlock('cesta10', '10 colheitas! Fazendeiro experiente!');
      if (state.score >= 300) unlock('pts300',  '300 pontos! Campo muito produtivo!');
    }
    render();
  }

  function setAction(a) {
    state.action = a;
    [btnSeed, btnWater, btnHarvest].forEach(b => {
      if (!b) return;
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    const map = { seed:btnSeed, water:btnWater, harvest:btnHarvest };
    if (map[a]) { map[a].classList.add('active'); map[a].setAttribute('aria-pressed','true'); }
  }

  function unlock(id, label) {
    if (state.achievements.has(id) || !achsEl) return;
    state.achievements.add(id);
    const div = document.createElement('div');
    div.className = 'achievement';
    div.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><polygon points="8,1 9.6,5.5 14,5.5 10.6,8.2 11.8,13 8,10.3 4.2,13 5.4,8.2 2,5.5 6.4,5.5" fill="#F0C040"/></svg>${label}`;
    achsEl.appendChild(div);
  }

  function restartGame() {
    const prevAchs = new Set(state.achievements);
    state = freshState();
    state.achievements = prevAchs;
    setAction('seed');
    if (achsEl) achsEl.innerHTML = '';
    setMsg('Jogo reiniciado! Plante novas sementes.');
    render();
  }

  btnSeed   ?.addEventListener('click', () => setAction('seed'));
  btnWater  ?.addEventListener('click', () => setAction('water'));
  btnHarvest?.addEventListener('click', () => setAction('harvest'));

  btnNext?.addEventListener('click', () => {
    state.day++;
    state.water = Math.min(WATER_MAX, state.water + 30);
    // crescimento automático leve para slots regados
    state.slots.forEach(s => {
      if (s.stage > 0 && s.stage < 5 && s.watered > 0) {
        s.watered++;
        if (s.stage === 1 && s.watered >= 1) s.stage = 2;
        if (s.stage === 2 && s.watered >= 2) s.stage = 3;
        if (s.stage === 3 && s.watered >= 4) s.stage = 4;
        if (s.stage === 4 && s.watered >= 6) s.stage = 5;
      }
    });
    state.score += 5;
    if (state.day >= 10) unlock('dia10', '10 dias de cultivo sustentável!');
    setMsg(`Dia ${state.day} começou! +30 de água recuperada.`, 'success');
    render();
  });

  btnRestart?.addEventListener('click', restartGame);

  // Init: cria campo, depois renderiza (ordem correta)
  buildField();
  render();
})();

/* ──────────────────────────────────────────────────────
   14. SMOOTH SCROLL
────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  });
});

/* ──────────────────────────────────────────────────────
   15. BALANCE — TECLADO
────────────────────────────────────────────────────── */
['balanceLeft','balanceRight'].forEach(id => {
  document.getElementById(id)?.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click();
  });
});