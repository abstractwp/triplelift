if (document.getElementById("productPageJSIndicator")) {
  
  
  const creativeGallerySectionTL = gsap.timeline( {    
    scrollTrigger: {
      trigger: ".creative-gallery-section-container",
      scrub: true,
      end: "5%",
      toggleActions: "play reverse play reverse",
    }
  });

  creativeGallerySectionTL
  .to(
    '.productpage-section-transition-container .section-transition.section1', 
    { 
      opacity: 0, 
      duration: 1 
    },"transition1"
  );
  
  creativeGallerySectionTL
  .to(
    '.productpage-section-transition-container .section-transition.white', 
    { 
      opacity: 1, 
      duration: 1 
    },"transition1"
  );

  const innovationHeaderSectionTLIntro = gsap.timeline( {    
    scrollTrigger: {
      trigger: ".innovation-header-container",
      scrub: true,
      start: "20px center",
      end: "80px 40%",
      toggleActions: "play reverse play reverse",
    }
  });

  innovationHeaderSectionTLIntro
  .to(
    '.productpage-section-transition-container .section-transition.white', 
    { 
      opacity: 0, 
      duration: 1 
    },"transition2"
  );

  innovationHeaderSectionTLIntro
  .to(
    '.productpage-section-transition-container .section-transition.gradient2', 
    { 
      opacity: 1, 
      duration: 1 
    },"transition2"
  );

  innovationHeaderSectionTLIntro
  .to(
    '.texture-animation-container', 
    { 
      opacity: 0, 
      duration: 1 
    },"transition2"
  );

  innovationHeaderSectionTLIntro
  .from(
    '.innovation-header-container .copy', 
    { 
      opacity: 0,
      y: -20,
      duration: .6 
    },"transition2"
  );

  const innovationHeaderSectionTLOutro = gsap.timeline( {    
    scrollTrigger: {
      trigger: ".innovation-header-container",
      scrub: true,
      start: "70% center",
      end: "95% 40%",
      toggleActions: "play reverse play reverse",
    }
  });

  innovationHeaderSectionTLOutro
  .to(
    '.innovation-header-container .copy', 
    { 
      opacity: 0, 
      duration: 1 
    },"transition3p1"
  );

  innovationHeaderSectionTLOutro
  .to(
    '.texture-animation-container', 
    { 
      opacity: 1, 
      duration: 1 
    },"transition3p1"
  );

  const fadeOutTextureOnInnovationHeader = gsap.timeline( {    
    scrollTrigger: {
      trigger: ".product-page-cta-1",
      start: "-100px center",
      end: "bottom center",
      scrub: true,
      toggleActions: "play reverse play reverse",
    }
  });

  fadeOutTextureOnInnovationHeader
  .to(
    '.texture-animation-container', 
    { 
      opacity: 0, 
      duration: 3 
    },"transition4"
  );

  const fadeInFirstCTA = gsap.timeline( {    
    scrollTrigger: {
      trigger: ".product-page-cta-1",
      start: "-40% center",
      end: "50% center",
      scrub: true,
      toggleActions: "play reverse play reverse",
    }
  });

  fadeInFirstCTA
  .from(
    '.product-page-cta-1', 
    { 
      y: -20,
      opacity: .8, 
      duration: 1 
    },"transition5"
  );

  const fadeInFirstCTATransition = gsap.timeline( {    
    scrollTrigger: {
      trigger: ".between-product-page-ctas.trans1",
      scrub: true,
      toggleActions: "play reverse play reverse",
    }
  });

  fadeInFirstCTATransition
  .to(
    '.productpage-section-transition-container .section-transition.gradient2', 
    { 
      opacity: 0, 
      duration: 1 
    },"transition5"
  );

  fadeInFirstCTATransition
  .to(
    '.productpage-section-transition-container .section-transition.white', 
    { 
      opacity: 1, 
      duration: 1 
    },"transition5"
  );

}