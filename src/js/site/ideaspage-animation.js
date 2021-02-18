$(window).on("load", function(){

  if (document.getElementById("ideasPageJSIndicator")) {

    window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);
  
    var tl = gsap.timeline({repeat: 0});
  
    tl.to(".loading", {
      opacity: 0,
      duration: 1,
    })

    const latestBlogPostsSectionTL = gsap.timeline( {    
      scrollTrigger: {
        trigger: ".latest-blog-posts-section-container",
        scrub: true,
        start: "0% bottom",
        end: "20% 95%",
        toggleActions: "play reverse play reverse",
      }
    });
  
    latestBlogPostsSectionTL
    .to(
      '.ideaspage-section-transition-container .section-transition.section1', 
      { 
        opacity: 0, 
        duration: 1 
      },"transition1"
    );
    
    latestBlogPostsSectionTL
    .to(
      '.ideaspage-section-transition-container .section-transition.white', 
      { 
        opacity: 1, 
        duration: 1 
      },"transition1"
    );

  }
});
