window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);

var tl = gsap.timeline({repeat: 0});

tl.to(".loading", {
  opacity: 0,
  duration: .5,
})

tl.set(".burger-and-fries-container", {
  opacity: 1
},
"phone-breakout"
)

tl.from("#navigation .logo-in-navigation", {
  y: -20,
  opacity: 0,
  duration: .2
},
"phone-breakout"
)

tl.from("#navigation .burger-and-fries", {
  y: -20,
  opacity: 0,
  duration: .5
},
"phone-breakout"
)

tl.from("#navigation .menu-on-large .main-nav a", {
  x: 50,
  y: -40,
  opacity: 0,
  duration: .2,
  stagger: {
    amount: .5
  },
}, "loadTheRest")

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