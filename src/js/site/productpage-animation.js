if (document.getElementById("productPageJSIndicator")) {
  
  
  const innovationSectionTL = gsap.timeline( {    
    scrollTrigger: {
      trigger: ".innovation-header-container",
      scrub: true,
      toggleActions: "play reverse play reverse",
    }
  });
  
  innovationSectionTL
    .to(
      '.productpage-section-transition-container .section-transition.white', 
      { 
        opacity: 1, 
        duration: 1 
      }
  );



}