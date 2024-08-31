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
const navPlaceHolder = document.querySelector(".nav-placeholder");

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("nav-sticky");
    navPlaceHolder.style.height = `${navHeight}px`;
  } else {
    nav.classList.remove("nav-sticky");
    navPlaceHolder.style.height = `0`;
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);
