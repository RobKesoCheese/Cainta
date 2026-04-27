"use strict";

gsap.registerPlugin(ScrollTrigger);

// --- 1. LENIS SMOOTH SCROLL ENGINE ---
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// --- 2. THEATRICAL CURTAIN & HERO REVEAL ---
window.addEventListener("load", () => {
  const tl = gsap.timeline();
  tl.to("#loadingCurtain", { yPercent: -100, duration: 1.5, ease: "power4.inOut", delay: 0.3 });

  if (document.querySelector(".title-text")) {
    tl.to(".title-text", { y: "0%", duration: 1.2, stagger: 0.2, ease: "power3.out" }, "-=0.5");
  }

  if (document.querySelector(".hero-btn")) {
    tl.to(".hero-btn", { y: "0%", opacity: 1, duration: 1, ease: "power3.out" }, "-=0.8");
  }
});

// --- 3. HERO PARALLAX & DIMMING ---
if (document.querySelector('.hero-content')) {
  gsap.to('.hero-content', {
    y: "-30vh", opacity: 0, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  gsap.to('.hero-overlay', {
    backgroundColor: "rgba(0, 0, 0, 0.85)", ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
}

// --- 4. HEADER & MENU LOGIC ---
const menuToggle = document.getElementById('menuToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const header = document.getElementById('header');

if (menuToggle && dropdownMenu && header) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menuToggle.classList.toggle('active');
    dropdownMenu.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!dropdownMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      dropdownMenu.classList.remove('active');
    }
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
}

// --- 5. STICKY BACKGROUND SCALES (INDEX.HTML ONLY) ---
const scaleSections = gsap.utils.toArray('.scale-intro-section');
if (scaleSections.length > 0) {
  scaleSections.forEach(section => {
    const container = section.querySelector('.scale-intro-container');
    const img = section.querySelector('.scale-intro-img');
    const introTl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top bottom", end: "top top", scrub: 1 } });

    introTl.fromTo(container, { scale: 0.85, borderRadius: "40px" }, { scale: 1, borderRadius: "0px", ease: "none" })
      .fromTo(img, { scale: 1.2 }, { scale: 1, ease: "none" }, "<");
  });

  if (document.getElementById('hotlines-intro') && document.getElementById('services-intro')) {
    gsap.to('#hotlines-intro .section-dimmer', { opacity: 0.8, ease: "none", scrollTrigger: { trigger: '#services-intro', start: "top bottom", end: "top top", scrub: true } });
    gsap.to('#hotlines-intro .hotlines-section', { y: "-20vh", ease: "none", scrollTrigger: { trigger: '#services-intro', start: "top bottom", end: "top top", scrub: true } });
  }

  if (document.getElementById('services-intro') && document.getElementById('history')) {
    gsap.to('#services-intro .section-dimmer', { opacity: 0.8, ease: "none", scrollTrigger: { trigger: '#services-intro', start: "top bottom", end: "top top", scrub: true } });
    gsap.to('#services-intro .services-section', { y: "-20vh", ease: "none", scrollTrigger: { trigger: '#history', start: "top bottom", end: "top top", scrub: true } });
  }
}

// --- 6. CENTERED HOTLINES REVEAL ---
const hotlinesSection = document.querySelector('.hotlines-section');
if (hotlinesSection) {
  const hotlineTl = gsap.timeline({
    scrollTrigger: { trigger: hotlinesSection, start: "top 75%", toggleActions: "play none none reverse" }
  });
  gsap.set('.hotlines-grid', { perspective: 1500 });
  hotlineTl.fromTo('.hotlines-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
    .fromTo('.hotline-card', { y: 100, opacity: 0, rotationX: -25, scale: 0.9 }, { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)" }, "-=0.7");
}

// --- 7. SERVICES GRID REVEAL ---
const servicesSection = document.querySelector('.services-section');
if (servicesSection) {
  const servicesTl = gsap.timeline({ scrollTrigger: { trigger: servicesSection, start: "top 80%", toggleActions: "play none none reverse" } });
  servicesTl.fromTo('.services-main-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
    .fromTo('.sc-wrapper', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6");
}

// --- 8. MAGAZINE CONTENT REVEALS ---
const revealWrappers = gsap.utils.toArray('.reveal-wrapper');
if (revealWrappers.length > 0) {
  revealWrappers.forEach(wrapper => {
    gsap.fromTo(wrapper,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: wrapper, start: "top 80%", toggleActions: "play none none reverse" } }
    );
  });
}

const textSections = gsap.utils.toArray('.section-text');
if (textSections.length > 0) {
  textSections.forEach(section => {
    const textElements = section.querySelectorAll('.slide-text');
    if (textElements.length > 0) {
      gsap.fromTo(textElements,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" } }
      );
    }
  });
}

const parallaxImages = gsap.utils.toArray('.content-section .reveal-img');
if (parallaxImages.length > 0) {
  parallaxImages.forEach(img => {
    gsap.fromTo(img,
      { y: "-15%" },
      { y: "15%", ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } }
    );
  });
}

// --- 9. 3D CURVED CAROUSEL WITH SPLIT-MODAL ---
(function () {
  const cards = Array.from(document.querySelectorAll('.carousel-card'));
  if (cards.length === 0) return;

  const dots = Array.from(document.querySelectorAll('.dot'));

  const modal = document.getElementById('touristModal');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalMap = document.getElementById('modalMap');

  const touristData = [
    { title: "Museo de Cainta", img: "url('pics/tourist_spots/museocainta.avif')", desc: "Discover the rich historical tapestry of Cainta.", embed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18..." width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` },
    { title: "One Cainta Arena", img: "url('pics/tourist_spots/onearena.jpg')", desc: "A premier multipurpose venue hosting major sports events.", embed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18..." width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` },
    { title: "Oval Park", img: "url('pics/tourist_spots/ovalpark.webp')", desc: "The green heart of the municipality.", embed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18..." width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` },
    { title: "ROTC Grounds", img: "url('pics/tourist_spots/rotc.jpg')", desc: "A historic open space originally dedicated to military training.", embed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18..." width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` },
    { title: "Sta. Lucia Mall", img: "url('pics/tourist_spots/stalucia.jpg')", desc: "One of the pioneering and most iconic shopping destinations in Rizal.", embed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18..." width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` }
  ];

  let current = 2;

  function updateCarousel(newIndex, animate = true) {
    if (newIndex < 0) newIndex = cards.length - 1;
    if (newIndex >= cards.length) newIndex = 0;
    current = newIndex;

    dots.forEach((d, i) => d.classList.toggle('active', i === current));

    const isMobile = window.innerWidth <= 768;
    const xSpread = isMobile ? 180 : 300;
    const scaleDrop = isMobile ? 0.2 : 0.15;
    const zDrop = isMobile ? 80 : 130;

    cards.forEach((card, i) => {
      let offset = i - current;

      if (offset < -2) offset += 5;
      if (offset > 2) offset -= 5;

      const distance = Math.abs(offset);
      const scale = distance === 0 ? 1.05 : 1 - (scaleDrop * distance);
      const z = distance === 0 ? 50 : -distance * zDrop;
      const x = offset * xSpread;
      const rotateY = -offset * 18;

      card.classList.toggle('active', distance === 0);
      card.style.zIndex = 10 - distance;

      if (animate) {
        gsap.to(card, { x, z, rotateY, scale, duration: 0.65, ease: "power3.out" });
      } else {
        gsap.set(card, { x, z, rotateY, scale });
      }
    });
  }

  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      if (card.classList.contains('active')) {
        const data = touristData[i];
        if (modalImage) modalImage.style.backgroundImage = data.img;
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalDesc) modalDesc.textContent = data.desc;
        if (modalMap) modalMap.innerHTML = data.embed;
        if (modal) modal.classList.add('active');
        lenis.stop();
      } else {
        updateCarousel(i);
      }
    });
  });

  const closeModal = () => {
    if (modal) modal.classList.remove('active');
    if (modalMap) modalMap.innerHTML = '';
    lenis.start();
  };
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.getElementById('carouselPrev')?.addEventListener('click', () => updateCarousel(current - 1));
  document.getElementById('carouselNext')?.addEventListener('click', () => updateCarousel(current + 1));
  dots.forEach(d => d.addEventListener('click', () => updateCarousel(+d.dataset.dot)));

  updateCarousel(2, false);
  window.addEventListener('resize', () => updateCarousel(current, false));

  gsap.fromTo('.tourist-header .slide-text', { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.tourist-section', start: 'top 80%', toggleActions: 'play none none reverse' } });
  gsap.fromTo('.carousel-card', { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.carousel-viewport', start: 'top 85%', toggleActions: 'play none none reverse' } });
})();

// --- 10. NEWS REVEALS ---
if (document.querySelector('.news-section')) {
  gsap.fromTo('.news-main-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.news-section', start: 'top 80%', toggleActions: 'play none none reverse' } });
  gsap.fromTo('.news-img-cell, .news-text-cell', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.news-grid', start: 'top 85%', toggleActions: 'play none none reverse' } });
  gsap.fromTo('.video-thumb', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.videos-row', start: 'top 95%', toggleActions: 'play none none reverse' } });
}

// --- 11. VIDEO FULLSCREEN MODAL LOGIC ---
(function () {
  const videoThumbs = document.querySelectorAll('.video-thumb');
  if (videoThumbs.length === 0) return;

  const videoModal = document.getElementById('videoModal');
  const vmPlayer = document.getElementById('vmPlayer');
  const vmTitle = document.getElementById('vmTitle');
  const vmLink = document.getElementById('vmLink');
  const vmClose = document.getElementById('vmClose');
  const vmExpand = document.getElementById('vmExpand');

  videoThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.getAttribute('data-video');
      const title = thumb.getAttribute('data-title');
      const linkText = thumb.getAttribute('data-link');

      if (vmPlayer) vmPlayer.src = src;
      if (vmTitle) vmTitle.textContent = title;
      if (vmLink) vmLink.textContent = linkText;

      if (videoModal) videoModal.classList.add('active');
      lenis.stop();
      if (vmPlayer) vmPlayer.play();
    });
  });

  if (vmClose) {
    vmClose.addEventListener('click', () => {
      videoModal.classList.remove('active');
      vmPlayer.pause();
      vmPlayer.currentTime = 0;
      lenis.start();
    });
  }

  if (vmExpand) {
    vmExpand.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        videoModal.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    });
  }
})();

// --- 12. HERO LOCATION MAP MODAL ---
(function () {
  const locModal = document.getElementById('locationModal');
  const btnOpenLoc = document.getElementById('openLocationModal');
  const btnCloseLoc = document.getElementById('locModalClose');
  const overlayLoc = document.getElementById('locModalOverlay');

  if (locModal && btnOpenLoc) {
    function openLocModal() {
      locModal.classList.add('active');
      lenis.stop();
    }

    function closeLocModal() {
      locModal.classList.remove('active');
      lenis.start();
    }

    btnOpenLoc.addEventListener('click', openLocModal);
    btnCloseLoc.addEventListener('click', closeLocModal);
    overlayLoc.addEventListener('click', closeLocModal);
  }
})();

// --- 13. ABOUT PAGE: SLIDE-UP ANIMATIONS ---
const slideUpElements = gsap.utils.toArray('.slide-up');
if (slideUpElements.length > 0) {
  slideUpElements.forEach(el => {
    gsap.fromTo(el,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } }
    );
  });
}

// --- 14. ABOUT PAGE: MUNICIPALITY HORIZONTAL SLIDER ---
(function () {
  const wrappers = document.querySelectorAll('.about-slider-wrapper');
  if (wrappers.length === 0) return;

  wrappers.forEach(wrapper => {
    const track = wrapper.querySelector('.about-slider-track');
    const slider = wrapper.querySelector('.about-slider');
    const originalSlides = slider ? Array.from(slider.querySelectorAll('.about-slide')) : [];
    const prevBtn = wrapper.querySelector('.slider-btn.prev');
    const nextBtn = wrapper.querySelector('.slider-btn.next');
    const dotsContainer = wrapper.querySelector('.slider-dots');

    if (!slider || originalSlides.length === 0) return;

    let visibleCount = 1;
    let currentIndex = 0;
    let clonesPrepended = [];
    let clonesAppended = [];
    let allSlides = [];
    let isTransitioning = false;

    const setTransition = (enabled) => {
      slider.style.transition = enabled ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
    };

    const setTransform = (index) => {
      const targetSlide = allSlides[index];
      if (!targetSlide) return;
      const trackWidth = track.clientWidth;
      const slideCenter = targetSlide.offsetLeft + (targetSlide.offsetWidth / 2);
      const offset = (trackWidth / 2) - slideCenter;
      slider.style.transform = `translateX(${offset}px)`;
    };

    const calculateVisibleCount = () => {
      const containerWidth = wrapper.clientWidth;
      const tileWidth = originalSlides[0].offsetWidth;
      return Math.max(1, Math.round(containerWidth / (tileWidth || 320)));
    };

    const getRealIndex = (idx) => {
      const base = idx - visibleCount;
      return ((base % originalSlides.length) + originalSlides.length) % originalSlides.length;
    };

    const updateDots = (realIndex) => {
      if (!dotsContainer) return;
      const dots = Array.from(dotsContainer.querySelectorAll('.slider-dot'));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === realIndex));
    };

    const updateActiveSlideClass = (realIndex) => {
      allSlides.forEach((slide, i) => {
        slide.classList.remove('is-active');
        if (i === currentIndex) slide.classList.add('is-active');
      });
    };

    const buildClones = () => {
      clonesPrepended.forEach(c => c.remove());
      clonesAppended.forEach(c => c.remove());
      clonesPrepended = [];
      clonesAppended = [];

      visibleCount = calculateVisibleCount();
      const prependItems = originalSlides.slice(-visibleCount);
      const appendItems = originalSlides.slice(0, visibleCount);

      prependItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.add('clone');
        slider.insertBefore(clone, slider.firstChild);
        clonesPrepended.push(clone);
      });

      appendItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.add('clone');
        slider.appendChild(clone);
        clonesAppended.push(clone);
      });

      allSlides = Array.from(slider.querySelectorAll('.about-slide'));
      currentIndex = visibleCount;

      allSlides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
          if (!slide.classList.contains('is-active')) snapToIndex(index);
        });
      });
    };

    const snapToIndex = (index, animate = true) => {
      if (isTransitioning && animate) return;
      currentIndex = index;
      if (animate) isTransitioning = true;
      updateActiveSlideClass(getRealIndex(currentIndex));
      setTransition(animate);
      setTransform(currentIndex);
    };

    const handleTransitionEnd = (event) => {
      if (event.propertyName !== 'transform') return;
      if (!isTransitioning) return;

      const maxIndex = visibleCount + originalSlides.length;
      if (currentIndex >= maxIndex) {
        currentIndex = visibleCount;
        setTransition(false);
        updateActiveSlideClass(getRealIndex(currentIndex));
        setTransform(currentIndex);
        slider.getBoundingClientRect();
        setTransition(true);
      } else if (currentIndex < visibleCount) {
        currentIndex = visibleCount + originalSlides.length - 1;
        setTransition(false);
        updateActiveSlideClass(getRealIndex(currentIndex));
        setTransform(currentIndex);
        slider.getBoundingClientRect();
        setTransition(true);
      }

      updateDots(getRealIndex(currentIndex));
      isTransitioning = false;
    };

    const initDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < originalSlides.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => snapToIndex(i + visibleCount));
        dotsContainer.appendChild(dot);
      }
    };

    const init = () => {
      buildClones();
      initDots();
      setTransition(false);
      updateActiveSlideClass(getRealIndex(currentIndex));
      setTransform(currentIndex);
      setTimeout(() => setTransition(true), 50);
    };

    if (prevBtn) prevBtn.addEventListener('click', () => snapToIndex(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => snapToIndex(currentIndex + 1));
    slider.addEventListener('transitionend', handleTransitionEnd);

    // Re-initialize if window resizes or if images finally load
    window.addEventListener('resize', () => {
      const realIndex = getRealIndex(currentIndex);
      init();
      currentIndex = visibleCount + realIndex;
      setTransition(false);
      updateActiveSlideClass(realIndex);
      setTransform(currentIndex);
      updateDots(realIndex);
      setTimeout(() => setTransition(true), 50);
    });

    // Fire init immediately, then fire it again once window completely loads to ensure math is perfect
    init();
    window.addEventListener('load', () => {
      setTimeout(init, 100);
    });
  });
})();

// --- 15. HUB LOGIC (SERVICES & DISCLOSURE) ---
(function () {
  const navDock = document.getElementById('navDock');
  const hubStage = document.getElementById('hubStage');

  if (!navDock || !hubStage) return;

  const links = document.querySelectorAll('.dock-link');
  const contents = document.querySelectorAll('.service-content');

  function switchTab(targetId) {
    links.forEach(l => l.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    const activeLink = document.querySelector(`.dock-link[data-target="${targetId}"]`);
    const activeContent = document.getElementById(targetId);

    if (activeLink && activeContent) {
      activeLink.classList.add('active');
      activeContent.classList.add('active');
    }
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      switchTab(target);
      window.location.hash = target;
    });
  });

  window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) switchTab(hash);
  });
})();

// --- 16. BARANGAYS PINNED HORIZONTAL SCROLL ---
/*
 * Architecture:
 *  - gsap.matchMedia limits this to desktop (≥900 px)
 *  - trigger + pin target = .brgy-scroll-wrapper (the 100vh slab)
 *  - animated element    = .brgy-horizontal-track (the card rail)
 *  - single gsap.to() owns both the pin AND the tween — no competing instances
 *  - invalidateOnRefresh:true + resize listener keep math correct on every repaint
 */
(function () {
  const mm = gsap.matchMedia();

  mm.add('(min-width: 900px)', () => {
    const wrapper = document.querySelector('.brgy-scroll-wrapper');
    const track   = document.querySelector('.brgy-horizontal-track');
    if (!wrapper || !track) return;

    let tween = null;

    function buildTween() {
      if (tween) { tween.kill(); tween = null; }

      /*
       * dist = how far left the track must travel so the last card's right edge
       *        aligns with the right edge of the viewport.
       *
       * track.scrollWidth = total rendered width (padding-left:500px + all cards + gaps + padding-right)
       * We subtract window.innerWidth so the track stops exactly when the viewport
       * is aligned with its right end. We add back the right-padding so the last
       * card has the same breathing room as the first.
       */
      const rightPad = parseFloat(getComputedStyle(track).paddingRight) || 96;
      const dist = Math.max(0, track.scrollWidth - window.innerWidth + rightPad);

      tween = gsap.to(track, {
        x: -dist,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,          // the 100vh slab — this is what gets pinned
          pin: true,                 // GSAP sets position:fixed + inserts a spacer
          anticipatePin: 1,          // prepare pin one tick early → no page jump
          start: 'top top',          // pin fires when wrapper reaches top of viewport
          end: () => `+=${dist}`,    // virtual scroll height = exact travel distance
          scrub: 1.5,                // 1.5 s lag = cinematic momentum feel
          invalidateOnRefresh: true, // recalculate dist on every ScrollTrigger.refresh()
        },
      });
    }

    /*
     * Two-rAF delay after window.load guarantees:
     *   1. All <img> have their intrinsic sizes resolved → correct scrollWidth
     *   2. Custom fonts have finished loading → correct text width in intro block
     *   3. Lenis has completed its first-tick layout
     */
    const scheduleInit = () =>
      requestAnimationFrame(() => requestAnimationFrame(() => {
        buildTween();
        ScrollTrigger.refresh();
      }));

    if (document.readyState === 'complete') {
      scheduleInit();
    } else {
      window.addEventListener('load', scheduleInit, { once: true });
    }

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    // Cleanup — called automatically by matchMedia when viewport < 900px
    return () => {
      if (tween) { tween.kill(); tween = null; }
      window.removeEventListener('resize', onResize);
      gsap.set(track, { clearProps: 'transform' });
    };
  });
  // Below 900px: CSS media query stacks cards vertically; GSAP stays idle
})();

// --- 17. OFFICIALS PAGE: STAGGERED GRID REVEAL ---
const officialCards = gsap.utils.toArray('.official-card');
if (officialCards.length > 0) {
  gsap.fromTo(officialCards,
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.officials-section', start: 'top 85%', toggleActions: 'play none none reverse' } }
  );
}

// --- 18. AWARDS MARQUEE — GSAP-driven, pause off-screen, zero CSS-animation jank ---
/*
 * Why GSAP instead of CSS animation-play-state toggle?
 *   CSS animation-play-state re-enables at the internal clock position, not the
 *   visual position. After a pause the element snaps to wherever the clock left off.
 *   GSAP pauses at the exact rendered pixel and resumes from there — zero jump.
 *
 * How the seamless loop works:
 *   The track has two identical .v-marquee-content blocks (primary + aria-hidden clone).
 *   GSAP scrolls from y=0 down to y=-primaryHeight (one content block).
 *   At that point the clone is visually identical to where primary started.
 *   repeat:-1 + onRepeat snap reset → truly infinite with no drift.
 */
(function () {
  const visual = document.getElementById('awardsVisual');
  const track  = document.getElementById('awardsMarqueeTrack');
  if (!visual || !track) return;

  let marquee = null;

  function buildMarquee() {
    if (marquee) { marquee.kill(); marquee = null; }

    const contents = track.querySelectorAll('.v-marquee-content');
    if (contents.length < 2) return;

    const gapPx = parseFloat(getComputedStyle(track).gap) || 13.6;
    const primaryHeight = contents[0].offsetHeight + gapPx;

    gsap.set(track, { y: 0 });

    // Speed: ~60px per second feels natural — slow enough to read, fast enough to interest
    const duration = primaryHeight / 60;

    marquee = gsap.to(track, {
      y: -primaryHeight,
      duration: duration,
      ease: 'none',
      repeat: -1,
      paused: true,
      onRepeat() {
        // Hard-snap to y:0 on every cycle to prevent floating-point accumulation
        gsap.set(track, { y: 0 });
      },
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!marquee) return;
        if (entry.isIntersecting) {
          marquee.play();
        } else {
          marquee.pause();
        }
      });
    },
    { threshold: 0.05 }
  );

  const init = () => requestAnimationFrame(() => {
    buildMarquee();
    observer.observe(visual);
  });

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init, { once: true });
  }
})();