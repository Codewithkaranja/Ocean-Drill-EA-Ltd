// Mobile Menu Toggle
/* ===============================
   MOBILE MENU TOGGLE & HEADER EFFECTS
=============================== */
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");
const header = document.querySelector("header");
const pageHeader = document.querySelector(".page-header");
let lastScrollY = window.scrollY;

// Add body element reference for overflow control
const body = document.body;

if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener("click", () => {
    // Toggle both classes for CSS consistency
    mainNav.classList.toggle("active"); // This matches your CSS selector: nav.active
    mainNav.classList.toggle("mobile-active"); // Keep for backward compatibility
    
    mobileMenuBtn.classList.toggle("open");
    
    // Prevent body scrolling when menu is open
    if (mainNav.classList.contains("active")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    
    // stagger links animation
    const links = mainNav.querySelectorAll("a");
    links.forEach((link, index) => {
      link.style.transitionDelay = mainNav.classList.contains("active")
        ? `${index * 0.1}s`
        : "0s";
    });
  });

  // Close menu when a link is clicked
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active", "mobile-active");
      mobileMenuBtn.classList.remove("open");
      body.style.overflow = "";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (mainNav.classList.contains("active") && 
        !mainNav.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
      mainNav.classList.remove("active", "mobile-active");
      mobileMenuBtn.classList.remove("open");
      body.style.overflow = "";
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNav.classList.contains("active")) {
      mainNav.classList.remove("active", "mobile-active");
      mobileMenuBtn.classList.remove("open");
      body.style.overflow = "";
    }
  });

  // Auto-close menu on window resize (if going to desktop)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mainNav.classList.contains("active")) {
      mainNav.classList.remove("active", "mobile-active");
      mobileMenuBtn.classList.remove("open");
      body.style.overflow = "";
    }
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

    // Scroll direction → transparency (only if menu is closed)
    if (!mainNav || !mainNav.classList.contains("active")) {
      if (currentScroll > lastScrollY && currentScroll > 80) {
        header.classList.add("header-transparent");
      } else if (currentScroll < lastScrollY) {
        header.classList.remove("header-transparent");
      }
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

// Contact Form Submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const firstName = document.getElementById("firstName").value;
    const phone = document.getElementById("phone").value;

    // Show success message
    alert(
      `Thank you ${firstName}! We have received your inquiry and will contact you at ${phone} within 24 hours.`
    );

    // Reset form
    contactForm.reset();
  });
}

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

    // Close mobile menu if open
    if (mainNav && mainNav.classList.contains("active")) {
      mainNav.classList.remove("active", "mobile-active");
      mobileMenuBtn.classList.remove("open");
      body.style.overflow = "";
    }

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Calculate offset with header height
      const headerHeight = header ? header.offsetHeight : 100;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Method card hover animation
const methodCards = document.querySelectorAll(".method-card");
methodCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// Scrolled class for header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 60);
  }
});