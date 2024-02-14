import { ob } from "./intersectionObserver.js";
///////////////////////////////////////////////////////////
// // Set current year
// const yearEl = document.querySelector(".year");
// const currentYear = new Date().getFullYear();
// yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

//Click: btn-mobile-nav

//Add: nav-open

//ON: .header

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");
});

/////////////////////////////////////////
// Stick navigation

const sectionHeroEl = document.querySelector(".header-section");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    // console.log(ent);
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // in the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);
/////////////////////////////////////////

// Reveal section

const allSection = document.querySelectorAll(".section--reveal");
const optionsList = {
  root: null,
  threshold: 0.1,
};
ob(allSection, "element--hidden", optionsList);

const smoothscrollNav = function (parentClass, childrenClass) {
  document.querySelector(`.${parentClass}`).addEventListener("click", (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    console.log(id);
    if (e.target.classList.contains(childrenClass)) {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });
};

smoothscrollNav("main-nav", "main-nav-link");

// slider
const sliderCreator = function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  let curSlide = 0;
  const maxSlide = slides.length;
  let startX;

  // Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) =>
        //-100%
        (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      // 1
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  // Swipe detection for touch devices
  slider.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });
  slider.addEventListener("touchmove", function (e) {
    if (!startX) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (diff > 0) {
      // Swiped left
      nextSlide();
      activateDot(curSlide);
    }
    // Swiped right
    else {
      prevSlide();
      activateDot(curSlide);
    }
    startX = null; // Reset startX
  });

  slider.addEventListener("touchend", function () {
    startX = null; // Reset startX
  });

  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      activateDot(slide);
      goToSlide(slide);
    }
  });
};
sliderCreator();
