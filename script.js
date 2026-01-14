// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  // Typed.js Initialization
  const typed = new Typed('.typed-text', {
    strings: ["Web Agency World", "AI Solutions", "3D Experiences", "Full Stack Projects"],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 2000,
    loop: true
  });

  // GSAP Animation Example
  gsap.from("#hero h1", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
  gsap.from("#hero p", { y: 20, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out" });
  gsap.from(".hero-content .button", { scale: 0, opacity: 0, duration: 1, delay: 1, ease: "back.out(1.7)" });

  // Three.js Canvas Example
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('hero-canvas'), alpha:true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 5;

  // Example rotating cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.5 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5,5,5);
  scene.add(light);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});

// GSAP Scroll Animations
gsap.from("#services-overview .service-card", {
  scrollTrigger: {
    trigger: "#services-overview",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  stagger: 0.3,
  duration: 1,
  ease: "power3.out"
});

gsap.from("#about .value-card", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  stagger: 0.3,
  duration: 1,
  ease: "power3.out"
});


gsap.from("#portfolio .project-card", {
  scrollTrigger: {
    trigger: "#portfolio",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out"
});

// Circular Progress Bars
document.querySelectorAll(".circular-progress").forEach((circle) => {
  const percentage = circle.dataset.percentage;
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;
  circle.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const radius = 45;
  const center = 50;
  let current = 0;

  function animateCircle() {
    ctx.clearRect(0, 0, 100, 100);

    // Background circle
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#e5e7eb"; // gray
    ctx.lineWidth = 10;
    ctx.stroke();

    // Foreground circle
    const endAngle = (current / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(center, center, radius, -Math.PI / 2, endAngle - Math.PI / 2);
    ctx.strokeStyle = "#f97316"; // orange
    ctx.lineWidth = 10;
    ctx.stroke();

    if (current < percentage) {
      current++;
      requestAnimationFrame(animateCircle);
    }
  }
  animateCircle();
});

// Counters
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const updateCounter = () => {
    const target = +counter.dataset.target;
    const count = +counter.innerText;
    const increment = target / 200; // Geschwindigkeit

    if(count < target) {
      counter.innerText = Math.ceil(count + increment);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
});

// GSAP Scroll Animations
gsap.from("#features .feature-card", {
  scrollTrigger: {
    trigger: "#features",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out"
});

gsap.from("#features .counter-card", {
  scrollTrigger: {
    trigger: "#features",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out"
});

// GSAP ScrollTrigger + Counter
gsap.utils.toArray('.counter-card').forEach(card => {
  const counter = card.querySelector('.counter');
  const target = +counter.dataset.target;

  gsap.fromTo(counter, 
    { innerText: 0 },
    { 
      innerText: target, 
      duration: 2, 
      ease: "power1.out",
      snap: { innerText: 1 }, // nur ganze Zahlen
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      onUpdate: function() {
        counter.innerText = Math.floor(counter.innerText);
      }
    }
  );
});

// Animate Contact Form & Info
gsap.from("#contact .contact-form", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from("#contact .contact-info", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
  },
  x: 100,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power3.out"
});

document.addEventListener("DOMContentLoaded", function () {
  // Leaflet Map initialisieren
  const map = L.map('map').setView([48.1351, 11.5820], 13); // München

  // OpenStreetMap Tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  // Marker hinzufügen
  L.marker([48.1351, 11.5820])
    .addTo(map)
    .bindPopup('Web Agency World, Munich ')
    .openPopup();
});

gsap.from("#community .section-title", {
  scrollTrigger: {
    trigger: "#community",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from("#community .section-subtitle", {
  scrollTrigger: {
    trigger: "#community",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  delay: 0.2,
  duration: 1,
  ease: "power3.out"
});

gsap.from("#community .discord-button", {
  scrollTrigger: {
    trigger: "#community",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  delay: 0.4,
  duration: 1,
  ease: "power3.out"
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;

    // Toggle max-height
    if(answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      // Close all other answers
      document.querySelectorAll('.faq-answer').forEach(ans => ans.style.maxHeight = null);
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// Optional: Animate FAQ items on scroll with GSAP
gsap.from("#faq .faq-item", {
  scrollTrigger: {
    trigger: "#faq",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out"
});

gsap.from("#footer .footer-brand", {
  scrollTrigger: { trigger: "#footer", start: "top 90%" },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from("#footer .footer-links", {
  scrollTrigger: { trigger: "#footer", start: "top 90%" },
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power3.out"
});

gsap.from("#footer .footer-contact", {
  scrollTrigger: { trigger: "#footer", start: "top 90%" },
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.4,
  ease: "power3.out"
});

gsap.from("#footer .footer-social", {
  scrollTrigger: { trigger: "#footer", start: "top 90%" },
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.6,
  ease: "power3.out"
});

gsap.from("#footer .footer-bottom", {
  scrollTrigger: { trigger: "#footer", start: "top 90%" },
  y: 20,
  opacity: 0,
  duration: 1,
  delay: 0.8,
  ease: "power3.out"
});