const carousels = document.querySelectorAll(".carousel");
const curSlide = 0; // defaulted to start with the first slide in the HTML
const gap = 50; // this variable determines the separation between the slides in pixels
const numOfSeconds = 5000; // 5000 ml second --so--> 5 seconds. This variable determines the interval between each movement

// This code is only valid when all the focus slides have the same width
let slides = document.querySelectorAll(".slide");
const focusSlideWidth = Array.from(slides).filter((slide) =>
  slide.classList.contains("slide--focus")
)[0].clientWidth;
const unFocusSlideWidth = Array.from(slides).filter((slide) =>
  slide.classList.contains("slide--unfocus")
)[0].clientWidth;

// this function positions slides to be separated by the gap (50px)
const positionSlides = function (direction, slides) {
  slides.forEach((slide, i) => {
    if (i === curSlide) {
      slide.style.transform = `translatex(0)`;
    } else {
      if (direction === "left") {
        slide.style.transform = `translatex(calc(${(i - curSlide) * 100}% + ${
          focusSlideWidth - unFocusSlideWidth
        }px + ${50 * (i - curSlide)}px))`;
      } else {
        slide.style.transform = `translatex(calc(${-(i - curSlide) * 100}% - ${
          focusSlideWidth - unFocusSlideWidth
        }px + ${50 * -(i - curSlide)}px))`;
      }
    }
  });
};

// this function switches the focus to the new slide positioned at the beginning
const switchFocus = function (slide, i) {
  if (i === curSlide) {
    slide.classList.add("slide--focus");
    slide.classList.remove("slide--unfocus");
  } else {
    slide.classList.add("slide--unfocus");
    slide.classList.remove("slide--focus");
  }
};

// this function brings the next slide to the focus by moving all the slides
const nextSlide = function (carousel, direction) {
  let slides = carousel.querySelectorAll(".slide");
  let firstSlide = slides[curSlide];
  carousel.appendChild(firstSlide);
  slides = carousel.querySelectorAll(".slide");
  slides.forEach((slide, i) => {
    switchFocus(slide, i);
    positionSlides(direction, slides);
  });
};

// Here we apply the functionality to each carousel on the page
carousels.forEach((carousel) => {
  let slides = carousel.querySelectorAll(".slide");
  const direction = carousel.className.endsWith("left") ? "left" : "right";
  positionSlides(direction, slides);
  setInterval(function () {
    nextSlide(carousel, direction);
  }, numOfSeconds);
});
