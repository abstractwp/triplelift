$(window).on("load", function(){

  if (document.getElementById("ideasPageJSIndicator")) {

    window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);
  
    var tl = gsap.timeline({repeat: 0});
  
    tl.to(".loading", {
      opacity: 0,
      duration: 1,
    })

    const spotlessPodcastSeriesSectionTL = gsap.timeline( {    
      scrollTrigger: {
        trigger: ".spotlessPodcastSeriesSectionContainer",
        scrub: true,
        start: "40% bottom",
        end: "80% 95%",
        toggleActions: "play reverse play reverse",
      }
    });
  
    spotlessPodcastSeriesSectionTL
    .to(
      '.ideaspage-section-transition-container .section-transition.white', 
      { 
        opacity: 0, 
        duration: 1 
      },"transition1"
    );

    spotlessPodcastSeriesSectionTL
    .to(
      '.ideaspage-section-transition-container .section-transition.gradientDark1', 
      { 
        opacity: 1, 
        duration: 1 
      },"transition1"
    );

  }
});
