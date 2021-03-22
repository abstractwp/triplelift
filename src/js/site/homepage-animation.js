if (document.getElementById("homepageJSIndicator")) {

gsap.config({nullTargetWarn:false});

document.addEventListener("DOMContentLoaded", function(event) {
  
  window.onload = function() {
    
     // OPTIONAL - waits til next tick render to run code (prevents running in the middle of render tick)
     window.requestAnimationFrame(function() {
    
      var tl = gsap.timeline({repeat: 0});

      tl.from(".homepage", {
        autoAlpha: 0,
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
      "phone-breakout-2"
      )
      
      tl.from(".homepage-hero .copy *", {
        opacity: 0,
        y: 10,
        duration: .3,
        stagger: .1
      }, "a")

      tl.from(".homepage-hero .cta", {
        opacity: 0,
        y: -10,
      }, "a")
      
      tl.from(".homepage .slider-arrow.left", {
        opacity: 0,
        scale: 0,
        duration: .3,
        x: 50,
      }, "a")
      
      tl.from(".homepage .slider-arrow.right", {
        opacity: 0,
        scale: 0,
        duration: .3,
        x: -50,
      }, "a")
            
      tl.from(".homepage-hero .swiper-pagination", {
        opacity: 0,
        y: -10,
      }, "a")

      
      
      const parallaxHomePageHero2 = gsap.timeline( {    
        scrollTrigger: {
          trigger: ".homepage-hero",
          start: "top top",
          end: "100% center",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      });
      
      
      ScrollTrigger.matchMedia({
        "all": function() {
          parallaxHomePageHero2
            .to(
              ".homepage-hero .swiper-pagination", 
              { 
                opacity: 0, 
                duration: 1,
                y: -20
              }, "a")
            ;
            parallaxHomePageHero2
            .to(
              '.homepage-hero .cta', 
              { 
                opacity: 0, 
                duration: 1,
                y: -20
              }, "a")
            ;     
            parallaxHomePageHero2
            .to(
              '.homepage-hero .arrows', 
              { 
                opacity: 0, 
                duration: 1,
                y: -20
              }, "a")
            ;
            parallaxHomePageHero2
            .to(
              '.homepage-hero .inner-slide', 
              { 
                opacity: 0, 
                duration: 1,
                y: -20
              }, "a")
            ;       
        },
      
        "(min-width: 1024px)": function() {
          const parallaxHomePageHero = gsap.timeline( {    
            scrollTrigger: {
              trigger: ".homepage-hero",
              pin: ".swiper-container",
              start: "top top",
              end: "100% center",
              scrub: true,
            }
          });
      
          const parallaxHomePageHero2Large = gsap.timeline( {    
            scrollTrigger: {
              trigger: ".homepage-hero",
              start: "top top",
              end: "100% center",
              scrub: true,
            }
          });
      
          parallaxHomePageHero2Large
          .to(
            '.homepage-hero .copy > *', 
            { 
              opacity: 0, 
              duration: 1,
              y: -20,
              stagger: .3
            }, "a")
            ;

            const parallaxHomePageHero3Large = gsap.timeline( {    
              scrollTrigger: {
                trigger: ".homepage-hero",
                start: "20% top",
                end: "100% center",
                scrub: true,
              }
            });
        
            parallaxHomePageHero3Large
            .to(
              '.homepage-hero .phone-breakout > *', 
              { 
                y: -100,
                opacity: 0,
                duration: 5,
                stagger: -.5
              }, "b")
            ;      
        }
      })
      
      
      const whyTripleLiftParallax = gsap.timeline( {    
        scrollTrigger: {
          trigger: ".why-triplelift",
          scrub: true,
          start: "-25% center",
          end: "top center",
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
            duration: 1,
            x: -10,
            stagger: .5
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
          start: "-25% center",
          end: "200% center",
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
      
      const moveSectionBackground1 = gsap.timeline( {    
        scrollTrigger: {
          trigger: ".why-triplelift",
          start: "top center",
          end: "300% bottom",
          scrub: true,
          toggleActions: "play reverse play reverse",
        }
      });
      
      moveSectionBackground1
        .to(
          '.homepage-section-transition-container .section-transition.transition2', 
          { 
            backgroundPosition: "300% -100%",
            }, "explore"
      );

      const moveSectionBackground2 = gsap.timeline( {    
        scrollTrigger: {
          trigger: ".technology-breakouts",
          start: "top bottom",
          end: "300% bottom",
          scrub: true,
          toggleActions: "play reverse play reverse",
        }
      });
      
      moveSectionBackground2
        .to(
          '.technology-breakouts .plusses', 
          { 
            backgroundPosition: "-200px -50px",
            opacity: .2,
          }, "plusses"
        );
      
        moveSectionBackground2
        .to(
          '.technology-breakouts .plusses-2x', 
          { 
            backgroundPosition: "10% -100px",
            opacity: .3,
          }, "plusses"
        );

        moveSectionBackground2
        .to(
          '.technology-breakouts .plusses-4x', 
          { 
            backgroundPosition: "10% -100px",
            opacity: .1,
          }, "plusses"
        );
        
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
       
     });
    
  };

});



}