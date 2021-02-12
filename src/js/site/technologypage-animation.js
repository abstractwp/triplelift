$(window).on("load", function(){

  if (document.getElementById("technologyPageJSIndicator")) {

    window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);
  
    var tl = gsap.timeline({repeat: 0});
  
    tl.to(".loading", {
      opacity: 0,
      duration: 1,
    })
  
    var laptopBreakout = gsap.timeline({repeat: 0, delay: 1});
  
    laptopBreakout.from(".laptop-breakout", {
      y: 20,
      duration: .5,
      },
      "laptop-breakout-slide-up"
    )
  
    laptopBreakout.to(".laptop-breakout", {
      opacity: 1,
      duration: .5,
      },
      "laptop-breakout-slide-up"
    )
    
    laptopBreakout.from(".laptop-breakout img:nth-child(1)", {
      x: -10,  
      duration: .4,
      },
      "laptop-breakout"
    )
    
    laptopBreakout.from(".laptop-breakout img:nth-child(2)", {
      x: -10,  
      duration: .4,
    },
    "laptop-breakout"
    )
    
    laptopBreakout.from(".laptop-breakout img:nth-child(3)", {
      scale: .95,
      x: 15,
      duration: .4,
    },
    "laptop-breakout"
    )

    laptopBreakout.to(".laptop-breakout img:nth-child(3)", {
      opacity: 0,  
      duration: .4,
      },
      "laptop-breakout"
    )
    
    laptopBreakout.from(".laptop-breakout img:nth-child(4)", {
      scale: .9,
      y: 10,
      x: 30,
      duration: .4,
    },
    "laptop-breakout"
    )

    laptopBreakout.to(".laptop-breakout img:nth-child(4)", {
      opacity: 0,  
      duration: .4,
      },
      "laptop-breakout"
    )

    const computerVisionSectionTransition = gsap.timeline( {    
      scrollTrigger: {
        trigger: ".technologySection1",
        scrub: true,
        end: "5%",
        toggleActions: "play reverse play reverse",
      }
    });
  
    computerVisionSectionTransition
    .to(
      '.technologypage-section-transition-container .section-transition.section2', 
      { 
        opacity: 1, 
        duration: 1 
      },"transition1"
    );
  }
});
