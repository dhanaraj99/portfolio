# Premium Recruiter-Ready Portfolio

A high-fidelity, interactive, and visually stunning developer portfolio website showcasing my full-stack expertise, major projects, and certifications. Designed with custom lightweight transitions, theme support, and embedded interactive micro-app simulators to demonstrate end-to-end software engineering capabilities.

---

## ⚡ Core Expertise & Tech Stack

- **Backend Development:** Java, Spring Boot, Spring Security, REST APIs, Microservices, PostgreSQL, JDBC
- **Frontend Development:** React.js, JavaScript (ES6+), HTML5, Vanilla CSS3, Responsive Design
- **Tools & DevOps:** Git, Docker, Maven, UI Optimization, Cross-Browser Compatibility

---

## ✨ Premium UI & Interaction Features

- **3D Background Parallax & Drift:** Fixed grid mesh and glowing radial accent orbs that respond dynamically to cursor coordinates and scroll physics, creating an elegant sense of space and depth.
- **Constellation Particle Network:** Interactive background canvas that renders floating nodes with custom connecting links that track and bridge to your mouse cursor.
- **Bidirectional Scroll Reveals:** Programmatic IntersectionObserver triggers that fade and slide up cards, forms, and timeline nodes when scrolled into view from *both* directions, featuring custom exit reset speeds.
- **Nav Underline Slider:** A sleek, 2px indicator bar that slides fluidly underneath navbar links when hovered and snaps to active anchor nodes on scroll.
- **Monochromatic Spotlight Glow:** Project and certification cards capture hover positions and project a soft monochromatic light catch following the mouse.
- **Magnetic Buttons & Social Links:** Tactical buttons and landing page social icons that slide towards the mouse cursor on close proximity.
- **Dual-Mode Theme Controller:** Clean, paper-contrast Light Mode and zinc/slate Dark Mode with localized theme switcher memory persistence.

---

## 🚀 Embedded Micro-App Simulators

To demonstrate backend architecture and live client-server communication without requiring external database dependencies, the portfolio embeds two live interactive simulators:

### 🎒 1. ExploreX (Flight Reservation Checkout Simulator)
* **Secure API Mocking:** Simulates secure token transmission, route resolution, and gate assignments.
* **Interactive Seat Grid:** Dynamically updates class tiers (First Class, Business, Economy) on user seat selection.
* **Live Ticket Generator:** Renders a downloadable, high-fidelity boarding pass ticket with dynamic mock transaction logs.

### 📚 2. SyncLearn (Gamified DSA Platform Simulator)
* **Gamified Solver:** Interactive quiz panel tracking XP awards and user accuracy scores.
* **Scoreboard Duel System:** Simulates real-time leaderboards where users can trigger rank challenges.
* **WebSocket Announcement Gateway:** Classroom broadcast gateway simulating Spring Boot WebSocket listeners pushing broadcasts to the client browser.

---

## 📁 File Structure

```
dhanaraj-portfolio/
├── index.html        # Main layout, icons, and micro-app markups
├── style.css         # Custom stylesheet, layout tokens, and transitions
├── script.js        # DOM interaction handlers, canvas render loop, and observers
├── avatar.jpg        # High-res profile photo
├── explorex.png      # ExploreX project thumbnail mockup
├── synclearn.png     # SyncLearn project thumbnail mockup
├── resume.pdf        # Recruiter-ready PDF resume file
└── resume.html       # Print-formatted clean HTML resume alternative
```

---

## 💻 Running Locally

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/dhanaraj99/portfolio.git
   ```
2. Navigate into the directory:
   ```bash
   cd dhanaraj-portfolio
   ```
3. Run a local development server (e.g., using Node's `http-server` or VS Code Live Server):
   ```bash
   npx http-server -p 8000 -c-1
   ```
4. Open your browser and navigate to `http://localhost:8000`.
