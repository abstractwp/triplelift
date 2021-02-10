const whyTLGradientTL = gsap.timeline( {    
  scrollTrigger: {
    trigger: ".why-triplelift",
    start: "40% bottom",
    end: "60% bottom",
    scrub: true,
    toggleActions: "play reverse play reverse",
  }
});

whyTLGradientTL
  .to(
    '.section-transition.section2', 
    { 
      opacity: .5, 
      duration: 1 
    }, "why-triplelift"
);

const exploreGalleryGradientTL = gsap.timeline( {    
  scrollTrigger: {
    trigger: ".explore-our-gallery-container",
    start: "-70% center",
    end: "60% center",
    scrub: true,
    toggleActions: "play reverse play reverse",
  }
});


exploreGalleryGradientTL
  .to(
    '.section-transition.section3', 
    { 
      opacity: 1, 
      duration: 1 
    }, "explore"
);

const weWorkWithGradientTL = gsap.timeline( {    
  scrollTrigger: {
    trigger: ".we-work-with",
    start: "top center",
    end: "60% center",
    scrub: true,
    toggleActions: "play reverse play reverse",
  }
});

weWorkWithGradientTL
  .to(
    '.section-transition.section3', 
    { 
      opacity: 0, 
      duration: 0
    }, "we-work-with"
);
