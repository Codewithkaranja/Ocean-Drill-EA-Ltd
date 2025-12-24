/* ===============================
      MOBILE MENU TOGGLE & HEADER EFFECTS
=============================== */
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");
const header = document.querySelector("header");
const pageHeader = document.querySelector(".page-header");
let lastScrollY = window.scrollY;

if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("active");  // CHANGED: "mobile-active" to "active"
    mobileMenuBtn.classList.toggle("open");

    // stagger links animation
    const links = mainNav.querySelectorAll("a");
    links.forEach((link, index) => {
      link.style.transitionDelay = mainNav.classList.contains("active")  // CHANGED: "mobile-active" to "active"
        ? `${index * 0.1}s`
        : "0s";
    });
  });

  // Close menu when a link is clicked
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");  // CHANGED: "mobile-active" to "active"
      mobileMenuBtn.classList.remove("open");
    });
  });
}

// Header scroll effects
if (header) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // Shrink header
    if (currentScroll > 80) {
      header.classList.add("header-small");
    } else {
      header.classList.remove("header-small", "header-transparent");
    }

    // Scroll direction → transparency
    if (currentScroll > lastScrollY && currentScroll > 80) {
      header.classList.add("header-transparent");
    } else if (currentScroll < lastScrollY) {
      header.classList.remove("header-transparent");
    }

    // Sticky shadow
    header.style.boxShadow = currentScroll > 100
      ? "0 4px 12px rgba(0, 0, 0, 0.1)"
      : "none";

    // Parallax effect
    if (pageHeader) {
      pageHeader.style.backgroundPositionY = currentScroll * 0.5 + "px";
    }

    lastScrollY = currentScroll;
  });
}

// Fade-in header texts
const headerTexts = document.querySelectorAll(".animate-text");
if (headerTexts.length) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  headerTexts.forEach(el => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });
}


      // System Tabs
      const systemTabs = document.querySelectorAll(".system-tab");
      const systemContents = document.querySelectorAll(".system-content");

      systemTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          // Remove active class from all tabs and contents
          systemTabs.forEach((t) => t.classList.remove("active"));
          systemContents.forEach((c) => c.classList.remove("active"));

          // Add active class to clicked tab
          tab.classList.add("active");

          // Show corresponding content
          const tabId = tab.getAttribute("data-tab");
          document.getElementById(tabId).classList.add("active");
        });
      });

      // FAQ Accordion
      const faqItems = document.querySelectorAll(".faq-item");

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
          // Close all other items
          faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("active");
            }
          });

          // Toggle current item
          item.classList.toggle("active");
        });
      });

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: "smooth",
            });
          }
        });
      });

      // Header background on scroll
      window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (window.scrollY > 100) {
          header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
        } else {
          header.style.boxShadow = "none";
        }
      });

      // Benefit card hover animation
      const benefitCards = document.querySelectorAll(".benefit-card");
      benefitCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          card.style.transform = "translateY(-10px)";
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "translateY(0)";
        });
      });

  // Swiper Slider — Endless Loop on All Devices
// Swiper Slider — Endless Loop without Jump
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  loopedSlides: 12, // duplicates enough slides to remove jump
  coverflowEffect: {
    rotate: 30,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: { slidesPerView: 1 },
    480: { slidesPerView: 1.2 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1400: { slidesPerView: 3 },
  },
});


  //stats counter
  document.addEventListener("DOMContentLoaded", () => {
  const stats = document.querySelectorAll(".stat-value");

  const startCount = (el) => {
    const originalText = el.innerText.trim();

    // Ignore non-numeric values like 24/7
    if (/^\d+\/\d+$/.test(originalText)) return;

    // Extract number part only
    const target = parseInt(originalText);
    if (isNaN(target)) return;

    const isPercent = originalText.includes("%");
    const isPlus = originalText.includes("+");

    let current = 0;
    const duration = 2000; // Total time for animation
    const increment = Math.ceil(target / (duration / 50)); // Smooth step

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(counter);
      }
      el.innerText =
        current + (isPercent ? "%" : "") + (isPlus ? "+" : "");
    }, 50);
  };

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCount(entry.target);
          observerInstance.unobserve(entry.target); // Prevent repeat animation
        }
      });
    },
    {
      threshold: 0.4, // Starts when 40% of element is visible
    }
  );

  stats.forEach((stat) => observer.observe(stat));
});

//benefits swiper slider
const benefitSwiper = new Swiper(".benefits-swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  grabCursor: true,
  breakpoints: {
    1024: { slidesPerView: 3 },
    768: { slidesPerView: 2 },
    0: { slidesPerView: 1 },
  },
});