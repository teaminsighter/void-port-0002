/* ——————————————————————————————————
   REGISTER GSAP PLUGINS
—————————————————————————————————— */
gsap.registerPlugin(ScrollTrigger);

/* ——————————————————————————————————
   INITIAL STATES — Prevent FOUC
—————————————————————————————————— */
gsap.set('.hero__line, .hero__description, .hero__ctas, .hero__scroll', { opacity: 0 });
gsap.set('.hero__eyebrow-line', { scaleX: 0 });
gsap.set('.hero__eyebrow-text', { opacity: 0 });

/* ——————————————————————————————————
   PRELOADER
—————————————————————————————————— */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const textContainer = document.getElementById('preloaderText');
  const name = 'IMRAN HOSSAIN';

  // Build individual letter spans
  name.split('').forEach(char => {
    if (char === ' ') {
      const space = document.createElement('span');
      space.classList.add('preloader__space');
      textContainer.appendChild(space);
    } else {
      const span = document.createElement('span');
      span.classList.add('preloader__letter');
      span.textContent = char;
      textContainer.appendChild(span);
    }
  });

  const letters = textContainer.querySelectorAll('.preloader__letter');
  const top = preloader.querySelector('.preloader__top');
  const bottom = preloader.querySelector('.preloader__bottom');
  const tl = gsap.timeline();

  // 1. Letters fade in + slide up
  tl.fromTo(letters,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' }
  );

  // 2. Hold
  tl.to({}, { duration: 0.5 });

  // 3. Letters animate out
  tl.to(letters, {
    y: -40,
    opacity: 0,
    duration: 0.5,
    stagger: 0.03,
    ease: 'power3.in',
  });

  // 4. Split overlay — top up, bottom down
  tl.to(top, {
    yPercent: -100,
    duration: 0.8,
    ease: 'power4.inOut',
  }, '-=0.1');

  tl.to(bottom, {
    yPercent: 100,
    duration: 0.8,
    ease: 'power4.inOut',
  }, '<');

  // 5. Cleanup + kick off hero
  tl.call(() => {
    document.body.classList.add('loaded');
    preloader.remove();
    // Init systems that depend on scroll
    initLenis();
    initNavScroll();
    // Play hero entrance after preloader
    initHero();
  });
})();

/* ——————————————————————————————————
   CUSTOM CURSOR
—————————————————————————————————— */
(function initCursor() {
  // Bail on touch devices
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return;

  const outer = document.getElementById('cursorOuter');
  const inner = document.getElementById('cursorInner');
  let mouseX = -100;
  let mouseY = -100;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Inner dot follows precisely
    gsap.to(inner, {
      x: mouseX,
      y: mouseY,
      duration: 0.1,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // Outer circle follows with lag
    gsap.to(outer, {
      x: mouseX,
      y: mouseY,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });

  // Hover effects — use event delegation to cover dynamically created elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, .hoverable');
    if (target) {
      outer.classList.add('hovering');
      gsap.to(outer, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
      gsap.to(inner, { scale: 0.5, duration: 0.3, ease: 'power2.out' });
    }
  });
  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, .hoverable');
    if (target && !target.contains(e.relatedTarget)) {
      outer.classList.remove('hovering');
      gsap.to(outer, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(inner, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  });

  // Hide cursor when it leaves the window
  document.addEventListener('mouseleave', () => {
    gsap.to([outer, inner], { opacity: 0, duration: 0.2 });
  });
  document.addEventListener('mouseenter', () => {
    gsap.to([outer, inner], { opacity: 1, duration: 0.2 });
  });
})();

/* ——————————————————————————————————
   LENIS SMOOTH SCROLL
—————————————————————————————————— */
let lenis;

function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  // Connect Lenis to ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // GSAP ticker drives Lenis
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

/* ——————————————————————————————————
   NAVIGATION — SCROLL BEHAVIOR
—————————————————————————————————— */
function initNavScroll() {
  const nav = document.getElementById('nav');
  let lastScrollY = 0;
  let ticking = false;

  function onScroll() {
    const currentY = window.scrollY || document.documentElement.scrollTop;

    // Toggle scrolled class for backdrop blur
    if (currentY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Hide on scroll down, show on scroll up (50px threshold to prevent flicker)
    if (currentY > lastScrollY + 50 && currentY > 200) {
      nav.classList.add('hidden');
    } else if (currentY < lastScrollY - 20) {
      nav.classList.remove('hidden');
    }

    lastScrollY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
}

/* ——————————————————————————————————
   MOBILE MENU
—————————————————————————————————— */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const links = mobileMenu.querySelectorAll('.mobile-menu__link');
  let isOpen = false;

  hamburger.addEventListener('click', () => {
    isOpen = !isOpen;
    hamburger.classList.toggle('active', isOpen);
    mobileMenu.classList.toggle('open', isOpen);

    if (isOpen) {
      // Prevent scroll when menu open
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';

      // Stagger links in
      gsap.fromTo(links,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    } else {
      // Re-enable scroll
      if (lenis) lenis.start();
      document.body.style.overflow = '';

      gsap.to(links, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.04,
        ease: 'power2.in',
      });
    }
  });

  // Close menu when link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (!isOpen) return;
      isOpen = false;
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      if (lenis) lenis.start();
      document.body.style.overflow = '';

      gsap.to(links, { opacity: 0, duration: 0.2 });
    });
  });
})();

/* ——————————————————————————————————
   HERO SECTION
—————————————————————————————————— */
function initHero() {
  // ---- Split heading lines into individual characters ----
  const lines = document.querySelectorAll('.hero__line');
  lines.forEach(line => {
    const text = line.getAttribute('data-text');
    if (!text) return;
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.classList.add('hero__char');
      span.textContent = char === ' ' ? '\u00A0' : char;
      line.appendChild(span);
    });
  });

  // ---- Split description into word spans ----
  const desc = document.querySelector('.hero__description');
  const descText = desc.getAttribute('data-text');
  if (descText) {
    descText.split(' ').forEach(word => {
      const span = document.createElement('span');
      span.classList.add('hero__desc-word');
      span.textContent = word;
      desc.appendChild(span);
    });
  }

  // ---- Collect elements ----
  const eyebrowLine = document.querySelector('.hero__eyebrow-line');
  const eyebrowText = document.querySelector('.hero__eyebrow-text');
  const allLines = document.querySelectorAll('.hero__line');
  const descWords = document.querySelectorAll('.hero__desc-word');
  const btns = document.querySelectorAll('.hero__btn');
  const scrollIndicator = document.getElementById('heroScroll');
  const scrollDot = document.getElementById('scrollDot');

  // ---- Master entrance timeline ----
  // Restore container visibility (hidden by FOUC prevention gsap.set above)
  gsap.set([allLines, desc, document.querySelector('.hero__ctas'), scrollIndicator], { opacity: 1 });

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // 1. Eyebrow: line draws in, then text fades up
  tl.fromTo(eyebrowLine,
    { scaleX: 0 },
    { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }
  );
  tl.fromTo(eyebrowText,
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    '-=0.3'
  );

  // 2. Heading letters per line, overlapping start
  allLines.forEach((line, i) => {
    const chars = line.querySelectorAll('.hero__char');
    tl.fromTo(chars,
      { y: '120%', opacity: 0, rotateX: 90 },
      {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power4.out',
      },
      i === 0 ? '-=0.2' : `-=${0.8 - 0.15}` // each line starts 0.15s after previous begins
    );
  });

  // 3. Description words — starts slightly before heading finishes
  tl.fromTo(descWords,
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power3.out',
    },
    '-=0.5'
  );

  // 4. CTA Buttons
  tl.fromTo(btns,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    },
    '-=0.3'
  );

  // 5. Scroll indicator fade in
  tl.fromTo(scrollIndicator,
    { opacity: 0 },
    { opacity: 1, duration: 0.5 },
    '-=0.2'
  );

  // ---- Scroll dot looping animation ----
  tl.call(() => {
    gsap.to(scrollDot, {
      y: 60,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.in',
      repeat: -1,
      repeatDelay: 0.4,
    });
  });

  // ---- Wire CTA buttons for Lenis smooth scroll ----
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target && lenis) {
          lenis.scrollTo(target, { offset: -80, duration: 1.5 });
        } else if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ---- Cleanup will-change after entrance ----
  tl.call(() => {
    document.querySelectorAll('.hero__char, .hero__eyebrow-line, .hero__eyebrow-text, .hero__btn, .hero__desc-word').forEach(el => {
      el.style.willChange = 'auto';
    });
  });

  // ---- Parallax + fade on scroll (ScrollTrigger) ----
  const heading = document.querySelector('.hero__heading');
  const heroContent = document.querySelector('.hero__content');

  gsap.to(heading, {
    y: -100,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to([desc, document.querySelector('.hero__ctas')], {
    y: -60,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: '20% top',
      end: '60% top',
      scrub: true,
    },
  });

  // Fade out scroll indicator when user starts scrolling
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: '15% top',
    scrub: true,
    onUpdate: (self) => {
      gsap.set(scrollIndicator, { opacity: 1 - self.progress * 3 });
    },
  });
}

/* ——————————————————————————————————
   ABOUT SECTION
—————————————————————————————————— */
(function initAbout() {
  // ---- Split statement into word-reveal spans ----
  const statement = document.querySelector('[data-about-statement]');
  const rawText = statement.textContent.trim();
  statement.textContent = '';

  // Accent words
  const accentWords = ['intelligent', 'AI'];

  rawText.split(/\s+/).forEach((word, i, arr) => {
    const wrap = document.createElement('span');
    wrap.classList.add('about__word-wrap');

    const inner = document.createElement('span');
    inner.classList.add('about__word');
    if (accentWords.includes(word)) inner.classList.add('about__word--accent');
    inner.textContent = word;

    wrap.appendChild(inner);
    statement.appendChild(wrap);

    // Add space between words (not after last)
    if (i < arr.length - 1) {
      statement.appendChild(document.createTextNode(' '));
    }
  });

  // ---- Collect elements ----
  const labelLine = document.querySelector('.about__label-line');
  const labelText = document.querySelector('.about__label-text');
  const words = statement.querySelectorAll('.about__word');
  const descPs = document.querySelectorAll('.about__desc-p');
  const stats = document.querySelectorAll('.about__stat');
  const countEls = document.querySelectorAll('[data-count]');
  const card = document.getElementById('aboutCard');
  const codeLines = document.querySelectorAll('.about__code-line');
  const badges = document.querySelectorAll('.about__badge');
  const rightCol = document.getElementById('aboutRight');

  // ---- Master ScrollTrigger timeline ----
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#about',
      start: 'top 75%',
      end: 'top 20%',
      toggleActions: 'play none none none',
    },
  });

  // 1. Section label — line draws in, text fades
  tl.fromTo(labelLine,
    { scaleX: 0 },
    { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }
  );
  tl.fromTo(labelText,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
    '-=0.3'
  );

  // 2. Statement words — overflow-hidden reveal (y: 100% → 0)
  tl.fromTo(words,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power4.out',
    },
    '-=0.2'
  );

  // 3. Description paragraphs
  tl.fromTo(descPs,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    },
    '-=0.4'
  );

  // 4. Stats — border line draw + counter
  tl.fromTo(stats,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
    },
    '-=0.4'
  );

  // Counter animation
  tl.call(() => {
    countEls.forEach((el, i) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      gsap.to(el, {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        delay: i * 0.2,
        snap: { textContent: 1 },
      });
    });
  }, null, '-=0.3');

  // 5. Code card — slides in with slight 3D rotation
  tl.fromTo(card,
    { y: 60, opacity: 0, rotateY: 5 },
    {
      y: 0,
      opacity: 1,
      rotateY: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '-=1.5'
  );

  // Code lines type in
  tl.to(codeLines, {
    opacity: 1,
    duration: 0.15,
    stagger: 0.1,
    ease: 'none',
  }, '-=0.4');

  // 6. Floating badges stagger in
  tl.to(badges, {
    opacity: 1,
    duration: 0.5,
    stagger: 0.15,
    ease: 'power3.out',
  }, '-=0.3');

  // ---- Parallax on the right column card ----
  gsap.to(rightCol, {
    y: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: '#about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  // ---- Cleanup will-change after animation ----
  tl.call(() => {
    words.forEach(w => w.style.willChange = 'auto');
  });
})();

/* ——————————————————————————————————
   SERVICES SECTION
—————————————————————————————————— */
(function initServices() {
  // ---- Split heading into char-reveal spans ----
  const heading = document.querySelector('[data-services-heading]');
  const headingText = heading.textContent.trim();
  heading.textContent = '';

  headingText.split('').forEach(char => {
    const wrap = document.createElement('span');
    wrap.classList.add('services__heading-wrap');

    const inner = document.createElement('span');
    inner.classList.add('services__heading-char');
    inner.textContent = char === ' ' ? '\u00A0' : char;

    wrap.appendChild(inner);
    heading.appendChild(wrap);
  });

  // ---- Collect elements ----
  const labelText = document.querySelector('.services__label-text');
  const labelLine = document.querySelector('.services__label-line');
  const headingChars = heading.querySelectorAll('.services__heading-char');
  const subtext = document.querySelector('.services__subtext');
  const items = document.querySelectorAll('[data-service]');
  const borders = document.querySelectorAll('.services__item-border');
  const marquee = document.getElementById('servicesMarquee');

  // ---- ScrollTrigger entrance timeline ----
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#services',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // 1. Label
  tl.fromTo(labelText,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
  );
  tl.fromTo(labelLine,
    { scaleX: 0 },
    { scaleX: 1, duration: 0.6, ease: 'power3.inOut' },
    '-=0.3'
  );

  // 2. Heading characters
  tl.fromTo(headingChars,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration: 0.7,
      stagger: 0.03,
      ease: 'power4.out',
    },
    '-=0.3'
  );

  // 3. Subtext
  tl.fromTo(subtext,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
    '-=0.4'
  );

  // 4. Service rows stagger in
  items.forEach((item, i) => {
    const border = item.querySelector('.services__item-border');
    tl.fromTo(border,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: 'power3.inOut' },
      i === 0 ? '-=0.2' : '-=0.3'
    );
    tl.fromTo(item,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.35'
    );
  });

  // Open first item after entrance
  tl.call(() => {
    openService(items[0]);
  });

  // 5. Marquee fades in
  tl.fromTo(marquee,
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: 'power3.out' },
    '-=0.3'
  );

  // ---- Cleanup will-change after entrance ----
  tl.call(() => {
    headingChars.forEach(el => el.style.willChange = 'auto');
  });

  // ---- Accordion logic ----
  function openService(item) {
    const content = item.querySelector('.services__content');
    const inner = item.querySelector('.services__content-inner');

    item.classList.add('active');

    gsap.set(content, { height: 'auto' });
    const h = content.offsetHeight;
    gsap.fromTo(content,
      { height: 0 },
      { height: h, duration: 0.5, ease: 'power3.inOut' }
    );
    gsap.to(inner, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 0.15,
      ease: 'power3.out',
    });
  }

  function closeService(item, quick) {
    const content = item.querySelector('.services__content');
    const inner = item.querySelector('.services__content-inner');
    const dur = quick ? 0 : 0.4;

    item.classList.remove('active');

    gsap.to(inner, {
      opacity: 0,
      y: 10,
      duration: dur * 0.6,
      ease: 'power3.in',
    });
    gsap.to(content, {
      height: 0,
      duration: dur,
      ease: 'power3.inOut',
      delay: quick ? 0 : 0.05,
    });
  }

  items.forEach(item => {
    const row = item.querySelector('.services__row');
    const title = item.querySelector('.services__title');

    // Click to toggle
    row.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      items.forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          closeService(other, false);
        }
      });

      // Toggle current
      if (!isActive) {
        openService(item);
      } else {
        closeService(item, false);
      }
    });

    // Hover: shift title right
    row.addEventListener('mouseenter', () => {
      gsap.to(title, { x: 10, duration: 0.3, ease: 'power2.out' });
    });
    row.addEventListener('mouseleave', () => {
      gsap.to(title, { x: 0, duration: 0.3, ease: 'power2.out' });
    });
  });
})();

/* ——————————————————————————————————
   PROJECTS SECTION
—————————————————————————————————— */
(function initProjects() {
  // ---- Split section heading into chars ----
  const heading = document.querySelector('[data-projects-heading]');
  const headingText = heading.textContent.trim();
  heading.textContent = '';

  headingText.split('').forEach(char => {
    const wrap = document.createElement('span');
    wrap.classList.add('projects__heading-wrap');
    const inner = document.createElement('span');
    inner.classList.add('projects__heading-char');
    inner.textContent = char === ' ' ? '\u00A0' : char;
    wrap.appendChild(inner);
    heading.appendChild(wrap);
  });

  // ---- Section entrance ----
  const sLabelText = document.querySelector('.projects__label-text');
  const sLabelLine = document.querySelector('.projects__label-line');
  const sChars = heading.querySelectorAll('.projects__heading-char');
  const sSubtext = document.querySelector('.projects__subtext');

  const sectionTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  sectionTl.fromTo(sLabelText,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
  );
  sectionTl.fromTo(sLabelLine,
    { scaleX: 0 },
    { scaleX: 1, duration: 0.6, ease: 'power3.inOut' },
    '-=0.3'
  );
  sectionTl.fromTo(sChars,
    { yPercent: 110 },
    { yPercent: 0, duration: 0.7, stagger: 0.03, ease: 'power4.out' },
    '-=0.3'
  );
  sectionTl.fromTo(sSubtext,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
    '-=0.4'
  );

  // ---- Generate waveform bars for mockup 2 ----
  const waveContainer = document.getElementById('mockupWave');
  if (waveContainer) {
    for (let i = 0; i < 40; i++) {
      const bar = document.createElement('div');
      bar.classList.add('mockup-wave__bar');
      bar.style.animationDelay = `${(i * 0.07)}s`;
      bar.style.height = `${20 + Math.random() * 60}%`;
      waveContainer.appendChild(bar);
    }
  }

  // ---- Per-card scroll animations ----
  const cards = document.querySelectorAll('[data-project]');

  cards.forEach(card => {
    const color = card.getAttribute('data-color');
    const titleEl = card.querySelector('[data-project-title]');
    const titleText = titleEl.textContent.trim();
    titleEl.textContent = '';

    // Split title into chars
    titleText.split('').forEach(char => {
      const wrap = document.createElement('span');
      wrap.classList.add('project-card__title-wrap');
      const inner = document.createElement('span');
      inner.classList.add('project-card__title-char');
      inner.textContent = char === ' ' ? '\u00A0' : char;
      wrap.appendChild(inner);
      titleEl.appendChild(wrap);
    });

    const top = card.querySelector('.project-card__top');
    const chars = card.querySelectorAll('.project-card__title-char');
    const desc = card.querySelector('.project-card__desc');
    const tags = card.querySelectorAll('.project-card__tag');
    const visual = card.querySelector('.project-card__visual');
    const visualInner = card.querySelector('.project-card__visual-inner');
    const link = card.querySelector('.project-card__link');

    // Card timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // 1. Category + Status
    tl.fromTo(top,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );

    // 2. Title chars
    tl.fromTo(chars,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.6, stagger: 0.02, ease: 'power4.out' },
      '-=0.2'
    );

    // 3. Description
    tl.fromTo(desc,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );

    // 4. Tags
    tl.fromTo(tags,
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' },
      '-=0.3'
    );

    // 5. Visual area — scale reveal
    tl.fromTo(visual,
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.2'
    );

    // 6. Link
    tl.fromTo(link,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' },
      '-=0.5'
    );

    // 7. Parallax on mockup inner
    gsap.to(visualInner, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: visual,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // ---- Title hover glow ----
    titleEl.addEventListener('mouseenter', () => {
      gsap.to(titleEl, {
        x: 8,
        textShadow: `0 0 40px ${color}40`,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    titleEl.addEventListener('mouseleave', () => {
      gsap.to(titleEl, {
        x: 0,
        textShadow: '0 0 0px transparent',
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    // ---- Tag hover color ----
    tags.forEach(tag => {
      const hoverColor = tag.getAttribute('data-hover-color');
      tag.addEventListener('mouseenter', () => {
        tag.style.borderColor = hoverColor;
        tag.style.color = hoverColor;
      });
      tag.addEventListener('mouseleave', () => {
        tag.style.borderColor = '';
        tag.style.color = '';
      });
    });
  });

  // ---- Will-change cleanup for section heading ----
  sectionTl.call(() => {
    sChars.forEach(el => el.style.willChange = 'auto');
  });

  // ---- Divider animations ----
  document.querySelectorAll('[data-divider]').forEach(div => {
    const line = div.querySelector('.project-divider__line');
    const num = div.querySelector('.project-divider__num');

    gsap.timeline({
      scrollTrigger: {
        trigger: div,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
    .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' })
    .fromTo(num, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2');
  });
})();

/* ——————————————————————————————————
   TECH STACK SECTION
—————————————————————————————————— */
(function initTechStack() {
  // ---- Split heading lines into chars ----
  const headingLines = document.querySelectorAll('[data-ts-line]');
  headingLines.forEach(line => {
    const raw = line.textContent.trim();
    const accentWord = line.getAttribute('data-accent-word');
    line.textContent = '';

    raw.split('').forEach(char => {
      const wrap = document.createElement('span');
      wrap.classList.add('techstack__heading-wrap');
      const inner = document.createElement('span');
      inner.classList.add('techstack__heading-char');
      inner.textContent = char === ' ' ? '\u00A0' : char;
      wrap.appendChild(inner);
      line.appendChild(wrap);
    });

    // Apply accent to matching word chars
    if (accentWord) {
      const idx = raw.indexOf(accentWord);
      if (idx > -1) {
        const chars = line.querySelectorAll('.techstack__heading-char');
        for (let i = idx; i < idx + accentWord.length; i++) {
          if (chars[i]) chars[i].classList.add('techstack__heading-char--accent');
        }
      }
    }
  });

  // ---- Generate proficiency dots for every item ----
  document.querySelectorAll('[data-ts-item]').forEach(item => {
    const level = parseInt(item.getAttribute('data-level'), 10);
    const dotsContainer = item.querySelector('.techstack__dots');
    for (let i = 0; i < 5; i++) {
      const dot = document.createElement('span');
      dot.classList.add('techstack__dot');
      if (i < level) dot.classList.add('techstack__dot--filled');
      dotsContainer.appendChild(dot);
    }
  });

  // ---- Collect elements ----
  const labelText = document.querySelector('.techstack__label-text');
  const labelLine = document.querySelector('.techstack__label-line');
  const allChars = document.querySelectorAll('.techstack__heading-char');
  const subtext = document.querySelector('.techstack__subtext');
  const categories = document.querySelectorAll('[data-ts-cat]');
  const exploreLine = document.getElementById('tsExploreLine');
  const exploreTitle = document.getElementById('tsExploreTitle');
  const exploreItems = document.querySelectorAll('.techstack__exploring-item, .techstack__exploring-dot');

  // ---- Section entrance timeline ----
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#tech-stack',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // 1. Label
  tl.fromTo(labelText,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
  );
  tl.fromTo(labelLine,
    { scaleX: 0 },
    { scaleX: 1, duration: 0.6, ease: 'power3.inOut' },
    '-=0.3'
  );

  // 2. Heading chars
  tl.fromTo(allChars,
    { yPercent: 110 },
    { yPercent: 0, duration: 0.7, stagger: 0.03, ease: 'power4.out' },
    '-=0.3'
  );

  // 3. Subtext
  tl.fromTo(subtext,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
    '-=0.4'
  );

  // 4. Category columns stagger in
  tl.to(categories, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
  }, '-=0.2');

  // Set initial state (fromTo would conflict with per-item triggers)
  gsap.set(categories, { y: 50, opacity: 0 });

  // 5. Per-category: items + dots stagger (each category has its own trigger)
  categories.forEach(cat => {
    const items = cat.querySelectorAll('[data-ts-item]');
    const allDots = cat.querySelectorAll('.techstack__dot');

    const catTl = gsap.timeline({
      scrollTrigger: {
        trigger: cat,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Items slide in
    catTl.fromTo(items,
      { x: -15, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' },
      0.3 // small delay to let column appear first
    );

    // Dots pop in after items start
    catTl.fromTo(allDots,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, stagger: 0.04, ease: 'back.out(2)' },
      0.5
    );
  });

  // 6. Currently Exploring
  const exploreTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.techstack__exploring',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });

  exploreTl.fromTo(exploreLine,
    { scaleX: 0 },
    { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }
  );
  exploreTl.fromTo(exploreTitle,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
    '-=0.3'
  );
  exploreTl.fromTo(exploreItems,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
    '-=0.2'
  );

  // ---- Cleanup will-change after entrance ----
  tl.call(() => {
    allChars.forEach(el => el.style.willChange = 'auto');
  });
})();

/* =============================================
   TIMELINE SECTION
============================================= */
(function initTimeline() {
  // ---- Split heading lines into chars ----
  document.querySelectorAll('[data-tl-line]').forEach(line => {
    const raw = line.textContent.trim();
    const accentWord = line.getAttribute('data-accent-word');
    line.textContent = '';

    raw.split('').forEach(char => {
      const wrap = document.createElement('span');
      wrap.classList.add('timeline__heading-wrap');
      const inner = document.createElement('span');
      inner.classList.add('timeline__heading-char');
      inner.textContent = char === ' ' ? '\u00A0' : char;
      wrap.appendChild(inner);
      line.appendChild(wrap);
    });

    if (accentWord) {
      const idx = raw.indexOf(accentWord);
      if (idx > -1) {
        const chars = line.querySelectorAll('.timeline__heading-char');
        for (let i = idx; i < idx + accentWord.length; i++) {
          if (chars[i]) chars[i].classList.add('timeline__heading-char--accent');
        }
      }
    }
  });

  // ---- Collect header elements ----
  const labelText = document.querySelector('.timeline__label-text');
  const labelLine = document.querySelector('.timeline__label-line');
  const allChars = document.querySelectorAll('.timeline__heading-char');
  const subtext = document.querySelector('.timeline__subtext');

  // ---- Header entrance ----
  const headerTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#timeline',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  headerTl.fromTo(labelText,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
  );
  headerTl.fromTo(labelLine,
    { scaleX: 0 },
    { scaleX: 1, duration: 0.6, ease: 'power3.inOut' },
    '-=0.3'
  );
  headerTl.fromTo(allChars,
    { yPercent: 110 },
    { yPercent: 0, duration: 0.7, stagger: 0.03, ease: 'power4.out' },
    '-=0.3'
  );
  headerTl.fromTo(subtext,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
    '-=0.4'
  );

  // ---- Cleanup will-change ----
  headerTl.call(() => {
    allChars.forEach(el => el.style.willChange = 'auto');
  });

  // ---- Center line scroll-draw ----
  const progress = document.getElementById('timelineProgress');
  gsap.fromTo(progress,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#timelineTrack',
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1,
      },
    }
  );

  // ---- Dot activation ----
  document.querySelectorAll('[data-tl-dot]').forEach(dot => {
    const pulseEl = dot.querySelector('.timeline__dot-pulse');

    ScrollTrigger.create({
      trigger: dot,
      start: 'top 65%',
      onEnter: () => {
        dot.classList.add('active');
        // Pulse ring animation
        gsap.fromTo(pulseEl,
          { scale: 1, opacity: 0.8 },
          { scale: 3.5, opacity: 0, duration: 0.7, ease: 'power2.out' }
        );
      },
    });
  });

  // ---- Card entry animations ----
  document.querySelectorAll('[data-tl-entry]').forEach(entry => {
    const side = entry.getAttribute('data-tl-entry');
    const card = entry.querySelector('.timeline__card');
    const year = entry.querySelector('.timeline__year');
    const tag = entry.querySelector('.timeline__tag');
    const connector = entry.querySelector('.timeline__connector');
    const xFrom = side === 'left' ? -60 : 60;
    const isPresent = entry.classList.contains('timeline__entry--present');

    const cardTl = gsap.timeline({
      scrollTrigger: {
        trigger: entry,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Year watermark fades in first
    cardTl.fromTo(year,
      { opacity: 0 },
      { opacity: 0.06, duration: 0.6, ease: 'power2.out' }
    );

    // Connector draws
    if (connector) {
      cardTl.fromTo(connector,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, ease: 'power3.out' },
        '-=0.3'
      );
    }

    // Card slides in
    cardTl.fromTo(card,
      { x: xFrom, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.3'
    );

    // Tag fades in
    cardTl.fromTo(tag,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
      '-=0.4'
    );

    // Present entry special: pulse the green border
    if (isPresent) {
      cardTl.call(() => {
        gsap.fromTo(card,
          { boxShadow: '0 0 0px rgba(74, 222, 128, 0)' },
          {
            boxShadow: '0 0 25px rgba(74, 222, 128, 0.15)',
            duration: 0.8,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
          }
        );
      });
    }
  });

  // ---- Handle mobile: duplicate card content for right side on left entries ----
  // On mobile, CSS hides entry-left and shows entry-right.
  // For left entries, the card is in entry-left. We need to also put it in entry-right.
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.timeline__entry--left').forEach(entry => {
      const leftCard = entry.querySelector('.timeline__entry-left .timeline__card');
      const rightSlot = entry.querySelector('.timeline__entry-right');
      if (leftCard && rightSlot && !rightSlot.querySelector('.timeline__card')) {
        rightSlot.appendChild(leftCard.cloneNode(true));
      }
    });
  }
})();

/* =============================================
   CONTACT SECTION
============================================= */
(function initContact() {
  // ---- Split heading lines into chars ----
  document.querySelectorAll('[data-ct-line]').forEach(line => {
    const shimmer = line.querySelector('.contact__shimmer');
    const raw = line.textContent.trim();
    line.textContent = '';

    raw.split('').forEach(char => {
      const span = document.createElement('span');
      span.classList.add('contact__heading-char');
      span.textContent = char === ' ' ? '\u00A0' : char;
      line.appendChild(span);
    });

    // Re-append shimmer if it existed
    if (shimmer) line.appendChild(shimmer);
  });

  // ---- Collect elements ----
  const dividerLine = document.querySelector('.contact-divider__line');
  const dividerText = document.querySelector('.contact-divider__text');
  const labelLineL = document.querySelector('.contact__label-line--l');
  const labelLineR = document.querySelector('.contact__label-line--r');
  const labelText = document.querySelector('.contact__label-text');
  const headingLines = document.querySelectorAll('.contact__heading-line');
  const desc = document.querySelector('.contact__desc');
  const email = document.getElementById('ctEmail');
  const socials = document.querySelectorAll('.contact__social, .contact__social-dot');
  const avail = document.getElementById('ctAvail');
  const footer = document.getElementById('footer');
  const strokeLine = document.getElementById('ctStrokeLine');
  const shimmer = document.getElementById('ctShimmer');

  // ---- Top divider ----
  const divTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#contactDivider',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
  divTl.fromTo(dividerLine, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' });
  divTl.fromTo(dividerText, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3');

  // ---- Main contact timeline ----
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 70%',
      toggleActions: 'play none none none',
    },
  });

  // 1. Label lines + text
  tl.fromTo(labelLineL, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power3.inOut' });
  tl.fromTo(labelLineR, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power3.inOut' }, '<');
  tl.fromTo(labelText, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power3.out' }, '-=0.3');

  // 2. Heading chars per line with overlap
  headingLines.forEach((line, i) => {
    const chars = line.querySelectorAll('.contact__heading-char');
    tl.fromTo(chars,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power4.out',
      },
      i === 0 ? '-=0.1' : `-=${0.8 - 0.15}`
    );
  });

  // Shimmer effect on INTELLIGENT after reveal
  tl.call(() => {
    gsap.to(shimmer, {
      x: '200%',
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 0.2,
    });
  });

  // 3. Description
  tl.fromTo(desc,
    { y: 25, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
    '-=0.3'
  );

  // 4. Email + hint underline
  tl.fromTo(email,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
    '-=0.3'
  );

  // 5. Socials
  tl.fromTo(socials,
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out' },
    '-=0.2'
  );

  // 6. Availability badge
  tl.fromTo(avail,
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
    '-=0.1'
  );

  // 7. Footer
  gsap.fromTo(footer,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.5,
      scrollTrigger: {
        trigger: footer,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    }
  );

  // ---- Cleanup will-change after entrance ----
  tl.call(() => {
    document.querySelectorAll('.contact__heading-char').forEach(el => {
      el.style.willChange = 'auto';
    });
  });

  // ---- Stroke text hover fill ----
  strokeLine.addEventListener('mouseenter', () => {
    strokeLine.classList.add('filled');
  });
  strokeLine.addEventListener('mouseleave', () => {
    strokeLine.classList.remove('filled');
  });

  // ---- Back to top ----
  document.getElementById('backToTop').addEventListener('click', (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, { duration: 2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
})();

/* =============================================
   NAVIGATION — SMOOTH SCROLL & ACTIVE STATE
============================================= */
(function initNavLinks() {
  const sections = ['hero', 'about', 'projects', 'tech-stack', 'contact'];
  const navMap = {
    'hero': null,
    'about': 'About',
    'projects': 'Work',
    'tech-stack': 'Skills',
    'contact': 'Contact',
  };

  // Build a map of link text → element
  const navLinks = {};
  document.querySelectorAll('.nav__link').forEach(link => {
    navLinks[link.textContent.trim()] = link;
  });

  // Smooth scroll for nav links (desktop)
  document.querySelectorAll('.nav__link, .mobile-menu__link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target && lenis) {
          lenis.scrollTo(target, { offset: -80, duration: 1.5 });
        } else if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Active state detection via ScrollTrigger
  sections.forEach(id => {
    const linkName = navMap[id];
    if (!linkName) return;
    const el = document.getElementById(id);
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 40%',
      end: 'bottom 40%',
      onEnter: () => setActive(linkName),
      onEnterBack: () => setActive(linkName),
    });
  });

  function setActive(name) {
    Object.values(navLinks).forEach(l => l.classList.remove('active'));
    if (navLinks[name]) navLinks[name].classList.add('active');
  }
})();
