document.addEventListener("DOMContentLoaded", function () {

  // Tell CSS that JS loaded successfully
  document.body.classList.add("js-enabled");

  // -----------------------
  // Mobile nav toggle
  // -----------------------

  const navElement = document.querySelector("nav");
  const navList = document.querySelector("nav ul");

  if (navElement && navList) {

    const navToggle = document.createElement("button");
    navToggle.textContent = "☰";
    navToggle.classList.add("nav-toggle");

    navElement.insertBefore(navToggle, navList);

    navToggle.addEventListener("click", () => {
      navList.classList.toggle("show");
    });
  }

  // -----------------------
  // Smooth scrolling for anchor links
  // -----------------------

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // -----------------------
  // Fade-in animation on scroll
  // -----------------------

  const faders = document.querySelectorAll("section, .card");

  if ("IntersectionObserver" in window) {

    const appearOnScroll = new IntersectionObserver(function(
      entries,
      observer
    ) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.15
    });

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });

  } else {
    // Fallback if IntersectionObserver fails
    faders.forEach(fader => {
      fader.classList.add("fade-in");
    });
  }

  // -------------------------------------
  // Smooth 3D card hover effect (Desktop only)
  // -------------------------------------

  if (window.innerWidth > 768) {

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      let yPos = 0;
      let target = 0;
      let animId = null;

      const animate = () => {
        const speed = target < yPos ? 0.08 : 0.15;
        yPos += (target - yPos) * speed;

        card.style.transform =
          `translateY(${yPos}px) rotateX(${yPos * 0.15}deg) rotateY(${yPos * 0.15}deg) scale(${1 + Math.abs(yPos) * 0.004})`;

        card.style.boxShadow =
          `0 ${4 + Math.abs(yPos) * 2}px ${10 + Math.abs(yPos) * 2}px rgba(0,0,0,0.2)`;

        if (Math.abs(target - yPos) < 0.2) {
          animId = null;
          return;
        }

        animId = requestAnimationFrame(animate);
      };

      card.addEventListener('mouseenter', () => {
        target = -25;
        if (!animId) animId = requestAnimationFrame(animate);
      });

      card.addEventListener('mouseleave', () => {
        target = 0;
        if (!animId) animId = requestAnimationFrame(animate);
      });
    });
  }

  // ---------
  // Timeline (Desktop hover + Mobile tap)
  // ---------

  const timelineEvents = document.querySelectorAll('.timeline-event');
  const detailBox = document.getElementById('timeline-detail');

  if (detailBox && timelineEvents.length > 0) {

    timelineEvents.forEach(event => {

      event.addEventListener('mouseenter', () => {
        detailBox.textContent =
          `${event.dataset.year}: ${event.dataset.detail}`;
      });

      event.addEventListener('mouseleave', () => {
        detailBox.textContent =
          'Hover or tap a year to see details';
      });

      event.addEventListener('click', () => {
        detailBox.textContent =
          `${event.dataset.year}: ${event.dataset.detail}`;
      });

    });
  }

});
