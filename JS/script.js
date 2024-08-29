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
