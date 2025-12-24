/* ===============================
      MOBILE MENU TOGGLE & HEADER EFFECTS
=============================== */
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");
const header = document.querySelector("header");
const pageHeader = document.querySelector(".page-header");
let lastScrollY = window.scrollY;

/* ===============================
      MOBILE MENU
=============================== */
if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("mobile-active");
    mobileMenuBtn.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);

    // stagger link animations
    const links = mainNav.querySelectorAll("a");
    links.forEach((link, index) => {
      link.style.transitionDelay = isOpen ? `${index * 0.1}s` : "0s";
    });
  });

  // Close menu when clicking any link
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("mobile-active");
      mobileMenuBtn.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mainNav.classList.contains("mobile-active") &&
      !mainNav.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      mainNav.classList.remove("mobile-active");
      mobileMenuBtn.classList.remove("open");
      document.body.classList.remove("menu-open");
    }
  });
}

/* ===============================
      HEADER SCROLL EFFECTS
=============================== */
if (header) {
  window.addEventListener("scroll", () => {
    const current = window.scrollY;

    // Shrink header
    header.classList.toggle("header-small", current > 80);

    // Scroll direction transparency
    if (current > lastScrollY && current > 80) {
      header.classList.add("header-transparent");
    } else {
      header.classList.remove("header-transparent");
    }

    // Header shadow when sticky
    header.style.boxShadow =
      current > 100 ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none";

    lastScrollY = current;
  });
}

/* ===============================
      FADE-IN HEADER TEXT
=============================== */
const headerTexts = document.querySelectorAll(".animate-text");
if (headerTexts.length) {
  const textObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  headerTexts.forEach(el => {
    el.style.animationPlayState = "paused";
    textObserver.observe(el);
  });
}

/* ===============================
      SMOOTH SCROLLING
=============================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const id = this.getAttribute("href");

    if (id === "#") return;

    e.preventDefault();

    // Close mobile menu if open
    if (mainNav?.classList.contains("mobile-active")) {
      mainNav.classList.remove("mobile-active");
      mobileMenuBtn.classList.remove("open");
      document.body.classList.remove("menu-open");
    }

    document.querySelector(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

/* ===============================
      FAQ ACCORDION
=============================== */
document.querySelectorAll(".faq-item").forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    document.querySelectorAll(".faq-item").forEach(other => {
      if (other !== item) other.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

/* ===============================
      SCROLL REVEAL (IntersectionObserver)
=============================== */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal, .page-header").forEach(el =>
  revealObserver.observe(el)
);

/* ===============================
      PARALLAX EFFECT (Optimized)
=============================== */
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (pageHeader) {
        pageHeader.style.backgroundPositionY = window.scrollY * 0.3 + "px";
      }
      ticking = false;
    });
    ticking = true;
  }
});

/* ===============================
      MOBILE DROPDOWN MENU
=============================== */
document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
  toggle.addEventListener("click", function (e) {
    if (window.innerWidth > 992) return; // desktop ignores click
    e.preventDefault();
    this.parentElement.classList.toggle("dropdown-open");
  });
});
