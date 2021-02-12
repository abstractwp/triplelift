$(window).on("load", function(){

  if (document.getElementById("productPageJSIndicator")) {

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
    
    laptopBreakout.from(".laptop-breakout img:nth-child(4)", {
      scale: .9,
      y: 10,
      x: 30,
      duration: .4,
    },
    "laptop-breakout"
    )
    
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
        end: "80px 20%",
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
      '.innovation-header-container .bg', 
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
        opacity: .8, 
        duration: 1 
      },"transition5"
    );
  
    
  }
});
