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
      end: "80px top",
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
      markers: true,
      start: "95% bottom",
      end: "120% bottom",
      toggleActions: "play reverse play reverse",
    }
  });

  innovationHeaderSectionTLOutro
  .to(
    '.texture-animation-container', 
    { 
      opacity: 1, 
      duration: 1 
    },"transition3"
  );

  innovationHeaderSectionTLOutro
  .to(
    '.innovation-header-container .copy', 
    { 
      opacity: 0, 
      duration: 1 
    },"transition3"
  );

  innovationHeaderSectionTLOutro
  .to(
    '.productpage-section-transition-container .section-transition.gradient2', 
    { 
      opacity: 0, 
      duration: 1 
    },"transition3"
  );

  innovationHeaderSectionTLOutro
  .to(
    '.productpage-section-transition-container .section-transition.white', 
    { 
      opacity: 1, 
      duration: 1 
    },"transition3"
  );

  innovationHeaderSectionTLOutro
  .to(
    '.texture-animation-container', 
    { 
      opacity: 1, 
      duration: 1 
    },"transition3"
  );

}