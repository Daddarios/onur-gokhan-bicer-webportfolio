
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
const sections=[
  {id:"uber-mich",title:"Über mich",desc:"Kısa kişisel tanıtım"},
  {id:"fahigkeiten",title:"Fähigkeiten",desc:"CV ve Belgeler"},
  {id:"projekte",title:"Projekte",desc:"Projelerim"},
  {id:"kontakt",title:"Kontakt",desc:"İletişim"}
];

const frag=document.createDocumentFragment();

sections.forEach(s=>{
  const sec=document.createElement("section");
  sec.className="cv-section";
  sec.id=s.id;
  sec.innerHTML=`
    <div class="cv-content">
      <h2>${s.title}</h2>
      <p>${s.desc}</p>
      <button class="cv-open-btn" data-type="${s.id}">
        Daha Fazla
      </button>
    </div>
  `;
  frag.appendChild(sec);
});

document.body.appendChild(frag);

/* ===== CONTENT MAP ===== */
const contentMap={
  "uber-mich":`
    <div class="card">
      <h3 class="title">Über mich</h3>
      <p style="font-size:13px;line-height:1.6;">
        Ben Onur Gökhan Bicer. Yazılım geliştirmeyi problem çözme sanatı olarak görüyorum.
      </p>
    </div>
  `,

"fahigkeiten":`
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
    <h3 class="title">Arbeitszeugnis</h3>

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
        rel="noopener"
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
        rel="noopener"
        class="pdf-open"
      >
        Vollansicht öffnen
      </a>
    </div>
  </div>
`
,

  "projekte":`
    <div class="card">
      <h3 class="title">GitHub</h3>
      <a href="https://github.com/USERNAME" target="_blank">
        <i class='bx bxl-github' style="font-size:48px;color:white;"></i>
      </a>
    </div>
  `,

  "kontakt":`
    <div class="card">
      <h3 class="title">Kontakt</h3>
      <p>E-Mail: ornekmail@eposta.com</p>
    </div>
  `
};

/* ===== OVERLAY ===== */
document.addEventListener("click",e=>{
  const btn=e.target.closest(".cv-open-btn");
  if(!btn)return;

  const type=btn.dataset.type;

// ✅ EKLENDİ: Toggle menü açıksa kapat
  dom.navLinks.classList.remove("open");
  document.body.style.overflow = "";

 dom.wrapper.classList.add("active");
 document.body.classList.add("overlay-open");



/* önce sıfırla */
dom.container.classList.remove("grid-layout");

/* SADECE bu bölümlerde grid olsun */
if (type === "fahigkeiten" || type === "projekte") {
  dom.container.classList.add("grid-layout");
}

dom.container.innerHTML = contentMap[type] || "";
document.body.style.overflow = "hidden";
});

dom.closeBtn.addEventListener("click",closeOverlay);

dom.wrapper.addEventListener("click",e=>{
  if(e.target===dom.wrapper) closeOverlay();
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape") closeOverlay();
});

function closeOverlay(){
  dom.wrapper.classList.remove("active");
  document.body.classList.remove("overlay-open");

  dom.container.innerHTML="";
  document.body.style.overflow="";
}

/* ===== PARALLAX ===== */
let cur=0,tgt=0;
function animate(){
  tgt=window.scrollY;
  cur+=(tgt-cur)*0.05;
  dom.bg.style.transform=`translateY(${-cur*.12}px) scale(1.1)`;
  requestAnimationFrame(animate);
}
animate();


/* ===== FOOTER ===== */
const footer = document.createElement("footer");
footer.className = "site-footer";

footer.innerHTML = `
  <div style="color:white">
    &copy; 2025 Onur Gökhan Bicer | Alle Rechte vorbehalten

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

