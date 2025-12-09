document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenu = document.querySelector(".close-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-links li a");

  function toggleMenu() {
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "auto";
  }

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  if (closeMenu) {
    closeMenu.addEventListener("click", toggleMenu);
  }

  // Close menu when clicking a link
  mobileLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const alreadyActive = header.classList.contains("active");

      // Close all open accordions
      document.querySelectorAll(".accordion-header").forEach((h) => {
        h.classList.remove("active");
        h.nextElementSibling.style.maxHeight = null;
      });

      // If it wasn't already active, open it
      if (!alreadyActive) {
        header.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Sticky Header Effect
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.padding = "10px 0";
      header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    } else {
      header.style.padding = "15px 0";
      header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)";
    }
  });

  // Booking Form (Mock)
  const bookingForm = document.querySelector(".booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = bookingForm.querySelectorAll("input");
      let filled = true;
      inputs.forEach((input) => {
        if (!input.value) filled = false;
      });

      if (filled) {
        alert(
          "Thank you! Your booking request has been received. We will call you shortly."
        );
        bookingForm.reset();
      }
    });
  }

  // Smooth Scroll for Anchor Links (with offset for fixed header)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
  // New FAQ Accordion Logic
  const newFaqQuestions = document.querySelectorAll(".faq-question");

  newFaqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const answer = question.nextElementSibling;

      // Close other open items
      document.querySelectorAll(".faq-item").forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      // Toggle current item
      item.classList.toggle("active");
      if (item.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
  // Scroll Animation Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
});
