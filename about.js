document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------
  // MOBILE MENU TOGGLE
  // -------------------------------
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");
  const body = document.body;

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      
      // Toggle active classes
      mobileMenuBtn.classList.toggle("open");
      mainNav.classList.toggle("mobile-active");
      body.classList.toggle("menu-open");
      
      // Prevent scrolling when menu is open
      if (mainNav.classList.contains("mobile-active")) {
        body.style.overflow = "hidden";
        // Staggered animation for menu links
        const links = mainNav.querySelectorAll("a");
        links.forEach((link, index) => {
          link.style.transitionDelay = `${index * 0.1}s`;
        });
      } else {
        body.style.overflow = "";
        // Reset transition delays when closing
        mainNav.querySelectorAll("a").forEach(link => {
          link.style.transitionDelay = "0s";
        });
      }
    });

    // Close menu when clicking on a link
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("open");
        mainNav.classList.remove("mobile-active");
        body.classList.remove("menu-open");
        body.style.overflow = "";
        
        // Reset transition delays
        mainNav.querySelectorAll("a").forEach(l => {
          l.style.transitionDelay = "0s";
        });
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove("open");
        mainNav.classList.remove("mobile-active");
        body.classList.remove("menu-open");
        body.style.overflow = "";
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("mobile-active")) {
        mobileMenuBtn.classList.remove("open");
        mainNav.classList.remove("mobile-active");
        body.classList.remove("menu-open");
        body.style.overflow = "";
      }
    });
  }

  // -------------------------------
  // HEADER SCROLL EFFECTS
  // -------------------------------
  const header = document.querySelector("header");
  const pageHeader = document.querySelector(".page-header");
  let lastScrollY = window.scrollY;
  let ticking = false;

  if (header) {
    const updateHeader = () => {
      const currentScroll = window.scrollY;

      // Shrink header after 80px
      if (currentScroll > 80) {
        header.classList.add("header-small");
      } else {
        header.classList.remove("header-small", "header-transparent");
      }

      // Scroll direction → transparency (only if not on mobile menu)
      if (!mainNav?.classList.contains("mobile-active")) {
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

      // Parallax effect for page-header
      if (pageHeader) {
        pageHeader.style.backgroundPositionY = currentScroll * 0.5 + "px";
      }

      lastScrollY = currentScroll;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }

  // -------------------------------
  // FADE-IN HEADER TEXT
  // -------------------------------
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

  // -------------------------------
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // -------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      // Close mobile menu if open
      if (mainNav?.classList.contains("mobile-active")) {
        mobileMenuBtn?.classList.remove("open");
        mainNav.classList.remove("mobile-active");
        body?.classList.remove("menu-open");
        body.style.overflow = "";
      }

      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate header height for offset
        const headerHeight = header?.offsetHeight || 100;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // -------------------------------
  // SWIPER SLIDERS
  // -------------------------------
  
  // Team Swiper
  const teamSwiper = document.querySelector(".teamSwiper");
  if (teamSwiper) {
    var teamSlider = new Swiper(".teamSwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  // Why Choose Us Swiper
  const chooseSwiper = document.querySelector(".chooseSwiper");
  if (chooseSwiper) {
    var chooseSlider = new Swiper(".chooseSwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: "auto",
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 250,
        modifier: 1,
        slideShadows: false,
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
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      },
    });
  }

  // -------------------------------
  // TEAM MEMBER HOVER ANIMATION
  // -------------------------------
  const teamMembers = document.querySelectorAll(".team-member");
  if (teamMembers.length > 0) {
    teamMembers.forEach(member => {
      member.addEventListener("mouseenter", () => {
        member.style.transform = "translateY(-10px)";
      });
      member.addEventListener("mouseleave", () => {
        member.style.transform = "translateY(0)";
      });
    });
  }

  // -------------------------------
  // COMPANY STORY FADE-IN PARAGRAPHS
  // -------------------------------
  const storyParagraphs = document.querySelectorAll(".story-text p");
  if (storyParagraphs.length > 0) {
    const storyObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    storyParagraphs.forEach(p => storyObserver.observe(p));
  }

  // -------------------------------
  // RESPONSIVE BEHAVIOR: Auto-close menu on resize
  // -------------------------------
  window.addEventListener("resize", () => {
    // Close mobile menu if screen is larger than mobile
    if (window.innerWidth > 768 && mainNav?.classList.contains("mobile-active")) {
      mobileMenuBtn?.classList.remove("open");
      mainNav.classList.remove("mobile-active");
      body?.classList.remove("menu-open");
      body.style.overflow = "";
    }
  });
});