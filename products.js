// Simple hover effect enhancement
      document.addEventListener("DOMContentLoaded", function () {
        // Add smooth scroll for anchor links
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

        // WhatsApp button animation
        const whatsappBtns = document.querySelectorAll(".btn-whatsapp");
        whatsappBtns.forEach((btn) => {
          btn.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-3px) scale(1.02)";
          });
          btn.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";
          });
        });
      });