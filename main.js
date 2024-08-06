import translations from "./translations.js";

const languageSelector = document.querySelector("#language-select");
const sliderContainer = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots-container");
const popup = document.getElementById("popup");
const openPopupBtn = document.getElementById("openPopup");
const closeBtn = document.querySelector(".close");
const form = document.getElementById("registrationForm");
let currentSlide = 0;
const slides = [
  {
    id: 1,
    title: "model1",
    img: "/photo1.png",
  },
  {
    id: 2,
    title: "model2",
    img: "/photo2.png",
  },
  {
    id: 3,
    title: "model3",
    img: "/photo3.png",
  },
  {
    id: 4,
    title: "model4",
    img: "/photo4.png",
  },
];
const language = localStorage.getItem("lang") || "en";

document.addEventListener("DOMContentLoaded", init);
languageSelector.addEventListener("click", onLanguageChange);
form.addEventListener("submit", validateForm);
openPopupBtn.onclick = openPopup;
closeBtn.onclick = closePopup;
window.onclick = closePopupOnClickOutside;

function init() {
  setLanguage(language);
  setInterval(autoSlide, 5000);
  renderSlides();
  renderDots();
  updateSlider();
}

function onLanguageChange() {
  let selectedLanguage = localStorage.getItem("lang");
  if (selectedLanguage == "en" || !selectedLanguage) {
    selectedLanguage = "ar";
  } else {
    selectedLanguage = "en";
  }
  setLanguage(selectedLanguage);
  localStorage.setItem("lang", selectedLanguage);
  updateSlider();
}

function setLanguage(language) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const translationKey = element.getAttribute("data-i18n");
    element.textContent = translations[language][translationKey];
  });
  document.dir = language === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = language;
}

function renderSlides() {
  slides.forEach((slide) => {
    const slideDiv = document.createElement("div");
    slideDiv.classList.add("slide");
    slideDiv.innerHTML = `
      <div class="image-container">
        <img src="${slide.img}" alt="${slide.title}">
      </div>
    `;
    sliderContainer.appendChild(slideDiv);
  });
}

function renderDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function autoSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function updateSlider() {
  const offsetDir = document.documentElement.lang === "ar" ? -1 : 1;
  const offset = -currentSlide * 100 * offsetDir;
  sliderContainer.style.transform = `translateX(${offset}%)`;
  const dots = dotsContainer.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function openPopup() {
  popup.style.display = "flex";
}

function closePopup() {
  popup.style.display = "none";
}

function closePopupOnClickOutside(event) {
  if (event.target === popup) {
    popup.style.display = "none";
  }
}

function validateForm(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const country = document.getElementById("country").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!username) {
    alert("Username is required");
    return;
  }

  if (!country) {
    alert("Country is required");
    return;
  }

  if (!validatePhone(phone)) {
    alert("Invalid phone number format");
    return;
  }

  if (!validateEmail(email)) {
    alert("Invalid email format");
    return;
  }
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("country", country);
  sessionStorage.setItem("phone", phone);
  sessionStorage.setItem("email", email);
  window.location.href = "checkout.html";
}

function validatePhone(phone) {
  const phonePattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;
  return phonePattern.test(phone);
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
