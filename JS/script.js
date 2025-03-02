"use strict";

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal .close");
const openButton = document.querySelectorAll(".open-account");
const learnMore = document.querySelector(".learn-more");
const section1 = document.querySelector(".section-1");
const nav = document.querySelector("nav");
const header = document.querySelector("header");

// Modal ----------------------------------------------
const openModal = (e) => {
  e.preventDefault();
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
};
const closeModal = () => {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
};

openButton.forEach((btn) => btn.addEventListener("click", openModal));
closeButton.addEventListener("click", function () {
  closeModal();
});
overlay.addEventListener("click", function () {
  closeModal();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Navigation ----------------------------------------------
header.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.hasAttribute("href") && e.target.getAttribute("href") !== "#") {
    document
      .querySelector(e.target.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  }
});

// Nav hover effect ----------------------------------------------
const opacityHover = function (e) {
  if (e.target.tagName === "A") {
    const siblings = e.target.closest("nav").querySelectorAll("a");

    siblings.forEach((el) => {
      if (el !== e.target) el.style.opacity = this;
    });
    document.querySelector(".logo").style.opacity = this;
  }
};

nav.addEventListener("mouseover", opacityHover.bind(0.5));
nav.addEventListener("mouseout", opacityHover.bind(1));

// Content Tabs ----------------------------------------------
const tabs = document.querySelectorAll(".tab");
const tabsContainer = document.querySelector(".tabs-container");
const tabsContent = document.querySelectorAll(".content");

tabsContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("tab")) return;

  tabs.forEach((tab) => tab.classList.remove("tab-active"));
  e.target.classList.add("tab-active");

  tabsContent.forEach((content) => content.classList.remove("content-active"));
  document
    .querySelector(`.content-${e.target.getAttribute("data-tab")}`)
    .classList.add("content-active");
});

// Sticky Navigation ----------------------------------------------
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("nav-sticky");
  else nav.classList.remove("nav-sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);

// Reveal Sections ----------------------------------------------
const allSections = document.querySelectorAll("section");

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

// Lazy Loading Images ----------------------------------------------
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Slider ----------------------------------------------
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnRight = document.querySelector(".slide-right");
  const btnLeft = document.querySelector(".slide-left");
  const dotsContainer = document.querySelector(".dots");
  let curSlide = 0;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll(".dot")
      .forEach((dot) => dot.classList.remove("dot-active"));

    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add("dot-active");
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === slides.length - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = slides.length - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const init = function () {
    createDots();
    activeDot(0);
    goToSlide(0);
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dot")) {
      curSlide = Number(e.target.dataset.slide);

      goToSlide(curSlide);
      activeDot(curSlide);
    }
  });
};
slider();
