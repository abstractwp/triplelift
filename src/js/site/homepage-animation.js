if (document.getElementById("homepageJSIndicator")) {
gsap.config({nullTargetWarn:false});

window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);

var tl = gsap.timeline({repeat: 0});

tl.to(".loading", {
  opacity: 0,
  duration: .5,
})

tl.from(".homepage .phone-breakout", {
  opacity: 0, 
  y: 20,
  duration: .5,
  },
  "phone-breakout-slide-up"
)

tl.from(".homepage .phone-breakout img:nth-child(1)", {
  x: -10,  
  duration: .4,
  },
  "phone-breakout"
)

tl.from(".homepage .phone-breakout img:nth-child(2)", {
  opacity: 0,
  x: -10,  
  duration: .4,
},
"phone-breakout"
)

tl.from(".homepage .phone-breakout img:nth-child(3)", {
  scale: .95,
  x: 15,
  duration: .4,
},
"phone-breakout"
)

tl.from(".homepage .phone-breakout img:nth-child(4)", {
  scale: .9,
  y: 10,
  x: 30,
  duration: .4,
},
"phone-breakout"
)

tl.from(".homepage .phone-breakout img:nth-child(5)", {
  opacity: 0,
  scale: .9,
  y: 10,
  x: 30,
  duration: .4,
},
"phone-breakout"
)

tl.from(".homepage .phone-breakout img:nth-child(6)", {
  opacity: 0,
  scale: .9,
  y: 10,
  x: 30,
  duration: .4,
},
"phone-breakout-2"
)

tl.from(".homepage .phone-breakout .video", {
  opacity: 0,
  scale: .95,
  y: 5,
  x: 5,
  duration: 1
},
"phone-breakout"
)

tl.from(".homepage-hero .copy *", {
  opacity: 0,
  y: 10,
  duration: .6,
  stagger: .2
}, "loadTheRest")


tl.from(".homepage .slider-arrow.left", {
  opacity: 0,
  scale: 0,
  duration: .3,
  x: 50,
}, "arrows")

tl.from(".homepage .slider-arrow.right", {
  opacity: 0,
  scale: 0,
  duration: .3,
  x: -50,
}, "arrows")

tl.from(".homepage-hero .cta", {
  opacity: 0,
  y: -10,
}
)

tl.from(".homepage-hero .swiper-pagination", {
  opacity: 0,
  y: -10,
}
)

const parallaxHomePageHero = gsap.timeline( {    
    scrollTrigger: {
      trigger: ".homepage-hero",
      start: "top top",
      end: "100% center",
      scrub: true,
      markers: true,
    },
    yoyo: true,
    delay: 2
  });

  parallaxHomePageHero
  .to(
    ".homepage-hero .swiper-pagination", 
    { 
      delay: 1,
      opacity: 0, 
      duration: 1,
      y: -20
    }, "first")
  ;

  parallaxHomePageHero
  .to(
    '.homepage-hero .cta', 
    { 
      opacity: 0, 
      duration: 1,
      y: -20
    }, "first")
  ;

  parallaxHomePageHero
  .to(
    '.homepage-hero .copy > *', 
    { 
      delay: 2,
      opacity: 0, 
      duration: 1,
      y: -20,
      stagger: .3
    }, "copy")
    ;


  parallaxHomePageHero
  .to(
    '.homepage-hero .phone-breakout', 
    { 
      duration: 10,
      y: 300,
    }, "first")
  ;

  parallaxHomePageHero
  .to(
    '.homepage-hero .phone-breakout > *', 
    { 
      y: -20,
      opacity: 0,
      duration: 2,
      stagger: -.5
    }, "each-element")
  ;


  // const parallaxHomePageHeroPhoneBreakOut = gsap.timeline( {    
  //   scrollTrigger: {
  //     trigger: ".homepage-hero",
  //     pin: ".slider-static",
  //     start: "top top",
  //     end: "+=500",
  //     markers: true,
  //     scrub: true
  //   }
  // });


  // parallaxHomePageHeroPhoneBreakOut
  // .to(
  //   '.homepage-hero .phone-breakout', 
  //   { 
  //     duration: 2,
  //     y: 200,
  //   })
  // ;


const whyTripleLiftParallax = gsap.timeline( {    
  scrollTrigger: {
    trigger: ".why-triplelift",
    scrub: true,
    end: "-=70%",
    toggleActions: "play",
  }
});

whyTripleLiftParallax
  .from(
    '.why-triplelift h2', 
    { 
      opacity: 0, 
      duration: .5,
      y: 20
    })
  ;


whyTripleLiftParallax
  .from(
    '.why-triplelift-section', 
    { 
      opacity: 0, 
      duration: .3,
      x: -20,
      stagger: .05
    });

const exploreGalleryParallax = gsap.timeline( {    
  scrollTrigger: {
    trigger: ".explore-our-gallery-container",
    scrub: true,
    end: "10%",
    toggleActions: "play",
  }
});

exploreGalleryParallax
  .to(
    '.why-triplelift-section', 
    { 
      duration: 1,
      y: -20,
  }, "exploreGallery");


exploreGalleryParallax
  .from(
    '.explore-our-gallery-container > *', 
    { 
      opacity: .5,
      duration: .6,
  }, "exploreGallery");

const weWorkWithParallax = gsap.timeline( {    
  scrollTrigger: {
    trigger: ".we-work-with",
    start: "-15% center",
    end: "40% center",
    scrub: true,
    toggleActions: "play reverse play reverse",
  }
});

weWorkWithParallax.from(".we-work-with h3", {
  opacity: 0,
  y: 40,
  duration: .3,
}, "weWorkWith")

weWorkWithParallax.to(".explore-our-gallery-container ", {
  y: -100,
  duration: .6,
}, "weWorkWith")

weWorkWithParallax.from(".we-work-with .logo-grid", {
  opacity: 0,
  y: 20,
  duration: .08,
  stagger: .03
}, "weWorkWith", "-=1.2")

let headlines = gsap.utils.toArray('.we-work-with h4 .gradient-border');

headlines.forEach(item =>{
  const weWorkWithHeadlineBorder = gsap.timeline( {    
    scrollTrigger: {
      trigger: item,
      scrub: true,
      toggleActions: "play reverse play reverse",
    }
  });
  
  weWorkWithHeadlineBorder.from(item, {
    x: "-100%",
    duration: .2,
  })
})

// section transitions 

const whyTLGradientTL = gsap.timeline( {    
  scrollTrigger: {
    trigger: ".why-triplelift",
    start: "top bottom",
    end: "60% bottom",
    scrub: true,
    toggleActions: "play reverse play reverse",
  }
});

whyTLGradientTL
  .to(
    '.homepage-section-transition-container .section-transition.transition2', 
    { 
      opacity: 1, 
      duration: 1 
    }, "why-triplelift"
);

// const exploreGalleryGradientTL = gsap.timeline( {    
//   scrollTrigger: {
//     trigger: ".explore-our-gallery-container",
//     start: "-100% center",
//     end: "20% center",
//     scrub: true,
//     toggleActions: "play reverse play reverse",
//   }
// });

// exploreGalleryGradientTL
//   .to(
//     '.homepage-section-transition-container .section-transitions.section2', 
//     { 
//       opacity: 0, 
//       duration: .5 
//     }, "explore"
// );


// exploreGalleryGradientTL
//   .to(
//     '.homepage-section-transition-container .section-transition.section3', 
//     { 
//       opacity: 1, 
//       duration: .5 
//     }, "explore"
// );

// const weWorkWithGradientTL = gsap.timeline( {    
//   scrollTrigger: {
//     trigger: ".we-work-with",
//     start: "top center",
//     end: "60% center",
//     scrub: true,
//     toggleActions: "play reverse play reverse",
//   }
// });

}