"use strict";

gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// 1. LENIS SMOOTH SCROLL ENGINE
// ==========================================================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ==========================================================================
// 2. THEATRICAL CURTAIN & HERO REVEAL
// ==========================================================================
window.addEventListener("load", () => {
  const tl = gsap.timeline();
  if (document.getElementById("loadingCurtain")) {
    tl.to("#loadingCurtain", { yPercent: -100, duration: 1.5, ease: "power4.inOut", delay: 0.3 });
  }
  if (document.querySelector(".title-text")) {
    tl.to(".title-text", { y: "0%", duration: 1.2, stagger: 0.2, ease: "power3.out" }, "-=0.5");
  }
  if (document.querySelector(".hero-btn")) {
    tl.to(".hero-btn", { y: "0%", opacity: 1, duration: 1, ease: "power3.out" }, "-=0.8");
  }
});

// ==========================================================================
// 3. HERO PARALLAX & DIMMING
// ==========================================================================
(function initHeroParallax() {
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
})();

// ==========================================================================
// 4. HEADER & MENU LOGIC
// ==========================================================================
(function initHeader() {
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
})();

// ==========================================================================
// 5. GSAP SCROLL REVEALS & STICKY SECTIONS
// ==========================================================================
(function initScrollReveals() {
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

  const hotlinesSection = document.querySelector('.hotlines-section');
  if (hotlinesSection) {
    const hotlineTl = gsap.timeline({ scrollTrigger: { trigger: hotlinesSection, start: "top 75%", toggleActions: "play none none reverse" } });
    gsap.set('.hotlines-grid', { perspective: 1500 });
    hotlineTl.fromTo('.hotlines-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo('.hotline-card', { y: 100, opacity: 0, rotationX: -25, scale: 0.9 }, { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)" }, "-=0.7");
  }

  const servicesSection = document.querySelector('.services-section');
  if (servicesSection) {
    const servicesTl = gsap.timeline({ scrollTrigger: { trigger: servicesSection, start: "top 80%", toggleActions: "play none none reverse" } });
    servicesTl.fromTo('.services-main-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo('.sc-wrapper', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6");
  }

  gsap.utils.toArray('.reveal-wrapper').forEach(wrapper => {
    gsap.fromTo(wrapper, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: wrapper, start: "top 80%", toggleActions: "play none none reverse" } });
  });

  gsap.utils.toArray('.section-text').forEach(section => {
    const textElements = section.querySelectorAll('.slide-text');
    if (textElements.length > 0) {
      gsap.fromTo(textElements, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" } });
    }
  });

  gsap.utils.toArray('.content-section .reveal-img').forEach(img => {
    gsap.fromTo(img, { y: "-15%" }, { y: "15%", ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });

  gsap.utils.toArray('.slide-up').forEach(el => {
    gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } });
  });

  const officialCards = gsap.utils.toArray('.official-card');
  if (officialCards.length > 0) {
    gsap.fromTo(officialCards, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.officials-section', start: 'top 85%', toggleActions: 'play none none reverse' } });
  }

  if (document.querySelector('.news-section')) {
    gsap.fromTo('.news-main-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.news-section', start: 'top 80%', toggleActions: 'play none none reverse' } });
    gsap.fromTo('.news-img-cell, .news-text-cell', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.news-grid', start: 'top 85%', toggleActions: 'play none none reverse' } });
    gsap.fromTo('.video-thumb', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.videos-row', start: 'top 95%', toggleActions: 'play none none reverse' } });
  }
})();

// ==========================================================================
// 6. 3D CURVED CAROUSEL (TOURIST SPOTS)
// ==========================================================================
(function initTouristCarousel() {
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
    { title: "Museo de Cainta", img: "url('pics/tourist_spots/museocainta.avif')", desc: "Discover the rich historical tapestry of Cainta.", embed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` },
    { title: "One Cainta Arena", img: "url('pics/tourist_spots/onearena.jpg')", desc: "A premier multipurpose venue hosting major sports events.", embed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` },
    { title: "Oval Park", img: "url('pics/tourist_spots/ovalpark.webp')", desc: "The green heart of the municipality.", embed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` },
    { title: "ROTC Grounds", img: "url('pics/tourist_spots/rotc.jpg')", desc: "A historic open space originally dedicated to military training.", embed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` },
    { title: "Sta. Lucia Mall", img: "url('pics/tourist_spots/stalucia.jpg')", desc: "One of the pioneering and most iconic shopping destinations in Rizal.", embed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` }
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

      if (animate) gsap.to(card, { x, z, rotateY, scale, duration: 0.65, ease: "power3.out" });
      else gsap.set(card, { x, z, rotateY, scale });
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
        if (typeof lenis !== 'undefined') lenis.stop();
      } else {
        updateCarousel(i);
      }
    });
  });

  const closeModal = () => {
    if (modal) modal.classList.remove('active');
    if (modalMap) modalMap.innerHTML = '';
    if (typeof lenis !== 'undefined') lenis.start();
  };
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.getElementById('carouselPrev')?.addEventListener('click', () => updateCarousel(current - 1));
  document.getElementById('carouselNext')?.addEventListener('click', () => updateCarousel(current + 1));
  dots.forEach(d => d.addEventListener('click', () => updateCarousel(+d.dataset.dot)));

  updateCarousel(2, false);
  window.addEventListener('resize', () => updateCarousel(current, false));

  gsap.fromTo('.tourist-header .slide-text', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.tourist-section', start: 'top 80%', toggleActions: 'play none none reverse' } });
  gsap.fromTo('.carousel-card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.carousel-viewport', start: 'top 85%', toggleActions: 'play none none reverse' } });
})();

// ==========================================================================
// 7. MUNICIPALITY HORIZONTAL SLIDER (ABOUT PAGE)
// ==========================================================================
(function initHorizontalSlider() {
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

    const setTransition = (enabled) => { slider.style.transition = enabled ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'; };
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
        const clone = item.cloneNode(true); clone.classList.add('clone');
        slider.insertBefore(clone, slider.firstChild); clonesPrepended.push(clone);
      });
      appendItems.forEach(item => {
        const clone = item.cloneNode(true); clone.classList.add('clone');
        slider.appendChild(clone); clonesAppended.push(clone);
      });

      allSlides = Array.from(slider.querySelectorAll('.about-slide'));
      currentIndex = visibleCount;

      allSlides.forEach((slide, index) => {
        slide.addEventListener('click', () => { if (!slide.classList.contains('is-active')) snapToIndex(index); });
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
      if (event.propertyName !== 'transform' || !isTransitioning) return;
      const maxIndex = visibleCount + originalSlides.length;
      if (currentIndex >= maxIndex) {
        currentIndex = visibleCount;
        setTransition(false); updateActiveSlideClass(getRealIndex(currentIndex)); setTransform(currentIndex);
        slider.getBoundingClientRect(); setTransition(true);
      } else if (currentIndex < visibleCount) {
        currentIndex = visibleCount + originalSlides.length - 1;
        setTransition(false); updateActiveSlideClass(getRealIndex(currentIndex)); setTransform(currentIndex);
        slider.getBoundingClientRect(); setTransition(true);
      }
      updateDots(getRealIndex(currentIndex));
      isTransitioning = false;
    };

    const initDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < originalSlides.length; i++) {
        const dot = document.createElement('span'); dot.className = 'slider-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => snapToIndex(i + visibleCount));
        dotsContainer.appendChild(dot);
      }
    };

    const init = () => {
      buildClones(); initDots(); setTransition(false);
      updateActiveSlideClass(getRealIndex(currentIndex)); setTransform(currentIndex);
      setTimeout(() => setTransition(true), 50);
    };

    if (prevBtn) prevBtn.addEventListener('click', () => snapToIndex(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => snapToIndex(currentIndex + 1));
    slider.addEventListener('transitionend', handleTransitionEnd);

    window.addEventListener('resize', () => {
      const realIndex = getRealIndex(currentIndex);
      init();
      currentIndex = visibleCount + realIndex;
      setTransition(false); updateActiveSlideClass(realIndex); setTransform(currentIndex); updateDots(realIndex);
      setTimeout(() => setTransition(true), 50);
    });

    init();
    window.addEventListener('load', () => setTimeout(init, 100));
  });
})();

// ==========================================================================
// 8. BARANGAYS PINNED HORIZONTAL SCROLL
// ==========================================================================
(function initBarangayScroll() {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    const wrapper = document.querySelector('.brgy-scroll-wrapper');
    const track   = document.querySelector('.brgy-horizontal-track');
    if (!wrapper || !track) return;

    let tween = null;

    function buildTween() {
      if (tween) { tween.kill(); tween = null; }
      const rightPad = parseFloat(getComputedStyle(track).paddingRight) || 96;
      const dist = Math.max(0, track.scrollWidth - window.innerWidth + rightPad);

      tween = gsap.to(track, {
        x: -dist, ease: 'none',
        scrollTrigger: { trigger: wrapper, pin: true, anticipatePin: 1, start: 'top top', end: () => `+=${dist}`, scrub: 1.5, invalidateOnRefresh: true }
      });
    }

    const scheduleInit = () => requestAnimationFrame(() => requestAnimationFrame(() => { buildTween(); ScrollTrigger.refresh(); }));
    if (document.readyState === 'complete') scheduleInit(); else window.addEventListener('load', scheduleInit, { once: true });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      if (tween) { tween.kill(); tween = null; }
      window.removeEventListener('resize', onResize);
      gsap.set(track, { clearProps: 'transform' });
    };
  });
})();

// ==========================================================================
// 9. AWARDS INFINITE VERTICAL MARQUEE
// ==========================================================================
(function initAwardsMarquee() {
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
    const duration = primaryHeight / 60;

    marquee = gsap.to(track, {
      y: -primaryHeight, duration: duration, ease: 'none', repeat: -1, paused: true,
      onRepeat() { gsap.set(track, { y: 0 }); }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!marquee) return;
        if (entry.isIntersecting) marquee.play(); else marquee.pause();
      });
    }, { threshold: 0.05 }
  );

  const init = () => requestAnimationFrame(() => { buildMarquee(); observer.observe(visual); });
  if (document.readyState === 'complete') init(); else window.addEventListener('load', init, { once: true });
})();

// ==========================================================================
// 10. HUB LOGIC (SERVICES & DISCLOSURE TABS)
// ==========================================================================
(function initHubTabs() {
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

// ==========================================================================
// 11. GENERAL MODALS (VIDEO & HERO MAP)
// ==========================================================================
(function initGeneralModals() {
  // Video Modal
  const videoThumbs = document.querySelectorAll('.video-thumb');
  const videoModal = document.getElementById('videoModal');
  const vmPlayer = document.getElementById('vmPlayer');
  const vmTitle = document.getElementById('vmTitle');
  const vmLink = document.getElementById('vmLink');
  
  if (videoThumbs.length > 0) {
    videoThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        if (vmPlayer) vmPlayer.src = thumb.getAttribute('data-video');
        if (vmTitle) vmTitle.textContent = thumb.getAttribute('data-title');
        if (vmLink) vmLink.textContent = thumb.getAttribute('data-link');
        if (videoModal) videoModal.classList.add('active');
        if (typeof lenis !== 'undefined') lenis.stop();
        if (vmPlayer) vmPlayer.play();
      });
    });

    document.getElementById('vmClose')?.addEventListener('click', () => {
      videoModal.classList.remove('active');
      vmPlayer?.pause();
      if(vmPlayer) vmPlayer.currentTime = 0;
      if (typeof lenis !== 'undefined') lenis.start();
    });

    document.getElementById('vmExpand')?.addEventListener('click', () => {
      if (!document.fullscreenElement) videoModal.requestFullscreen().catch(err => console.error(err));
      else document.exitFullscreen();
    });
  }

  // Hero Location Modal
  const locModal = document.getElementById('locationModal');
  const btnOpenLoc = document.getElementById('openLocationModal');
  
  if (locModal && btnOpenLoc) {
    btnOpenLoc.addEventListener('click', () => { locModal.classList.add('active'); if(typeof lenis !== 'undefined') lenis.stop(); });
    const closeLocModal = () => { locModal.classList.remove('active'); if(typeof lenis !== 'undefined') lenis.start(); };
    document.getElementById('locModalClose')?.addEventListener('click', closeLocModal);
    document.getElementById('locModalOverlay')?.addEventListener('click', closeLocModal);
  }
})();

// ==========================================================================
// 12. TEXT INFO MODALS (SERVICES & NEWS "READ MORE")
// ==========================================================================
(function initTextInfoModals() {
  const infoData = {
    idApp: {
      title: "ID Application Requirements",
      content: `
        <h3>PWD ID</h3>
        <p><strong>What are the requirements for a PWD ID?</strong></p>
        <ol>
          <li>A valid, government-issued ID showing proof of residency in Cainta;</li>
          <li>Medical Certificate indicating disability;</li>
          <li>Latest photo in 2x2 size, 2 pieces; and</li>
          <li>Signed PWD Application Form</li>
        </ol>
        <h3>SENIOR CITIZENS ID</h3>
        <p><strong>What are the requirements for a Senior Citizen’s ID?</strong></p>
        <ol>
          <li>A valid, government-issued ID showing the date of birth and Cainta address; OR Barangay Indigency Certificate or Birth Certificate</li>
          <li>For transfer of registration, Certificate of Cancellation from the previous LGU;</li>
          <li>1x1 size picture</li>
          <li>Signed Application Form</li>
        </ol>
        <h3>SOLO PARENTS ID</h3>
        <p><strong>What are the requirements for a Solo Parents ID?</strong></p>
        <ul>
          <li>Original Barangay Certification that the applicant is a resident of the said barangay for the last six (6) months;</li>
          <li>Photocopy of appropriate documentation/evidence that the applicant is a solo parent;</li>
          <li>Photocopy of latest Income Tax Return (ITR) or any document that will establish the income level;</li>
          <li>Latest photo with white background, 1x1 size;</li>
          <li>Photocopy of any ID indicating Cainta as residence;</li>
          <li>Birth certificate of children;</li>
          <li>Marriage Certificate for those married, or Birth Certificate for those single and latest CENOMAR;</li>
          <li>Signed Solo Parent Application Form.</li>
        </ul>`
    },
    college: {
      title: "One Cainta College",
      content: `
        <h3>About The College</h3>
        <p><strong>DR. VICTORIA NAVAL</strong><br><em>OIC-College Administrator</em></p>
        <p>The establishment of a locally funded college in Cainta is aimed to provide quality higher education to the citizens of Cainta and produce globally competitive and employable graduates who will become future leaders of the community, the nation and the world.</p>
        <h3>Core Values</h3>
        <ul>
          <li><strong>O</strong>penness</li>
          <li><strong>N</strong>urture relationships</li>
          <li><strong>E</strong>thical and professional behavior</li>
          <li><strong>C</strong>reativity and Independent thinking</li>
          <li><strong>A</strong>ctive engagement</li>
          <li><strong>I</strong>ntegrity</li>
          <li><strong>N</strong>ationalism</li>
          <li><strong>T</strong>eamwork</li>
          <li><strong>A</strong>ccountability and honesty</li>
        </ul>
        <h3>Course Offerings</h3>
        <h4>Non-Degree / Ladderized Programs</h4>
        <ul><li>Diploma in Information & Communication Technology (DICT)</li><li>Diploma in Office Management Technology (DOMT)</li></ul>
        <h4>Bachelor's Degree Programs</h4>
        <ul><li>Bachelor in Technical Vocational Teacher Education (BTVTEd)</li><li>Bachelor of Science in Entrepreneurship (BSE)</li><li>Bachelor of Science in Information Systems (BSIS)</li></ul>`
    },
    covid: {
      title: "COVID-19 Services",
      content: `
        <h3>Vaccination Sites</h3>
        <ul>
          <li><strong>RHU 1 (Brgy. San Andres):</strong> PFCI Health Center, Kabisig Health Center, Felix Health Center...</li>
          <li><strong>RHU 2 (Brgy. Sto. Domingo):</strong> Gruar Health Center, A. Bonifacio Health Center...</li>
          <li><strong>RHU 3 (Brgy. San Juan):</strong> General Ricarte Health Center, Upper Cuatro Health Center...</li>
        </ul>
        <h3>Contact & Testing</h3>
        <p><strong>Municipal Health Office:</strong> Municipal Compound, Brgy. Sto Domingo (Mon-Fri | 8:00 am to 5:00 pm)</p>
        <p><strong>COVID Testing (Antigen):</strong> Liwasang Bayan, J. Buenviaje St.</p>
        <p><strong>COVID Hotline:</strong> 0917 1063 338</p>
        <h3>COVID-19 Vaccination Certificate</h3>
        <p>VaxCert available na sa eGovPH App. Dahil sa improved features at mas mabilis na pagproseso gamit ang eGovPH App, ang Municipal Health Office ay hindi na mag-iisyu ng VaxCert.</p>`
    }
  };

  const newsData = {
    news1: {
      title: "CAINTA OBSERVES SEMANA SANTA 2024 WITH SENAKULO AND PARADA",
      date: "April 2, 2024",
      img: "pics/main_pg_pics/senakula.avif",
      content: `
        <p>True to its century’s tradition of Lenten observation, Cainta began the month of March with its own staging of the Senakulo. The passion play, a cornerstone of Cainta's cultural heritage, was performed by various local groups to commemorate the life, suffering, and resurrection of Jesus Christ.</p>
        <p>The observation culminated in the grand Parada ng Panata, where devotees walked the streets in solemn procession, showcasing the deep faith and unwavering devotion of the community. Local officials expressed their gratitude to all participants for keeping the century-old tradition alive and vibrant.</p>
      `
    },
    news2: {
      title: "CAINTA NAMED THE MOST COMPETITIVE MUNICIPALITY IN THE PHILIPPINES",
      date: "September 28, 2023",
      img: "pics/main_pg_pics/caintaawards.avif",
      content: `
        <p>The Municipality of Cainta once again was named as the Most Competitive Municipality in the Philippines during the Cities and Municipalities Competitiveness Summit (CMCS) for the year 2023.</p>
        <p>Cainta secured the top spot overall among 1st to 2nd Class Municipalities, demonstrating excellence across multiple pillars including Economic Dynamism, Government Efficiency, Infrastructure, and Resiliency. This achievement is a testament to the local government's continuous efforts to provide outstanding public service and foster a thriving environment for businesses and residents alike.</p>
      `
    },
    news3: {
      title: "ONE CAINTA COLLEGE RESUMES COMMENCEMENT EXERCISES",
      date: "September 1, 2023",
      img: "pics/main_pg_pics/collegepic.avif",
      content: `
        <p>Last August 8, 2023, the One Cainta College resumed its graduation rites for its 317 students, marking the 3rd face-to-face graduation ceremony since the pandemic restrictions were lifted.</p>
        <p>The commencement exercises celebrated the resilience and hard work of the graduating class, who completed their degrees in various fields such as Information Systems, Entrepreneurship, and Technical Vocational Teacher Education. Local government leaders and college administrators congratulated the students, wishing them success as they join the professional workforce.</p>
      `
    },
    news4: {
      title: "ONE CAINTA COMMUNITY SHELTER FINALLY OPENS",
      date: "May 2, 2023",
      img: "pics/main_pg_pics/shelterpic.avif",
      content: `
        <p>A first of its kind and fully-run by the local government, Cainta finally opened its Shelter for the Homeless along the Westbank floodway.</p>
        <p>The community shelter is designed to provide a safe, clean, and dignified temporary residence for marginalized individuals and families. The facility offers essential amenities, feeding programs, and social support services to help residents get back on their feet. This initiative underscores the municipality's commitment to inclusive growth and compassionate governance.</p>
      `
    }
  };

  const infoModal = document.getElementById('infoModal');
  const infoModalTitle = document.getElementById('infoModalTitle');
  const infoModalBody = document.getElementById('infoModalBody');

  if (infoModal) {
    document.querySelectorAll('.info-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const menuToggle = document.getElementById('menuToggle');
        const dropdownMenu = document.getElementById('dropdownMenu');
        if (menuToggle && dropdownMenu) {
            menuToggle.classList.remove('active');
            dropdownMenu.classList.remove('active');
        }
        const data = infoData[btn.getAttribute('data-target-info')];
        if (data) {
          infoModalTitle.textContent = data.title;
          infoModalBody.innerHTML = data.content;
          infoModal.classList.add('active');
          if (typeof lenis !== 'undefined') lenis.stop(); 
        }
      });
    });

    document.querySelectorAll('.news-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const data = newsData[btn.getAttribute('data-target-news')];
        if (data) {
          infoModalTitle.textContent = data.title;
          infoModalBody.innerHTML = `
            <p style="color: var(--text-blue); font-weight: 700; margin-top: -1rem; margin-bottom: 1.5rem; font-size: 0.95rem; text-transform: uppercase;">${data.date}</p>
            <img src="${data.img}" alt="News Article Image" style="width: 100%; border-radius: 8px; margin-bottom: 1.5rem; max-height: 400px; object-fit: cover; box-shadow: 0 10px 20px rgba(0,0,0,0.1);">
            <div style="font-size: 1.05rem; line-height: 1.8; color: var(--text-muted);">${data.content}</div>
          `;
          infoModal.classList.add('active');
          if (typeof lenis !== 'undefined') lenis.stop(); 
        }
      });
    });

    const closeInfoModal = () => { 
      infoModal.classList.remove('active'); 
      if (typeof lenis !== 'undefined') lenis.start(); 
    };
    
    document.getElementById('infoModalClose')?.addEventListener('click', closeInfoModal);
    document.getElementById('infoModalOverlay')?.addEventListener('click', closeInfoModal);
  }
})();

// ==========================================================================
// 13. CONTACT US MODAL
// ==========================================================================
(function initContactModal() {
  const contactModal = document.getElementById('contactModal');

  if (contactModal) {
    document.querySelectorAll('a[href="#contact"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); 
        contactModal.classList.add('active');
        if (typeof lenis !== 'undefined') lenis.stop(); 
      });
    });

    const closeContactModal = () => { 
      contactModal.classList.remove('active'); 
      if (typeof lenis !== 'undefined') lenis.start(); 
    };
    
    document.getElementById('contactModalClose')?.addEventListener('click', closeContactModal);
    document.getElementById('contactModalOverlay')?.addEventListener('click', closeContactModal);
  }
})();

// ==========================================================================
// 14. DEV TOAST NOTIFICATION (DEAD LINKS)
// ==========================================================================
(function initToastSystem() {
  const toast = document.createElement('div');
  toast.className = 'dev-toast';
  toast.innerHTML = `<span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></span> Feature currently under development.`;
  document.body.appendChild(toast);

  let toastTimer;
  document.querySelectorAll('a[href="#"]:not([href="#contact"])').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      toast.classList.add('active');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => { toast.classList.remove('active'); }, 3000);
    });
  });
})();

// ==========================================================================
// 15. GLOBAL SCROLL PROGRESS BAR
// ==========================================================================
(function initProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.id = 'page-progress-bar';
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; width: 0%; height: 4px; 
    background: #2563eb; z-index: 999999; transition: width 0.1s ease-out; pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0) {
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    }
  }

  window.addEventListener('scroll', updateProgress);
  window.addEventListener('resize', updateProgress);
  if (typeof lenis !== 'undefined') lenis.on('scroll', updateProgress);
})();

// ==========================================================================
// 16. SMART SEARCH ENGINE
// ==========================================================================
(function initSmartSearch() {
  // Database of searchable pages and keywords
  const searchDB = [
    { title: "COVID-19 Vaccination & Testing", url: "services.html#covid", keywords: "covid 19 vaccine test swab health virus" },
    { title: "PWD ID Application", url: "services.html#id-app", keywords: "pwd id application requirements persons with disability" },
    { title: "Senior Citizen ID", url: "services.html#id-app", keywords: "senior citizen id application requirements old" },
    { title: "Solo Parent ID", url: "services.html#id-app", keywords: "solo parent id application requirements mother father" },
    { title: "Municipal Hospital", url: "services.html#hospital", keywords: "hospital medical doctor sick emergency" },
    { title: "One Cainta College", url: "services.html#college", keywords: "college school education student enroll" },
    { title: "History of Cainta", url: "about_cainta.html#history", keywords: "history sepoy background founded old" },
    { title: "Mayor J. Keith P. Nieto", url: "officials.html", keywords: "mayor kit nieto head executive" },
    { title: "Emergency Hotlines", url: "index.html#hotlines", keywords: "hotline emergency rescue police fire hospital" },
    { title: "E-Payment & Online Services", url: "services.html#online", keywords: "pay online taxes rpt business permit" },
    { title: "Municipal Departments & Directory", url: "departments.html", keywords: "departments offices directory mayor vice health engineering bplo assessor" }
  ];

  const searchToggleBtn = document.getElementById('searchToggleBtn');
  const searchModal = document.getElementById('searchModal');
  const closeSearchModal = document.getElementById('closeSearchModal');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if(searchToggleBtn && searchModal) {
    searchToggleBtn.addEventListener('click', () => {
      searchModal.classList.add('active');
      searchInput.value = '';
      searchResults.innerHTML = '';
      setTimeout(() => searchInput.focus(), 100);
      if (typeof lenis !== 'undefined') lenis.stop(); 
    });

    closeSearchModal.addEventListener('click', () => {
      searchModal.classList.remove('active');
      if (typeof lenis !== 'undefined') lenis.start(); 
    });

    searchInput.addEventListener('keyup', (e) => {
      const query = e.target.value.toLowerCase().trim();
      searchResults.innerHTML = '';
      
      if(query.length === 0) return;

      // Filter logic based on title or keywords
      const filtered = searchDB.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.keywords.includes(query)
      );

      if(filtered.length === 0) {
        searchResults.innerHTML = '<div class="search-empty">No results found for that search.</div>';
        return;
      }

      // Populate results
      filtered.forEach(result => {
        const link = document.createElement('a');
        link.href = result.url;
        link.className = 'search-result-item';
        link.innerHTML = `<h4>${result.title}</h4><p>Click to view page →</p>`;
        
        // Remove modal if they click a link so the page can scroll normally
        link.addEventListener('click', () => {
            searchModal.classList.remove('active');
            if (typeof lenis !== 'undefined') lenis.start(); 
        });

        searchResults.appendChild(link);
      });
    });
  }
})();

// ==========================================================================
// 17. PRE-PROMPTED CHATBOT
// ==========================================================================
(function initChatbot() {
  const chatToggleBtn = document.getElementById('chatToggleBtn');
  const chatWidget = document.getElementById('chatWidget');
  const chatClose = document.getElementById('chatClose');
  const chatBody = document.getElementById('chatBody');
  const chatOptionsContainer = document.getElementById('chatOptions');
  const optBtns = document.querySelectorAll('.chat-opt-btn');

  const chatDB = {
    pwd: "To apply for a PWD ID, you need: <br>1. Valid Gov ID (Cainta address)<br>2. Medical Certificate<br>3. Two 2x2 photos<br>4. Application Form.<br><a href='services.html#id-app'>View full details here.</a>",
    location: "The Municipal Hall is located at A. Bonifacio Ave, Cainta, Rizal. You can click 'Explore Municipal Hall' on our home page to see the map!",
    mayor: "The Mayor of Cainta is Atty. J. Keith P. Nieto, JD. He has led the municipality to become the most competitive in the Philippines. <a href='officials.html'>Read more here.</a>",
    contact: "You can click 'Contact Us' in the menu to send a message, or call our hotlines: <br>RESCUE: 8535-0131<br>PIO: 8696-2617"
  };

  if(chatToggleBtn && chatWidget) {
    chatToggleBtn.addEventListener('click', () => {
      chatWidget.classList.add('active');
    });

    chatClose.addEventListener('click', () => {
      chatWidget.classList.remove('active');
    });

    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const questionText = btn.textContent;
        const answerHtml = chatDB[btn.getAttribute('data-q')];
        
        // Hide options temporarily
        chatOptionsContainer.style.display = 'none';

        // Inject User Bubble
        const userDiv = document.createElement('div');
        userDiv.className = 'chat-msg user';
        userDiv.textContent = questionText;
        chatBody.appendChild(userDiv);

        // Simulate a small typing delay for a natural feel
        setTimeout(() => {
          const botDiv = document.createElement('div');
          botDiv.className = 'chat-msg bot';
          botDiv.innerHTML = answerHtml;
          chatBody.appendChild(botDiv);
          
          // Bring options back to the bottom
          setTimeout(() => {
            chatOptionsContainer.style.display = 'flex';
            chatBody.appendChild(chatOptionsContainer);
            chatBody.scrollTop = chatBody.scrollHeight;
          }, 1000);

          chatBody.scrollTop = chatBody.scrollHeight;
        }, 600);
      });
    });
  }
})();

// ==========================================================================
// 18. BACK TO TOP BUTTON
// ==========================================================================
(function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      // Show button after scrolling down 400px
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      if (typeof lenis !== 'undefined') {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
})();