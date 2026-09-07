/**
 * Barath Kishor S C - Portfolio Interactive Core
 * Features: Dark/Light Mode, Typewriter, ScrollSpy, Project Modals, Skills Filtering, Contact Helpers
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Theme Management (Dark / Light)
  initTheme();

  // 3. Dynamic Typewriter Effect for Hero Subtitle
  initTypewriter();

  // 4. Mobile Navigation Toggle
  initMobileNav();

  // 5. ScrollSpy for Active Navigation Links
  initScrollSpy();

  // 6. Skills Category Filter
  initSkillsFilter();

  // 7. Project Deep Dive Modals
  initProjectModals();

  // 8. Resume Preview Modal & Dropdown
  initResumeModal();
  initResumeDropdown();

  // 9. Contact Form & Copy Helpers
  initContactFeatures();

  // 10. Back to Top Button
  initBackToTop();
});

/* ==========================================================================
   Theme Management
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('bk_portfolio_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('bk_portfolio_theme', newTheme);

      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }
}

/* ==========================================================================
   Dynamic Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const roleElement = document.getElementById('role-text');
  const prefixElement = document.querySelector('.role-prefix');
  if (!roleElement) return;

  const roles = [
    { prefix: "I am an", text: "Electronics & Communication Engineer" },
    { prefix: "I am a", text: "PCB Designer (Altium Designer & KiCad)" },
    { prefix: "I am a", text: "Modern Web Developer" }
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseDuration = 2000;

  function type() {
    const current = roles[roleIndex];

    if (prefixElement && prefixElement.textContent !== current.prefix) {
      prefixElement.textContent = current.prefix;
    }

    if (isDeleting) {
      charIndex--;
      roleElement.textContent = current.text.substring(0, charIndex);
    } else {
      charIndex++;
      roleElement.textContent = current.text.substring(0, charIndex);
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === current.text.length) {
      delay = pauseDuration;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   Mobile Navigation
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      navMenu.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   ScrollSpy Active Nav Links
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   Skills Filtering
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Project Details Modals
   ========================================================================== */
const projectDatabase = {
  wearable: {
    badge: "Industrial IoT & Worker Safety",
    title: "Integrated Wearable Device for Real-Time Health, Gas, and Fatigue Monitoring",
    date: "November 2025 – December 2025",
    description: "Engineered a life-saving wearable solution tailored for hazardous industrial zones such as chemical manufacturing, underground mining, and heavy assembly lines. By streaming vital biological signs alongside toxic gas detection, the system triggers proactive safety interventions before catastrophic worker incidents occur.",
    keyPoints: [
      "Simultaneous biometric sensing: Photoplethysmography (PPG) for heart rate & SpO2 blood saturation, precision skin-surface temperature transducer.",
      "Atmospheric monitoring: Electrochemical gas sensor array tuned to identify toxic and volatile ambient industrial emissions in real time.",
      "Fatigue recognition logic: Analyzes sudden head drops, erratic accelerations, or prolonged immobility using 6-axis IMU motion patterns.",
      "Tri-level alert mechanism: On-device audible buzzer (high dB), tactile haptic vibration, and immediate wireless packets sent to supervisor terminals.",
      "Embedded architecture: Low-power ESP32 MCU handling multi-sensor interrupt polling and telemetry with battery power budgeting."
    ],
    specs: {
      "Microcontroller": "ESP32 Dual-Core (Wi-Fi + BLE)",
      "Sensors": "Pulse Oximeter, MQ Gas Sensor, IMU / Accelerometer",
      "Alert Mechanism": "Buzzer, Haptic Vibration, Cloud Alert",
      "Firmware Stack": "C / C++, ESP-IDF / Arduino Framework"
    }
  },
  energymeter: {
    badge: "Smart Grid & Energy Efficiency",
    title: "Smart Energy Meter (IoT-Based)",
    date: "August 2025",
    description: "Designed and fabricated an IoT-enabled digital energy meter to address unmonitored power consumption, unpredictable utility surcharges, and equipment overheating in residential and light industrial environments.",
    keyPoints: [
      "High-precision current and voltage sensor interfacing with analog-to-digital conversion and calibration algorithms.",
      "Continuous calculation of RMS Voltage, Current, Instantaneous Active Power (Watts), Power Factor, and Cumulative Energy (kWh).",
      "Real-time transmission to Blynk IoT Cloud dashboard via Wi-Fi with zero packet drop handling.",
      "Automated over-current and peak load alarms dispatched directly to mobile devices via webhook and push notifications.",
      "Historical data trends enable users to detect vampire power draws, audit peak-hour consumption, and cut electricity costs by up to 20%."
    ],
    specs: {
      "Microcontroller": "ESP32 (Wi-Fi 802.11 b/g/n)",
      "Sensors": "Non-invasive Current Transformer (CT) & Voltage Transducer",
      "Cloud Platform": "Blynk IoT Cloud & Mobile Dashboard",
      "Parameters Monitored": "Voltage, Current, Power (W), Energy (kWh)"
    }
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const triggers = document.querySelectorAll('.project-modal-trigger');

  if (!modal || !modalBody || !modalClose) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = projectDatabase[projectId];

      if (!data) return;

      modalBody.innerHTML = `
        <span class="modal-badge">${data.badge}</span>
        <h3 class="modal-header-title" id="modal-title">${data.title}</h3>
        <p class="modal-date"><i data-lucide="calendar" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i> ${data.date}</p>
        
        <h4 class="modal-section-title">Overview & Problem Statement</h4>
        <p class="modal-desc">${data.description}</p>

        <div class="modal-specs-box">
          ${Object.entries(data.specs).map(([key, val]) => `
            <div class="modal-spec-cell">
              <h6>${key}</h6>
              <p>${val}</p>
            </div>
          `).join('')}
        </div>

        <h4 class="modal-section-title">Key Technical Implementations</h4>
        <div class="modal-features-list">
          ${data.keyPoints.map(point => `
            <div class="modal-feature-item">
              <i data-lucide="check-circle-2"></i>
              <span>${point}</span>
            </div>
          `).join('')}
        </div>
      `;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Resume Preview Modal
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const resumeCloseBtn = document.getElementById('resume-modal-close');
  const triggers = document.querySelectorAll('.resume-modal-trigger');

  if (!resumeModal) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.add('open');
      resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  });

  function closeResumeModal() {
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', closeResumeModal);
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeResumeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
      closeResumeModal();
    }
  });
}

/* ==========================================================================
   Resume Dropdown Menu (Preview / Download)
   ========================================================================== */
function initResumeDropdown() {
  const dropdown = document.getElementById('resume-dropdown');
  const toggleBtn = document.getElementById('resume-dropdown-toggle');
  if (!dropdown || !toggleBtn) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when clicking dropdown items
  const items = dropdown.querySelectorAll('.dropdown-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      dropdown.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   Contact Features & Copy Functionality
   ========================================================================== */
function initContactFeatures() {
  // 1. Copy buttons for email and phone
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast('Failed to copy to clipboard.');
        });
      }
    });
  });

  // 2. Contact form handling
  const contactForm = document.getElementById('portfolio-contact-form');
  const copyDraftBtn = document.getElementById('copy-draft-btn');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      const bodyContent = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
      const mailtoUrl = `mailto:barathkishorsc@gmail.com?subject=${encodeURIComponent(subject)}&body=${bodyContent}`;

      window.location.href = mailtoUrl;

      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = 'Opening your email client with pre-filled message...';
      }
      showToast('Email client opened!');
    });
  }

  if (copyDraftBtn) {
    copyDraftBtn.addEventListener('click', () => {
      const name = document.getElementById('contact-name').value.trim() || '[Your Name]';
      const email = document.getElementById('contact-email').value.trim() || '[Your Email]';
      const subject = document.getElementById('contact-subject').value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('contact-message').value.trim() || 'Hello Barath, I would like to connect with you regarding...';

      const draftText = `To: barathkishorsc@gmail.com\nSubject: ${subject}\n\nHi Barath,\n\n${message}\n\nBest regards,\n${name}\n(${email})`;

      navigator.clipboard.writeText(draftText).then(() => {
        showToast('Message template copied to clipboard!');
        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.textContent = 'Template copied! You can paste it into Gmail or LinkedIn message.';
        }
      });
    });
  }
}

/* ==========================================================================
   Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
