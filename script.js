// Dhanaraj D - Recruiter-Ready Premium Portfolio Javascript

// Live Deployment Links (Paste your Netlify or Vercel URLs here once deployed!)
// e.g., const EXPLOREX_DEPLOY_URL = "https://your-explorex.netlify.app";
const EXPLOREX_DEPLOY_URL = "";
const SYNCLEARN_DEPLOY_URL = "";

document.addEventListener("DOMContentLoaded", () => {
  initModalBackdropClicks();
  initThemeSwitcher();
  initScrollHandlers();
  initBackgroundCanvas();
  initMobileMenu();
  initMouseTracker();
  initScrollReveal();
  initSkillsDialsObserver();
  initRoleTypewriter();
  initActiveNavHighlight();
  initCustomCursor();        // Ambient spotlight
  initButtonRipple();        // Click ripple
  initCardTilt();            // 3D tilt
  initMagneticButtons();     // Magnetic buttons
  initHeroEntrance();        // Staggered hero entrance
  initParallaxHero();        // Scroll parallax depth
  initStatCounters();        // Counter animation
  // — Minimalistic Premium Effects —
  initCardSpotlight();       // Ambient light spotlight on hover
  initTextRise();            // Classic section title line reveal
  initNavPillSlider();       // Sliding underline on nav links
  initBackgroundParallax();  // 3D parallax scroll & mouse drift on background grids/orbs
});

// 0. Typewriter effect for rotating developer roles
function initRoleTypewriter() {
  const roles = [
    "Full Stack Developer",
    "Java Developer",
    "React.js Developer",
    "Spring Boot Developer",
    "Frontend Engineer"
  ];
  const el = document.getElementById("role-text");
  if (!el) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 45;
  const pauseAfterType = 1800;
  const pauseAfterDelete = 400;

  function tick() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }
  setTimeout(tick, 500);
}

// 0.5 Optimized Scroll Progress & Navbar Scroll Styling
let totalHeightCache = 0;
let lastScrollY = 0;
let ticking = false;
let progressBar = null;
let navHeader = null;

function recalculatePageHeight() {
  totalHeightCache = document.documentElement.scrollHeight - window.innerHeight;
}

function updateScrollVisuals() {
  if (progressBar) {
    if (totalHeightCache > 0) {
      const percentage = (lastScrollY / totalHeightCache) * 100;
      progressBar.style.width = `${percentage}%`;
    } else {
      progressBar.style.width = "0%";
    }
  }

  if (navHeader) {
    if (lastScrollY > 50) {
      navHeader.classList.add("scrolled");
    } else {
      navHeader.classList.remove("scrolled");
    }
  }

  ticking = false;
}

function initScrollHandlers() {
  progressBar = document.getElementById("scroll-progress-bar");
  navHeader = document.querySelector(".navbar");

  recalculatePageHeight();

  window.addEventListener("scroll", () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateScrollVisuals);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", () => {
    recalculatePageHeight();
    if (!ticking) {
      window.requestAnimationFrame(updateScrollVisuals);
      ticking = true;
    }
  }, { passive: true });
}

// 2. Interactive Canvas Nodes Background with Mouse Constellation
function initBackgroundCanvas() {
  const canvas = document.getElementById("canvas-background");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  let particles = [];
  const maxDistance = 110;
  
  // Track mouse coordinates for background interaction
  let mouse = {
    x: null,
    y: null,
    radius: 140
  };
  
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 1;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      const isLight = document.body.classList.contains("light-mode");
      ctx.fillStyle = isLight ? "rgba(79, 70, 229, 0.25)" : "rgba(99, 102, 241, 0.4)";
      ctx.fill();
    }
  }
  
  const particleCount = Math.min(65, Math.floor((canvas.width * canvas.height) / 18000));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      // Draw lines between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const isLight = document.body.classList.contains("light-mode");
          ctx.strokeStyle = isLight ? `rgba(79, 70, 229, ${0.08 * (1 - dist / maxDistance)})` : `rgba(99, 102, 241, ${0.12 * (1 - dist / maxDistance)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      
      // Draw lines to the mouse cursor if nearby
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          const isLight = document.body.classList.contains("light-mode");
          ctx.strokeStyle = isLight ? `rgba(79, 70, 229, ${0.2 * (1 - dist / mouse.radius)})` : `rgba(99, 102, 241, ${0.25 * (1 - dist / mouse.radius)})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// 3. Mobile Hamburger Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const drawer = document.getElementById("mobile-drawer");
  
  if (!menuBtn || !drawer) return;
  
  menuBtn.addEventListener("click", () => {
    toggleMobileMenu();
  });
}

function toggleMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const drawer = document.getElementById("mobile-drawer");
  
  if (menuBtn && drawer) {
    menuBtn.classList.toggle("active");
    drawer.classList.toggle("open");
    
    if (drawer.classList.contains("open")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
}

// 4. Mouse move pointer tracker for glowing card borders
function initMouseTracker() {
  const cards = document.querySelectorAll(".glow-hover");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

// 5. Scroll reveal animation trigger
function initScrollReveal() {
  // 1. Parent sections scroll-reveal
  const sections = document.querySelectorAll(".scroll-reveal");
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }, { threshold: 0.02, rootMargin: "60px 0px 60px 0px" });
  sections.forEach(s => sectionObs.observe(s));

  // 2. Child elements individual reveal-up (works on all screens!)
  const items = document.querySelectorAll(
    ".project-card, .cert-card, .stat-item, .skills-card, .about-education-card, .competency-item, .timeline-node, .edu-item, .form-group, .info-item"
  );
  
  items.forEach(el => {
    el.classList.add("reveal-up");
  });
  
  const itemObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }, { threshold: 0.02, rootMargin: "50px 0px 50px 0px" });
  
  items.forEach(item => itemObs.observe(item));
}

// 6. SVG Skill dials loader observer
function initSkillsDialsObserver() {
  const skillsSection = document.getElementById("skills");
  if (!skillsSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const dials = entry.target.querySelectorAll(".dial-fill");
        dials.forEach(dial => {
          // Extract percentage from sibling dasharray value
          const targetPercentage = dial.getAttribute("stroke-dasharray").split(",")[0].trim();
          dial.style.strokeDasharray = "0, 100";
          setTimeout(() => {
            dial.style.strokeDasharray = `${targetPercentage}, 100`;
          }, 150);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  observer.observe(skillsSection);
}

// 7. Project Demo Launcher Modals (Upgraded with Rich Multi-Tab Micro-App Previews)
let explorexSelectedSeat = "";
let explorexSelectedClass = "";

function selectExploreXSeat(btn, seatNumber, seatClass) {
  const buttons = document.querySelectorAll(".seat-grid .seat-btn");
  buttons.forEach(b => {
    if (!b.disabled) {
      b.style.background = "rgba(255, 255, 255, 0.02)";
      b.style.borderColor = "rgba(255, 255, 255, 0.08)";
      b.style.color = "white";
    }
  });
  
  btn.style.background = "var(--accent-cyan)";
  btn.style.borderColor = "var(--accent-cyan)";
  btn.style.color = "#030712";
  
  explorexSelectedSeat = seatNumber;
  explorexSelectedClass = seatClass;
  
  const display = document.getElementById("seat-details-display");
  if (display) {
    display.textContent = `Selected Seat: ${seatNumber} (${seatClass})`;
    display.style.color = "var(--accent-cyan)";
    display.style.fontWeight = "600";
  }
}

function executeExploreXBooking(event) {
  event.preventDefault();
  
  const name = document.getElementById("exp-name").value;
  const dest = document.getElementById("exp-dest").value;
  
  const seat = explorexSelectedSeat || "12A";
  const seatClass = explorexSelectedClass || "First Class Suite";
  
  const interfaceState = document.getElementById("explorex-booking-interface");
  const loaderState = document.getElementById("explorex-loader-state");
  const consoleLogs = document.getElementById("explorex-console-logs");
  const loadTxt = document.getElementById("exp-load-txt");
  
  interfaceState.style.display = "none";
  loaderState.style.display = "block";
  consoleLogs.innerHTML = "";
  
  const logs = [
    "[Info] Initiating SSL Handshake at port 3000...",
    "[Express] Routing endpoint POST /api/bookings/flight...",
    "[Middleware] Verifying secure JSON JWT Token...",
    "[Middleware] Token verified: dhanaraj_traveler_active",
    `[DB] Querying PostgreSQL seat catalog for Seat ${seat}...`,
    `[PostgreSQL] LOCK table rows for flight EX-FL-9912, seat ${seat}...`,
    `[PostgreSQL] INSERT INTO flight_bookings (passenger, destination, seat, class) VALUES ('${name}', '${dest}', '${seat}', '${seatClass}')...`,
    "[Checkout] Processing secure mock Stripe Charge Token...",
    "[Express] Response payload: { status: 'Confirmed', code: 200, uid: 'EX-FL-9912' }"
  ];
  
  let i = 0;
  function addLog() {
    if (i < logs.length) {
      const line = document.createElement("div");
      line.textContent = logs[i];
      if (logs[i].includes("[Express]")) line.style.color = "var(--accent-cyan)";
      if (logs[i].includes("[PostgreSQL]")) line.style.color = "#8b5cf6";
      if (logs[i].includes("Stripe")) line.style.color = "#e2e8f0";
      if (logs[i].includes("Confirmed")) line.style.color = "#10b981";
      consoleLogs.appendChild(line);
      consoleLogs.scrollTop = consoleLogs.scrollHeight;
      
      if (i === 2) loadTxt.textContent = "Verifying JWT session...";
      if (i === 4) loadTxt.textContent = "Locking database transaction...";
      if (i === 7) loadTxt.textContent = "Processing mock Stripe payment...";
      
      i++;
      setTimeout(addLog, 250);
    } else {
      setTimeout(() => {
        loaderState.style.display = "none";
        const ticketState = document.getElementById("explorex-ticket-state");
        ticketState.style.display = "block";
        document.getElementById("ticket-passenger").textContent = name;
        document.getElementById("ticket-dest").textContent = dest;
        document.getElementById("ticket-class").textContent = `${seat} / ${seatClass}`;
      }, 300);
    }
  }
  setTimeout(addLog, 100);
}

function resetExploreXDemo() {
  const ticketState = document.getElementById("explorex-ticket-state");
  const interfaceState = document.getElementById("explorex-booking-interface");
  const loaderState = document.getElementById("explorex-loader-state");
  
  if (ticketState) ticketState.style.display = "none";
  if (loaderState) loaderState.style.display = "none";
  if (interfaceState) {
    interfaceState.style.display = "block";
    document.getElementById("exp-mock-form").reset();
    explorexSelectedSeat = "";
    explorexSelectedClass = "";
    const display = document.getElementById("seat-details-display");
    if (display) display.textContent = "No seat selected (defaults to First Class Suite 12A)";
  }
}

function toggleVendorListing(btn, packageName) {
  const row = btn.closest("tr");
  const badge = row.querySelector(".status-badge");
  if (badge.textContent === "ACTIVE") {
    badge.textContent = "PAUSED";
    badge.style.background = "#451a03";
    badge.style.color = "#f59e0b";
    btn.textContent = "Activate";
  } else {
    badge.textContent = "ACTIVE";
    badge.style.background = "#022c22";
    badge.style.color = "#10b981";
    btn.textContent = "Pause";
  }
  
  const consoleOut = document.getElementById("admin-console-output");
  if (consoleOut) {
    const line = document.createElement("div");
    line.style.color = "#f59e0b";
    line.textContent = `[API] Modified vendor listings. Package "${packageName}" status toggled.`;
    consoleOut.appendChild(line);
    consoleOut.scrollTop = consoleOut.scrollHeight;
  }
}

function createNewListing(event) {
  event.preventDefault();
  const name = document.getElementById("trip-name").value;
  const price = document.getElementById("trip-price").value;
  
  const tbody = document.getElementById("vendor-package-table-body");
  if (!tbody) return;
  
  const tr = document.createElement("tr");
  tr.style.borderBottom = "1px solid rgba(255,255,255,0.04)";
  tr.innerHTML = `
    <td style="padding: 6px 0; font-weight:600;">${name}</td>
    <td>$${price}</td>
    <td style="color:#10b981;">0 orders</td>
    <td><span class="status-badge" style="background:#022c22; color:#10b981; padding:1px 5px; border-radius:3px; font-size:9.5px; font-weight:600;">ACTIVE</span></td>
    <td style="text-align: right;"><button class="btn btn-outline" onclick="toggleVendorListing(this, '${name.substring(0,6)}')" style="padding:2px 6px; font-size:9px; border-radius:3px; background:none; cursor:pointer;">Pause</button></td>
  `;
  tbody.prepend(tr);
  
  document.getElementById("trip-name").value = "";
  document.getElementById("trip-price").value = "";
  
  const consoleOut = document.getElementById("admin-console-output");
  if (consoleOut) {
    const line = document.createElement("div");
    line.style.color = "var(--accent-cyan)";
    line.textContent = `[SQL] INSERT INTO travel_packages (title, price, active) VALUES ('${name}', ${price}, true). DB transaction committed successfully.`;
    consoleOut.appendChild(line);
    consoleOut.scrollTop = consoleOut.scrollHeight;
  }
}

function rebootSimulatorDB() {
  const dbStatus = document.getElementById("admin-db-status");
  const consoleOut = document.getElementById("admin-console-output");
  if (!dbStatus || !consoleOut) return;
  
  dbStatus.textContent = "DISCONNECTED";
  dbStatus.style.color = "#ef4444";
  
  consoleOut.innerHTML += `
    <div style="color:#ef4444;">[PostgreSQL] Connection lost. Received SIGTERM request.</div>
    <div>[PostgreSQL] Cleaning socket files and stopping processes...</div>
    <div style="color:var(--accent-cyan);">[PostgreSQL] Initiating server startup on port 5432...</div>
  `;
  
  setTimeout(() => {
    consoleOut.innerHTML += `
      <div>[PostgreSQL] DB engine initialized. Reading WAL journals...</div>
      <div>[PostgreSQL] WAL journals cleared. Opening client connection pools...</div>
      <div style="color:#10b981;">[PostgreSQL] Database connections successfully re-established. Active clients: 1</div>
    `;
    dbStatus.textContent = "CONNECTED";
    dbStatus.style.color = "#10b981";
    consoleOut.scrollTop = consoleOut.scrollHeight;
  }, 1200);
}

// SyncLearn Question dataset
const synclearnQuestions = [
  {
    question: "Which data structure operates on a LIFO (Last In First Out) principle?",
    options: ["Queue", "Stack", "Binary Tree", "Hash Map"],
    correct: 1,
    explanation: "Stack operates on LIFO (Last In First Out), where elements are pushed and popped from the same end. Queue operates on FIFO (First In First Out)."
  },
  {
    question: "What is the average time complexity for looking up an element in a Hash Map?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
    correct: 2,
    explanation: "Hash Maps offer O(1) constant average lookup time because they resolve keys directly to array slots using a hashing algorithm."
  },
  {
    question: "Which class in Java is used to construct a dynamically resizable array?",
    options: ["Array", "ArrayList", "LinkedList", "Vector"],
    correct: 1,
    explanation: "ArrayList in Java implements the List interface using a dynamic backing array that automatically resizes when capacity limits are crossed."
  }
];

let synclearnCurrentQuestionIndex = 0;
let synclearnUserScore = 0;
let synclearnTotalQuestions = synclearnQuestions.length;

function loadSyncLearnQuestion(index) {
  synclearnCurrentQuestionIndex = index;
  const quest = synclearnQuestions[index];
  
  const progressText = document.getElementById("quest-progress-txt");
  const progressBar = document.getElementById("quest-progress-bar");
  const questionText = document.getElementById("quest-question-text");
  const optionsContainer = document.getElementById("quiz-options-container");
  
  if (!progressText || !progressBar || !questionText || !optionsContainer) return;
  
  progressText.textContent = `Question ${index + 1} of ${synclearnTotalQuestions}`;
  const pct = ((index + 1) / synclearnTotalQuestions) * 100;
  progressBar.style.width = `${pct}%`;
  
  questionText.textContent = quest.question;
  
  optionsContainer.innerHTML = "";
  quest.options.forEach((opt, idx) => {
    optionsContainer.innerHTML += `
      <label style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:10px; border-radius:6px; cursor:pointer; transition:all 0.2s;">
        <input type="radio" name="dsa-answer" value="${idx}" style="cursor:pointer;" required>
        <span style="font-size:12px; font-weight: 500;">[Option ${String.fromCharCode(65 + idx)}] ${opt}</span>
      </label>
    `;
  });
}

function submitSyncLearnAnswer(event) {
  event.preventDefault();
  
  const form = document.getElementById("syn-mock-quiz");
  const checkedInput = form.querySelector('input[name="dsa-answer"]:checked');
  if (!checkedInput) return;
  
  const selectedIndex = parseInt(checkedInput.value);
  const quest = synclearnQuestions[synclearnCurrentQuestionIndex];
  const submitBtn = document.getElementById("quiz-submit-btn");
  
  submitBtn.disabled = true;
  const radios = form.querySelectorAll('input[type="radio"]');
  radios.forEach(r => r.disabled = true);
  
  const optContainers = form.querySelectorAll("label");
  
  if (selectedIndex === quest.correct) {
    optContainers[selectedIndex].style.background = "rgba(16, 185, 129, 0.08)";
    optContainers[selectedIndex].style.borderColor = "var(--accent-green)";
    synclearnUserScore++;
    
    showSyncLearnQuizLog(`[Spring Boot API] POST /api/quests/evaluate - Status: CORRECT. Explaining details...`, "#10b981");
    showSyncLearnQuizLog(`[Quest Info] ${quest.explanation}`, "#e2e8f0");
    
    const acc = Math.round((synclearnUserScore / (synclearnCurrentQuestionIndex + 1)) * 100);
    document.getElementById("quest-score-txt").textContent = `Accuracy: ${acc}%`;
    
    const xpBadge = document.getElementById("demo-student-xp");
    const currentXp = parseInt(xpBadge.textContent);
    xpBadge.textContent = `${currentXp + 150} XP`;
    
    setTimeout(() => {
      submitBtn.disabled = false;
      if (synclearnCurrentQuestionIndex < synclearnTotalQuestions - 1) {
        submitBtn.textContent = "Proceed to Next Quest Challenge";
        form.onsubmit = (e) => { e.preventDefault(); nextSyncLearnQuestion(); };
      } else {
        submitBtn.textContent = "Complete Learning Quest Module";
        form.onsubmit = (e) => { e.preventDefault(); finishSyncLearnQuest(); };
      }
    }, 800);
  } else {
    optContainers[selectedIndex].style.background = "rgba(239, 68, 68, 0.08)";
    optContainers[selectedIndex].style.borderColor = "#ef4444";
    optContainers[quest.correct].style.background = "rgba(16, 185, 129, 0.08)";
    optContainers[quest.correct].style.borderColor = "var(--accent-green)";
    
    showSyncLearnQuizLog(`[Spring Boot API] POST /api/quests/evaluate - Status: INCORRECT. Hint: read option description.`, "#ef4444");
    showSyncLearnQuizLog(`[Quest Explanation] ${quest.explanation}`, "#e2e8f0");
    
    const acc = Math.round((synclearnUserScore / (synclearnCurrentQuestionIndex + 1)) * 100);
    document.getElementById("quest-score-txt").textContent = `Accuracy: ${acc}%`;
    
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Try Quest Again";
      form.onsubmit = (e) => { e.preventDefault(); loadSyncLearnQuestion(synclearnCurrentQuestionIndex); form.onsubmit = submitSyncLearnAnswer; };
    }, 1000);
  }
}

function showSyncLearnQuizLog(msg, color) {
  const box = document.getElementById("synclearn-quest-body");
  if (!box) return;
  
  let term = document.getElementById("synclearn-quest-console");
  if (!term) {
    term = document.createElement("div");
    term.id = "synclearn-quest-console";
    term.style.marginTop = "15px";
    term.style.background = "#03050a";
    term.style.padding = "8px 12px";
    term.style.borderRadius = "6px";
    term.style.fontFamily = "monospace";
    term.style.fontSize = "10px";
    term.style.color = "#94a3b8";
    term.style.height = "75px";
    term.style.overflowY = "auto";
    term.style.border = "1px solid rgba(255,255,255,0.05)";
    box.appendChild(term);
  }
  
  const line = document.createElement("div");
  line.style.color = color || "#94a3b8";
  line.textContent = msg;
  term.appendChild(line);
  term.scrollTop = term.scrollHeight;
}

function nextSyncLearnQuestion() {
  const form = document.getElementById("syn-mock-quiz");
  form.onsubmit = submitSyncLearnAnswer;
  const submitBtn = document.getElementById("quiz-submit-btn");
  submitBtn.textContent = "Submit Answer";
  
  const term = document.getElementById("synclearn-quest-console");
  if (term) term.innerHTML = "";
  
  loadSyncLearnQuestion(synclearnCurrentQuestionIndex + 1);
}

function finishSyncLearnQuest() {
  document.getElementById("synclearn-quest-body").style.display = "none";
  document.getElementById("synclearn-success-state").style.display = "block";
}

function resetSyncLearnDemo() {
  synclearnUserScore = 0;
  synclearnCurrentQuestionIndex = 0;
  
  const successState = document.getElementById("synclearn-success-state");
  const questBody = document.getElementById("synclearn-quest-body");
  
  if (successState) successState.style.display = "none";
  if (questBody) {
    questBody.style.display = "block";
    const term = document.getElementById("synclearn-quest-console");
    if (term) term.innerHTML = "";
    document.getElementById("quest-score-txt").textContent = "Accuracy: 100%";
    loadSyncLearnQuestion(0);
  }
}

function challengeDuel() {
  const terminal = document.getElementById("duel-terminal-log");
  if (!terminal) return;
  
  terminal.style.display = "block";
  terminal.innerHTML = "<div>[Socket] Establishing connection to SyncLearn Duel server...</div>";
  
  const logs = [
    "[Socket] Connection established. Queueing matching request for Dhanaraj...",
    "[Matchmaker] Room found! Opponent matched: Jessica K. (Rank #3, 2,480 XP)",
    "[Duel Router] Initializing dynamic question set: Binary Trees...",
    "[Duel Engine] QUESTION 1: What is the height of a balanced BST with n nodes?...",
    "[Duel Monitor] Jessica completed Q1 in 12.8 seconds...",
    "[Duel Monitor] Dhanaraj completed Q1 in 9.4 seconds! (LEAD)",
    "[Duel Engine] QUESTION 2: What is the worst-case lookup in a BST?...",
    "[Duel Monitor] Dhanaraj completed Q2 in 11.2 seconds!...",
    "[Duel Evaluator] Duel complete! Evaluating final accuracy and timestamps...",
    "[Success] Duel won by DHANARAJ! Accuracy: 100% vs 50%. Reward: +150 XP"
  ];
  
  let i = 0;
  function addLog() {
    if (i < logs.length) {
      const line = document.createElement("div");
      line.textContent = logs[i];
      if (logs[i].includes("Dhanaraj completed") || logs[i].includes("won by")) line.style.color = "#10b981";
      if (logs[i].includes("Jessica completed")) line.style.color = "#f59e0b";
      if (logs[i].includes("worst-case")) line.style.color = "#ef4444";
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
      i++;
      setTimeout(addLog, 400);
    } else {
      setTimeout(() => {
        const xpLabel = document.getElementById("leaderboard-user-xp");
        if (xpLabel) {
          xpLabel.textContent = "2,600 XP";
          xpLabel.style.color = "#10b981";
        }
        
        const row3 = document.getElementById("rank3-player-row");
        if (row3) {
          row3.innerHTML = `
            <span style="font-size:11.5px; font-weight:700; color:#10b981;">3. Dhanaraj D. (Level 23) <span style="font-size:8.5px; background:var(--accent-green); color:#030712; padding:1px 4px; border-radius:3px; font-weight:800; margin-left:5px;">RANK UP</span></span>
            <strong style="font-size:11.5px; color:#10b981;">2,600 XP</strong>
          `;
          row3.style.background = "rgba(16, 185, 129, 0.04)";
          row3.style.borderColor = "var(--accent-green)";
        }
        
        terminal.innerHTML += `<div style="color:var(--accent-cyan); font-weight:bold; margin-top:8px;">[System] Leaderboard Standing Updated! You are now Rank #3!</div>`;
        terminal.scrollTop = terminal.scrollHeight;
      }, 500);
    }
  }
  setTimeout(addLog, 100);
}

function sendTeacherNotification(event) {
  event.preventDefault();
  const input = document.getElementById("teacher-announcement");
  const msg = input.value;
  
  const toast = document.getElementById("syn-toast-alert");
  if (!toast) return;
  
  toast.innerHTML = `📢 <strong>Teacher Alert:</strong> ${msg}`;
  toast.style.top = "15px";
  
  setTimeout(() => {
    toast.style.top = "-60px";
  }, 4500);
  
  input.value = "";
}

function switchSimulatorTab(tabId) {
  const buttons = document.querySelectorAll(".sim-tab-btn");
  buttons.forEach(btn => {
    btn.classList.remove("active");
    btn.style.color = "#94a3b8";
    btn.style.borderBottomColor = "transparent";
  });
  
  const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
  if (activeBtn) {
    activeBtn.classList.add("active");
    activeBtn.style.color = "white";
    activeBtn.style.borderBottomColor = "var(--accent-cyan)";
  }
  
  const contents = document.querySelectorAll(".sim-tab-content");
  contents.forEach(content => {
    content.style.display = "none";
    content.classList.remove("tab-fade-in");
  });
  
  const activeContent = document.getElementById(`sim-tab-${tabId}`);
  if (activeContent) {
    activeContent.style.display = "block";
    // Force a browser reflow before adding the animation class
    void activeContent.offsetWidth;
    activeContent.classList.add("tab-fade-in");
  }
  
  const addressBarExploreX = document.getElementById("explorex-browser-address");
  const addressBarSyncLearn = document.getElementById("synclearn-browser-address");
  
  if (addressBarExploreX) {
    if (tabId === "booking") addressBarExploreX.textContent = "http://localhost:3000/traveler/booking";
    if (tabId === "vendor") addressBarExploreX.textContent = "http://localhost:3000/partner/packages";
    if (tabId === "admin") addressBarExploreX.textContent = "http://localhost:3000/admin/diagnostics";
  }
  
  if (addressBarSyncLearn) {
    if (tabId === "syn-quest") addressBarSyncLearn.textContent = "http://localhost:8080/student/quests";
    if (tabId === "syn-leaderboard") addressBarSyncLearn.textContent = "http://localhost:8080/student/standings";
    if (tabId === "syn-teacher") addressBarSyncLearn.textContent = "http://localhost:8080/teacher/dashboard";
  }
}

// Bind to window context
window.switchSimulatorTab = switchSimulatorTab;
window.selectExploreXSeat = selectExploreXSeat;
window.executeExploreXBooking = executeExploreXBooking;
window.resetExploreXDemo = resetExploreXDemo;
window.toggleVendorListing = toggleVendorListing;
window.createNewListing = createNewListing;
window.rebootSimulatorDB = rebootSimulatorDB;
window.submitSyncLearnAnswer = submitSyncLearnAnswer;
window.nextSyncLearnQuestion = nextSyncLearnQuestion;
window.resetSyncLearnDemo = resetSyncLearnDemo;
window.challengeDuel = challengeDuel;
window.sendTeacherNotification = sendTeacherNotification;
window.openDemoModal = openDemoModal;
window.closeDemoModal = closeDemoModal;

function openDemoModal(projectKey) {
  const modal = document.getElementById("demo-modal");
  const title = document.getElementById("modal-project-title");
  const content = document.getElementById("modal-demo-content");
  
  if (!modal || !title || !content) return;
  
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  
  const deployUrl = projectKey === "explorex" ? EXPLOREX_DEPLOY_URL : SYNCLEARN_DEPLOY_URL;
  
  const container = document.querySelector(".demo-modal-container");
  if (container) {
    if (deployUrl && deployUrl.trim() !== "") {
      container.style.maxWidth = "850px";
      container.style.width = "95%";
    } else {
      container.style.maxWidth = "680px";
      container.style.width = "90%";
    }
  }

  if (deployUrl && deployUrl.trim() !== "") {
    title.textContent = projectKey === "explorex" ? "ExploreX (Live Application)" : "SyncLearn (Live Application)";
    content.innerHTML = `
      <div class="simulated-browser">
        <div class="browser-top-bar" style="display: flex; align-items: center; justify-content: space-between; background: var(--browser-bar); padding: 8px 16px; border-bottom: 1px solid var(--browser-border);">
          <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
            <div class="browser-dots" style="display: flex; gap: 6px;">
              <span class="browser-dot dot-red" style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444;"></span>
              <span class="browser-dot dot-yellow" style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b;"></span>
              <span class="browser-dot dot-green" style="width: 10px; height: 10px; border-radius: 50%; background: #10b981;"></span>
            </div>
            <div class="browser-address" style="flex: 1; background: var(--browser-bg); border-radius: 4px; padding: 4px 12px; color: var(--text-muted); font-size: 11px; font-family: monospace; border: 1px solid var(--browser-border); text-align: left; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: flex; justify-content: space-between; align-items: center;">
              <span>${deployUrl}</span>
              <span style="color: #10b981; font-size: 9px; font-weight: 700; background: rgba(16,185,129,0.1); padding: 1px 5px; border-radius: 3px; letter-spacing: 0.5px;">SECURE SSL</span>
            </div>
          </div>
          <div style="margin-left: 15px;">
            <a href="${deployUrl}" target="_blank" class="btn btn-outline" style="padding: 4px 10px; font-size: 10.5px; border-radius: 4px; border: 1px solid var(--border-color); color: var(--accent-cyan); text-decoration: none; display: inline-flex; align-items: center; gap: 4px; font-weight: 700; background: none; transition: var(--transition);">
              Launch Live App ↗
            </a>
          </div>
        </div>
        <div class="browser-content" style="height: 500px; background: #ffffff;">
          <iframe src="${deployUrl}" style="width: 100%; height: 100%; border: none;" allow="geolocation; microphone; camera; midi; encrypted-media; autoplay;"></iframe>
        </div>
      </div>
    `;
    return;
  }
  
  if (projectKey === "explorex") {
    title.textContent = "ExploreX Booking System (Live Simulator)";
    content.innerHTML = `
      <div class="simulated-browser" style="position: relative;">
        <div class="browser-top-bar">
          <div class="browser-dots">
            <span class="browser-dot dot-red"></span>
            <span class="browser-dot dot-yellow"></span>
            <span class="browser-dot dot-green"></span>
          </div>
          <div class="browser-address" id="explorex-browser-address">http://localhost:3000/traveler/booking</div>
        </div>
        
        <!-- Tab Navigation -->
        <div style="display: flex; background: var(--browser-bar); border-bottom: 1px solid var(--browser-border);">
          <button class="sim-tab-btn active" data-tab="booking" onclick="switchSimulatorTab('booking')" style="flex: 1; background: none; border: none; padding: 12px; color: var(--text-white); font-weight: 600; font-size: 11px; cursor: pointer; border-bottom: 2px solid var(--accent-cyan); transition: var(--transition); outline: none;">✈️ Traveler Booking</button>
          <button class="sim-tab-btn" data-tab="vendor" onclick="switchSimulatorTab('vendor')" style="flex: 1; background: none; border: none; padding: 12px; color: var(--text-muted); font-weight: 600; font-size: 11px; cursor: pointer; border-bottom: 2px solid transparent; transition: var(--transition); outline: none;">💼 Vendor Console</button>
          <button class="sim-tab-btn" data-tab="admin" onclick="switchSimulatorTab('admin')" style="flex: 1; background: none; border: none; padding: 12px; color: var(--text-muted); font-weight: 600; font-size: 11px; cursor: pointer; border-bottom: 2px solid transparent; transition: var(--transition); outline: none;">⚙️ Admin Panel</button>
        </div>
        
        <div class="browser-content" style="padding: 20px; color: var(--text-light); background: var(--browser-bg); height: 395px; overflow-y: auto;">
          
          <!-- TAB 1: Traveler Booking -->
          <div id="sim-tab-booking" class="sim-tab-content tab-fade-in" style="display: block;">
            <div id="explorex-booking-interface">
              <h4 style="color: var(--accent-cyan); margin-bottom: 4px; font-weight: 700; font-size: 13.5px;">✈️ Flight Reservation Checkout</h4>
              <p style="font-size: 11.5px; color: var(--text-gray); margin-bottom: 14px;">Secure API transaction simulation. Select passenger info & seat mapping.</p>
              
              <form id="exp-mock-form" onsubmit="executeExploreXBooking(event)" style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  <div style="display:flex; flex-direction:column; gap:4px;">
                    <label style="font-size:10px; color:var(--text-gray); font-weight:600;">PASSENGER NAME</label>
                    <input type="text" id="exp-name" value="Dhanaraj D" required style="background:var(--input-bg); border:1px solid var(--border-color); padding:7px; border-radius:4px; color:var(--text-white); font-size:11.5px; outline:none;">
                  </div>
                  <div style="display:flex; flex-direction:column; gap:4px;">
                    <label style="font-size:10px; color:var(--text-gray); font-weight:600;">DESTINATION</label>
                    <select id="exp-dest" style="background:var(--input-bg); color:var(--text-white); border:1px solid var(--border-color); padding:7px; border-radius:4px; font-size:11.5px; outline:none; height: 32px;">
                      <option value="Gulbarga, KA (GBR)">Gulbarga, KA (GBR)</option>
                      <option value="Bangalore, KA (BLR)">Bengaluru, KA (BLR)</option>
                      <option value="Bali, Indonesia (DPS)">Bali, Indonesia (DPS)</option>
                    </select>
                  </div>
                </div>
                
                <div style="display:flex; flex-direction:column; gap:4px;">
                  <label style="font-size:10px; color:#94a3b8; font-weight:600;">SELECT SEAT (INTERACTIVE MAP)</label>
                  <div class="seat-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; max-width: 280px; margin: 5px auto;">
                    <button type="button" class="seat-btn" onclick="selectExploreXSeat(this, '12A', 'First Class Suite')" style="background: rgba(0,242,254,0.05); border: 1px solid rgba(0,242,254,0.25); border-radius: 4px; padding: 5px; color: white; cursor: pointer; font-size:10px; font-weight:600; transition:all 0.2s; outline:none;">12A</button>
                    <button type="button" class="seat-btn" onclick="selectExploreXSeat(this, '12B', 'First Class Suite')" style="background: rgba(0,242,254,0.05); border: 1px solid rgba(0,242,254,0.25); border-radius: 4px; padding: 5px; color: white; cursor: pointer; font-size:10px; font-weight:600; transition:all 0.2s; outline:none;">12B</button>
                    <button type="button" class="seat-btn" onclick="selectExploreXSeat(this, '14A', 'Business Class')" style="background: rgba(79,172,254,0.05); border: 1px solid rgba(79,172,254,0.25); border-radius: 4px; padding: 5px; color: white; cursor: pointer; font-size:10px; font-weight:600; transition:all 0.2s; outline:none;">14A</button>
                    <button type="button" class="seat-btn" onclick="selectExploreXSeat(this, '14B', 'Business Class')" style="background: rgba(79,172,254,0.05); border: 1px solid rgba(79,172,254,0.25); border-radius: 4px; padding: 5px; color: white; cursor: pointer; font-size:10px; font-weight:600; transition:all 0.2s; outline:none;">14B</button>
                    <button type="button" class="seat-btn" onclick="selectExploreXSeat(this, '18C', 'Economy Class')" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; padding: 5px; color: white; cursor: pointer; font-size:10px; transition:all 0.2s; outline:none;">18C</button>
                    <button type="button" class="seat-btn" onclick="selectExploreXSeat(this, '18D', 'Economy Class')" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; padding: 5px; color: white; cursor: pointer; font-size:10px; transition:all 0.2s; outline:none;">18D</button>
                    <button type="button" class="seat-btn" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); border-radius: 4px; padding: 5px; color: #ef4444; cursor: not-allowed; font-size:10px;" disabled>19A</button>
                    <button type="button" class="seat-btn" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); border-radius: 4px; padding: 5px; color: #ef4444; cursor: not-allowed; font-size:10px;" disabled>19B</button>
                  </div>
                  <div id="seat-details-display" style="text-align: center; font-size: 11px; color: #94a3b8; font-style: italic;">No seat selected (defaults to First Class Suite 12A)</div>
                </div>
                
                <button type="submit" class="btn btn-primary" style="margin-top: 4px; padding: 9px; font-size: 12px; font-weight: 700; justify-content: center;">
                  Transmit Secure Booking Transaction
                </button>
              </form>
            </div>
            
            <!-- Booking terminal loading state -->
            <div id="explorex-loader-state" style="display: none; padding: 10px 0; text-align: center;">
              <div class="loader-spinner" style="margin: 0 auto 10px auto; width:26px; height:26px; border:3px solid rgba(6,182,212,0.1); border-top-color:var(--accent-cyan); border-radius:50%; animation: spin 1s infinite linear;"></div>
              <p id="exp-load-txt" style="font-family: monospace; font-size: 11px; color: var(--accent-cyan);">Resolving endpoints...</p>
              <div id="explorex-console-logs" style="margin-top: 10px; background: #03050a; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 10px; color: #10b981; height: 130px; text-align: left; overflow-y: auto; border: 1px solid rgba(255,255,255,0.05);"></div>
            </div>
            
            <!-- Boarding Pass ticket result -->
            <div id="explorex-ticket-state" style="display: none; animation: fadeIn 0.4s ease;">
              <div style="background: linear-gradient(135deg, #1e293b, #0f172a); border: 2px dashed var(--accent-cyan); padding: 15px; border-radius: 10px; position: relative;">
                <span style="position: absolute; right: 15px; top: 15px; font-size: 9px; background: #022c22; color: #10b981; border: 1px solid #10b981; padding: 2px 6px; border-radius: 4px; font-weight: 700;">BOARDING PASS</span>
                <h3 style="color: white; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 14px; margin-bottom: 10px; display:flex; align-items:center; gap:6px;">🎒 ExploreX <span style="font-size:10px; color:var(--accent-cyan); font-weight:400;">Travel System</span></h3>
                
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 12px; font-size: 11px;">
                  <div>
                    <div style="color: #64748b; font-size: 9px; text-transform: uppercase;">PASSENGER</div>
                    <strong id="ticket-passenger" style="color: white;">Dhanaraj D</strong>
                  </div>
                  <div>
                    <div style="color: #64748b; font-size: 9px; text-transform: uppercase;">DESTINATION</div>
                    <strong id="ticket-dest" style="color: white;">Bangalore</strong>
                  </div>
                  <div>
                    <div style="color: #64748b; font-size: 9px; text-transform: uppercase;">SEAT / CLASS</div>
                    <strong id="ticket-class" style="color: white;">12A / First Class</strong>
                  </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px; font-size: 11px; margin-bottom: 12px;">
                  <div>
                    <div style="color: #64748b; font-size: 9px; text-transform: uppercase;">FLIGHT NO</div>
                    <strong style="color: var(--accent-cyan);">EX-FL-9912</strong>
                  </div>
                  <div>
                    <div style="color: #64748b; font-size: 9px; text-transform: uppercase;">GATE</div>
                    <strong style="color: white;">B-12</strong>
                  </div>
                  <div>
                    <div style="color: #64748b; font-size: 9px; text-transform: uppercase;">STATUS</div>
                    <strong style="color: #10b981;">SECURE ✓</strong>
                  </div>
                </div>
                
                <div style="display:flex; justify-content:space-between; align-items:center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 10px;">
                  <div style="font-family: monospace; font-size: 8px; color: #64748b; letter-spacing: 1px;">
                    |||||||| | | |||| ||||| || |||||| ||
                  </div>
                  <button onclick="resetExploreXDemo()" class="btn btn-outline" style="padding: 4px 10px; font-size: 10px;">Book Another Flight</button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- TAB 2: Vendor Console -->
          <div id="sim-tab-vendor" class="sim-tab-content" style="display: none;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px;">
              <h4 style="color: var(--accent-cyan); margin:0; font-weight:700; font-size:13.5px;">💼 Partner Package Management</h4>
              <span style="font-size:10px; font-weight:700; background:rgba(6,182,212,0.15); color:var(--accent-cyan); padding:2px 6px; border-radius:10px;">Vendor ID: VND-7291</span>
            </div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:12px; text-align:center;">
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:6px; border-radius:6px;">
                <div style="font-size:16px; font-weight:800; color:white;">3</div>
                <div style="font-size:8px; color:#94a3b8;">LISTED PACKAGES</div>
              </div>
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:6px; border-radius:6px;">
                <div style="font-size:16px; font-weight:800; color:#10b981;">142</div>
                <div style="font-size:8px; color:#94a3b8;">BOOKING ORDERS</div>
              </div>
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:6px; border-radius:6px;">
                <div style="font-size:16px; font-weight:800; color:var(--accent-cyan);">$18,400</div>
                <div style="font-size:8px; color:#94a3b8;">EARNED REVENUE</div>
              </div>
            </div>
            
            <!-- Add Package Form -->
            <form onsubmit="createNewListing(event)" style="background:rgba(255,255,255,0.015); border:1px solid rgba(255,255,255,0.05); padding:8px; border-radius:8px; display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
              <div style="font-size:9.5px; font-weight:700; color:white;">+ ADD MOCK TRIP PACKAGE</div>
              <div style="display:grid; grid-template-columns:1.5fr 1fr 1fr; gap:8px;">
                <input type="text" id="trip-name" placeholder="Package Title (e.g. Kyoto Tour)" required style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:5px 8px; border-radius:4px; color:white; font-size:11px; outline:none;">
                <input type="number" id="trip-price" placeholder="Price ($)" required style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:5px 8px; border-radius:4px; color:white; font-size:11px; outline:none;">
                <button type="submit" class="btn btn-primary" style="padding:0; height:24px; font-size:10px; justify-content:center; border-radius:4px;">Publish API</button>
              </div>
            </form>
            
            <!-- Package Table -->
            <table style="width: 100%; border-collapse: collapse; font-size: 11px; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08); color: #64748b;">
                  <th style="padding: 5px 0;">TITLE</th>
                  <th>COST</th>
                  <th>BOOKINGS</th>
                  <th>STATUS</th>
                  <th style="text-align: right;">ACTION</th>
                </tr>
              </thead>
              <tbody id="vendor-package-table-body">
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                  <td style="padding: 5px 0; font-weight:600;">Bali Tropical Adventure</td>
                  <td>$1,250</td>
                  <td style="color:#10b981;">68 orders</td>
                  <td><span class="status-badge" style="background:#022c22; color:#10b981; padding:1px 5px; border-radius:3px; font-size:9.5px; font-weight:600;">ACTIVE</span></td>
                  <td style="text-align: right;"><button class="btn btn-outline" onclick="toggleVendorListing(this, 'Bali')" style="padding:2px 6px; font-size:9px; border-radius:3px; background:none; cursor:pointer;">Pause</button></td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                  <td style="padding: 5px 0; font-weight:600;">Maldives Private Retreat</td>
                  <td>$3,400</td>
                  <td style="color:#10b981;">45 orders</td>
                  <td><span class="status-badge" style="background:#022c22; color:#10b981; padding:1px 5px; border-radius:3px; font-size:9.5px; font-weight:600;">ACTIVE</span></td>
                  <td style="text-align: right;"><button class="btn btn-outline" onclick="toggleVendorListing(this, 'Maldives')" style="padding:2px 6px; font-size:9px; border-radius:3px; background:none; cursor:pointer;">Pause</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- TAB 3: Admin Panel -->
          <div id="sim-tab-admin" class="sim-tab-content" style="display: none;">
            <h4 style="color: var(--accent-cyan); margin-bottom: 8px; font-weight: 700; font-size: 13.5px;">⚙️ ExploreX Server Diagnostics</h4>
            
            <div style="background:#03050a; border: 1px solid rgba(255,255,255,0.05); padding:10px; border-radius:8px; font-family:monospace; font-size:10.5px; margin-bottom:12px; display:flex; flex-direction:column; gap:5px;">
              <div>[DB Instance] PostgreSQL 15.2 - <strong id="admin-db-status" style="color:#10b981;">CONNECTED</strong></div>
              <div>[Cache Layer] Redis Cache v7.0 - <strong style="color:#10b981;">ONLINE (Hits: 94.2%)</strong></div>
              <div>[API Router] Express Server Gateway - <strong style="color:#10b981;">RUNNING (Port 3000)</strong></div>
              <div>[System CPU] <span style="display:inline-block; width:80px; background:#1e293b; height:5px; border-radius:3px; overflow:hidden; vertical-align:middle; margin-left:10px;"><span style="display:block; width:34%; height:100%; background:var(--accent-cyan);"></span></span> 34%</div>
            </div>
            
            <div style="display:flex; gap:10px;">
              <button onclick="rebootSimulatorDB()" class="btn btn-outline" style="padding: 8px; font-size:11px; flex:1; justify-content:center;">
                🔄 Restart PostgreSQL Instance
              </button>
              <button onclick="alert('API rate limiting rules successfully synchronized with Redis gateway!')" class="btn btn-outline" style="padding: 8px; font-size:11px; flex:1; justify-content:center;">
                🛡️ Sync Redis Firewall Rules
              </button>
            </div>
            
            <div id="admin-console-output" style="margin-top: 10px; background: #000; border: 1px solid rgba(255,255,255,0.06); padding: 8px; border-radius: 6px; font-family: monospace; font-size: 10px; color: #10b981; height: 115px; overflow-y: auto;">
              <div>[Cron] Active session check: 0 tokens revoked.</div>
              <div>[Secure API] CORS origins loaded: http://localhost:8000.</div>
              <div>[PostgreSQL] Connection pool established. Max 20 clients.</div>
            </div>
          </div>
          
        </div>
      </div>
    `;
  } else if (projectKey === "synclearn") {
    title.textContent = "SyncLearn Gamified Learning Platform (Live Simulator)";
    content.innerHTML = `
      <div class="simulated-browser" style="position: relative;">
        <div class="browser-top-bar">
          <div class="browser-dots">
            <span class="browser-dot dot-red"></span>
            <span class="browser-dot dot-yellow"></span>
            <span class="browser-dot dot-green"></span>
          </div>
          <div class="browser-address" id="synclearn-browser-address">http://localhost:8080/student/quests</div>
        </div>
        
        <!-- Tab Navigation -->
        <div style="display: flex; background: var(--browser-bar); border-bottom: 1px solid var(--browser-border);">
          <button class="sim-tab-btn active" data-tab="syn-quest" onclick="switchSimulatorTab('syn-quest')" style="flex: 1; background: none; border: none; padding: 12px; color: var(--text-white); font-weight: 600; font-size: 11px; cursor: pointer; border-bottom: 2px solid var(--accent-cyan); transition: var(--transition); outline: none;">📚 Student Quests</button>
          <button class="sim-tab-btn" data-tab="syn-leaderboard" onclick="switchSimulatorTab('syn-leaderboard')" style="flex: 1; background: none; border: none; padding: 12px; color: var(--text-muted); font-weight: 600; font-size: 11px; cursor: pointer; border-bottom: 2px solid transparent; transition: var(--transition); outline: none;">🏆 Score Leaderboard</button>
          <button class="sim-tab-btn" data-tab="syn-teacher" onclick="switchSimulatorTab('syn-teacher')" style="flex: 1; background: none; border: none; padding: 12px; color: var(--text-muted); font-weight: 600; font-size: 11px; cursor: pointer; border-bottom: 2px solid transparent; transition: var(--transition); outline: none;">🎓 Teacher Panel</button>
        </div>
        
        <!-- Simulated Alert Notification Toast Container -->
        <div id="syn-toast-alert" style="position: absolute; top: -50px; left: 50%; transform: translateX(-50%); background: rgba(3, 7, 18, 0.95); border: 1px solid var(--accent-cyan); color: white; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; z-index: 100; transition: all 0.4s ease; backdrop-filter: blur(10px); box-shadow: 0 10px 25px rgba(6,182,212,0.4); display: flex; align-items:center; gap:8px;"></div>
        
        <div class="browser-content" style="padding: 20px; color: var(--text-light); background: var(--browser-bg); height: 395px; overflow-y: auto; position: relative;">
          
          <!-- TAB 1: Student Quests (Multi-Question Quiz) -->
          <div id="sim-tab-syn-quest" class="sim-tab-content tab-fade-in" style="display: block;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px; margin-bottom: 10px;">
              <h4 style="color: var(--accent-cyan); font-weight:700; margin:0; font-size: 13.5px;">📚 Interactive DSA Learning Quest</h4>
              <span id="demo-student-xp" style="font-size:10px; font-weight:700; background:#f59e0b; color:#030712; padding:2px 8px; border-radius:10px;">750 XP</span>
            </div>
            
            <div id="synclearn-quest-body">
              <div style="margin-bottom: 8px; display:flex; justify-content:space-between; font-size: 10.5px; color:var(--text-gray);">
                <span id="quest-progress-txt">Question 1 of 3</span>
                <span id="quest-score-txt">Accuracy: 100%</span>
              </div>
              <div style="width:100%; background:var(--border-color); height:5px; border-radius:3px; overflow:hidden; margin-bottom:12px;">
                <div id="quest-progress-bar" style="width:33.3%; height:100%; background:linear-gradient(90deg, var(--accent-cyan), var(--accent-blue)); transition:width 0.4s ease;"></div>
              </div>
              
              <p id="quest-question-text" style="font-size:12px; color:var(--text-white); font-weight:600; margin-bottom:12px; line-height:1.5;">Which data structure operates on a LIFO (Last In First Out) principle?</p>
              
              <form id="syn-mock-quiz" onsubmit="submitSyncLearnAnswer(event)" style="display:flex; flex-direction:column; gap:8px;">
                <div id="quiz-options-container" style="display:flex; flex-direction:column; gap:8px;">
                  <!-- Options are loaded dynamically -->
                </div>
                <button type="submit" id="quiz-submit-btn" class="btn btn-primary" style="margin-top:8px; padding:9.5px; justify-content:center; font-weight:700; font-size:12px;">Submit Answer</button>
              </form>
            </div>
            
            <!-- Complete Success quest overlay -->
            <div id="synclearn-success-state" style="display:none; text-align:center; animation: fadeIn 0.4s ease; padding: 10px 0;">
              <div style="background:rgba(16,185,129,0.08); border:1px solid var(--accent-green); padding:16px; border-radius:10px;">
                <span style="font-size:28px;">🏆</span>
                <h4 style="color:var(--accent-green); font-size:16px; margin:8px 0 4px 0;">Quest Completed Successfully!</h4>
                <p style="font-size:11.5px; color:var(--text-gray); margin-bottom:12px;">Perfect score! JVM database synchronized. You earned <strong style="color:var(--text-white);">+450 XP</strong> overall.</p>
                <div style="display:flex; justify-content:center; gap:12px;">
                  <button onclick="resetSyncLearnDemo()" class="btn btn-primary" style="padding:6px 14px; font-size:10.5px;">Reset Quest Solver</button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- TAB 2: Score Leaderboard -->
          <div id="sim-tab-syn-leaderboard" class="sim-tab-content" style="display: none;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <h4 style="color: var(--accent-cyan); margin:0; font-weight:700; font-size: 13.5px;">🏆 Global Student Standings</h4>
              <button onclick="challengeDuel()" class="btn btn-primary" style="padding:4px 10px; font-size:9.5px; border-radius:4px; font-weight:700; outline:none;">⚔️ Challenge Rank #3</button>
            </div>
            
            <!-- Leaderboard List -->
            <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;" id="leaderboard-players-list">
              <div style="display:flex; justify-content:space-between; align-items:center; background:var(--input-bg); padding:8px 12px; border-radius:6px; border:1px solid var(--border-color);">
                <span style="font-size:11px; font-weight:700; color:#f59e0b;">1. Sarah M. (Level 25)</span>
                <strong style="font-size:11px; color:#f59e0b;">2,850 XP</strong>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; background:var(--input-bg-focus); padding:8px 12px; border-radius:6px; border:1px solid var(--border-color); box-shadow: 0 0 10px rgba(99,102,241,0.1);">
                <span style="font-size:11px; font-weight:700; color:var(--text-white);">2. Dhanaraj D. (Level 22) <span style="font-size:8px; background:var(--accent-cyan); color:#030712; padding:1px 3px; border-radius:3px; font-weight:800; margin-left:5px;">YOU</span></span>
                <strong style="font-size:11px; color:var(--accent-cyan);" id="leaderboard-user-xp">2,450 XP</strong>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; background:var(--input-bg); padding:8px 12px; border-radius:6px; border:1px solid var(--border-color);" id="rank3-player-row">
                <span style="font-size:11px; font-weight:700; color:var(--text-gray);">3. Jessica K. (Level 21)</span>
                <strong style="font-size:11px; color:var(--text-gray);">2,480 XP</strong>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; background:var(--input-bg); padding:8px 12px; border-radius:6px; border:1px solid var(--border-color);">
                <span style="font-size:11px; font-weight:700; color:var(--text-gray);">4. Alex R. (Level 20)</span>
                <strong style="font-size:11px; color:var(--text-gray);">2,100 XP</strong>
              </div>
            </div>
            
            <div id="duel-terminal-log" style="display:none; background:#000; border: 1px solid var(--border-color); padding:8px; border-radius:6px; font-family:monospace; font-size:10px; color:#10b981; height:120px; overflow-y:auto;"></div>
          </div>
          
          <!-- TAB 3: Teacher Panel -->
          <div id="sim-tab-syn-teacher" class="sim-tab-content" style="display: none;">
            <h4 style="color: var(--accent-cyan); margin-bottom: 10px; font-weight: 700; font-size:13.5px;">🎓 Spring Boot Classroom Management</h4>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px; text-align:center;">
              <div style="background:var(--input-bg); border:1px solid var(--border-color); padding:8px; border-radius:6px;">
                <div style="font-size:16px; font-weight:800; color:var(--text-white);">84.5%</div>
                <div style="font-size:9px; color:var(--text-gray); margin-top:2px;">CLASS AVERAGE ACCURACY</div>
              </div>
              <div style="background:var(--input-bg); border:1px solid var(--border-color); padding:8px; border-radius:6px;">
                <div style="font-size:16px; font-weight:800; color:var(--accent-green);">18 Students</div>
                <div style="font-size:9px; color:var(--text-gray); margin-top:2px;">ONLINE SECTOR ACTIVITY</div>
              </div>
            </div>
            
            <form onsubmit="sendTeacherNotification(event)" style="background:var(--panel-bg); border:1px solid var(--border-color); padding:10px; border-radius:8px; display:flex; flex-direction:column; gap:6px;">
              <label style="font-size:9px; font-weight:700; color:var(--text-white);">📢 BROADCAST CLASSROOM ALERT ANNOUNCEMENT</label>
              <div style="display:flex; gap:8px;">
                <input type="text" id="teacher-announcement" placeholder="e.g. Homework quiz quest is due by 8:00 PM tonight!" required style="flex:1; background:var(--input-bg); border:1px solid var(--border-color); padding:6px; border-radius:4px; color:var(--text-white); font-size:11px; outline:none;">
                <button type="submit" class="btn btn-primary" style="padding:0 10px; font-size:10.5px; font-weight:700; border-radius:4px;">Broadcast</button>
              </div>
            </form>
            
            <div style="margin-top:12px; font-size:9.5px; color:#64748b;">
              * Broadcast commands are processed by the Spring MVC WebSocket listener and immediately pushed to client browsers.
            </div>
          </div>
          
        </div>
      </div>
    `;
    loadSyncLearnQuestion(0);
  }
}

function closeDemoModal() {
  const modal = document.getElementById("demo-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function initModalBackdropClicks() {
  const demoModal = document.getElementById("demo-modal");
  if (demoModal) {
    demoModal.addEventListener("click", (e) => {
      if (e.target === demoModal) {
        closeDemoModal();
      }
    });
  }
  const resumeModal = document.getElementById("resume-modal");
  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }
}

// 8. Resume Modal Controls
function openResumeModal() {
  const modal = document.getElementById("resume-modal");
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

// Resume download is handled via direct <a download> link in HTML

function closeResumeModal() {
  const modal = document.getElementById("resume-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// 9. Contact form submit action
function handleContactSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;
  const submitBtn = document.querySelector(".btn-submit");
  const successMsg = document.getElementById("contact-success-msg");
  
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Transmitting message...";
  }
  
  fetch("https://formsubmit.co/ajax/dhanarajdhammure99@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      _subject: `Portfolio Message: ${subject}`,
      message: message
    })
  })
  .then(response => response.json())
  .then(data => {
    if (submitBtn) submitBtn.textContent = "Transmitted ✓";
    if (successMsg) {
      successMsg.textContent = "✅ Message sent successfully! I will respond to your email shortly.";
      successMsg.style.display = "block";
    }
    
    document.getElementById("portfolio-contact-form").reset();
    
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Send Message <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 6px;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
      }
      if (successMsg) successMsg.style.display = "none";
    }, 6000);
  })
  .catch(error => {
    console.error("Error sending message:", error);
    if (submitBtn) {
      submitBtn.textContent = "Transmission failed";
      submitBtn.style.borderColor = "#ef4444";
      submitBtn.style.color = "#ef4444";
    }
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.borderColor = "";
        submitBtn.style.color = "";
        submitBtn.innerHTML = `Send Message <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 6px;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
      }
    }, 4000);
  });
}

// 9.5 Dark/Light Theme Switching Controller
function initThemeSwitcher() {
  const toggleBtn = document.getElementById("theme-toggle");
  const mobileToggleBtn = document.getElementById("mobile-theme-toggle");

  if (!toggleBtn && !mobileToggleBtn) return;

  function setTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
    localStorage.setItem("portfolio-theme", theme);
  }

  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  if (savedTheme === "light" || (!savedTheme && systemPrefersLight)) {
    setTheme("light");
  } else {
    setTheme("dark");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isLight = document.body.classList.contains("light-mode");
      setTheme(isLight ? "dark" : "light");
    });
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener("click", () => {
      const isLight = document.body.classList.contains("light-mode");
      setTheme(isLight ? "dark" : "light");
    });
  }
}

// 10. Dynamic Active Nav Highlight via Intersection Observer
function initActiveNavHighlight() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const drawerLinks = document.querySelectorAll(".drawer-links a");
  if (!navLinks.length) return;

  // Build list of section IDs from nav href attributes
  const sectionIds = [];
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      sectionIds.push(href.slice(1));
    }
  });

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  // Track visibility ratio for each section
  const visibilityMap = new Map();
  sections.forEach(sec => visibilityMap.set(sec.id, 0));

  function updateActiveLink() {
    let maxRatio = 0;
    let activeSectionId = sectionIds[0]; // default to first section

    visibilityMap.forEach((ratio, id) => {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        activeSectionId = id;
      }
    });

    // Sync desktop nav links
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href === `#${activeSectionId}`) {
        link.classList.add("nav-active");
      } else {
        link.classList.remove("nav-active");
      }
    });

    // Sync mobile drawer links
    drawerLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href === `#${activeSectionId}`) {
        link.classList.add("drawer-nav-active");
      } else {
        link.classList.remove("drawer-nav-active");
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      visibilityMap.set(entry.target.id, entry.intersectionRatio);
    });
    updateActiveLink();
  }, {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    rootMargin: "-60px 0px -10% 0px" // account for fixed navbar height
  });

  sections.forEach(sec => observer.observe(sec));
}

// ─────────────────────────────────────────────────────────────
// 11. Ambient Spotlight — soft radial glow follows the cursor
//     (replaces the common dot/ring cursor)
// ─────────────────────────────────────────────────────────────
function initCustomCursor() {
  // Touch devices: skip entirely
  if (window.matchMedia("(pointer: coarse)").matches) return;

  // Create the spotlight overlay element
  const spotlight = document.createElement("div");
  spotlight.className = "ambient-spotlight";
  document.body.appendChild(spotlight);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let isHovering = false;
  let raf;

  // Track mouse position
  document.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // Animate with smooth lerp — spotlight drifts lazily behind cursor
  function animate() {
    const lerpFactor = isHovering ? 0.07 : 0.05;
    currentX += (targetX - currentX) * lerpFactor;
    currentY += (targetY - currentY) * lerpFactor;

    spotlight.style.setProperty("--sx", `${currentX}px`);
    spotlight.style.setProperty("--sy", `${currentY}px`);

    raf = requestAnimationFrame(animate);
  }
  animate();

  // Brighten spotlight when hovering interactive elements
  const interactives = document.querySelectorAll(
    "a, button, .project-card, .cert-card, .skills-card, .stat-item, .info-item"
  );
  interactives.forEach(el => {
    el.addEventListener("mouseenter", () => {
      isHovering = true;
      spotlight.classList.add("ambient-spotlight--active");
    });
    el.addEventListener("mouseleave", () => {
      isHovering = false;
      spotlight.classList.remove("ambient-spotlight--active");
    });
  });

  // Fade out when mouse leaves the window
  document.addEventListener("mouseleave", () => {
    spotlight.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    spotlight.style.opacity = "1";
  });
}

// ─────────────────────────────────────────────────────────────
// 12. Click Ripple Effect on Buttons & Links
// ─────────────────────────────────────────────────────────────
function initButtonRipple() {
  const targets = document.querySelectorAll(".btn, .proj-link-btn, .nav-resume-btn, .theme-toggle-btn, .stat-item");
  targets.forEach(el => {
    el.style.position = "relative";
    el.style.overflow = "hidden";

    el.addEventListener("click", function(e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;

      const ripple = document.createElement("span");
      ripple.className = "ripple-wave";
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
      `;
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}

// ─────────────────────────────────────────────────────────────
// 13. 3D Card Tilt on Mouse Move
// ─────────────────────────────────────────────────────────────
function initCardTilt() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const tiltCards = document.querySelectorAll(
    ".project-card, .skills-card, .cert-card, .about-education-card, .node-content"
  );

  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      const tiltX = dy * -6;  // max 6deg tilt
      const tiltY = dx * 6;

      card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
      card.style.transition = "transform 0.1s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    });
  });
}

// ─────────────────────────────────────────────────────────────
// 14. Magnetic Button Effect
// ─────────────────────────────────────────────────────────────
function initMagneticButtons() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const magnets = document.querySelectorAll(".btn-primary, .nav-resume-btn, .drawer-resume-btn, .hero-socials a");

  magnets.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;

      btn.style.transform = `translate(${dx}px, ${dy}px)`;
      btn.style.transition = "transform 0.12s ease";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
      btn.style.transition = "transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    });
  });
}

// ─────────────────────────────────────────────────────────────
// 15. Staggered Hero Section Entrance Animation
// ─────────────────────────────────────────────────────────────
function initHeroEntrance() {
  const heroContent = document.querySelector(".hero-content");
  if (!heroContent) return;

  const children = Array.from(heroContent.children);
  children.forEach((child, i) => {
    child.style.opacity = "0";
    child.style.transform = "translateY(22px)";
    child.style.transition = `opacity 0.65s cubic-bezier(0.1, 0.8, 0.3, 1) ${0.1 + i * 0.12}s,
                               transform 0.65s cubic-bezier(0.1, 0.8, 0.3, 1) ${0.1 + i * 0.12}s`;
  });

  // Trigger after a short delay so CSS loads first
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      children.forEach(child => {
        child.style.opacity = "1";
        child.style.transform = "translateY(0)";
      });
      
      // Clear transitions after animation completes (longest delay + duration = ~1.5s)
      // to ensure scroll parallax is 100% lag-free.
      setTimeout(() => {
        children.forEach(child => {
          child.style.transition = "";
        });
      }, 1600);
    });
  });
}

// ─────────────────────────────────────────────────────────────
// 16. Text Scramble — section titles decode on scroll
// ─────────────────────────────────────────────────────────────
function initTextScramble() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>/\\|";

  class Scrambler {
    constructor(el) {
      this.el = el;
      this.original = el.textContent;
      this.frame = 0;
      this.queue = [];
      this.running = false;
    }
    start() {
      if (this.running) return;
      this.running = true;
      this.queue = this.original.split("").map((char, i) => ({
        from: chars[Math.floor(Math.random() * chars.length)],
        to: char,
        start: Math.floor(Math.random() * 18),
        end: Math.floor(Math.random() * 18) + 18,
        char: ""
      }));
      this.frame = 0;
      this.update();
    }
    update() {
      let output = "";
      let done = 0;
      this.queue.forEach((item, i) => {
        if (this.frame >= item.end) {
          done++;
          output += item.to;
        } else if (this.frame >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = chars[Math.floor(Math.random() * chars.length)];
          }
          output += `<span class="scramble-char">${item.char}</span>`;
        } else {
          output += item.to;
        }
      });
      this.el.innerHTML = output;
      if (done === this.queue.length) {
        this.el.innerHTML = this.original;
        this.running = false;
        return;
      }
      this.frame++;
      requestAnimationFrame(() => this.update());
    }
  }

  const titles = document.querySelectorAll(".section-title");
  const scramblers = new Map();
  titles.forEach(t => scramblers.set(t, new Scrambler(t)));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scramblers.get(entry.target)?.start();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  titles.forEach(t => obs.observe(t));
}

// ─────────────────────────────────────────────────────────────
// 17. Click Particle Burst
// ─────────────────────────────────────────────────────────────
function initClickParticles() {
  const canvas = document.getElementById("particle-burst-canvas");
  let burstCanvas;

  // Create a dedicated overlay canvas for click particles
  burstCanvas = document.createElement("canvas");
  burstCanvas.id = "particle-burst-canvas";
  burstCanvas.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none; z-index: 9999;
  `;
  document.body.appendChild(burstCanvas);
  const ctx = burstCanvas.getContext("2d");

  function resize() {
    burstCanvas.width = window.innerWidth;
    burstCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = [];

  document.addEventListener("click", (e) => {
    const count = 14;
    const isLight = document.body.classList.contains("light-mode");
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const speed = Math.random() * 3.5 + 1.5;
      const hue = [266, 220, 200][Math.floor(Math.random() * 3)];
      particles.push({
        x: e.clientX, y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 1.5,
        life: 1,
        decay: Math.random() * 0.025 + 0.02,
        size: Math.random() * 3 + 1.5,
        color: isLight ? `hsla(${hue}, 80%, 45%, ` : `hsla(${hue}, 90%, 70%, `
      });
    }
  });

  function loop() {
    ctx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // gravity
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.life.toFixed(2)})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `${p.color}0.5)`;
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(loop);
  }
  loop();
}

// ─────────────────────────────────────────────────────────────
// 18. Hero Parallax on Scroll
// ─────────────────────────────────────────────────────────────
function initParallaxHero() {
  const heroImg = document.querySelector(".hero-image-wrapper");
  const heroTitle = document.querySelector(".hero-title");
  const heroBadge = document.querySelector(".hero-badge");

  if (!heroImg) return;

  let lastY = 0;
  let ticking = false;

  function onScroll() {
    lastY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    const y = lastY;
    // Image drifts upward slower than scroll (depth)
    if (heroImg) heroImg.style.transform = `translateY(${y * 0.18}px)`;
    // Title drifts slightly faster (foreground depth)
    if (heroTitle) heroTitle.style.transform = `translateY(${y * 0.08}px)`;
    // Badge barely moves
    if (heroBadge) heroBadge.style.transform = `translateY(${y * 0.04}px)`;
    ticking = false;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
}

// ─────────────────────────────────────────────────────────────
// 19. Stat Counter Animation
// ─────────────────────────────────────────────────────────────
function initStatCounters() {
  const statHeadings = document.querySelectorAll(".stat-item h3");

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el, target, suffix, duration = 1400) {
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent.trim();
      const numMatch = raw.match(/(\d+)/);
      const suffix = raw.replace(/\d+/, "");
      if (numMatch) {
        animateCounter(el, parseInt(numMatch[1]), suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.6 });

  statHeadings.forEach(h => {
    // Only animate numeric ones
    if (/\d/.test(h.textContent)) obs.observe(h);
  });
}

// ─────────────────────────────────────────────────────────────
// 20. Monochromatic Card Spotlight Glow
// ─────────────────────────────────────────────────────────────
function initCardSpotlight() {
  const cards = document.querySelectorAll(".project-card, .cert-card");
  
  cards.forEach(card => {
    let spotlight = card.querySelector(".card-spotlight");
    if (!spotlight) {
      spotlight = document.createElement("div");
      spotlight.className = "card-spotlight";
      card.appendChild(spotlight);
    }
    
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      
      spotlight.style.setProperty("--mx", `${px}%`);
      spotlight.style.setProperty("--my", `${py}%`);
    });
  });
}

// ─────────────────────────────────────────────────────────────
// 21. Classic Section Title Fade-Up & Underline Reveal
// ─────────────────────────────────────────────────────────────
function initTextRise() {
  const titles = document.querySelectorAll(".section-title");
  
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      } else {
        entry.target.classList.remove("revealed");
      }
    });
  }, { threshold: 0.02, rootMargin: "50px 0px 50px 0px" });
  
  titles.forEach(t => obs.observe(t));
}

// ─────────────────────────────────────────────────────────────
// 22. Sliding Underline Nav Hover
// ─────────────────────────────────────────────────────────────
function initNavPillSlider() {
  const nav = document.querySelector(".nav-links");
  if (!nav) return;
  
  const underline = document.createElement("div");
  underline.className = "nav-underline-slider";
  nav.appendChild(underline);
  
  const links = nav.querySelectorAll("a:not(.nav-btn-contact)");
  
  function positionUnderline(link) {
    if (!link || (!link.classList.contains("nav-active") && !link.matches(":hover"))) {
      const activeLink = nav.querySelector("a.nav-active");
      if (activeLink && activeLink !== link) {
        positionUnderline(activeLink);
        return;
      }
      underline.style.opacity = "0";
      return;
    }
    const rect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    
    underline.style.opacity = "1";
    underline.style.width = `${rect.width}px`;
    underline.style.left = `${rect.left - navRect.left}px`;
  }
  
  links.forEach(link => {
    link.addEventListener("mouseenter", () => {
      positionUnderline(link);
    });
    
    link.addEventListener("mouseleave", () => {
      setTimeout(() => {
        const activeLink = nav.querySelector("a.nav-active");
        positionUnderline(activeLink);
      }, 50);
    });
  });
  
  // Initial position
  setTimeout(() => {
    const activeLink = nav.querySelector("a.nav-active");
    if (activeLink) positionUnderline(activeLink);
  }, 300);
  
  window.addEventListener("resize", () => {
    const activeLink = nav.querySelector("a.nav-active");
    if (activeLink) positionUnderline(activeLink);
  });
  
  const observer = new MutationObserver(() => {
    const activeLink = nav.querySelector("a.nav-active");
    if (activeLink) positionUnderline(activeLink);
  });
  
  links.forEach(link => {
    observer.observe(link, { attributes: true, attributeFilter: ["class"] });
  });
}

// ─────────────────────────────────────────────────────────────
// 23. Background Parallax and Ambient Drift (Minimalistic)
// ─────────────────────────────────────────────────────────────
function initBackgroundParallax() {
  const grid = document.querySelector(".grid-overlay");
  const orb1 = document.querySelector(".orb-1");
  const orb2 = document.querySelector(".orb-2");
  
  if (!grid && !orb1 && !orb2) return;
  
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let scrollY = 0;
  
  window.addEventListener("mousemove", (e) => {
    // Normalised mouse coordinates between -1 and 1
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    targetX = nx;
    targetY = ny;
  });
  
  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  }, { passive: true });
  
  function update(now) {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;
    
    // Slow ambient float using timestamp (in seconds)
    const time = now * 0.00035;
    const floatX1 = Math.sin(time) * 30;
    const floatY1 = Math.cos(time * 0.8) * 20;
    
    const floatX2 = Math.cos(time * 0.9) * 25;
    const floatY2 = Math.sin(time * 0.7) * 20;
    
    if (grid) {
      // Grid drifts extremely slightly with mouse movement
      grid.style.transform = `translate(${currentX * 8}px, 0px)`;
    }
    
    if (orb1) {
      // Orb 1 moves with mouse and drifts slowly on scroll & time
      orb1.style.transform = `translate(${currentX * 22 + floatX1}px, ${currentY * 22 + floatY1 - scrollY * 0.12}px)`;
    }
    
    if (orb2) {
      // Orb 2 moves in reverse with mouse and drifts slowly on scroll & time
      orb2.style.transform = `translate(${currentX * -22 + floatX2}px, ${currentY * -22 + floatY2 - scrollY * 0.08}px)`;
    }
    
    requestAnimationFrame(update);
  }
  
  requestAnimationFrame(update);
}
