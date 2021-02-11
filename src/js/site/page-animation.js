let ctaBordersToAnimate = gsap.utils.toArray('.animate-border-outer');

ctaBordersToAnimate.forEach(item =>{
  const borderScrollItem = gsap.timeline( {    
    scrollTrigger: {
      trigger: item,
      scrub: true,
      start: "20px, center",
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
