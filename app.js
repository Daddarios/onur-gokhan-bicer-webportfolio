
/* =====================================================
   PROJECT TECH ICONS  ##013 05.02
   ===================================================== */


function renderProjectTechIcons() {
  const iconMap = {
    "Visual Studio": "devicon-visualstudio-plain colored",
    "Visual Studio Code": "devicon-vscode-plain colored",
    "HTML5": "devicon-html5-plain-wordmark colored",
    "CSS3": "devicon-css3-plain-wordmark colored",
    "JavaScript": "devicon-javascript-plain colored",
    "Express.js": "devicon-express-original",
    "Node.js": "devicon-nodejs-line-wordmark colored",
    "npm": "devicon-npm-plain colored",
    "C#": "devicon-csharp-plain colored",
    "ASP.NET MVC": "devicon-dot-net-plain colored",
    "ASP.NET": "devicon-dot-net-plain-wordmark colored",
    "ASP.NET Core":"devicon-dotnetcore-plain colored",
    "EF Core": "devicon-entityframeworkcore-plain colored",
    "Entity Framework": "devicon-entityframeworkcore-plain colored",
    "Razor": "devicon-dot-net-plain colored",
    "Blazor": "devicon-blazor-original colored",
    "Twilio": "devicon-twilio-plain colored",
    "Mysql": "devicon-mysql-original colored",
    
    "SQL": "devicon-microsoftsqlserver-plain colored",
    "SQL Server": "devicon-microsoftsqlserver-plain colored",
    "Bootstrap": "devicon-bootstrap-plain colored",
    "Tailwind CSS": "devicon-tailwindcss-plain colored",
    "jQuery": "devicon-jquery-plain colored",
    "React": "devicon-react-plain colored",
    "Vite": "devicon-vitejs-plain colored",
    "Vite 8": "devicon-vitejs-plain colored",
    "React Router": "devicon-reactrouter-plain colored",
    "React Router 7": "devicon-reactrouter-plain colored",
    "Axios": "devicon-axios-plain colored",
    "GitHub": "devicon-github-plain white",
    "GitHub Actions": "devicon-githubactions-plain",
    "Git": "devicon-git-plain colored",
    "Cloud": "devicon-googlecloud-plain",
    "Python": "devicon-python-plain colored",
    "NumPy": "devicon-numpy-plain colored",
    "Pandas": "devicon-pandas-original colored",
    "Matplotlib":"devicon-matplotlib-plain white",
    "Redis":"devicon-redis-plain-wordmark colored",
    "scikit-learn": "devicon-scikitlearn-plain colored",
    "Docker": "devicon-docker-plain-wordmark colored",
    "Docker2": "devicon-docker-plain colored",
    "Swagger":"devicon-swagger-plain  colored",
    "AJAX": "",       // ikon yok, fallback gösterilecek
    "MailKit": "",    // ikon yok
    "SignalR": "",    // ikon yok
    "Semantic Kernel": "", // ikon yok
    "Kernel Memory": "",   // ikon yok
    "Ollama": "",     // ikon yok
    "Qdrant": "",     // ikon yok
    "Cursor": "",     // ikon yok (fallback metin)
    "GitHub Copilot": "", // ikon yok
    "Codex": "",      // ikon yok
    "Identity/JWT": "", // ikon yok
    "Recharts": "",   // ikon yok
    "Serilog": "",    // ikon yok
    "JWT": ""         // ikon yok
  };
  const ollamaIconCdn = "https://cdn.jsdelivr.net/npm/simple-icons/icons/ollama.svg";

  document.querySelectorAll(".project-tech").forEach(div => {
    const techs = div.textContent.split(",").map(t => t.trim()).filter(Boolean);
    div.innerHTML = "";

    techs.forEach(t => {
      const className = iconMap[t];

      if (className) {
        const icon = document.createElement("i");
        icon.className = `${className} project-tech-icon`;
        icon.title = t;
        div.appendChild(icon);
      } else if (t === "Ollama") {
        const img = document.createElement("img");
        img.src = ollamaIconCdn;
        img.alt = t;
        img.title = t;
        img.className = "project-tech-img";
        div.appendChild(img);
      } else {
        // ikon yoksa yazıyla sade etiket
        const span = document.createElement("span");
        span.textContent = t;
        span.title = t;
        span.className = "project-tech-fallback";
        div.appendChild(span);
      }
    });
  });
}

function renderHeroIcons() {
  const heroRole = document.querySelector(".hero-role");
  if (!heroRole) return;

  const heroTechs = [
    { key: "C#",         cls: "devicon-csharp-plain colored" },
    { key: "ASP.NET",    cls: "devicon-dot-net-plain colored" },
    { key: "React",      cls: "devicon-react-plain colored" },
    { key: "JavaScript", cls: "devicon-javascript-plain colored" }
  ];

  heroRole.innerHTML = "";
  heroTechs.forEach(({ key, cls }) => {
    const icon = document.createElement("i");
    icon.className = cls;
    icon.title = key;
    heroRole.appendChild(icon);
  });
}

function normalizeBlankLinks(root = document) {
  root.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.rel = "noopener noreferrer";
    if (!link.getAttribute("aria-label")) {
      const img = link.querySelector("img");
      const label = link.getAttribute("title") || img?.getAttribute("alt");
      if (label) link.setAttribute("aria-label", label);
    }
  });
}

document.addEventListener("mousemove", (event) => {
  document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
});



const dom = {
  menuToggle: document.getElementById("menuToggle"),
  navLinks: document.getElementById("navLinks"),
  topbar: document.querySelector(".topbar"),
  wrapper: document.getElementById("cvCardsWrapper"),
  container: document.getElementById("cvCardContainer"),
  closeBtn: document.querySelector(".close-btn"),
  bg: document.querySelector(".global-bg")
};

let lockedScrollY = 0;
let menuCloseTimer = null;
const MENU_CLOSE_RESET_MS = 1650;

function isMenuOpen() {
  return dom.navLinks.classList.contains("open");
}

function getActiveMenuToggle() {
  return (
    dom.menuToggle ||
    document.getElementById("toggle") ||
    document.querySelector('a[href="#menu"]')
  );
}

function lockMainPageScroll() {
  lockedScrollY = window.scrollY;
  document.body.classList.add("overlay-scroll-lock");
  document.body.style.top = `-${lockedScrollY}px`;
}

function unlockMainPageScroll() {
  document.body.classList.remove("overlay-scroll-lock");
  document.body.style.top = "";
  window.scrollTo(0, lockedScrollY);
}



function setMenuState(isOpen) {
  clearTimeout(menuCloseTimer);

  if (isOpen) {
    dom.navLinks.classList.remove("open", "closing");
    void dom.navLinks.offsetWidth;
    dom.navLinks.classList.add("open");
    if (window.innerWidth <= 768) {
      document.body.classList.add("open-menu");
    }
  } else if (isMenuOpen() || dom.navLinks.classList.contains("closing")) {
    dom.navLinks.classList.add("closing");
    dom.navLinks.classList.remove("open");
    document.body.classList.remove("open-menu");
    menuCloseTimer = setTimeout(() => {
      dom.navLinks.classList.remove("closing");
    }, MENU_CLOSE_RESET_MS);
  } else {
    dom.navLinks.classList.remove("open", "closing");
    document.body.classList.remove("open-menu");
  }

  const activeMenuToggle = getActiveMenuToggle();
  if (activeMenuToggle) {
    activeMenuToggle.setAttribute("aria-expanded", String(isOpen));
    activeMenuToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
  }
  document.body.style.overflow = isOpen && window.innerWidth <= 768 ? "hidden" : "";
}

dom.navLinks.addEventListener("transitionend", (e) => {
  if (e.target !== dom.navLinks || e.propertyName !== "transform") return;
  if (dom.navLinks.classList.contains("closing") || dom.navLinks.classList.contains("open")) {
    return;
  }

  clearTimeout(menuCloseTimer);
  document.body.classList.remove("open-menu");
});

function closeMenu() {
  setMenuState(false);
}

// Menü toggle butonu
const menuToggleElements = [...new Set([
  dom.menuToggle,
  document.getElementById("toggle"),
  document.querySelector('a[href="#menu"]')
].filter(Boolean))];

menuToggleElements.forEach((toggleEl) => {
  toggleEl.addEventListener("click", (e) => {
    if (toggleEl.tagName.toLowerCase() === "a") {
      e.preventDefault();
    }
    setMenuState(!isMenuOpen());
  });
});

document.addEventListener("click", (e) => {
  if (!isMenuOpen()) return;
  if (dom.topbar.contains(e.target) || dom.navLinks.contains(e.target)) return;
  closeMenu();
});

// ESC tuşuna basınca menüyü kapat
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const overlayIsOpen = dom.wrapper.classList.contains("active");
    closeMenu();
    if (overlayIsOpen) {
      closeOverlay();
      return;
    }
  }
});

// Responsive geçişlerde menüyü sıfırla + sıçrama önle
let wasMobile = window.innerWidth <= 768;

window.addEventListener("resize", () => {
  const isMobile = window.innerWidth <= 768;

  if (wasMobile !== isMobile) {
    // ➤ Animasyonu geçici kapat
    dom.navLinks.style.transition = "none";

    // Sınıf ve scroll reset
    closeMenu();

    // ➤ Gelecek frame'de transition geri gelsin
    requestAnimationFrame(() => {
      dom.navLinks.style.transition = "";
    });

    wasMobile = isMobile;
  }
});


// Tüm sayfa içi anchor linkler için smooth scroll
function smoothScrollTo(targetY) {
  const phaseIn = 600;
  const phaseCruise = 300;
  const phaseOut = 1500;
  const duration = phaseIn + phaseCruise + phaseOut;

  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInCubic(t) {
    return t * t * t;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function phasedProgress(elapsed) {
    if (elapsed <= phaseIn) {
      const t = elapsed / phaseIn;
      return easeInCubic(t) * 0.25;
    }

    if (elapsed <= phaseIn + phaseCruise) {
      const t = (elapsed - phaseIn) / phaseCruise;
      return 0.25 + t * 0.5;
    }

    const t = (elapsed - phaseIn - phaseCruise) / phaseOut;
    return 0.75 + easeOutCubic(t) * 0.25;
  }

  function step(now) {
    const elapsed = Math.min(now - startTime, duration);
    const progress = Math.min(phasedProgress(elapsed), 1);
    window.scrollTo(0, startY + distance * progress);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const header = document.querySelector(".topbar");
    const headerOffset = header ? header.offsetHeight + 10 : 80;
    const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    smoothScrollTo(y);
  });
});


/* ===== SECTIONS ===== */
const sections = [
  { id: "uber-mich", title: "Über mich", desc: "Beruflicher Hintergrund und Arbeitsweise" },
  { id: "fahigkeiten", title: "Lebenslauf & Dokumente", desc: "Unterlagen und Nachweise" },
  { id: "kompetenzen", title: "Kompetenzbereiche", desc: "Technologien mit praktischem Einsatzkontext" },
  { id: "projekte", title: "Entwicklung & Projekte", desc: "Softwareprojekte im Überblick" },
  { id: "kurs", title: "Weiterbildungen", desc: "Aktuelle Lernfelder und Fortbildungen" },
  { id: "kontakt", title: "Kontakt", desc: "Direkter Kontakt für Rückfragen" }
];

const frag = document.createDocumentFragment();

sections.forEach(s => {
  const sec = document.createElement("section");
  sec.className = "cv-section";
  sec.id = s.id;
  sec.innerHTML = `
    <div class="cv-content scroll-animation">
      <h2 class="section-title">${s.title}</h2>
      <p>${s.desc}</p>
      <button class="cv-open-btn" data-type="${s.id}">
        Mehr dazu
      </button>
    </div>
  `;
  frag.appendChild(sec);
});

document.body.appendChild(frag);

const observedSections = document.querySelectorAll(".cv-section");
let lastScrollY = window.scrollY;
let scrollDirection = "down";

window.addEventListener("scroll", () => {
  const currentY = window.scrollY;
  scrollDirection = currentY >= lastScrollY ? "down" : "up";
  lastScrollY = currentY;
});

observedSections.forEach((section) => {
  const animatedItems = section.querySelectorAll(".scroll-animation");

  animatedItems.forEach((item, index) => {
    item.style.setProperty("--delay", `${index * 0.09}s`);
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("reveal-from-top", "reveal-from-bottom");
        entry.target.classList.add(
          scrollDirection === "down" ? "reveal-from-bottom" : "reveal-from-top"
        );
        entry.target.classList.add("is-active");
      } else {
        entry.target.classList.remove("is-active");
      }
    });
  },
  {
    threshold: 0.35
  }
);

observedSections.forEach((section) => {
  sectionObserver.observe(section);
});

function createCustomScrollBar() {
  const bar = document.createElement("div");
  bar.className = "custom-scrollbar";
  bar.setAttribute("aria-hidden", "true");

  const fill = document.createElement("div");
  fill.className = "custom-scrollbar-fill";
  bar.appendChild(fill);
  document.body.appendChild(bar);

  const update = () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    const ratio = scrollTop / maxScroll;
    fill.style.height = `${ratio * 100}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

createCustomScrollBar();
// Menü linkleri hedefe scroll ederken menü açık kalsın.

dom.topbar.querySelector(".logo")?.addEventListener("click", () => {
  closeMenu();
});

/* ===== PROJEKTE: DATEN ===== */
const projectsData = [
  {
    title: "Vista.Core + Vista.CoreX",
    subtitle: "Full-Stack SaaS mit RAG-AI Assistent",
    aiIcon: true,
    images: [
      { src: "CoreXDark.png", alt: "Vista.CoreX – Dashboard im Dark Mode" },
      { src: "CoreXLight.png", alt: "Vista.CoreX – Dashboard im Light Mode" }
    ],
    lead: "<strong>Vista.Core / Vista.CoreX</strong> ist eine modulare SaaS-Plattform für CRM- und operative Prozesse mit integriertem KI-Assistenten.",
    problem: "CRM-Verwaltung und ein Assistent, der auf eigene Dokumente antwortet, sollten in einer Anwendung zusammenlaufen &ndash; ohne dass Firmendaten an externe LLM-Anbieter gehen.",
    ansatz: ".NET Web API + EF Core als Backend-Kern, JWT für Auth, SignalR für Live-Updates. Für den KI-Teil ein RAG-Setup mit <code>Ollama</code> + <code>Qdrant</code>, damit Antworten auf indexierten Dokumenten basieren.",
    ergebnis: "Funktionsfähiges Grundgerüst: Auth, CRM-Module und ein Chat-Assistent, der Fragen zu hochgeladenen Dokumenten beantwortet. Läuft lokal per <code>docker compose</code>.",
    rolle: "Alleinige Umsetzung &ndash; Datenmodell, API, RAG-Integration, React-Frontend und Docker-Setup.",
    tech: "C#, ASP.NET Core, EF Core, SQL Server, React, Vite, Bootstrap, Swagger, Redis, Docker, SignalR, JWT, Recharts, Ollama, Qdrant, Semantic Kernel",
    status: "completed",
    github: "https://github.com/Daddarios/vista-saas-backend"
  },
  {
    title: "GoAI ChatLab",
    subtitle: "AI-Agent & Chat Assistant",
    aiIcon: true,
    aiIconDelayed: true,
    labLink: { href: "https://huggingface.co/spaces/Daddarios/GoAI-Lab", text: "GoAI-Lab" },
    images: [
      { src: "GoAI1.png", alt: "GoAI ChatLab – Chat-Oberfläche" },
      { src: "GoAI3.png", alt: "GoAI ChatLab – Datei-Upload und Antwortansicht" }
    ],
    lead: "Ein Chat-Client mit KI-Anbindung und dateibasierten Eingaben &ndash; live deployed auf Hugging Face Spaces.",
    problem: "Ein Chat-Client, der API-Keys nicht im Browser preisgibt und Dokumente (txt, md, pdf) als Kontext verarbeiten kann.",
    ansatz: "Express-Proxy als Backend, damit der API-Key serverseitig bleibt. File-Parsing im Client, sodass der Server nur reinen Text weiterreicht. Aufbau ist auf spätere RAG-Erweiterung vorbereitet.",
    ergebnis: "Öffentlich erreichbare Demo unter <em>GoAI-Lab</em>. Chat funktioniert stabil mit Datei-Uploads; Deployment automatisiert über GitHub Actions + Docker.",
    rolle: "Konzept, React-Frontend, Express-Proxy, Docker-Setup und CI/CD-Workflow.",
    tech: "React, Node.js, Express.js, JavaScript, HTML5, CSS3, GitHub Actions, Docker, REST APIs, Client-side File Parsing, OpenRouter AI",
    status: "completed",
    github: "https://github.com/Daddarios/GoAI-Chat-Assistant"
  },
  {
    title: "CRM-Anwendung",
    subtitle: "IHK-Abschlussprojekt",
    images: [
      { src: "crmlogin.png", alt: "CRM-Anwendung – Login mit Zwei-Faktor-Authentifizierung" },
      { src: "crmpanel.png", alt: "CRM-Anwendung – Admin-Dashboard" }
    ],
    lead: "CRM-System zur Verwaltung von Kunden, Mitarbeitern, Projekten und Berichten &ndash; entstanden unter realitätsnahen IHK-Anforderungen.",
    problem: "Klassisches Kundenmanagement für einen fiktiven KMU-Kunden mit Fokus auf Rollen, Rechte und Reporting.",
    ansatz: "ASP.NET MVC + EF Core, 2FA über SMS (<code>Twilio</code>) und Mail (<code>MailKit</code>), Excel/PDF-Export sowie eine dokumentierte REST-API für spätere Anbindungen.",
    ergebnis: "Lauffähige Anwendung mit Rollenmodell (Admin/Mitarbeiter), Dashboard-Statistiken und getesteten API-Endpunkten. Wird schrittweise weiterentwickelt.",
    rolle: "Alleinige Umsetzung: DB-Design, Backend-Logik, Auth, API und UI.",
    tech: "Visual Studio, C#, ASP.NET MVC, Entity Framework, SQL Server, HTML5, CSS3, Bootstrap, JavaScript, jQuery, JWT, GitHub, Twilio, RESTful APIs, MailKit",
    status: "completed",
    github: "https://github.com/Daddarios/CrmAPP"
  },
  {
    title: "Portfolio Website",
    images: [
      { src: "portfolio1.png", alt: "Portfolio Website – Startseite" },
      { src: "portfolio2.png", alt: "Portfolio Website – Projektübersicht" }
    ],
    lead: "Die Seite, auf der Sie sich gerade befinden &ndash; bewusst ohne Framework, um Grundlagen zu vertiefen.",
    problem: "Eine schlanke, wartbare Präsentationsseite ohne unnötigen Framework-Overhead.",
    ansatz: "Vanilla HTML/CSS/JS, alle Sektionen aus einer <code>contentMap</code> gerendert, Overlay-Struktur statt getrennter Seiten. Cookie-Banner nach DSGVO-Grundprinzipien.",
    ergebnis: "Drei Dateien, ca. 50&nbsp;KB JS. Läuft ohne Build-Schritt, responsive auf Mobile und Desktop.",
    rolle: "Konzept, UI-Design, Umsetzung und Deployment.",
    tech: "Visual Studio Code, HTML5, CSS3, JavaScript",
    status: "completed",
    github: "https://github.com/Daddarios/onur-gokhan-bicer-webportfolio.git"
  },
  {
    title: "VISTA",
    subtitle: "React SPA für ASP.NET CRM",
    images: [
      { src: "vistaperson.png", alt: "VISTA – Personenverwaltung im React-Frontend" },
      { src: "vistakanban.png", alt: "VISTA – Kanban-Board Ansicht" }
    ],
    lead: "<strong>VISTA</strong> hebt das bestehende ASP.NET-CRM auf eine moderne React-Oberfläche &ndash; als Übung für saubere API-Anbindung.",
    problem: "Das MVC-CRM sollte zusätzlich als SPA nutzbar sein, damit UI-Interaktionen flüssiger und clientseitig gerendert werden.",
    ansatz: "React + React Router, JWT-basierter Login gegen die eigene REST-API. Kanban-Board als bewusste Übung für State-Handling.",
    ergebnis: "Login-Flow, Personen-CRUD und Kanban-Ansicht arbeiten stabil gegen die API. Grundstruktur steht, weitere Module in Entwicklung.",
    rolle: "UI-Design, React-Umsetzung und API-Anbindung.",
    tech: "Visual Studio Code, HTML5, CSS3, JavaScript, React, React Router, JWT",
    status: "ongoing",
    github: "https://github.com/Daddarios/Vista.git"
  },
  {
    title: "Klinik Raum Stuttgart",
    subtitle: "Desktop",
    images: [
      { src: "klinikall.png", alt: "Klinik Raum Stuttgart – Übersicht der Verwaltung" },
      { src: "klinik3.png", alt: "Klinik Raum Stuttgart – Detailansicht" }
    ],
    lead: "Anwendungsprojekt zur Desktop-Entwicklung mit Datenbindung.",
    problem: "Übung an einem klar umrissenen Fall: kleine Klinikverwaltung mit Patienten- und Termindaten.",
    ansatz: "Windows Forms auf .NET Framework, SQL-Server-Anbindung, klassische CRUD-Struktur mit Fokus auf sauberer Datenbindung.",
    ergebnis: "Abgeschlossenes Projekt mit funktionierenden CRUD-Operationen &ndash; erster praktischer Kontakt mit C# und SQL Server.",
    rolle: "Alleinige Umsetzung im Rahmen der Weiterbildung.",
    tech: "Visual Studio, C#, SQL Server",
    status: "completed",
    github: "https://github.com/Daddarios/Klinikum_Stuttgart.git"
  },
  {
    title: "Photo BLOG",
    subtitle: "Responsive UI mit HTML & CSS",
    images: [
      { src: "perpage1.png", alt: "Photo Blog – Startseite mit Bildergalerie" },
      { src: "perpage2.png", alt: "Photo Blog – Responsive Mobilansicht" }
    ],
    lead: "Frühes Frontend-Übungsprojekt mit Fokus auf Responsive Design.",
    problem: "Eine mobilfreundliche Foto-Blog-Oberfläche, die auf allen Bildschirmgrößen sauber wirkt.",
    ansatz: "Mobile-First mit Media Queries, Flexbox und Grid &ndash; bewusst ohne JS-Framework, um die Grundlagen zu festigen.",
    ergebnis: "Layout skaliert stabil von Mobile bis Desktop. Diente als Basis für spätere komplexere Projekte.",
    rolle: "UI-Konzept, Layoutstruktur und CSS-Umsetzung.",
    tech: "Visual Studio Code, HTML5, CSS3",
    status: "completed",
    github: "https://github.com/Daddarios/Personal-Page.git"
  }
];

/* ===== PROJEKTE: RENDER ===== */
function renderProjectImages(images) {
  return images.map(img => `
    <a href="projekte/${img.src}" target="_blank">
      <img src="projekte/${img.src}" alt="${img.alt}" loading="lazy">
    </a>`).join("");
}

function renderProjectTopMeta(p) {
  if (!p.aiIcon && !p.labLink) return "";
  const delayed = p.aiIconDelayed ? " notification-ai-icon--delayed" : "";
  const icon = p.aiIcon
    ? `<span class="vscode-icons--file-type-gemini notification-ai-icon${delayed}"></span>`
    : "";
  const lab = p.labLink
    ? `
      <a class="lab-link lab-link--mini" href="${p.labLink.href}" target="_blank" rel="noopener noreferrer">${p.labLink.text}</a>
      <span class="lab-arrow-flow" aria-hidden="true"><span>›</span><span>›</span><span>›</span></span>`
    : "";
  return `
    <div class="project-top-meta">
      ${icon}${lab}
    </div>`;
}

function renderProjectCard(p) {
  const subtitle = p.subtitle ? ` <small>${p.subtitle}</small>` : "";
  const status = p.status === "ongoing"
    ? `<span class="status-ongoing">In Entwicklung</span>`
    : `<span class="status-completed">Abgeschlossen</span>`;
  const metaRows = [
    ["Problem", p.problem],
    ["Ansatz", p.ansatz],
    ["Ergebnis", p.ergebnis],
    ["Rolle", p.rolle]
  ].map(([label, text]) => `
    <div class="project-meta-row">
      <dt>${label}</dt>
      <dd>${text}</dd>
    </div>`).join("");

  return `
  <div class="project-card">
    <div class="project-image">${renderProjectImages(p.images)}</div>
    <div class="project-content">
      ${renderProjectTopMeta(p)}
      <h4 class="project-title">${p.title}${subtitle}</h4>
      <p class="project-lead">${p.lead}</p>
      <dl class="project-meta">${metaRows}</dl>
      <div class="project-tech">${p.tech}</div>
      <div class="project-links">
        ${status}
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" title="auf GitHub"> <i class='bx bxl-github'></i></a>
      </div>
    </div>
  </div>`;
}

function buildProjectsHTML() {
  return `<div class="project-grid">${projectsData.map(renderProjectCard).join("")}</div>`;
}

/* ===== CONTENT MAP ===== */
const contentMap = {


  /* ===== üBER MICH ===== */
  "uber-mich": `
          <div class="card uber-mich">
             <img src="./img/DSC_0169_web.jpg" alt="Porträt von Onur Gökhan Bicer" class="profile-image" loading="lazy" />


            <h3 class="title">Über mich</h3>

            <p>Hallo, mein Name ist Gökhan. Ich bin Full-Stack-Entwickler mit Schwerpunkt auf C#, ASP.NET, JavaScript und React. Mich motiviert es, fachliche Anforderungen in funktionierende Anwendungen zu übersetzen und dabei Schritt für Schritt saubere, nachvollziehbare Lösungen aufzubauen.</p>

            <p>Mein Weg in die Softwareentwicklung war bewusst praxisorientiert. Nach ersten Studien- und Berufserfahrungen in Deutschland habe ich mich für eine Ausbildung im IT-Bereich entschieden und diese als IT-Anwendungsentwickler erfolgreich abgeschlossen. Seitdem arbeite ich daran, meine Backend-Kenntnisse zu vertiefen und gleichzeitig klare, verständliche Benutzeroberflächen zu entwickeln.</p>

            <p>In Projekten übernehme ich Verantwortung für Analyse, Umsetzung und Weiterentwicklung. Besonders wichtig sind mir strukturierte Arbeit, offene Kommunikation und die Bereitschaft, technische Entscheidungen nachvollziehbar zu begründen. Ich arbeite zuverlässig, nehme Feedback ernst und baue meine Fähigkeiten kontinuierlich aus.</p>

            <p>Neben der Softwareentwicklung begleitet mich Musik seit vielen Jahren. Die Erfahrung als Gitarrist und zeitweise ehrenamtlicher Gitarrenlehrer hat meine Geduld, Konzentration und Fähigkeit gestärkt, komplexe Inhalte verständlich zu vermitteln.</p>

            <ul class="profile-points" aria-label="Arbeitsweise">
              <li>Strukturierte Umsetzung statt Aktionismus</li>
              <li>Offene Kommunikation bei Risiken und offenen Fragen</li>
              <li>Verlässliche Übergabe von Arbeitsergebnissen</li>
            </ul>

           
          </div>
        `,

  /* ===== LEBENSLAUF ===== */
  "fahigkeiten": `
        <section class="docs-showcase">
          <div class="docs-intro">
            <h3 class="docs-title">Lebenslauf & Dokumente</h3>
            <p class="docs-subtitle">
              Diese Unterlagen geben einen klaren Überblick über meinen beruflichen Hintergrund,
              meine Qualifikationen und meine praktische Erfahrung.
            </p>
          </div>

          <div class="docs-grid">
              <div class="pdf-wrapper doc-card">
                <div class="doc-card-head">
                  <h4 class="title">Lebenslauf</h4>
                  <span class="doc-badge">PDF · 147 KB</span>
                </div>
                 <iframe 
                 class="cv-pdf-frame"
                  src="dokumente/lebenslauf/Lebenslauf.pdf"
                  loading="lazy"
                  title="Lebenslauf Vorschau"
                >
                </iframe>
                <a
                  href="dokumente/lebenslauf/Lebenslauf.pdf"
                  target="_blank"
                  rel="noopener"
                  class="pdf-open"
                >
                  PDF öffnen ↗
                </a>
             </div>

              <div class="pdf-wrapper doc-card">
                <div class="doc-card-head">
                  <h4 class="title">Arbeitszeugnisse</h4>
                  <span class="doc-badge">PDF · 1.9 MB</span>
                </div>
                 <iframe
                   class="cv-pdf-frame"
                   src="dokumente/arbeitszeugnis/arbeitszeugnisse.pdf"
                   loading="lazy"
                   title="Arbeitszeugnisse Vorschau"
                 ></iframe>
                <a
                  href="dokumente/arbeitszeugnis/arbeitszeugnisse.pdf"
                  target="_blank"
                  rel="noopener"
                  class="pdf-open"
                >
                  PDF öffnen ↗
                </a>
              </div>

            <div class="pdf-wrapper doc-card">
                <div class="doc-card-head">
                  <h4 class="title">Schulische &amp; akademische Bildung</h4>
                  <span class="doc-badge">PDF · 1.5 MB</span>
                </div>
                <iframe
                 class="cv-pdf-frame"
                 src="dokumente/schulische_akademische/Bildung.pdf"
                 loading="lazy"
                 title="Bildung Vorschau"
                ></iframe>
                <a
                  href="dokumente/schulische_akademische/Bildung.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="pdf-open"
                >
                  PDF öffnen ↗
                </a>
              </div>

            <div class="pdf-wrapper doc-card">
                <div class="doc-card-head">
                  <h4 class="title">Ehrenamtliche Nachweise</h4>
                  <span class="doc-badge">PDF · 605 KB</span>
                </div>
                <iframe
                 class="cv-pdf-frame"
                 src="dokumente/ehrenamtlich/Ehrenamtliche+Nachweise_Onur_Gokhan_Bicer.pdf"
                 loading="lazy"
                 title="Ehrenamtliche Nachweise Vorschau"
                ></iframe>
                <a
                  href="dokumente/ehrenamtlich/Ehrenamtliche+Nachweise_Onur_Gokhan_Bicer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="pdf-open"
                >
                  PDF öffnen ↗
                </a>
              </div>
          </div>

          <p id="hinweis">
            <span class="hinweis-inner">
              Hinweis: Aus Sicherheitsgründen wurden bestimmte Dokumente nicht öffentlich hochgeladen.
            </span>
          </p>
        </section>
      `
  ,

  /* ===== KOMPETENZBEREICHE ===== */
  "kompetenzen": `
        <section class="competency-showcase">
          <div class="competency-intro">
            <h3 class="competency-title">Kompetenzbereiche</h3>
            <p class="competency-subtitle">
              Ein Überblick über die Technologien, mit denen ich bisher gearbeitet habe –
              gruppiert nach Bereich und mit Verweis auf die zugehörigen Projekte.
            </p>
            <!--<p class="competency-legend">
              <span class="comp-level comp-level--solid">Vertraut</span>
              <span class="comp-level comp-level--adv">Fortgeschritten</span>
              <span class="comp-level comp-level--learn">In Übung</span>
            </p>-->
          </div>

          <div class="competency-grid competency-grid--accordion">
            <article class="competency-card comp-option">
              <span class="comp-tab"><i class='bx bx-server'></i><span class="comp-tab-name">Backend</span></span>
              <div class="comp-body">
                <p class="competency-stack project-tech">C#, ASP.NET Core, ASP.NET MVC, EF Core, SQL Server, Razor, Blazor, Swagger</p>
                <p>
                  <strong>Praktische Anwendung:</strong> REST-APIs, JWT-Authentifizierung,
                  Rollen- und Rechte-Modelle, Datenmodellierung und serverseitige Geschäftslogik.
                </p>
                <p class="comp-refs">
                  <span>Zu sehen in:</span>
                  <em>Vista.Core / Vista.CoreX</em>, <em>CRM-Anwendung</em>, <em>VISTA-SPA</em>
                </p>
              </div>
            </article>

            <article class="competency-card comp-option">
              <span class="comp-tab"><i class='bx bx-code-alt'></i><span class="comp-tab-name">Frontend</span></span>
              <div class="comp-body">
                
                <p class="competency-stack project-tech">HTML5, CSS3, Bootstrap, JavaScript, React, Vite, React Router, Axios</p>
                <p>
                  <strong>Praktische Anwendung:</strong> SPA-Strukturen, Dashboard-Oberflächen,
                  responsive Layouts, State-Handling und API-Anbindung im Client.
                </p>
                <p class="comp-refs">
                  <span>Zu sehen in:</span>
                  <em>VISTA-SPA</em>, <em>GoAI ChatLab</em>, <em>Portfolio-Website</em>
                </p>
              </div>
            </article>

            <article class="competency-card comp-option">
              <span class="comp-tab"><i class='bx bx-brain'></i><span class="comp-tab-name">AI & Data</span></span>
              <div class="comp-body">
                <p class="competency-stack project-tech">Ollama, Qdrant, Semantic Kernel, RAG, OpenRouter</p>
                <p>
                  <strong>Praktische Anwendung:</strong> Aufbau eines RAG-Assistenten mit lokalem LLM,
                  Vektor-Indexierung von Dokumenten, dateibasierte Kontextverarbeitung im Chat.
                </p>
                <p class="comp-refs">
                  <span>Zu sehen in:</span>
                  <em>Vista.CoreX (RAG)</em>, <em>GoAI ChatLab</em>
                </p>
              </div>
            </article>

            <article class="competency-card comp-option">
              <span class="comp-tab"><i class='bx bx-wrench'></i><span class="comp-tab-name">Tools &amp; Workflow</span></span>
              <div class="comp-body">
                
                <p class="competency-stack project-tech">Visual Studio, Visual Studio Code, Cursor, GitHub Copilot, Codex, Docker, GitHub Actions, GitHub, Git, npm</p>
                <p>
                  <strong>Praktische Anwendung:</strong> Versionskontrolle mit Git,
                  Containerisierung mit Docker, CI/CD-Workflows und nachvollziehbare Projektübergabe.
                </p>
                <p class="comp-refs">
                  <span>Zu sehen in:</span>
                  <em>GoAI ChatLab (CI/CD)</em>, <em>Vista.Core</em>, <em>alle Repositories</em>
                </p>
              </div>
            </article>
          </div>
        </section>
      `
  ,


  /* ===== PROJEKTE ===== */
  "projekte": buildProjectsHTML()

  ,
/* ===== Weiterbildung ===== */
"kurs": `
        <section class="education-section">
          <div class="education-container">
            <h2 id="wb" class="section-title">Weiterbildungen</h2>

            <div class="education-grid">
              
              <div class="education-card">
                <h4 class="card-title">C# & ASP.NET Core</h4>
                <p class="card-text">OOP, Entity Framework & ASP.NET Core (Version 6 / 7 / 8)</p>
              </div>

              <div class="education-card">
                <h4 class="card-title">Netzwerktechnik Grundlagen</h4>
                <p class="card-text">IP-Adressierung, Subnetting & Netzwerkarchitektur</p>
              </div>

              <div class="education-card">
                <h4 class="card-title">IP-Adressierung & Subnetting</h4>
                <p class="card-text">Teil 1 & 2 – Netzwerkgrundlagen</p>
              </div>

              <div class="education-card">
                <h4 class="card-title">Projektmanagement</h4>
                <p class="card-text">.NET MVC5 – Anwendung von Grund auf</p>
              </div>

              <div class="education-card">
                <h4 class="card-title">Frontend Camp</h4>
                <p class="card-text">HTML5, CSS3, Bootstrap & Tailwind CSS, JavaScript & React</p>
                <span class="immernoch">Aktuell in Weiterbildung</span>
              </div>

              <div class="education-card">
                <h4 class="card-title">RESTful APIs</h4>
                <p class="card-text">RESTful API Fundamentals – Architektur & Design Patterns</p>
              </div>

              <div class="education-card">
                <h4 class="card-title">GitHub Schulung</h4>
                <p class="card-text">Versionskontrolle & Projektverwaltung mit GitHub</p>
              </div>

              <div class="education-card">
                <h4 class="card-title">Swift & iOS 16</h4>
                <p class="card-text">MVVM Detailkurs – Ohne Storyboard</p>
                <span class="immernoch">Aktuell in Weiterbildung</span>
              </div>

              <div class="education-card">
                    <h4 class="card-title">Python & Data Science / Machine Learning</h4>
                    <ul class="card-text">
                      <li>Python – Grundlagen für Data Science</li>
                      <li>NumPy – Numerische Berechnungen und mathematische Operationen</li>
                      <li>Pandas – Datenaufbereitung, -manipulation und -analyse</li>
                      <li>Matplotlib & Seaborn – Datenvisualisierung und statistische Auswertung</li>
                      <li>Scikit-Learn – Entwicklung und Training von Machine-Learning-Modellen</li>

                      <li>Lineare und polynomiale Regression</li>
                      <li>Ridge-, Lasso- und ElasticNet-Regression</li>
                      <li>Logistische Regression</li>
                      <li>Decision Trees und Random Forest</li>
                      <li>AdaBoost und Gradient Boosting</li>
                      <li>K-Nearest Neighbors (KNN)</li>
                      <li>Support Vector Machines (SVM)</li>
                      <li>K-Means Clustering</li>
                      <li>Hierarchisches Clustering</li>
                      <li>DBSCAN Clustering</li>

                      <li>Machine-Learning-Methoden: Regression, Klassifikation und Clustering</li>
                      <li>Theoretische und praktische Anwendung von ML-Algorithmen</li>
                      <li>Arbeit mit realen Datensätzen und praxisnahen Projekten</li>
                      <li>Entwicklung von Data-Science-Projekten im vollständigen Workflow</li>
                    </ul>

                    <p class="tech">
                    <strong>Technologien:</strong> Python, Pandas, NumPy, Scikit-Learn, Matplotlib, Seaborn
                    </p>

                    <span class="immernoch">Aktuell in Weiterbildung</span>
                    
                  </div>

            </div>
          </div>
        </section>
       `

,
  /* ===== KONTAKT ===== */

  "kontakt": `
           <div class="card kontakt-card">
              <h2 class="title">Kontakt aufnehmen</h2>

              <form id="contactForm" class="modern-form">

              <div class="field half">
              <input type="text" id="name" placeholder=" " required>
              <label>Name</label>
              </div>

              <div class="field half">
              <input type="email" id="email" placeholder=" " required>
              <label>E-Mail</label>
              </div>

              <div class="field">
              <textarea id="message" placeholder=" " required></textarea>
              <label>Nachricht</label>
              </div>

              <button type="submit">SENDEN</button>
              </form>

              <p class="mail-fallback">
              oder direkt: <span id="kontaktMail" ></span>
              </p>
           </div>
        `
};


function renderKontaktMail() {
  const user = "ongb";
  const domain = "gmx.de";
  const mail = `${user}@${domain}`;
  const span = document.getElementById("kontaktMail");
  if (span) {
    span.innerHTML = `<a href="mailto:${mail}">${mail}</a>`;
  }
}

function enhanceProjectMedia() {
  document.querySelectorAll(".project-image").forEach((media) => {
    if (media.querySelectorAll("a").length > 1) {
      media.classList.add("project-image--carousel");
    }
  });
}

let overlayCardObserver = null;
let activeOverlaySource = null;
let projectsProgressCleanup = null;
let overlayScrollBarCleanup = null;

function setupOverlayScrollBar() {
  if (overlayScrollBarCleanup) {
    overlayScrollBarCleanup();
    overlayScrollBarCleanup = null;
  }

  const bar = document.createElement("div");
  bar.className = "custom-scrollbar custom-scrollbar--overlay";
  bar.setAttribute("aria-hidden", "true");

  const fill = document.createElement("div");
  fill.className = "custom-scrollbar-fill";
  bar.appendChild(fill);
  document.body.appendChild(bar);

  const update = () => {
    const scroller = dom.wrapper;
    const maxScroll = Math.max(1, scroller.scrollHeight - scroller.clientHeight);
    const ratio = scroller.scrollTop / maxScroll;
    fill.style.height = `${ratio * 100}%`;
  };

  update();
  dom.wrapper.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  overlayScrollBarCleanup = () => {
    dom.wrapper.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
    bar.remove();
  };
}

function setupProjectsProgress() {
  if (projectsProgressCleanup) {
    projectsProgressCleanup();
    projectsProgressCleanup = null;
  }

  const cards = Array.from(dom.container.querySelectorAll(".project-grid .project-card"));
  if (!cards.length) return;

  const scroller = dom.wrapper;

  const rail = document.createElement("nav");
  rail.className = "projects-progress";
  rail.setAttribute("aria-label", "Projekt-Navigation");

  const dots = cards.map((card, i) => {
    const titleEl = card.querySelector(".project-title");
    const raw = titleEl ? titleEl.childNodes[0]?.textContent?.trim() : `Projekt ${i + 1}`;
    const label = (raw || `Projekt ${i + 1}`).replace(/\s+/g, " ");

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "pp-dot";
    dot.setAttribute("aria-label", `Zu ${label} springen`);
    dot.innerHTML = `<span class="pp-label">${label}</span>`;
    dot.addEventListener("click", () => {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    rail.appendChild(dot);
    return dot;
  });

  document.body.appendChild(rail);
  requestAnimationFrame(() => rail.classList.add("is-visible"));

  const setActive = (idx) => {
    dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
  };

  const updateActive = () => {
    const nearBottom =
      scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 4;
    if (nearBottom) {
      setActive(cards.length - 1);
      return;
    }

    // Viewport merkezine en yakın kart aktif
    const viewCenter = scroller.scrollTop + scroller.clientHeight / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const c = card.offsetTop + card.offsetHeight / 2;
      const d = Math.abs(c - viewCenter);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    });
    setActive(bestIdx);
  };

  updateActive();

  const onScroll = () => updateActive();
  scroller.addEventListener("scroll", onScroll, { passive: true });

  projectsProgressCleanup = () => {
    scroller.removeEventListener("scroll", onScroll);
    rail.remove();
  };
}

function setupOverlayCardReveal(type) {
  if (overlayCardObserver) {
    overlayCardObserver.disconnect();
  }

  const selectors = {
    "uber-mich": ".uber-mich",
    "fahigkeiten": ".docs-intro, .doc-card, #hinweis",
    "kompetenzen": ".competency-intro, .competency-card",
    "projekte": ".project-grid .project-card",
    "kurs": ".education-card",
    "kontakt": ".kontakt-card"
  };

  const targets = dom.container.querySelectorAll(selectors[type] || "");
  targets.forEach((el, index) => {
    el.classList.add("overlay-scroll-animation");
    if (type === "projekte") {
      el.classList.add("project-scroll-animation");
    }
    el.style.setProperty("--delay", `${index * 0.08}s`);
  });

  overlayCardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-active");
        } else {
          entry.target.classList.remove("is-active");
        }
      });
    },
    {
      root: dom.wrapper,
      threshold: 0.28
    }
  );

  targets.forEach((el) => {
    overlayCardObserver.observe(el);
  });
}




/* ===== OVERLAY ===== */
document.addEventListener("click", e => {
  const btn = e.target.closest(".cv-open-btn");
  if (!btn) return;

  const type = btn.dataset.type;
  activeOverlaySource?.classList.remove("is-overlay-source");
  activeOverlaySource = btn.closest(".cv-section");
  activeOverlaySource?.classList.add("is-overlay-source");

  // ✅ EKLENDİ: Toggle menü açıksa kapat
  closeMenu();

  dom.container.innerHTML = contentMap[type] || "";
  lockMainPageScroll();
  requestAnimationFrame(() => {
    dom.wrapper.classList.add("active");
    document.body.classList.add("overlay-open");
  });
  dom.container.classList.toggle("project-mode", type === "projekte");
  renderProjectTechIcons();
  renderKontaktMail();
  enhanceProjectMedia();
  normalizeBlankLinks(dom.container);
  setupOverlayCardReveal(type);
  setupOverlayScrollBar();
  if (type === "projekte") {
    setupProjectsProgress();
  }
});

dom.container.addEventListener("click", (e) => {
  const card = e.target.closest(".project-grid .project-card");
  if (!card) return;
  if (e.target.closest("a, button")) return;

  const activeCard = dom.container.querySelector(".project-grid .project-card.is-focused");
  if (activeCard && activeCard !== card) {
    activeCard.classList.remove("is-focused");
  }

  card.classList.toggle("is-focused");
});

/* Akordeon: dokunmatik/mobilde tıkla-aç */
dom.container.addEventListener("click", (e) => {
  const option = e.target.closest(".competency-grid--accordion .comp-option");
  if (!option) return;
  if (e.target.closest("a, button")) return;

  const grid = option.closest(".competency-grid--accordion");
  const wasOpen = option.classList.contains("is-open");

  grid.querySelectorAll(".comp-option.is-open").forEach((el) => {
    el.classList.remove("is-open");
  });

  if (!wasOpen) {
    option.classList.add("is-open");
  }
});



dom.closeBtn.addEventListener("click", closeOverlay);

dom.wrapper.addEventListener("click", e => {
  if (e.target === dom.wrapper) closeOverlay();
});

function closeOverlay() {
  if (overlayCardObserver) {
    overlayCardObserver.disconnect();
    overlayCardObserver = null;
  }

  if (projectsProgressCleanup) {
    projectsProgressCleanup();
    projectsProgressCleanup = null;
  }

  if (overlayScrollBarCleanup) {
    overlayScrollBarCleanup();
    overlayScrollBarCleanup = null;
  }

  dom.wrapper.classList.remove("active");
  document.body.classList.remove("overlay-open");
  activeOverlaySource?.classList.remove("is-overlay-source");
  activeOverlaySource = null;

  dom.container.classList.remove("project-mode");
  dom.container.innerHTML = "";
  unlockMainPageScroll();
}

/* ===== PARALLAX =====
   Feder-Physik mit Idle-Stop: Loop läuft nur solange Bewegung
   vorhanden ist und respektiert prefers-reduced-motion. */
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const parallax = {
  cur: 0,
  vel: 0,
  running: false
};

function parallaxStep() {
  const diff = window.scrollY - parallax.cur;
  parallax.vel += diff * 0.04;
  parallax.vel *= 0.82;
  parallax.cur += parallax.vel;

  // Bewegung abgeschlossen → Loop stoppen (CPU/Akku sparen)
  if (Math.abs(diff) < 0.1 && Math.abs(parallax.vel) < 0.05) {
    parallax.cur = window.scrollY;
    parallax.vel = 0;
    dom.bg.style.setProperty("--bg-y", `${-parallax.cur * 0.06}px`);
    parallax.running = false;
    return;
  }

  dom.bg.style.setProperty("--bg-y", `${-parallax.cur * 0.06}px`);
  requestAnimationFrame(parallaxStep);
}

function startParallax() {
  if (parallax.running || reducedMotionQuery.matches) return;
  parallax.running = true;
  requestAnimationFrame(parallaxStep);
}

window.addEventListener("scroll", startParallax, { passive: true });

// Reduced-Motion zur Laufzeit umgeschaltet → Hintergrund neutral setzen
reducedMotionQuery.addEventListener("change", (e) => {
  if (e.matches) {
    dom.bg.style.setProperty("--bg-y", "0px");
  } else {
    startParallax();
  }
});

startParallax();


/* ===== FOOTER ===== */
const footer = document.createElement("footer");
footer.className = "site-footer";
const currentYear = new Date().getFullYear();

footer.innerHTML = `
  <div class="footer-left">
    <span class="copyright-brand">&copy; ${currentYear} Onur Gökhan Bicer</span> - Alle Rechte vorbehalten
    
  </div>

  <div class="footer-right">
  <button class="footer-legal-link" type="button" data-legal="privacy">Datenschutz</button>
  <button class="footer-legal-link" type="button" data-legal="imprint">Impressum</button>

  <a href="https://github.com/Daddarios" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
    <i class='bx bxl-github' ></i>
  </a>

  <a href="https://www.linkedin.com/in/onur-g%C3%B6khan-bicer-b011b1380/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
    <i class='bx bxl-linkedin' ></i>
  </a>

  <a href="https://x.com/yokhannn" target="_blank" rel="noopener noreferrer" aria-label="X">
    <i class='bx bxl-twitter'></i>
  </a>


  
</div>

`;

document.body.appendChild(footer);
normalizeBlankLinks(footer);

const legalContent = {
  privacy: `
    <strong>Datenschutzerklärung</strong>
    <span>Diese Website verwendet Google Analytics erst nach Ihrer ausdrücklichen Zustimmung. Ohne Zustimmung werden keine Analytics-Skripte geladen.</span>
    <span>Die Zustimmung wird lokal im Browser gespeichert und kann durch Löschen des Browser-Speichers zurückgesetzt werden.</span>
    <span>Kontakt für Datenschutzfragen: <a href="mailto:ongb@gmx.de">ongb@gmx.de</a></span>
  `,
  imprint: `
    <strong>Impressum</strong>
    <span>Onur Gökhan Bicer</span>
    <span>Kontakt: <a href="mailto:ongb@gmx.de">ongb@gmx.de</a></span>
    <span class="legal-warning">Hinweis: Die ladungsfähige Anschrift muss vor öffentlichem produktivem Betrieb ergänzt werden. Ich trage hier bewusst keine erfundene Adresse ein.</span>
  `
};

function renderLegalPanel(type) {
  const panel = document.getElementById("cookieLegalPanel");
  if (!panel || !legalContent[type]) return;
  panel.innerHTML = legalContent[type];
  panel.classList.remove("hidden");
}

document.addEventListener("click", (e) => {
  const legalBtn = e.target.closest(".cookie-legal-toggle, .footer-legal-link");
  if (!legalBtn) return;
  renderLegalPanel(legalBtn.dataset.legal);
  const cookieBanner = document.getElementById("cookieBanner");
  if (cookieBanner) {
    cookieBanner.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
});

/* ===== CONTACT FORM MAILTO ===== */
document.addEventListener("submit", function(e){
  if(e.target.id === "contactForm"){
    e.preventDefault();

    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const message=document.getElementById("message").value;

    const mail="ongb@gmx.de";

    const subject=encodeURIComponent("Portfolio Kontakt von "+name);
    const body=encodeURIComponent(
`Name: ${name}
Email: ${email}

Nachricht:
${message}`
    );

    window.location.href=`mailto:${mail}?subject=${subject}&body=${body}`;
  }
});



/* =========================================
   COOKIE BANNER & GOOGLE ANALYTICS (DSGVO)
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderHeroIcons();
  const cookieBanner = document.getElementById("cookieBanner");
  const btnAccept = document.getElementById("acceptCookies");
  const btnReject = document.getElementById("rejectCookies");

  // Local Storage Kontrolü
  const consent = localStorage.getItem("cookieConsent");

  if (!consent) {
    cookieBanner.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // EKLENDİ: Arkada kaydırmayı (scroll) KİLİTLER
  } else if (consent === "accepted") {
    loadGoogleAnalytics();
  }

  // Kabul Et Butonu (Alle akzeptieren)
  btnAccept.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted");
    cookieBanner.classList.add("hidden");
    document.body.style.overflow = ""; // EKLENDİ: Arkada kaydırmayı açar
    loadGoogleAnalytics();
  });

  // Sadece Gerekli Olanlar Butonu (Nur technisch notwendige)
  btnReject.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "rejected");
    cookieBanner.classList.add("hidden");
    document.body.style.overflow = ""; // EKLENDİ: Arkada kaydırmayı açar
  });

  // Google Analytics Yükleyici
  function loadGoogleAnalytics() {
    if (document.getElementById("ga-script")) return;

    const script1 = document.createElement("script");
    script1.id = "ga-script";
    script1.async = true;
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-3J196S7JM3";
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
      gtag('js', new Date());
      gtag('config', 'G-3J196S7JM3', {
        anonymize_ip: true
      });
    `;
    document.head.appendChild(script2);
  }
});

