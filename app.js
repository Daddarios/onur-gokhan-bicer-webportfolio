


/* =====================================================
   PROJECT TECH ICONS (AUTO)
   Her .project-tech alanındaki yazıyı ikonlara çevirir
   ===================================================== */

function renderProjectTechIcons() {
  const iconMap = {
    "HTML": "devicon-html5-plain-wordmark colored",
    "CSS": "devicon-css3-plain-wordmark colored",
    "JavaScript": "devicon-javascript-plain colored",
    "C#": "devicon-csharp-plain colored",
    "ASP.NET MVC": "devicon-dot-net-plain colored",
    "ASP.NET": "devicon-dot-net-plain-wordmark colored",
    "Entitiy Framework": "devicon-entityframeworkcore-plain colored",
    "Razor": "devicon-dot-net-plain colored",
    "Mysql": "devicon-mysql-original colored",
    "SQL": "devicon-microsoftsqlserver-plain colored",
    "SQL Server": "devicon-microsoftsqlserver-plain colored",
    "Bootstrap": "devicon-bootstrap-plain colored",
    "Tailwind CSS": "devicon-tailwindcss-plain colored",
    "jQuery": "devicon-jquery-plain colored",
    "React": "devicon-react-plain colored",
    "GitHub": "devicon-github-plain white",
    "AJAX": "",       // ikon yok, fallback gösterilecek
    "MailKit": "",    // ikon yok
    "JWT": ""         // ikon yok
  };

  document.querySelectorAll(".project-tech").forEach(div => {
    const techs = div.textContent.split(",").map(t => t.trim());
    div.innerHTML = "";

    techs.forEach(t => {
      const className = iconMap[t];

      if (className) {
        div.innerHTML += `
          <i class="${className}" 
             title="${t}" 
             style="font-size:28px;margin-right:10px; opacity:1"></i>
        `;
      } else {
        // ikon yoksa yazıyla sade etiket
        const span = document.createElement("span");
        span.textContent = t;
        span.title = t;
        span.style.cssText = `
          color: #f0f0f0;
          
          font-size: 12px;
          
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



// Menü toggle butonu
dom.menuToggle.addEventListener("click", () => {
  const isOpen = dom.navLinks.classList.toggle("open");
  document.body.style.overflow = isOpen ? "hidden" : "";
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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault(); // Atlamayı engelle
      const yOffset = -60; // Navbar yüksekliği (isteğe bağlı)
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  });
});


/* ===== SECTIONS ===== */
const sections = [
  { id: "uber-mich", title: "Über mich", desc: "Kurze persönliche Vorstellung" },
  { id: "fahigkeiten", title: "Dokumente & Nachweise", desc: "Alle wichtigen Unterlagen" },
  { id: "projekte", title: "Entwicklung & Projekte", desc: "Abgeschlossene & laufende Projekte" },
  { id: "kontakt", title: "Kontakt", desc: "Kontakt" }
];

const frag = document.createDocumentFragment();

sections.forEach(s => {
  const sec = document.createElement("section");
  sec.className = "cv-section";
  sec.id = s.id;
  sec.innerHTML = `
    <div class="cv-content">
      <h2>${s.title}</h2>
      <p>${s.desc}</p>
      <button class="cv-open-btn" data-type="${s.id}">
        Mehr dazu
      </button>
    </div>
  `;
  frag.appendChild(sec);
});

document.body.appendChild(frag);

/* ===== CONTENT MAP ===== */
const contentMap = {


        /* ===== üBER MICH ===== */
        "uber-mich": `
          <div class="card">

          

            <h3 class="title">Über mich</h3>
            <p  style="font-size:13px;line-height:1.6;">

              Nach meinem erfolgreichen Abschluss als Fachinformatiker für Anwendungsentwicklung
              habe ich erste praktische Erfahrungen in der Anwendungsentwicklung gesammelt
              und entwickle meine Kenntnisse kontinuierlich weiter.

              Ich arbeite strukturiert, verantwortungsbewusst und lösungsorientiert
              und lege Wert auf saubere sowie nachvollziehbare Lösungen.
              Eigenständiges Lernen, das Lesen von Dokumentationen
              und die kontinuierliche Weiterentwicklung gehören für mich selbstverständlich dazu.

              Ich ziele darauf ab, mich fachlich weiterzuentwickeln
              und in professionellen Projekten langfristig Mehrwert zu schaffen.

            </p>
          </div>
        `,

        /* ===== LEBENSLAUF ===== */
        "fahigkeiten": `
        <div class="card">
          <h3 class="title">Lebenslauf</h3>

          <!-- ✅ PDF PREVIEW WRAPPER -->
          <div class="pdf-wrapper">
            <iframe
              src="dokumente/lebenslauf/Lebenslauf1.4_Onur Gökhan Bicer.pdf"
              loading="lazy"
            ></iframe>

            <!-- ✅ GERÇEK PDF (_blank) -->
            <a
              href="dokumente/lebenslauf/Lebenslauf1.4_Onur Gökhan Bicer.pdf"
              target="_blank"
              rel="noopener"
              class="pdf-open"
            >
              Vollansicht öffnen
            </a>
          </div>
        </div>

        <div class="card">
          <h3 class="title">Arbeitszeugnisse</h3>

          <div class="pdf-wrapper">
            <iframe
              src="dokumente/arbeitszeugnis/arbeitszeugnisse.pdf"
              loading="lazy"
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
        </div>

        <div class="card">
          <h3 class="title">Bildung</h3>

          <div class="pdf-wrapper">
            <iframe
              src="dokumente/schulische_akademische/Schulische_akademi_Urkunde_compressed.pdf"
              loading="lazy"
            ></iframe>

            <a
              href="dokumente/schulische_akademische/Schulische_akademi_Urkunde_compressed.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="pdf-open"
            >
              Vollansicht öffnen
            </a>
          </div>
        </div>

        <div class="card">
          <h3 class="title">Ehrenamtlich</h3>

          <div class="pdf-wrapper">
            <iframe
              src="dokumente/ehrenamtlich/Ehrenamtliche+Nachweise_Onur_Gokhan_Bicer.pdf"
              loading="lazy"
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
      `
        ,


        /* ===== PROJEKTE ===== */
        "projekte": `

             <!-- CRM -->

            <div class="project-card">
              <div class="project-image">
                <img src="img/Moon.png" alt="CRM Anwendung Vorschau">
              </div>

              <div class="project-content">
                  <h4 class="project-title">CRM-Anwendung Kunden & Projektverwaltung</h4> 

                  <p class="project-desc">
                    Webbasierte CRM-Lösung mit Benutzerverwaltung, Rollen, Mail-/SMS-Benachrichtigung, Datenanalyse & Excel-Export.
                  </p>

                  <div class="project-tech">
                   
                    C#, ASP.NET, ASP.NET MVC, Entitiy Framework, SQL Server, HTML, CSS , Bootstrap, Tailwind CSS, JavaScript, jQuery,  GitHub
                    
                  </div>

                <div class="project-links">
                  <a id="linksse" href="https://github.com/Daddarios/CrmAPP" target="_blank" rel="noopener noreferrer" title="auf GitHub"> <i class='bx bxl-github'  ></i></a>
                </div>
              </div>
            </div>

        
            <!-- WEB-PORTFOLIO -->

            <div class="project-card">
              <div class="project-image">
                <img src="img/projects/portfolio-preview.png" alt="Portfolio Vorschau">
              </div>

              <div class="project-content">
                <h4 class="project-title">Portfolio Website</h4>

                <p class="project-desc">
                  Persönliche Online-CV- und Portfolio-Anwendung.
                </p>

                <div class="project-tech">
                  HTML, CSS, JavaScript
                </div>

                <div class="project-links">
                  <a href="https://github.com/USERNAME" target="_blank" title="auf GitHub" rel="noopener noreferrer"> <i class='bx bxl-github'  ></i></a>
                </div>
              </div>
            </div>


            <!-- VISTA -->
            <div class="project-card">
              <div class="project-image">
                <img src="img/projects/crm-preview.png" alt="VISTA Vorschau">
              </div>

              <div class="project-content">
                <h4 class="project-title">VISTA</h4>

                <p class="project-desc">
                  React basierend zur Verwaltung von REST API.
                </p>

                <div class="project-tech">
                  React
                </div>

                <div class="project-links">
                  <a href="https://github.com/USERNAME" target="_blank" title="auf GitHub" rel="noopener noreferrer"> <i class='bx bxl-github'  ></i></a>
                </div>
              </div>
            </div>


            <!-- KLINIKUM STUTTGART -->
            <div class="project-card">
              <div class="project-image">
                <img src="img/projects/crm-preview.png" alt="Klinikum Stuttgart Vorschau">
              </div>

              <div class="project-content">
                <h4 class="project-title">Klinikum Stuttgart</h4>

                <p class="project-desc">
                  React basierend zur Verwaltung von REST API.
                </p>

                <div class="project-tech">
                  C#, ASP.NET MVC, SQL, Bootstrap
                </div>

                <div class="project-links">
                  <a href="https://github.com/USERNAME" target="_blank" title="auf GitHub" rel="noopener noreferrer"> <i class='bx bxl-github'  ></i></a>
                </div>
              </div>
            </div>
          


            <!-- Photo BLOG-Personal PAGE (Photocamera & REISE) -->
            <div class="project-card">
              <div class="project-image">
                <img src="img/projects/crm-preview.png" alt="BLOG Vorschau">
              </div>

              <div class="project-content">
                <h4 class="project-title">Photo BLOG-Personal PAGE</h4>

                <p class="project-desc">
                  React basierend zur Verwaltung von REST API.
                </p>

                <div class="project-tech">
                  C#, ASP.NET MVC, SQL, Bootstrap
                </div>

                <div class="project-links">
                  <a href="https://github.com/USERNAME" target="_blank" title="auf GitHub" rel="noopener noreferrer"> <i class='bx bxl-github'  ></i></a>
                </div>
              </div>
            </div>


      `

        ,
        /* ===== KONTAKT ===== */

        "kontakt": `
          <div class="card">
            <h3 class="title">Kontakt</h3>
            <p>E-Mail: ornekmail@eposta.com</p>
          </div>
        `
};






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



  /* önce sıfırla */
  dom.container.classList.remove("grid-layout");

  /* SADECE bu bölümlerde grid olsun */
  if (type === "fahigkeiten" || type === "fahigkeiten") {
    dom.container.classList.add("grid-layout");
  }

  if (type === "projekte" || type === "projekte") {
    dom.container.classList.remove("grid-layout");
  }

  dom.container.innerHTML = contentMap[type] || "";
  document.body.style.overflow = "hidden";
  renderProjectTechIcons();
});



dom.closeBtn.addEventListener("click", closeOverlay);

dom.wrapper.addEventListener("click", e => {
  if (e.target === dom.wrapper) closeOverlay();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeOverlay();
});

function closeOverlay() {
  dom.wrapper.classList.remove("active");
  document.body.classList.remove("overlay-open");

  dom.container.innerHTML = "";
  document.body.style.overflow = "";
}

/* ===== PARALLAX ===== */
let cur = 0, tgt = 0;
function animate() {
  tgt = window.scrollY;
  cur += (tgt - cur) * 0.05;
  dom.bg.style.transform = `translateY(${-cur * .12}px) scale(1.1)`;
  requestAnimationFrame(animate);
}
animate();


/* ===== FOOTER ===== */
const footer = document.createElement("footer");
footer.className = "site-footer";

footer.innerHTML = `
  <div style="color:white">
    &copy; 2025 Onur Gökhan Bicer | Alle Rechte vorbehalten - Version 1.2.0
    
  </div>

  <div class="footer-right">
  <a href="https://github.com/Daddarios" target="_blank" aria-label="GitHub">
    <i class='bx bxl-github' ></i>
  </a>

  <a href="https://www.linkedin.com/in/onur-g%C3%B6khan-bicer-b011b1380/" target="_blank" aria-label="LinkedIn">
    <i class='bx bxl-linkedin' ></i>
  </a>

  <a href="https://x.com/yokhannn" target="_blank" aria-label="X">
    <i class='bx bxl-twitter' "></i>
  </a>

  <a href="mailto:onurgoekhanbicer@gmail.com" aria-label="Mail">
    <i class='bx bxl-gmail' ></i>
  </a>
  
  <a href="mailto:ongb@gmx.com" aria-label="GMX ">
  <img
    src="img/gmx1.png"
    alt="GMX Mail"
    class="mail-icon"
  />
</a>
  
</div>

`;

document.body.appendChild(footer);

