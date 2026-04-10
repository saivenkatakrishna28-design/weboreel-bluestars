const typedText = document.getElementById("typed-text");
const words = [
  "Student Innovators",
  "Future Builders",
  "Creative Problem Solvers",
  "A Team with Vision"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typedText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typedText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 60 : 110);
}

typeEffect();

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((item) => observer.observe(item));

const particlesContainer = document.querySelector(".particles");

function createParticles() {
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");
    particle.classList.add("particle");

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${8 + Math.random() * 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.opacity = Math.random();

    particlesContainer.appendChild(particle);
  }
}

createParticles();

const personaForm = document.getElementById("personaForm");
const resultCard = document.getElementById("resultCard");

function getPersonaResult(wake, focus, goal, style) {
  if (focus === "building" && goal === "software") {
    return {
      title: "Creative Builder",
      text: "You love turning ideas into real outputs. You are practical, action-oriented, and energized by creating things people can see and use."
    };
  }

  if (focus === "thinking" && style === "solo") {
    return {
      title: "Strategic Thinker",
      text: "You are reflective, analytical, and naturally drawn toward solving problems with depth and clarity. You bring structure to complex ideas."
    };
  }

  if (focus === "leading" || goal === "leadership") {
    return {
      title: "Team Catalyst",
      text: "You naturally elevate the people around you. You enjoy coordination, collaboration, and helping groups move forward with stronger purpose."
    };
  }

  if (goal === "ai" && (style === "mixed" || style === "creative")) {
    return {
      title: "Future AI Explorer",
      text: "You are curious about possibilities, adaptable in learning, and drawn toward technologies that shape tomorrow. Your mindset fits innovation."
    };
  }

  if (wake === "late" && focus === "exploring") {
    return {
      title: "Curious Night Innovator",
      text: "You think freely, explore boldly, and often find your best ideas when the world feels quieter. You thrive in discovery and experimentation."
    };
  }

  if (style === "team") {
    return {
      title: "Collaborative Visionary",
      text: "You create value through teamwork, shared creativity, and mutual growth. You believe strong ideas become stronger when built together."
    };
  }

  return {
    title: "Consistent Growth Seeker",
    text: "You are adaptable, ambitious, and steadily building your path. Your mindset reflects curiosity, progress, and the willingness to keep improving."
  };
}

personaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const wake = document.getElementById("wake").value;
  const focus = document.getElementById("focus").value;
  const goal = document.getElementById("goal").value;
  const style = document.getElementById("style").value;

  const result = getPersonaResult(wake, focus, goal, style);

  const responseData = {
    name,
    wake,
    focus,
    goal,
    style,
    result: result.title,
    time: new Date().toLocaleString()
  };

  const savedResponses =
    JSON.parse(localStorage.getItem("bluestarsPersonaResponses")) || [];
  savedResponses.push(responseData);
  localStorage.setItem(
    "bluestarsPersonaResponses",
    JSON.stringify(savedResponses)
  );

  resultCard.innerHTML = `
    <div class="result-box">
      <h3>Hello, ${name}</h3>
      <p><strong>Your innovation persona:</strong> ${result.title}</p>
      <p>${result.text}</p>
      <p><strong>Future path selected:</strong> ${goal.toUpperCase()}</p>
      <p>Your response has been saved in this browser as part of the interactive experience.</p>
    </div>
  `;

  personaForm.reset();
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
});

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});

const navLinks = document.querySelectorAll("#navMenu a");
const sections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-link");
    }
  });
});