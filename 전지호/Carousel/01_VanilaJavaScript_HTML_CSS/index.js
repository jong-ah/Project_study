const SHOWING_CLASS = "showing";
const CURRENT_CLASS = "current";

const firstSlide = document.querySelector(".slider_item:first-child");
const lastSlide = document.querySelector(".slider_item:last-child");

const prevButton = document.querySelector(".slider_control_prev");
const nextButton = document.querySelector(".slider_control_next");

const indicator = document.querySelector("#indicator");
const firstIndicator = document.querySelector(
  ".slider_control_indicator:first-child"
);
const lastIndicator = document.querySelector(
  ".slider_control_indicator:last-child"
);

function slide() {
  const currentSlide = document.querySelector(`.${SHOWING_CLASS}`);
  const currentIndicator = document.querySelector(`.${CURRENT_CLASS}`);

  if (currentSlide) {
    currentSlide.classList.remove(SHOWING_CLASS);
    const nextSlide = currentSlide.nextElementSibling;

    if (nextSlide) {
      nextSlide.classList.add(SHOWING_CLASS);
    } else {
      firstSlide.classList.add(SHOWING_CLASS);
    }
  } else {
    firstSlide.classList.add(SHOWING_CLASS);
  }

  if (currentIndicator) {
    currentIndicator.classList.remove(CURRENT_CLASS);
    const nextIndicator = currentIndicator.nextElementSibling;

    if (nextIndicator) {
      nextIndicator.classList.add(CURRENT_CLASS);
    } else {
      firstIndicator.classList.add(CURRENT_CLASS);
    }
  } else {
    firstIndicator.classList.add(CURRENT_CLASS);
  }
}

function buttonSlider() {
  const currentSlide = document.querySelector(`.${SHOWING_CLASS}`);
  const currentIndicator = document.querySelector(`.${CURRENT_CLASS}`);

  const prevSlide = currentSlide.previousElementSibling;
  const nextSlide = currentSlide.nextElementSibling;

  const prevIndicator = currentIndicator.previousElementSibling;
  const nextIndicator = currentIndicator.nextElementSibling;

  prevButton.onclick = () => {
    currentSlide.classList.remove(SHOWING_CLASS);
    currentIndicator.classList.remove(CURRENT_CLASS);

    if (prevSlide) {
      prevSlide.classList.add(SHOWING_CLASS);
      prevIndicator.classList.add(CURRENT_CLASS);
    } else {
      lastSlide.classList.add(SHOWING_CLASS);
      lastIndicator.classList.add(CURRENT_CLASS);
    }
  };

  nextButton.onclick = () => {
    currentSlide.classList.remove(SHOWING_CLASS);
    currentIndicator.classList.remove(CURRENT_CLASS);

    if (nextSlide) {
      nextSlide.classList.add(SHOWING_CLASS);
      nextIndicator.classList.add(CURRENT_CLASS);
    } else {
      firstSlide.classList.add(SHOWING_CLASS);
      firstIndicator.classList.add(CURRENT_CLASS);
    }
  };
}

function indicatorSlider() {
  const currentSlide = document.querySelector(`.${SHOWING_CLASS}`);
  const currentIndicator = document.querySelector(`.${CURRENT_CLASS}`);

  const indicatorChild = document.querySelectorAll(".slider_control_indicator");
  const slideChild = document.querySelectorAll(".slider_item");

  indicatorChild.forEach((el, idx) => {
    el.onclick = () => {
      currentSlide.classList.remove(SHOWING_CLASS);
      currentIndicator.classList.remove(CURRENT_CLASS);

      slideChild[idx].classList.add(SHOWING_CLASS);
      el.classList.add(CURRENT_CLASS);
    };
  });
}

slide();
buttonSlider();
indicatorSlider();

let slideInterval = setInterval(slide, 2000);
let buttonInterval = setInterval(buttonSlider, 1000);
let indicatorInterval = setInterval(indicatorSlider, 1000);

prevButton.onmouseover = () => {
  clearInterval(slideInterval);
  buttonInterval = setInterval(buttonSlider, 1000);
};

prevButton.onmouseout = () => {
  clearInterval(buttonInterval);
  slideInterval = setInterval(slide, 2000);
};

nextButton.onmouseover = () => {
  clearInterval(slideInterval);
  buttonInterval = setInterval(buttonSlider, 1000);
};

nextButton.onmouseout = () => {
  clearInterval(buttonInterval);
  slideInterval = setInterval(slide, 2000);
};

indicator.onmouseover = () => {
  clearInterval(slideInterval);
};

indicator.onmouseout = () => {
  slideInterval = setInterval(slide, 2000);
};
