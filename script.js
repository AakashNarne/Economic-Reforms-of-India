
// -----------------------
// Mobile nav toggle
// -----------------------

const navToggle = document.createElement("button");
navToggle.textContent = "☰";
navToggle.classList.add("nav-toggle");

const nav = document.querySelector("nav ul");
document.querySelector("nav").insertBefore(navToggle, nav);

navToggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// -----------------------
// Smooth scrolling for anchor links
// -----------------------

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return; // guard against missing anchors
    target.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// -----------------------
// Fade-in animation on scroll
// -----------------------

const faders = document.querySelectorAll("section, .card");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("fade-in");
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// -------------------------------------
// Smooth, elegant 3D card hover effect
// -------------------------------------

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  let yPos = 0;      // current transform lift
  let target = 0;    // target transform lift
  let animId = null;

  const animate = () => {
    // Different speed factors
    const speed = target < yPos ? 0.08 : 0.15; // slow going up, fast coming down
    yPos += (target - yPos) * speed;

    card.style.transform = `translateY(${yPos}px) rotateX(${yPos * 0.15}deg) rotateY(${yPos * 0.15}deg) scale(${1 + Math.abs(yPos) * 0.004})`;
    card.style.boxShadow = `0 ${4 + Math.abs(yPos) * 2}px ${10 + Math.abs(yPos) * 2}px rgba(0,0,0,0.2)`;

    if (Math.abs(target - yPos) < 0.2) {
      // close enough — stop to save CPU
      animId = null;
      return;
    }

    animId = requestAnimationFrame(animate);
  };

  card.addEventListener('mouseenter', () => {
    target = -25; // lift up slowly
    if (!animId) animId = requestAnimationFrame(animate);
  });

  card.addEventListener('mouseleave', () => {
    target = 0; // fall back fast
    if (!animId) animId = requestAnimationFrame(animate);
  });
});

// ---------
// Timeline
// ---------

const timelineEvents = document.querySelectorAll('.timeline-event');
const detailBox = document.getElementById('timeline-detail');

if (detailBox) {
  timelineEvents.forEach(event => {
    event.addEventListener('mouseenter', () => {
      detailBox.textContent = `${event.dataset.year}: ${event.dataset.detail}`;
    });

    event.addEventListener('mouseleave', () => {
      detailBox.textContent = 'Hover over a year to see details';
    });
  });
}
