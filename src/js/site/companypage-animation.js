$(window).on("load", function(){

  if (document.getElementById("companyPageJSIndicator")) {

    window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);
  
    var tl = gsap.timeline({repeat: 0});
  
    tl.to(".loading", {
      opacity: 0,
      duration: 1,
    })

    if (window.innerWidth > 1023 ) {
      const pinTheDonkey = gsap.timeline( {
        scrollTrigger: {
          trigger: ".company-page-section.who-we-are",
          pin: ".sticky-animation-container",
          scrub: true,
          end: "100%",
          toggleActions: "play reverse play reverse",
        }
      });


      const careersSectionParallax = gsap.timeline( {    
        scrollTrigger: {
          trigger: ".careers-section-container",
          scrub: true,
          toggleActions: "play reverse play reverse",
        }
      });
    
      careersSectionParallax
      .to(
        '.careers-section-container .image-bg', 
        { 
          backgroundPosition: "center 20%",
          duration: 1 
        },"transition1"
      );
  

    }




    const missionSectionTransition = gsap.timeline( {    
      scrollTrigger: {
        trigger: ".company-page-section.mission",
        scrub: true,
        start: "top center",
        end: "40% center",
        toggleActions: "play reverse play reverse",
      }
    });
  
    missionSectionTransition
    .to(
      '.company-page-sticky-animation.grey-mark', 
      { 
        opacity: 0, 
        duration: 1 
      },"transition1"
    );




  }
});
