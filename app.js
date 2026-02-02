


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
    "Python": "devicon-python-plain colored",
    "NumPy": "devicon-numpy-plain colored",
    "Pandas": "devicon-pandas-original colored",
    "Matplotlib":"devicon-matplotlib-plain white",
    "scikit-learn": "devicon-scikitlearn-plain colored",
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
  { id: "fahigkeiten", title: "Lebenslauf & Dokumente", desc: "Wichtige Unterlagen" },
  { id: "projekte", title: "Entwicklung & Projekte", desc: "Abgeschlossene & laufende Projekte" },
  {id:"kurs", title:"Weiterbildungen", desc:"Online-Kurse & Fortbildungen"},
  { id: "kontakt", title: "Kontakt", desc: "" }
];

const frag = document.createDocumentFragment();

sections.forEach(s => {
  const sec = document.createElement("section");
  sec.className = "cv-section";
  sec.id = s.id;
  sec.innerHTML = `
    <div class="cv-content">
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
              src="dokumente/lebenslauf/Lebenslauf.pdf"
              loading="lazy"
            ></iframe>

            <!-- ✅ GERÇEK PDF (_blank) -->
            <a
              href="dokumente/lebenslauf/Lebenslauf.pdf"
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
              src="dokumente/schulische_akademische/Bildung.pdf"
              loading="lazy"
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
       <p id="hinweis">
          <span class="hinweis-inner">
            Hinweis: Aus Sicherheitsgründen wurden bestimmte Dokumente nicht öffentlich hochgeladen.
          </span>
        </p>
       

</div>
 
      `
  ,


  /* ===== PROJEKTE ===== */
  "projekte": `

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
                  <h4 class="project-title">CRM-Anwendung Kunden & Projektverwaltung</h4> 

                  <p class="project-desc">
                    CRM-System mit ASP.NET MVC: rollenbasierte Zugriffskontrolle, Zwei-Faktor-Authentifizierung (2FA), Modulbasierte Verwaltung von Kunden, Mitarbeitern und Projektaktivitäten, Echtzeit-Dashboard, Visualisierungen, Formularvalidierung, Excel/PDF-Export und API-Erweiterbarkeit.
                  </p>


                  <div class="project-tech">
                   
                    C#, ASP.NET, ASP.NET MVC, Entitiy Framework, SQL Server, HTML, CSS , Bootstrap, Tailwind CSS, JavaScript, jQuery,  GitHub
                    
                  </div>

                <div class="project-links">
                <span id="noch">in der Entwicklung</span>
                  <a id="linksse" href="https://github.com/Daddarios/CrmAPP" target="_blank" rel="noopener noreferrer" title="auf GitHub"> <i class='bx bxl-github'  ></i></a>
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
                  <p class="project-desc">
                     <p class="project-desc">
                      Meine erste persönliche Portfolio-Seite, um Projekte, Lebenslauf und wichtige Unterlagen übersichtlich zu zeigen – schlicht, mobilfreundlich und ganz mein Stil.
                    </p>

                  </p>

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
                 <a href="projekte/vistaperson.png" target="_blank">
                  <img src="projekte/vistaperson.png" alt="Portfolio Vorschau">
                </a>
                <a href="projekte/vistakanban.png" target="_blank">
                  <img src="projekte/vistakanban.png" alt="Portfolio Vorschau">
                </a>
              </div>

              <div class="project-content">
                <h4 class="project-title">VISTA</h4>

                <p class="project-desc">
                VISTA wurde entwickelt, um ein ASP.NET-basiertes CRM-System in ein modernes React-Frontend zu integrieren und REST-API-Prinzipien praktisch anzuwenden.
                Ziel ist es, eine modulare React-SPA zu realisieren, kontinuierlich praktische Erfahrung in der REST-API-Integration zu sammeln und mich dabei stetig weiterzuentwickeln.
                Das Frontend wurde als Client-Side-Rendering (CSR) React-Anwendung umgesetzt und kommuniziert über eine REST-API mit dem Backend.
                </p>

                


                <div class="project-tech">
                  
                  React, JavaScript, CSS,
                </div>

                <div class="project-links">
                
                  <span id="noch">in der Entwicklung</span>
                  <a href="https://github.com/USERNAME" target="_blank" title="auf GitHub" rel="noopener noreferrer"> <i class='bx bxl-github'  ></i></a>
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
                  C#, ASP.NET, SQL Server
                </div>

                <div class="project-links">
                  <a href="https://github.com/USERNAME" target="_blank" title="auf GitHub" rel="noopener noreferrer"> <i class='bx bxl-github'  ></i></a>
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
                <h4 class="project-title">Photo BLOG</h4>

                <p class="project-desc"> 
                   Photo Blog ist mein erstes Frontendprojekt. In diesem Projekt habe ich die grundlegenden Bausteine des Frontends wie HTML-Struktur, CSS-Design und Responsive Design gelernt und praktisch angewendet.
                </p>

                <div class="project-tech">
                  HTML, CSS
                </div>

                <div class="project-links">
                  <a href="https://github.com/USERNAME" target="_blank" title="auf GitHub" rel="noopener noreferrer"> <i class='bx bxl-github'  ></i></a>
                </div>
              </div>
            </div>



            <!-- ZIELPROJEKTE 1 -->
                <div class="project-card">
                  <div class="project-image">
                   
                      <img src="projekte/plan.png" alt="Zielprojekte Vorschau">
                    
                  </div>

                  <div class="project-content">
                    <h4 class="project-title">Zielprojekte: Data Science & Business Intelligence</h4>

                    <p class="project-desc">
                      <strong>1. Produkt-Nachfrageprognose:</strong> Entwicklung eines Modells zur Vorhersage zukünftiger Produktverkäufe mittels Zeitreihenanalyse (z.&nbsp;B. Prophet, XGBoost), 
                      um Lagerbestände zu optimieren und Kosten zu reduzieren.<br><br>

                      <strong>2. Kundensegmentierung:</strong> Anwendung von RFM-Analyse und Clustering (z.&nbsp;B. K-Means), um Kunden in Zielgruppen zu segmentieren und personalisierte Marketingstrategien zu entwickeln.
                    </p>

                    <div class="project-tech">
                      Python, Pandas, NumPy , Matplotlib, scikit-learn, Prophet, K-Means,  Seaborn
                    </div>

                    <div class="project-links">
                      <span id="noch">in Planung</span>
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
                        <strong>1. Produktnutzungsprognose:</strong> Entwicklung eines ML-Modells zur Vorhersage, welche Bankprodukte (z.&nbsp;B. Kredit, Anlagekonto) ein Kunde wahrscheinlich in den nächsten Monaten nutzen wird. Ziel ist es, Cross-Selling zu optimieren und Kundenabwanderung zu reduzieren.<br><br>

                        <strong>2. Feature-Auswertung & Kundenverhalten:</strong> Analyse der wichtigsten Einflussfaktoren (z.&nbsp;B. Einkommen, Transaktionshistorie, digitale Nutzung), um Kundenverhalten besser zu verstehen und Marketingmaßnahmen zu personalisieren.
                      </p>

                      <div class="project-tech">
                        Python, Pandas, NumPy, Matplotlib, scikit-learn, XGBoost, Logistic Regression, SHAP, Seaborn
                      </div>

                      <div class="project-links">
                        <span id="noch">in Planung</span>
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
        <span class="immernoch">in der Lernphase</span>
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
        <span class="immernoch">in der Lernphase</span>
      </div>

      <div class="education-card">
        <h4 class="card-title">Python & KI</h4>
        <ul class="education-list">
          <li>Python – Grundlagen für KI & Datenanalyse</li>
          <li>NumPy – Numerische Berechnungen für Machine Learning</li>
          <li>pandas – Datenaufbereitung und Analyse</li>
          <li>Matplotlib & Seaborn – Datenvisualisierung</li>
          <li>scikit-learn – Regression, Klassifikation und Clustering</li>
          <li>Machine-Learning-Modelle – Decision Trees, SVM, K-Means</li>
          <li>Praxisprojekte – Arbeiten mit realen Datensätzen</li>
          <li>Projektworkflow – Struktur von Data-Science-Projekten</li>

        </ul>
        <span class="immernoch">in der Lernphase</span>
      </div>

    </div>
  </div>
</section>
`

,
  /* ===== KONTAKT ===== */

  "kontakt": `
           <div class="card kontakt-card">
            <h2 class="title">Kontakt</h2>
            
            <p>
              <strong><i class='bx bx-mail-send' style='color:#ffffff' ></i> E-Mail :</strong> <span id="kontaktMail"></span>
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
   renderKontaktMail(); 
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


  
</div>

`;

document.body.appendChild(footer);

