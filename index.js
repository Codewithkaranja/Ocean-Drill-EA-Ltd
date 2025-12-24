document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
        MOBILE MENU TOGGLE
  =============================== */
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active"); // Make sure CSS uses "nav.active"
      mobileMenuBtn.classList.toggle("open"); // Optional: toggle hamburger animation
    });

    // Close mobile menu when clicking a link inside nav
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        mobileMenuBtn.classList.remove("open");
      });
    });
  }

  /* ===============================
        FORM SUBMISSION
  =============================== */
  const inquiryForm = document.getElementById("inquiryForm");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Thank you for your inquiry! We will contact you shortly.");
      inquiryForm.reset();
    });
  }

  /* ===============================
        SMOOTH SCROLL FOR ANCHORS
  =============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  /* ===============================
        PREMIUM HEADER SCROLL EFFECT
  =============================== */
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;

  if (header) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;

      // Shrink header after 80px
      if (currentScroll > 80) {
        header.classList.add("header-small");
      } else {
        header.classList.remove("header-small", "header-transparent");
      }

      // Scroll direction
      if (currentScroll > lastScrollY && currentScroll > 80) {
        header.classList.add("header-transparent");
      } else if (currentScroll < lastScrollY) {
        header.classList.remove("header-transparent");
      }

      lastScrollY = currentScroll;
    });
  }

  /* ===============================
        HERO IMAGE SLIDESHOW
  =============================== */
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove("active"));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  if (slides.length) {
    setInterval(() => showSlide(currentSlide + 1), 5000);
  }

  /* ===============================
        SCROLL DOWN ARROW
  =============================== */
  const scrollDown = document.querySelector(".scroll-down");
  if (scrollDown) {
    scrollDown.addEventListener("click", () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    });
  }

  /* ===============================
        TYPEWRITER EFFECT
  =============================== */
  const typewriterElement = document.getElementById("typewriter");
  const words = [
    "' Good To Drill '",
    "Borehole Drilling",
    "Pump Installation",
    "Irrigation Systems",
    "Solar Water Systems"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    if (!typewriterElement) return;

    const word = words[wordIndex];

    if (isDeleting) {
      typewriterElement.textContent = word.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = word.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === word.length) {
      isDeleting = true;
      speed = 1000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 500;
    }

    setTimeout(typeWriter, speed);
  }

  if (typewriterElement) {
    setTimeout(typeWriter, 500);
  }

  /* ===============================
        SWIPER CLIENT LOGO SLIDER
  =============================== */
  const clientSwiper = new Swiper(".clients-swiper", {
    loop: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 30,
    autoplay: { delay: 1500, disableOnInteraction: false },
    effect: "coverflow",
    coverflowEffect: { rotate: 40, stretch: 0, depth: 120, modifier: 2, slideShadows: true },
    breakpoints: {
      1024: { slidesPerView: 4 },
      768: { slidesPerView: 3 },
      480: { slidesPerView: 2 },
      0: { slidesPerView: 1 },
    },
  });
});
