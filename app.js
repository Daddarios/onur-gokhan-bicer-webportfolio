
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
    "ASP.NET Core":"devicon-dotnetcore-plain",
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
    "Vite 8": "devicon-vitejs-plain colored",
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
    "Identity/JWT": "", // ikon yok
    "Recharts": "",   // ikon yok
    "Serilog": "",    // ikon yok
    "JWT": ""         // ikon yok
  };
  const ollamaIconCdn = "https://cdn.jsdelivr.net/npm/simple-icons/icons/ollama.svg";

  document.querySelectorAll(".project-tech").forEach(div => {
    const techs = div.textContent.split(",").map(t => t.trim());
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
    menuCloseTimer = setTimeout(() => {
      dom.navLinks.classList.remove("closing");
      document.body.classList.remove("open-menu");
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
  { id: "projekte", title: "Entwicklung & Projekte", desc: "Ausgewählte Anwendungen und Lernprojekte" },
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

/* ===== CONTENT MAP ===== */
const contentMap = {


  /* ===== üBER MICH ===== */
  "uber-mich": `
          <div class="card uber-mich">
             <img src="./img/DSC_0169.JPG" alt="Gökhan" class="profile-image" />


            <h3 class="title">Über mich</h3>

            <p>Hallo, mein Name ist Gökhan. Ich bin Junior Full-Stack-Entwickler mit Schwerpunkt auf C#, ASP.NET, JavaScript und React. Mich motiviert es, fachliche Anforderungen in funktionierende Anwendungen zu übersetzen und dabei Schritt für Schritt saubere, nachvollziehbare Lösungen aufzubauen.</p>

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
                  Vollansicht öffnen
                </a>
             </div>

              <div class="pdf-wrapper doc-card">
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
                  Vollansicht öffnen
                </a>
              </div>

            <div class="pdf-wrapper doc-card">
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
                  Vollansicht öffnen
                </a>
              </div>

            <div class="pdf-wrapper doc-card">
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
                  Vollansicht öffnen
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
              Keine Prozentwerte, sondern Technologien im praktischen Zusammenhang:
              womit ich gearbeitet habe und wo der Einsatz sichtbar wird.
            </p>
          </div>

          <div class="competency-grid">
            <article class="competency-card">
              <h4>Backend</h4>
              <p class="competency-stack project-tech">C#, ASP.NET Core, ASP.NET MVC, EF Core, SQL Server, Razor, Blazor, Swagger</p>
              <p>
                <strong>Praktische Anwendung:</strong> CRM, SaaS-Backend, REST APIs,
                Authentifizierung mit JWT, Datenmodellierung und serverseitige Geschäftslogik.
              </p>
            </article>

            <article class="competency-card">
              <h4>Frontend</h4>
              <p class="competency-stack project-tech">HTML5, CSS3, Bootstrap, JavaScript, React, Vite 8, React Router 7, Axios</p>
              <p>
                <strong>Praktische Anwendung:</strong> SPA-Strukturen, Dashboard-Oberflächen,
                responsive Layouts, Portfolio-UI und API-Anbindung im Client.
              </p>
            </article>

            <article class="competency-card">
              <h4>Tools & Workflow</h4>
              <p class="competency-stack project-tech">Visual Studio, Visual Studio Code, Docker2, GitHub Actions, GitHub, Git, npm, Ollama</p>
              <p>
                <strong>Praktische Anwendung:</strong> Versionskontrolle, API-Dokumentation,
                Containerisierung, Deployment-Schritte und nachvollziehbare Projektübergabe.
              </p>
            </article>
          </div>
        </section>
      `
  ,


  /* ===== PROJEKTE ===== */
  "projekte": `
              <div class="project-grid">
              <!-- Vista.Core + Vista.CoreX -->
                <div class="project-card">
                  <div class="project-image">
                    <a href="projekte/CoreXDark.png" target="_blank">
                      <img src="projekte/CoreXDark.png" alt="SaaS Plattform Vorschau">
                    </a>
                    <a href="projekte/CoreXLight.png" target="_blank">
                      <img src="projekte/CoreXLight.png" alt="SaaS Plattform Vorschau">
                    </a>
                </div>

                <div class="project-content">
                  <div class="project-top-meta">
                    <span class="vscode-icons--file-type-gemini notification-ai-icon"></span>
                  </div>
                  <h4 class="project-title">Vista.Core + Vista.CoreX <small>Full-Stack SaaS mit RAG-AI Assistent</small></h4>

                  <p class="project-desc">
                    <strong>Vista.Core / Vista.CoreX</strong> ist eine modulare Full-Stack-SaaS-Plattform für CRM- und operative Geschäftsprozesse.
                  </p>

                  <p class="project-desc">
                    <strong>Fokus:</strong> Der Schwerpunkt liegt auf Backend-Architektur mit .NET Web API, Identity/JWT, EF Core, SQL Server und Echtzeit-Kommunikation. Ergänzend wurde ein KI-Assistent mit RAG-Ansatz integriert, um dokumenten- und kontextbezogene Antworten innerhalb der Anwendung zu ermöglichen.
                  </p>

                  <p class="project-desc">
                    <strong>Rolle & Beitrag:</strong> Konzeption, Datenmodellierung, API-Umsetzung, Frontend-Anbindung mit React/Vite, Docker-Setup und CI/CD-Grundstruktur mit GitHub Actions.
                  </p>

                  <div class="project-tech">
                    C#, ASP.NET Core, EF Core, SQL Server, React, Vite, Bootstrap, Swagger, Redis, Docker, SignalR, JWT, Recharts, Ollama, Qdrant, Semantic Kernel
                  </div>

                  <div class="project-links">
                    <span class="status-completed">Abgeschlossen</span>
                     <a href="https://github.com/Daddarios/vista-saas-backend" target="_blank" rel="noopener noreferrer" title="auf GitHub"> <i class='bx bxl-github'></i></a>
                  </div>  
                </div>
              </div>

                <!-- GoAI Assistant -->
            
              
              <div class="project-card">
                <div class="project-image">
                  <a href="projekte/GoAI1.png" target="_blank">
                    <img src="projekte/GoAI1.png" alt="GoAI ChatLab Vorschau">
                   
                  </a>
                  
                  <a href="projekte/GoAI3.png" target="_blank">
                    <img src="projekte/GoAI3.png" alt="GoAI ChatLab Vorschau">
                  </a>
                </div>
               
                <div class="project-content">
                  <div class="project-top-meta">
                    <span class="vscode-icons--file-type-gemini notification-ai-icon notification-ai-icon--delayed"></span>
                    <a
                      class="lab-link lab-link--mini"
                      href="https://huggingface.co/spaces/Daddarios/GoAI-Lab"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GoAI-Lab
                    </a>
                    <span class="lab-arrow-flow" aria-hidden="true">
                      <span>›</span><span>›</span><span>›</span>
                    </span>
                  </div>
                  <h4 class="project-title">GoAI ChatLab <small>AI-Agent & Chat Assistant</small></h4>  
                      
                     <p class="project-desc">  
                      GoAI ChatLab ist eine Full-Stack-Anwendung für die Arbeit mit KI-Chatfunktionen und dateibasierten Eingaben.
                    </p>
                    
                    <p class="project-desc">
                      <strong>Fokus:</strong> 
                      
                      Der Schwerpunkt liegt auf einem Express.js-Proxy-Backend, sauberer API-Anbindung und der Verarbeitung von Dateien im Frontend. Die Architektur ist so vorbereitet, dass sie später um RAG-Funktionen erweitert werden kann.
                    </p>

                  

                    <p class="project-desc">
                      <strong>Rolle & Beitrag:</strong>
                      
                      Konzeption und Umsetzung mit React, Node.js und Express. Dazu gehören UI-Struktur, Backend-Proxy, API-Integration, Docker-Containerisierung und ein GitHub-Actions-Workflow für Deployment-Schritte.
                    </p>

                    <div class="project-tech">
                      React, Node.js, Express.js, JavaScript, HTML5, CSS3, GitHub Actions, Docker, REST APIs, Client-side File Parsing, OpenRouter AI
                    </div>
                   
                 
                     
                  <div class="project-links">
                    <span class="status-completed">Abgeschlossen</span>
                   
                    <a href="https://github.com/Daddarios/GoAI-Chat-Assistant" target="_blank" rel="noopener noreferrer" title="auf GitHub"> <i class='bx bxl-github'></i></a>
                  </div>
                  
                  </div>  
                </div>


             <!-- CRM -->

            <div class="project-card">
              <div class="project-image">
                <a href="projekte/crmlogin.png" target="_blank">
                  <img src="projekte/crmlogin.png" alt="CRM Anwendung Vorschau">
                </a>
                <a href="projekte/crmpanel.png" target="_blank">
                  <img src="projekte/crmpanel.png" alt="CRM Anwendung Vorschau">
                </a>
              </div>


              <div class="project-content">
                  <h4 class="project-title">CRM-Anwendung</h4> 

                  <p class="project-desc">
                   CRM-System mit ASP.NET MVC zur Verwaltung von Kunden, Mitarbeitern, Projekten und Berichten. Enthalten sind Rollenverwaltung, Zwei-Faktor-Authentifizierung, Dashboard-Ansichten, Excel/PDF-Export und eine REST-API.
                  </p>

                  <p class="project-desc">
                  <strong>Rolle & Beitrag :</strong>  
                  Eigenverantwortliche Umsetzung von Datenbankstruktur, Backend-Logik, Authentifizierung, API-Schnittstellen und Benutzeroberfläche. Das Projekt entstand im Rahmen eines IHK-Projekts unter realitätsnahen Anforderungen.
                </p>
                   

                  <div class="project-tech">
                   
                     Visual Studio, C#, ASP.NET MVC, Entity Framework, SQL Server, HTML5, CSS3 , Bootstrap, JavaScript, jQuery, JWT ,  GitHub, Twilio, RESTful APIs, MailKit
                    
                  </div>

                <div class="project-links">
                  <span class="status-ongoing">Projekt in Entwicklung</span>
                  <a href="https://github.com/Daddarios/CrmAPP" target="_blank" rel="noopener noreferrer" title="auf GitHub"> <i class='bx bxl-github'  ></i></a>
                </div>
              </div>
            </div>

        
            <!-- WEB-PORTFOLIO -->

            <div class="project-card">
              <div class="project-image">
                 <a href="projekte/portfolio1.png" target="_blank">
                  <img src="projekte/portfolio1.png" alt="Portfolio Vorschau">
                </a>
                <a href="projekte/portfolio2.png" target="_blank">
                  <img src="projekte/portfolio2.png" alt="Portfolio Vorschau">
                </a>
              </div>

              <div class="project-content">
                <h4 class="project-title">Portfolio Website</h4>

                <p class="project-desc">
                  Selbstständig entwickeltes UI-Projekt zur praktischen Anwendung von <strong>HTML, CSS</strong> und <strong>JavaScript</strong>.
                </p>

                <p class="project-desc">
                  <strong>Rolle:</strong> Konzeption, UI-Design, technische Umsetzung, Deployment
                </p>

                <p class="project-desc">
                  <strong>Fokus:</strong> Responsives Layout, Navigation, Animationen und saubere Präsentation der Inhalte
                </p>

                <div class="project-tech">
                 Visual Studio Code, HTML5, CSS3, JavaScript
                </div>

                <div class="project-links">
                  <span class="status-completed">Abgeschlossen </span>
                  <a href="https://github.com/Daddarios/onur-gokhan-bicer-webportfolio.git" target="_blank" title="auf GitHub" rel="noopener noreferrer"> <i class='bx bxl-github'  ></i></a>
                </div>
              </div>
            </div>


            <!-- VISTA -->
            <div class="project-card">
              <div class="project-image">
                 <a href="projekte/vistaperson.png" target="_blank">
                  <img src="projekte/vistaperson.png" alt="Portfolio Vorschau">
                </a>
                <a href="projekte/vistakanban.png" target="_blank">
                  <img src="projekte/vistakanban.png" alt="Portfolio Vorschau">
                </a>
              </div>

              <div class="project-content">
                <h4 class="project-title">VISTA – React SPA für ASP.NET CRM</h4>

                      <p class="project-desc">
                        <strong>VISTA</strong> ist ein persönliches Projekt zur Integration eines <strong>ASP.NET-basierten CRM-Systems</strong> in ein modernes <strong>React-Frontend</strong>.
                        Ziel war es, <strong>REST-API-Integration</strong> praxisnah umzusetzen und React-Kompetenz mit Client-Side-Rendering zu vertiefen.
                      </p>

                      <p class="project-desc">
                        Die Anwendung wurde als <strong>modulare Single Page Application (SPA)</strong> mit React entwickelt.
                        Das <strong>Frontend</strong> kommuniziert über eine selbst entwickelte <strong>REST-API</strong> mit dem Backend.
                      </p>

                      <p class="project-desc">
                        <strong>Rolle:</strong> UI-Design, technische Umsetzung und API-Anbindung
                      </p>
                


                <div class="project-tech">
                  
                  Visual Studio Code, HTML5, CSS3, JavaScript, React ,React Router, JWT 
                </div>

                <div class="project-links">
                 
                  <span class="status-ongoing">in der Entwicklung</span>
                  <a href="https://github.com/Daddarios/Vista.git" target="_blank" title="auf GitHub" rel="noopener noreferrer"> <i class='bx bxl-github'  ></i></a>
                </div>
              </div>
            </div>


            <!-- KLINIK RAUM  STUTTGART -->
            <div class="project-card">
              <div class="project-image">
                 <a href="projekte/klinikall.png" target="_blank">
                  <img src="projekte/klinikall.png" alt="Portfolio Vorschau">
                </a>
                <a href="projekte/klinik3.png" target="_blank">
                  <img src="projekte/klinik3.png" alt="Portfolio Vorschau">
                </a>
              </div>

              <div class="project-content">
                <h4 class="project-title">Klinik Raum Stuttgart</h4>

                <p class="project-desc">
                  Klinik Raum Stuttgart ist eine Desktop-Anwendung als Lernprojekt zur Entwicklung einer einfachen Klinikverwaltungssoftware mit C# und .NET Framework.
                </p>

                <div class="project-tech">
                     Visual Studio, C#,  SQL Server
                </div>

                <div class="project-links">
                <span class="status-completed">Abgeschlossen </span>
                  <a href="https://github.com/Daddarios/Klinikum_Stuttgart.git" target="_blank" title="auf GitHub" rel="noopener noreferrer"> <i class='bx bxl-github'  ></i></a>
                </div>
              </div>
            </div>
          


            <!-- Photo BLOG-Personal PAGE (Photocamera & REISE) -->
            <div class="project-card">
              <div class="project-image">
                 <a href="projekte/perpage1.png" target="_blank">
                  <img src="projekte/perpage1.png" alt="Portfolio Vorschau">
                </a>
                <a href="projekte/perpage2.png" target="_blank">
                  <img src="projekte/perpage2.png" alt="Portfolio Vorschau">
                </a>
              </div>

              <div class="project-content">
                <h4 class="project-title">Photo BLOG – Responsive UI mit HTML & CSS</h4>

                <p class="project-desc"> 
                  Frontend-Projekt zur praktischen Anwendung von <strong>HTML</strong>, <strong>CSS</strong> und Responsive Design. Ziel war eine mobilfreundliche Oberfläche für einen Foto-Blog.
                </p>

                <p class="project-desc">
                  <strong>Rolle:</strong> UI-Konzeption, Layoutstruktur, CSS-Design, Responsive Umsetzung mit Media Queries
                </p>


                <div class="project-tech">
                  Visual Studio Code , HTML5, CSS3,
                </div>

                <div class="project-links">
                <span class="status-completed">Abgeschlossen </span>
                  <a href="https://github.com/Daddarios/Personal-Page.git" target="_blank" title="auf GitHub" rel="noopener noreferrer"> <i class='bx bxl-github'  ></i></a>
                </div>
              </div>
            </div>

              </div>
      `

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
              oder direkt: <span id="kontaktMail"></span>
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



dom.closeBtn.addEventListener("click", closeOverlay);

dom.wrapper.addEventListener("click", e => {
  if (e.target === dom.wrapper) closeOverlay();
});

function closeOverlay() {
  if (overlayCardObserver) {
    overlayCardObserver.disconnect();
    overlayCardObserver = null;
  }

  dom.wrapper.classList.remove("active");
  document.body.classList.remove("overlay-open");
  activeOverlaySource?.classList.remove("is-overlay-source");
  activeOverlaySource = null;

  dom.container.classList.remove("project-mode");
  dom.container.innerHTML = "";
  unlockMainPageScroll();
}

/* ===== PARALLAX ===== */
let cur = 0;
let tgt = 0;
let vel = 0;
function animate() {
  tgt = window.scrollY;
  const diff = tgt - cur;
  vel += diff * 0.04;
  vel *= 0.82;
  cur += vel;

  const bgY = -cur * 0.06;
  const midY = -cur * 0.12;
  const frontY = -cur * 0.2;

  dom.bg.style.setProperty("--bg-y", `${bgY}px`);
  dom.bg.style.setProperty("--mid-y", `${midY}px`);
  dom.bg.style.setProperty("--front-y", `${frontY}px`);

  requestAnimationFrame(animate);
}
animate();


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


/* ===== CUSTOM CURSOR ===== */
(function initCustomMouseCursor() {
  const mqFine = window.matchMedia("(pointer: fine) and (hover: hover)");
  const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!mqFine.matches || mqReduce.matches) {
    return;
  }

  const cursor = document.createElement("span");
  cursor.className = "mouse-cursor-dot";
  document.body.appendChild(cursor);

  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;
  let targetX = currentX;
  let targetY = currentY;
  let rafId = null;
  const speed = 0.19;

  function animateCursor() {
    currentX += (targetX - currentX) * speed;
    currentY += (targetY - currentY) * speed;

    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;

    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      rafId = requestAnimationFrame(animateCursor);
    } else {
      rafId = null;
    }
  }

  function scheduleFrame() {
    if (rafId == null) {
      rafId = requestAnimationFrame(animateCursor);
    }
  }

  function onMove(e) {
    if (e.clientX == null || e.clientY == null) return;
    targetX = e.clientX;
    targetY = e.clientY;
    cursor.classList.add("is-active");
    cursor.classList.remove("is-hidden");
    scheduleFrame();
  }

  function onLeave() {
    cursor.classList.remove("is-active");
  }

  function onEnter() {
    cursor.classList.add("is-active");
  }

  function onDown() {
    cursor.classList.add("is-press");
  }

  function onUp() {
    cursor.classList.remove("is-press");
  }

  function onVisibilityChange() {
    if (document.hidden) {
      onLeave();
    }
  }

  document.addEventListener("mousemove", onMove, { passive: true });
  document.addEventListener("mouseleave", onLeave);
  document.addEventListener("mouseenter", onEnter);
  document.addEventListener("mousedown", onDown);
  document.addEventListener("mouseup", onUp);
  document.addEventListener("visibilitychange", onVisibilityChange);
})();
