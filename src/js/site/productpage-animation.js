if (document.getElementById("productPageJSIndicator")) {
  
  
  const innovationSectionTL = gsap.timeline( {    
    scrollTrigger: {
      trigger: ".creative-gallery-section-container",
      scrub: true,
      end: "5%",
      toggleActions: "play reverse play reverse",
    }
  });

  innovationSectionTL
  .to(
    '.productpage-section-transition-container .section-transition.section1', 
    { 
      opacity: 0, 
      duration: 1 
    },"transition1"
);
  
  innovationSectionTL
    .to(
      '.productpage-section-transition-container .section-transition.white', 
      { 
        opacity: 1, 
        duration: 1 
      },"transition1"
      );
}