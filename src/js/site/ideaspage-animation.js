$(window).on("load", function(){

  if (document.getElementById("ideasPageJSIndicator")) {

    window.setTimeout(function(){$(".loading").addClass("not-loading");}, 100);
  
    var tl = gsap.timeline({repeat: 0});
  
    tl.to(".loading", {
      opacity: 0,
      duration: 1,
    })
  }
});
