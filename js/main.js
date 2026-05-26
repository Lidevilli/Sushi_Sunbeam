(function () {

  document.addEventListener("DOMContentLoaded", () => {
    initBurger();
    initNavHighlight();
    initSlider();
    initContactForm();
    initReviewForm();
  });

  function initBurger() {
    const header = document.querySelector(".header");
    const burger = document.querySelector(".header__burger");
    const nav = document.querySelector(".header__nav");

    if (!header || !burger || !nav) return;

    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      header.classList.toggle("header--menu-open");
    });

    document.addEventListener("click", (e) => {
      if (!header.classList.contains("header--menu-open")) return;
      if (!header.contains(e.target)) {
        header.classList.remove("header--menu-open");
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 769) {
        header.classList.remove("header--menu-open");
      }
    });
  }

  function initNavHighlight() {
    const pageKey = document.documentElement.getAttribute("data-page");
    if (!pageKey) return;

    const items = document.querySelectorAll(".nav__item[data-page]");
    items.forEach((item) => {
      if (item.getAttribute("data-page") === pageKey) {
        item.classList.add("nav__item--active");
      }
    });
  }

  function initSlider() {
    const slider = document.querySelector('[data-slider="promos"]');
    if (!slider) return;

    const track = slider.querySelector(".slider__track");
    const slides = [...slider.querySelectorAll(".slider__slide")];
    const dots = [...slider.querySelectorAll(".slider__dot")];
    const btnPrev = slider.querySelector(".slider__control--prev");
    const btnNext = slider.querySelector(".slider__control--next");

    if (!track || slides.length === 0) return;

    let current = 0;
    const interval = 5500;
    let timer = null;
    let isHovered = false;
    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle("slider__dot--active", i === current));
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(() => {
        if (!isHovered) next();
      }, interval);
    }

    if (btnNext) btnNext.addEventListener("click", () => { next(); startAuto(); });
    if (btnPrev) btnPrev.addEventListener("click", () => { prev(); startAuto(); });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goTo(index);
        startAuto();
      });
    });

    slider.addEventListener("mouseenter", () => isHovered = true);
    slider.addEventListener("mouseleave", () => isHovered = false);

    // Touch swipe
    slider.addEventListener("touchstart", (e) => {
      if (!e.touches.length) return;
      startX = e.touches[0].clientX;
      currentX = startX;
      isSwiping = true;
    });

    slider.addEventListener("touchmove", (e) => {
      if (!isSwiping || !e.touches.length) return;
      currentX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", () => {
      if (!isSwiping) return;
      const diff = currentX - startX;
      const threshold = 40;

      if (Math.abs(diff) > threshold) {
        diff < 0 ? next() : prev();
        startAuto();
      }

      isSwiping = false;
    });

    goTo(0);
    startAuto();
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#contact-name");
      const comment = form.querySelector("#contact-comment");
      let valid = true;

      clearErrors(form);

      if (!name.value.trim()) {
        showError(form, "contact-name", "Введите имя");
        valid = false;
      }

      if (!comment.value.trim()) {
        showError(form, "contact-comment", "Введите комментарий");
        valid = false;
      }

      if (!valid) return;

      alert("Заявка отправлена (имитация отправки). Спасибо!");
      form.reset();
    });
  }

  function initReviewForm() {
    const form = document.getElementById("review-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#review-name");
      const text = form.querySelector("#review-text");
      let valid = true;

      clearErrors(form);

      if (!name.value.trim()) {
        showError(form, "review-name", "Введите имя");
        valid = false;
      }

      if (!text.value.trim()) {
        showError(form, "review-text", "Введите текст отзыва");
        valid = false;
      }

      if (!valid) return;

      alert("Отзыв отправлен (имитация отправки). Спасибо!");
      form.reset();
    });
  }

  function clearErrors(form) {
    form.querySelectorAll(".form__error").forEach((el) => el.textContent = "");
  }

  function showError(form, id, message) {
    const error = form.querySelector(`.form__error[data-for="${id}"]`);
    if (error) error.textContent = message;
  }
















  document.querySelector('.btn--primary').addEventListener('click', () => {
  alert('Заказ оформлен!');
});

})();





