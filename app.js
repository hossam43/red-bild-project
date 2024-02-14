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
