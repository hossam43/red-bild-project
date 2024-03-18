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

const cards = [
  {
    src: "./assets/images/indoor1.webp",
    price: "521.52",
    title: "COVA Home Realty",
    address: "1901 Thornridge Cir.Shilo, Hawai 87410",
    bedNum: "3",
    bathNum: "2",
    sqftNum: "1432",
  },
  {
    src: "./assets/images/indoor2.webp",
    price: "635.25",
    title: "Sunnyvale Dream House",
    address: "1234 Sunflower Lane, Sunnyvale, CA 94086",
    bedNum: "4",
    bathNum: "3",
    sqftNum: "1875",
  },
  {
    src: "./assets/images/indoor3.webp",
    price: "799.99",
    title: "Oceanview Retreat",
    address: "555 Coastal Highway, Malibu, CA 90265",
    bedNum: "2",
    bathNum: "2",
    sqftNum: "1200",
  },
  {
    src: "./assets/images/indoor4.webp",
    price: "899.50",
    title: "Lakefront Cabin",
    address: "789 Pine Street, Big Bear Lake, CA 92315",
    bedNum: "1",
    bathNum: "1",
    sqftNum: "800",
  },
  {
    src: "./assets/images/indoor5.webp",
    price: "749.75",
    title: "Mountain View Retreat",
    address: "4321 Evergreen Drive, Boulder, CO 80302",
    bedNum: "3",
    bathNum: "2.5",
    sqftNum: "1600",
  },
  {
    src: "./assets/images/indoor6.webp",
    price: "1125.00",
    title: "Luxury Penthouse",
    address: "1001 Skyline Avenue, Manhattan, NY 10001",
    bedNum: "5",
    bathNum: "4",
    sqftNum: "2800",
  },

  {
    src: "./assets/images/indoor7.webp",
    price: "899.99",
    title: "Seaside Bungalow",
    address: "123 Beachfront Road, Santa Monica, CA 90401",
    bedNum: "2",
    bathNum: "2",
    sqftNum: "1100",
  },
  {
    src: "./assets/images/indoor8.webp",
    price: "1200.00",
    title: "Urban Loft Living",
    address: "789 Metropolitan Avenue, Brooklyn, NY 11211",
    bedNum: "1",
    bathNum: "1",
    sqftNum: "900",
  },
];
const destinationContainer = document.querySelector(".destination-grid");

let html = "";
cards.forEach((card) => {
  html += `
  <div class="card">
  <div class="card-img-container">
    <figure>
      <img
        class="img-cover"
        src="${card.src}"
        alt=""
      />
    </figure>
  
    <button
      class="icon-btn fav-btn"
      aria-label="add to favorite"
      data-toggle-btn
    >
      <i
        class="bx bx-heart material-symbols-rounded"
        aria-hidden="true"
      ></i>
    </button>
  </div>
  <div class="card-text-container">
    <p class="card-elm card-price">$${card.price}</p>
    <p class="card-elm card-title">${card.title}</p>
    <address class="card-elm card-address">
      ${card.address}
    </address>
  
    <div class="card-footer">
      <div class="card-icons">
        <div class="card-icon bed">
          <span class="icon-f"
            ><i class="bx bx-bed bx-flip-horizontal"></i
          ></span>
          <span> ${card.bedNum} Bed</span>
        </div>
        <div class="card-icon bath">
          <span class="icon-f"><i class="bx bx-bath"></i></span>
          <span>${card.bathNum} Bath</span>
        </div>
        <div class="card-icon sqr">
          <span class="icon-f"
            ><i class="bx bx-ruler bx-flip-horizontal"></i
          ></span>
          <span>${card.sqftNum} sqft</span>
        </div>
      </div>
    </div>
  </div>
  </div>

  `;
});
destinationContainer.insertAdjacentHTML("beforeend", html);

// Add to favorite button toggle
// Add to favorite button toggle
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");

toggleBtns.forEach((toggleBtn) => {
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("active");
    const heartIcon = toggleBtn.querySelector("i");
    toggleBtn.classList.contains("active")
      ? heartIcon.classList.replace("bx-heart", "bxs-heart")
      : heartIcon.classList.replace("bxs-heart", "bx-heart");
  });
});
