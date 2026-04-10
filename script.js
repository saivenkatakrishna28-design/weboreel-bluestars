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

function getStrengthScores(wake, focus, goal, style) {
  let creativity = 60;
  let leadership = 55;
  let innovation = 58;

  if (focus === "building") {
    creativity += 15;
    innovation += 12;
  }

  if (focus === "thinking") {
    innovation += 14;
  }

  if (focus === "leading") {
    leadership += 22;
    creativity += 5;
  }

  if (focus === "exploring") {
    innovation += 18;
    creativity += 10;
  }

  if (goal === "ai") {
    innovation += 18;
  }

  if (goal === "innovation") {
    creativity += 12;
    innovation += 12;
  }

  if (goal === "leadership") {
    leadership += 16;
  }

  if (style === "team") {
    leadership += 12;
  }

  if (style === "creative") {
    creativity += 14;
    innovation += 8;
  }

  if (style === "mixed") {
    creativity += 6;
    leadership += 6;
    innovation += 6;
  }

  if (wake === "early") {
    leadership += 6;
  }

  if (wake === "late") {
    creativity += 6;
    innovation += 6;
  }

  creativity = Math.min(creativity, 98);
  leadership = Math.min(leadership, 98);
  innovation = Math.min(innovation, 98);

  return { creativity, leadership, innovation };
}

personaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const wake = document.getElementById("wake").value;
  const focus = document.getElementById("focus").value;
  const goal = document.getElementById("goal").value;
  const style = document.getElementById("style").value;

  const result = getPersonaResult(wake, focus, goal, style);
  const scores = getStrengthScores(wake, focus, goal, style);

  const responseData = {
    name,
    wake,
    focus,
    goal,
    style,
    result: result.title,
    scores,
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

      <div class="result-strengths">
        <div class="strength-item">
          <div class="strength-label">
            <span>Creativity</span>
            <span>${scores.creativity}%</span>
          </div>
          <div class="strength-track">
            <div class="strength-fill" style="width:${scores.creativity}%"></div>
          </div>
        </div>

        <div class="strength-item">
          <div class="strength-label">
            <span>Leadership</span>
            <span>${scores.leadership}%</span>
          </div>
          <div class="strength-track">
            <div class="strength-fill" style="width:${scores.leadership}%"></div>
          </div>
        </div>

        <div class="strength-item">
          <div class="strength-label">
            <span>Innovation Energy</span>
            <span>${scores.innovation}%</span>
          </div>
          <div class="strength-track">
            <div class="strength-fill" style="width:${scores.innovation}%"></div>
          </div>
        </div>
      </div>

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

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
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

const teamModeBtn = document.getElementById("teamModeBtn");
const soloModeBtn = document.getElementById("soloModeBtn");
const heroDescription = document.getElementById("heroDescription");
const modeText = document.getElementById("modeText");

teamModeBtn.addEventListener("click", () => {
  teamModeBtn.classList.add("active-mode");
  soloModeBtn.classList.remove("active-mode");

  heroDescription.textContent =
    "We are Bluestars, a team of students transforming daily learning, teamwork, coding, creativity, and ambition into a shared journey toward future-ready innovation.";

  modeText.textContent =
    "Team Mode highlights collaboration, shared growth, and the energy of building together.";
});

soloModeBtn.addEventListener("click", () => {
  soloModeBtn.classList.add("active-mode");
  teamModeBtn.classList.remove("active-mode");

  heroDescription.textContent =
    "This experience also reflects the power of individual discipline, self-learning, focused growth, and the mindset needed to become a future innovator.";

  modeText.textContent =
    "Solo Mode highlights personal ambition, discipline, and self-driven growth within the innovation journey.";
});

const quoteBtn = document.getElementById("quoteBtn");
const quoteText = document.getElementById("quoteText");

const quotes = [
  "Every great innovation begins with one disciplined step taken consistently.",
  "Teamwork turns imagination into real impact.",
  "The future belongs to those who build before they feel fully ready.",
  "Student life is the training ground of future innovators.",
  "Creativity grows stronger when curiosity meets action.",
  "A strong team can turn simple ideas into meaningful change.",
  "Innovation is not luck. It is discipline, courage, and repetition.",
  "Dreaming matters, but building matters more."
];

quoteBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = quotes[randomIndex];
});
