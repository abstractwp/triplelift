$(window).on("load", function(){

  if (document.getElementById("companyPageJSIndicator")) {

    window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);
  
    var tl = gsap.timeline({repeat: 0});
  
    tl.to(".loading", {
      opacity: 0,
      duration: 1,
    })

    const missionSectionTransition = gsap.timeline( {    
      scrollTrigger: {
        trigger: ".company-page-section.mission",
        scrub: true,
        start: "top center",
        end: "10% center",
        toggleActions: "play reverse play reverse",
      }
    });
  
    missionSectionTransition
    .to(
      '.company-page-sticky-animation.grey-mark', 
      { 
        opacity: 1, 
        duration: 1 
      },"transition1"
    );
  }
});
