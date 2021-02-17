window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);

var tl = gsap.timeline({repeat: 0});


tl.to(".loading", {
  opacity: 0,
  duration: .5,
})

tl.set(".burger-and-fries-container", {
  opacity: 1
})

tl.from("#navigation .logo-in-navigation", {
  y: -20,
  opacity: 0,
  duration: .2,
  delay: 1.2
})

tl.from("#navigation .burger-and-fries", {
  y: -20,
  opacity: 0,
  duration: .5,
  delay: .5
})

tl.from("#navigation .menu-on-large .main-nav a", {
  x: 50,
  y: -40,
  opacity: 0,
  duration: .2,
  stagger: {
    amount: .5
  },
})

tl.from(".down-arrow", {
  opacity: 0,
  y: -10,
  duration: .5
}
)

const downarrowTL = gsap.timeline( {    
scrollTrigger: {
  trigger: ".down-arrow",
  start: "20px center",
  scrub: true,
  toggleActions: "play reverse play reverse",
}
});

downarrowTL
.to(
  '.down-arrow', 
  { 
    opacity: 0, 
    duration: 2,
    y: 100
  }, 0.5)
;

let videoBordersToAnimate = gsap.utils.toArray('.animate-video-border-outer');

videoBordersToAnimate.forEach(item =>{
  const borderScrollItem = gsap.timeline( {    
    scrollTrigger: {
      trigger: item,
      scrub: true,
      start: "20% 80%",
      end: "50% 10%",
      toggleActions: "play reverse play reverse",
    }
  });
  
  borderScrollItem.from(item, {
    x: "-100%",
    duration: .2,
  }, "loadin")

  borderScrollItem.to(item, {
    opacity: 1,
    duration: .2,
  }, "loadin")

  borderScrollItem.to(item, {
    opacity: 0,
    x: "100%",
    duration: .4,
    delay: .5,
  })
  
})

let ctaBordersToAnimate = gsap.utils.toArray('.animate-border-outer');

ctaBordersToAnimate.forEach(item =>{
  const borderScrollItem = gsap.timeline( {    
    scrollTrigger: {
      trigger: item,
      start: "10%, 70%",
      end: "90% 10%",
      scrub: true,
      toggleActions: "play reverse play reverse",
    }
  });
  
  borderScrollItem.from(item, {
    x: "-100%",
    duration: .2,
  }, "loadin")

  borderScrollItem.to(item, {
    opacity: 1,
    duration: .2,
  }, "loadin")

  borderScrollItem.to(item, {
    opacity: 0,
    x: "100%",
    duration: .4,
    delay: .5,
  })
  
})

let texturesToAnimateUp = gsap.utils.toArray('.vertical-texture-animation');

texturesToAnimateUp.forEach(item =>{
  const textureScrollItem = gsap.timeline( {    
    scrollTrigger: {
      trigger: item,
      scrub: true,
      end: "100%",
      toggleActions: "play reverse play reverse",
    }
  });
  
  textureScrollItem.from(item, {
    backgroundPosition: "0px 200px",
    duration: 6,
    stagger: 1
  })
  
})