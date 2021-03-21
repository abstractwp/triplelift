gsap.config({nullTargetWarn:false});

$(window).on("load", function () {

  // set up hamburger stuff

  $(".js-hamburger").click(function() {
    $(this).toggleClass("is-active");
    $(".fries").toggleClass("show");
    $("body").toggleClass("modal-open");
    $("body").toggleClass("menu-open");
  })

  $(".does-not-work").click(function(e) {
    alert("This does not work yet");
  })

  // Instantiate modals

  MicroModal.init({
    onShow: modal => console.info(`${modal.id} is shown`), // [1]
    onClose: modal => console.info(`${modal.id} is hidden`), // [2]
    openClass: 'is-open', // [5]
    disableScroll: true, // [6]
    disableFocus: false, // [7]
    awaitOpenAnimation: false, // [8]
    awaitCloseAnimation: true, // [9]
  });

  // Instantiate swipers
  const swiper = new Swiper('.swiper-container', {
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.slider-arrow.right',
      prevEl: '.slider-arrow.left',
    },
  
  });

  // // Initialize sticky
  // var sticky = new Sticky('.phone-breakout');

});


// The debounce function receives our function as a parameter
const debounce = (fn) => {

  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {

    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {

      // Call our function and pass any params we received
      fn(...params);
    });

  }
};

// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;    
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), {
  passive: true
});

// Update scroll position for first time
storeScroll();
