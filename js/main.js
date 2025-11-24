document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const mobileBreakpoint = 900;

  const closeMenu = () => {
    if (!header || !menuToggle) return;
    header.classList.remove("is-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    if (!header || !menuToggle) return;
    const isOpen = header.classList.toggle("is-menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav?.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", closeMenu)
  );

  window.addEventListener("resize", () => {
    if (window.innerWidth > mobileBreakpoint) {
      closeMenu();
    }
  });

  const slider = document.querySelector(".about-slider");
  if (!slider) return;

  const track = slider.querySelector(".about-slider-track");
  const slides = Array.from(slider.querySelectorAll(".about-slide"));
  const dotsContainer = slider.querySelector(".about-dots");
  const prevBtn = slider.querySelector(".about-slider-btn.prev");
  const nextBtn = slider.querySelector(".about-slider-btn.next");

  let currentIndex = 0;
  let autoTimer = null;

  // Nokta kontrol butonlarını oluştur
  slides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.type = "button";
    if (idx === 0) dot.classList.add("is-active");
    dot.addEventListener("click", () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll("button"));

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
    restartAutoSlide();
  }

  function updateDots() {
    dots.forEach((dot, idx) => {
      dot.classList.toggle("is-active", idx === currentIndex);
    });
  }

  function restartAutoSlide() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => goToSlide(currentIndex + 1), 5000);
  }

  prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

  restartAutoSlide();
});
