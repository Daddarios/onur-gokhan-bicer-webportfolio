
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
        div.innerHTML += `
          <i class="${className}" 
             title="${t}" 
             style="font-size:20px;margin-right:10px; opacity:1"></i>
        `;
      } else if (t === "Ollama") {
        const img = document.createElement("img");
        img.src = ollamaIconCdn;
        img.alt = t;
        img.title = t;
        img.style.cssText = `
          width: 20px;
          height: 20px;
          margin-right: 10px;
          vertical-align: middle;
          filter: brightness(0) invert(1);
          opacity: 0.95;
        `;
        div.appendChild(img);
      } else {
        // ikon yoksa yazıyla sade etiket
        const span = document.createElement("span");
        span.textContent = t;
        span.title = t;
        span.style.cssText = `
          color: #f0f0f0;
          
          font-size: 10px;
          
          margin-right: 10px;
          display: inline-block;
        `;
        div.appendChild(span);
      }
    });
  });
}



const dom = {
  menuToggle: document.getElementById("menuToggle"),
  navLinks: document.getElementById("navLinks"),
  wrapper: document.getElementById("cvCardsWrapper"),
  container: document.getElementById("cvCardContainer"),
  closeBtn: document.querySelector(".close-btn"),
  bg: document.querySelector(".global-bg")
};

const MENU_MOTION_PRESET = "fast"; // "fast" | "heavy"
dom.navLinks.classList.add(MENU_MOTION_PRESET === "heavy" ? "menu-motion-heavy" : "menu-motion-fast");

let lockedScrollY = 0;

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



// Menü toggle butonu
dom.menuToggle.addEventListener("click", () => {
  const isOpen = dom.navLinks.classList.toggle("open");
  document.body.style.overflow = isOpen ? "hidden" : "";
});

// ESC tuşuna basınca menüyü kapat
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const overlayIsOpen = dom.wrapper.classList.contains("active");
    dom.navLinks.classList.remove("open");
    if (overlayIsOpen) {
      closeOverlay();
      return;
    }
    document.body.style.overflow = "";
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
    dom.navLinks.classList.remove("open");
    document.body.style.overflow = "";

    // ➤ Gelecek frame'de transition geri gelsin
    requestAnimationFrame(() => {
      dom.navLinks.style.transition = "";
    });

    wasMobile = isMobile;
  }
});


// Tüm sayfa içi anchor linkler için smooth scroll
function smoothScrollTo(targetY, duration = 780) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * eased);
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

    smoothScrollTo(y, 820);
  });
});


/* ===== SECTIONS ===== */
const sections = [
  { id: "uber-mich", title: "Über mich", desc: "Kurze persönliche Vorstellung" },
  { id: "fahigkeiten", title: "Lebenslauf & Dokumente", desc: "Wichtige Unterlagen" },
  { id: "projekte", title: "Entwicklung & Projekte", desc: "Abgeschlossene & laufende Projekte" },
  {id:"kurs", title:"Weiterbildungen", desc:"Online-Kurse & Fortbildungen"},
  { id: "kontakt", title: "Kontakt ", desc: "Ich freue mich, von Ihnen zu hören" }
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
// Menüde bir linke tıklanınca 1 sn sonra menüyü kapat
document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    dom.navLinks.classList.remove("open");
    document.body.style.overflow = "";
  });
});

/* ===== CONTENT MAP ===== */
const contentMap = {


  /* ===== üBER MICH ===== */
  "uber-mich": `
          <div class="card uber-mich">
             <img src="./img/DSC_0169.JPG" alt="Gökhan" class="profile-image" />


            <h3 class="title">Über mich</h3>

            <p>Hallo, mein Name ist Gökhan. Ich bin 35 Jahre alt und in Balıkesir geboren. Schon seit meiner Kindheit war ich ein neugieriger Mensch – ein Kind, das Dinge auseinandernahm, um zu verstehen: „Wie funktioniert das eigentlich?“</p>

            <p>Viele Jahre später führte mich mein Weg nach Deutschland, einem meiner Kindheitsträume. Vor etwa neun Jahren kam ich nach Stuttgart, um mein Universitätsstudium fortzusetzen. Seitdem baue ich mir hier ein neues Leben auf und komme Schritt für Schritt dem Bereich näher, von dem ich sagen kann: Ja, genau das ist mein Ding.</p>

            <p>Anfangs war vieles noch recht allgemein ausgerichtet: Universität, eine neue Kultur, ein anderes System und eine neue Lebensordnung. Während meines Studiums erhielt ich die Möglichkeit, bei Daimler als Werkstudent und Ferienbeschäftigter zu arbeiten – ein weiterer Kindheitstraum. Dadurch konnte ich die internen Abläufe eines großen Unternehmens aus nächster Nähe kennenlernen. Doch schon damals war mir eines stets bewusst: Ich arbeite lieber mit konkreten Ergebnissen als mit abstrakten Plänen. Ein Problem zu nehmen und zu sagen „Okay, machen wir daraus ein funktionierendes System“ fühlt sich für mich ganz natürlich an.</p>

            <p>Im Laufe meines Studiums stellte sich heraus, dass das Studienfach für mich nicht geeignet war, sodass ich mein Studium nicht zu Ende geführt habe.
             Daraufhin entschied ich mich bewusst für einen praktischeren, stärker berufsorientierten Weg und begann eine Ausbildung im IT-Bereich. In diesem Rahmen bildete ich mich intensiv in der Softwareentwicklung weiter und schloss die Ausbildung zum IT-Anwendungsentwickler erfolgreich ab.</p>

            <p>Heute motiviert mich meine Arbeit als Junior Full-Stack-Entwickler vor allem eines: ein zunächst chaotisch wirkendes Problem zu analysieren, es Schritt für Schritt zu vereinfachen und am Ende zu einer Lösung zu bringen, bei der man sagen kann: „Jetzt passt es.“

            oder von Grund auf zu entdecken, wie man ein vielseitiges System aufbaut und wirklich funktional macht. Ich arbeite kontinuierlich daran, meine Backend-Kenntnisse zu vertiefen, während es mir im Frontend besonders Freude bereitet, dem Nutzer eine klare und verständliche Erfahrung zu bieten. Für mich geht es nicht nur darum, ein Projekt zu starten, sondern es wirklich zu übernehmen und bis zum Ende zu begleiten. Deshalb scheue ich keine Verantwortung. Strukturiertes Arbeiten motiviert mich, Zuverlässigkeit ist mir wichtig, und ich lege großen Wert auf offene Kommunikation im Team.</p>

            <p>Neben der Arbeit gibt es einen weiteren wichtigen Bereich, der mich prägt: die Musik. Meine Reise mit der Gitarre begann etwa im Jahr 2003 und begleitet mich bis heute auf professioneller Ebene. Musik ist für mich zugleich eine Pause und eine starke Energiequelle. Eine Zeit lang war ich zudem ehrenamtlich als Gitarrenlehrer tätig, was meine Geduld und meine Fähigkeit, Inhalte verständlich zu vermitteln, erheblich gestärkt hat. Ich lerne gerne neue Kulturen kennen, tausche mich mit unterschiedlichen Menschen aus und gewinne neue Perspektiven.</p>

            <p>Kurz gesagt: Ich bin jemand, dessen Reise in Deutschland weitergeht, der sich jeden Tag weiterentwickelt, um bessere Software zu schreiben, der seine Arbeit ernst nimmt und Freude daran hat, gemeinsam etwas zu schaffen.</p>

           
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
              <div class="pdf-wrapper">
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

              <div class="pdf-wrapper">
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

            <div class="pdf-wrapper">
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

            <div class="pdf-wrapper">
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
                  <h4 class="project-title">Vista.Core + Vista.CoreX <small style="margin-left: 10px;">Full-Stack SaaS mit RAG-AI Assistent</small></h4>

                  <p class="project-desc">
                    <strong>Vista.Core / Saas.CoreX</strong> ist eine modulare Full-Stack-SaaS-Plattform für CRM- und operative Geschäftsprozesse mit Multi-Tenant-Architektur.
                  </p>

                  <p class="project-desc">
                    <strong>Fokus:</strong> Der Schwerpunkt liegt auf einer sicheren und skalierbaren Backend-Architektur (.NET 9 Web API, Identity/JWT, Redis, SignalR) sowie auf RAG-gestützter KI mit Semantic Kernel, Kernel Memory, Ollama und Qdrant. Die Plattform kombiniert Echtzeit-Kommunikation, strukturierte Datenverarbeitung und AI-gestützte Assistenz in einer produktionsnahen Systemlandschaft.
                  </p>

                  <p class="project-desc">
                    <strong>Rolle & Beitrag:</strong> Konzeption, Architektur-Design und End-to-End-Umsetzung über Backend und Frontend hinweg (C#/.NET + React/Vite). Umsetzung von Datenmodellierung (EF Core/SQL Server), API-Sicherheit, Realtime-Features, Docker-Containerisierung und CI/CD mit GitHub Actions inkl. automatisierter Tests (xUnit, Moq, EF InMemory, Coverlet).
                  </p>

                  <div class="project-tech">
                    C# , ASP.NET , ASP.NET Core, EF Core, SQL Server, React, Bootstrap, Swagger, Redis, Vite 8, React Router 7, Axios, Docker, Ollama, (qwen2.5:3b) + Qdrant, MailKit, SignalR, Semantic Kernel, Kernel Memory, Qdrant, JWT, Recharts, Serilog, Live-Chat
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
                  <h4 class="project-title">GoAI ChatLab    <small style="margin-left: 10px;">AI-Agent & Chat Assistant</small></h4>  
                      
                     <p class="project-desc">  
                      GoAI ChatLab ist eine performante Full-Stack-Anwendung, die als moderne Brücke zwischen Nutzern und leistungsstarken Open-Source-Sprachmodellen (LLMs) fungiert.
                    </p>
                    
                    <p class="project-desc">
                      <strong>Fokus:</strong> 
                      
                      Der Schwerpunkt liegt auf Architektur-Sicherheit durch einen dedizierten Express.js-Proxy-Server sowie auf dynamischer File-Analyse in Echtzeit. 
                      Die flexible Backend-Architektur ist strategisch so konzipiert, dass sie nahtlos durch ein <b>RAG-System</b>  (Retrieval-Augmented Generation) erweitert werden kann, um beispielsweise als 100% datensicherer <b>24/7 Chat-Assistent  für den Unternehmens-Service & Kundensupport zu operieren</b>.
                    </p>

                  

                    <p class="project-desc">
                      <strong>Rolle & Beitrag:</strong>
                      
                      Konzeption, Architektur-Design und End-to-End Full-Stack-Umsetzung (React Front-End & Node.js Backend).
                      Das Ergebnis ist eine hoch skalierbare Web-Applikation, die demonstriert, wie die Implementierung fortschrittlicher KI-APIs
                      und robuster Proxy-Server reibungslos In bestehende Support-Infrastrukturen integriert werden kann.
                      Gestützt wird diese Architektur durch einen modernen <strong>DevOps-Workflow</strong>: Docker-Containerisierung
                      und vollautomatisierte <strong>CI/CD-Pipelines</strong> unter Einsatz von GitHub Actions gewährleisten dabei ein stabiles und nahtloses Cloud-Deployment.
                    </p>

                    <div class="project-tech">
                      Visual Studio Code, React, Node.js, Express.js, JavaScript, .env, HTML5, CSS3, Git, GitHub, GitHub Actions,Docker , Cloud,
                       RESTful APIs, Client-side File Parsing (PDF-CSV), OpenRouter AI Integration
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
                   Entwicklung eines vollwertigen CRM-Systems mit ASP.NET MVC zur Verwaltung von Kunden, Mitarbeitern 
                    und Projekten sowie deren Berichten. Enthält ein rollenbasiertes Zugriffssystem, Zwei-Faktor-Authentifizierung (2FA), 
                    ein interaktives Dashboard mit Visualisierungen, sowie Funktionen für Excel- und PDF-Export 
                    (inkl. eine REST-API). Die Anwendung ist modular aufgebaut und durch eine API erweiterbar.
                  </p>

                  <p class="project-desc">
                  <strong>Rolle & Beitrag :</strong>  
                  Dieses Full-Stack-Projekt habe ich mit professionellem Anspruch eigenverantwortlich umgesetzt von der Softwarearchitektur über Backend 
                  (inkl. Entity Framework, API-Schnittstellen, 2FA-Sicherheit) bis hin zum vollständigen Frontend-Layout und der Benutzeroberfläche.  
                  
                  Dabei habe ich u. a. die Datenbankstruktur entworfen, die Anwendungsarchitektur definiert 
                  und alle Backend- und Frontend-Komponenten implementiert.  
                  Es entstand im Rahmen eines IHK-Projekts unter realitätsnahen Bedingungen und wurde vollständig von mir konzipiert und entwickelt.
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
                  <strong>Ein selbstständig entwickeltes UI-Projekt</strong> zur praktischen Anwendung von <strong>HTML, CSS</strong> und <strong>JavaScript</strong>.
                </p>

                <p class="project-desc">
                  <strong>Rolle:</strong> Konzeption, UI-Design, technische Umsetzung, Deployment
                </p>

                <p class="project-desc">
                  <strong>Fokus:</strong> Responsives Layout, benutzerfreundliche Navigation, saubere Code-Struktur
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
                        Ziel war es, <strong>REST-API-Integration</strong> praxisnah umzusetzen und Frontend-Kompetenz mit <strong>Client-Side-Rendering (CSR)</strong> zu vertiefen.
                      </p>

                      <p class="project-desc">
                        Die Anwendung wurde als <strong>modulare Single Page Application (SPA)</strong> mit React entwickelt.
                        Das <strong>Frontend</strong> kommuniziert über eine selbst entwickelte <strong>REST-API</strong> mit dem Backend.
                      </p>

                      <p class="project-desc">
                        <strong>Rolle:</strong> UI-Design, technische Umsetzung, API-Anbindung, Continuous Learning
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
                  Klinik Raum Stuttgart ist ein PC-Desktop-Anwendung(Lernprojekt) zur Entwicklung einer Klinikverwaltungssoftware mit C# und .NET Framework.
                  Die Anwendung richtet sich an Arztpraxen, medizinische Einrichtungen und ähnliche Gesundheitseinrichtungen und orientiert sich an der in diesen Bereichen weit verbreiteten Windows-PC- und Server-Infrastruktur.
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
                  Ein persönliches Frontend-Projekt zur praktischen Anwendung von <strong>HTML</strong>, <strong>CSS</strong> und <strong>Responsive Design</strong>. Ziel war es, eine visuell ansprechende, mobilfreundliche Benutzeroberfläche für einen Foto-Blog zu gestalten und umzusetzen.
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



            <!-- ZIELPROJEKTE 1 -->
                <div class="project-card">
                  <div class="project-image">
                   
                      <img src="projekte/plan.png" alt="Zielprojekte Vorschau">
                    
                  </div>
                           <div class="project-content">
                              <h4 class="project-title">Zielprojekt: Data Science & KI-gestützte Business Intelligence</h4>

                                <p class="project-desc">
                                  Dieses Projekt befindet sich aktuell in der <strong>Planungsphase</strong> und ist als persönliches Lernziel 
                                  im Bereich <strong>Data Science</strong>, <strong>Künstliche Intelligenz (KI)</strong> und 
                                  <strong>Business Intelligence</strong> konzipiert.
                                </p>

                                <p class="project-desc">
                                  Ziel ist die Entwicklung eines intelligenten Analyse-Tools für datengetriebene Branchen wie 
                                  <strong>Einzelhandel</strong> oder <strong>E-Commerce</strong>. 
                                  Das Tool soll <strong>Absatzprognosen</strong> (z. B. mit Prophet oder XGBoost), 
                                  <strong>Kundensegmentierung</strong> (z. B. mit RFM-Analyse und K-Means) 
                                  sowie <strong>datenbasierte Entscheidungsunterstützung</strong> ermöglichen.
                                </p>

                                <p class="project-desc">
                                  Dadurch sollen Unternehmen in der Lage sein, <strong>Lagerkosten zu reduzieren</strong>, 
                                  <strong>Marketingkampagnen gezielter zu gestalten</strong> und 
                                  <strong>strategische Entscheidungen auf Basis realer Daten</strong> zu treffen.
                                </p>

                                <p class="project-desc">
                                  In einer späteren Phase ist geplant, das Projekt um <strong>Machine Learning</strong>- und 
                                  <strong>Natural Language Processing (NLP)</strong>-Komponenten zu erweitern – z. B. zur Analyse von 
                                  Kundenfeedback, Bewertungen oder Supportanfragen aus unstrukturierten Datenquellen.
                                </p>

                             <div class="project-tech">
                              Python, Pandas, NumPy , Matplotlib, scikit-learn, Prophet, K-Means,  Seaborn
                            </div>

                            <div class="project-links">
                              <span class="status-ongoing">Lern & Zielprojekt – Umsetzung nach Grundlagenphase geplant</span>
                            </div>
                            </div>

                 
                  </div>

                <!-- ZIELPROJEKT 2 -->
                  <div class="project-card">
                    <div class="project-image">
                      
                        <img src="projekte/plan.png" alt="Zielprojekt 2 Vorschau">
                     
                    </div>

                    <div class="project-content">
                     <h4 class="project-title">Zielprojekt: Predictive Analytics im Bankwesen</h4>

                            <p class="project-desc">
                              Dieses Projekt befindet sich aktuell in der <strong>Planungsphase</strong> und ist als persönliches Lernziel im Bereich 
                              <strong>Predictive Analytics</strong>, <strong>Machine Learning</strong> und <strong>Data Science</strong> für den 
                              <strong>Banken- und Finanzsektor</strong> konzipiert.
                            </p>

                            <p class="project-desc">
                              Ziel ist die Entwicklung eines <strong>Vorhersagemodells</strong>, das prognostiziert, 
                              welche <strong>Bankprodukte</strong> (z.&nbsp;B. Kredit, Anlagekonto oder Sparprodukt) ein Kunde mit hoher Wahrscheinlichkeit 
                              in den kommenden Monaten nutzen wird. Dadurch sollen <strong>Cross-Selling-Potenziale</strong> identifiziert und 
                              <strong>Kundenabwanderung</strong> frühzeitig erkannt werden.
                            </p>

                            <p class="project-desc">
                              Zusätzlich werden <strong>Kundenmerkmale</strong> wie Einkommen, Transaktionshistorie und digitale Nutzung analysiert, 
                              um <strong>Einflussfaktoren auf das Kundenverhalten</strong> zu verstehen. 
                              Auf dieser Basis können <strong>personalisierte Marketing- und Beratungsstrategien</strong> entwickelt werden.
                            </p>

                            <p class="project-desc">
                              Ein besonderer Fokus liegt auf der <strong>Erklärbarkeit der Modelle</strong> (z.&nbsp;B. mit SHAP), 
                              um Vorhersagen transparent darzustellen und die Ergebnisse sowohl für Fachabteilungen als auch für das Management 
                              nachvollziehbar zu machen.
                            </p>

                      <div class="project-tech">
                        Python, Pandas, NumPy, Matplotlib, scikit-learn, XGBoost, Logistic Regression, SHAP, Seaborn
                      </div>

                      <div class="project-links">
                        <span class="status-ongoing">Lern & Zielprojekt – Umsetzung nach Grundlagenphase geplant</span>
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

function setupOverlayCardReveal(type) {
  if (overlayCardObserver) {
    overlayCardObserver.disconnect();
  }

  const selectors = {
    "uber-mich": ".uber-mich",
    "fahigkeiten": ".docs-intro, .doc-card, #hinweis",
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

  // ✅ EKLENDİ: Toggle menü açıksa kapat
  dom.navLinks.classList.remove("open");
  document.body.style.overflow = "";

  dom.wrapper.classList.add("active");
  document.body.classList.add("overlay-open");



  dom.container.innerHTML = contentMap[type] || "";
  lockMainPageScroll();
  dom.container.classList.toggle("project-mode", type === "projekte");
  renderProjectTechIcons();
  renderKontaktMail();
  enhanceProjectMedia();
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

footer.innerHTML = `
  <div class="footer-left">
    <span class="copyright-brand">&copy; 2025  Onur Gökhan Bicer </span> - Alle Rechte vorbehalten | Version 1.4.6
    
  </div>

  <div class="footer-right">
  <a href="https://github.com/Daddarios" target="_blank" aria-label="GitHub">
    <i class='bx bxl-github' ></i>
  </a>

  <a href="https://www.linkedin.com/in/onur-g%C3%B6khan-bicer-b011b1380/" target="_blank" aria-label="LinkedIn">
    <i class='bx bxl-linkedin' ></i>
  </a>

  <a href="https://x.com/yokhannn" target="_blank" aria-label="X">
    <i class='bx bxl-twitter'></i>
  </a>


  
</div>

`;

document.body.appendChild(footer);

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
      gtag('js', new Date());
      gtag('config', 'G-3J196S7JM3');
    `;
    document.head.appendChild(script2);
  }
});

