// Sticky Navigation Header on Scroll
const handleScroll = () => {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
};
window.addEventListener('scroll', handleScroll);
window.addEventListener('DOMContentLoaded', handleScroll);
window.addEventListener('load', handleScroll);

// Mobile Responsive Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}

// Appointment Form Logic with WhatsApp integration
const appointmentForm = document.getElementById('appointmentForm');
const successMessage = document.getElementById('successMessage');

if (appointmentForm) {
  appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value || 'Belirtilmedi';
    
    if (name && phone && service && date) {
      const wpNumber = "905469167358";
      const message = `Merhaba, Hanımeli Güzellik Merkezi'nden randevu almak istiyorum.%0A%0A` +
                      `*Ad Soyad:* ${encodeURIComponent(name)}%0A` +
                      `*Telefon:* ${encodeURIComponent(phone)}%0A` +
                      `*Hizmet:* ${encodeURIComponent(service)}%0A` +
                      `*Tarih:* ${encodeURIComponent(date)}%0A` +
                      `*Notlar:* ${encodeURIComponent(notes)}`;
      
      const wpUrl = `https://api.whatsapp.com/send?phone=${wpNumber}&text=${message}`;
      
      // Open WhatsApp in a new tab
      window.open(wpUrl, '_blank');
      
      // Show success feedback
      successMessage.style.display = 'block';
      successMessage.innerHTML = `Teşekkürler ${name}! Randevu bilgileriniz WhatsApp üzerinden gönderiliyor...`;
      
      // Reset the form
      appointmentForm.reset();
      
      // Auto-hide success message after 8 seconds
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 8000);
    }
  });
}

// Campaign Modal Control
const campaignModal = document.getElementById('campaignModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalActionLink = document.getElementById('modalActionLink');
const modalActionBtn = document.getElementById('modalActionBtn');
const modalOverlay = document.querySelector('.modal-overlay');

if (campaignModal) {
  // Show modal on load with a slight delay
  window.addEventListener('load', () => {
    // Only show if not shown in current session
    if (!sessionStorage.getItem('campaignShown')) {
      setTimeout(() => {
        campaignModal.classList.add('active');
      }, 1000);
    }
  });

  const closeModal = () => {
    campaignModal.classList.remove('active');
    sessionStorage.setItem('campaignShown', 'true');
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  
  const handleAction = (e) => {
    e.preventDefault();
    closeModal();
    // Scroll smoothly to appointment section
    const target = document.querySelector('#randevu');
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  if (modalActionLink) modalActionLink.addEventListener('click', handleAction);
  if (modalActionBtn) modalActionBtn.addEventListener('click', handleAction);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    
    // Skip if it's empty
    if (!targetId || targetId === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (targetId === '#anasayfa') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      // Calculate offset for fixed header
      const bannerOffset = document.body.classList.contains("has-top-banner") ? (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--banner-height")) || 65) : 0; const headerOffset = 90 + bannerOffset;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Smooth scroll on page load if hash exists
window.addEventListener('load', () => {
  if (window.location.hash) {
    const hash = window.location.hash;
    const targetElement = document.querySelector(hash);
    
    if (targetElement) {
      setTimeout(() => {
        const bannerOffset = document.body.classList.contains("has-top-banner") ? (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--banner-height")) || 65) : 0; const headerOffset = 90 + bannerOffset;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});

// Auto-select service in the dropdown based on URL or homepage actions
window.addEventListener('DOMContentLoaded', () => {
  const serviceSelect = document.getElementById('service');
  if (!serviceSelect) return;

  // 1. Auto-select based on URL Pathname
  const path = window.location.pathname.toLowerCase();
  if (path.includes('diot-buz-lazer')) {
    serviceSelect.value = 'Diot Buz Lazer';
  } else if (path.includes('medikal-cilt-bakimi')) {
    serviceSelect.value = 'Medikal Cilt Bakımı';
  } else if (path.includes('pedikur-ve-tirnak-tasarimi')) {
    serviceSelect.value = 'Pedikür';
  } else if (path.includes('kas-kontur-microblading')) {
    serviceSelect.value = 'Kaş Kontür';
  } else if (path.includes('profesyonel-masaj')) {
    serviceSelect.value = 'Masaj Hizmetleri';
  }

  // 2. Auto-select based on URL query parameter (e.g. ?service=lazer)
  const params = new URLSearchParams(window.location.search);
  const serviceParam = params.get('service') || params.get('hizmet');
  if (serviceParam) {
    const val = serviceParam.toLowerCase();
    if (val.includes('lazer')) serviceSelect.value = 'Diot Buz Lazer';
    else if (val.includes('cilt') || val.includes('bakim')) serviceSelect.value = 'Medikal Cilt Bakımı';
    else if (val.includes('pedikur') || val.includes('ayak') || val.includes('tirnak')) serviceSelect.value = 'Pedikür';
    else if (val.includes('kas') || val.includes('kontur') || val.includes('micro')) serviceSelect.value = 'Kaş Kontür';
    else if (val.includes('masaj')) serviceSelect.value = 'Masaj Hizmetleri';
  }

  // 3. Homepage Lazer Section "Randevu Al" Button Auto-select
  const laserBtn = document.getElementById('laserRandevuBtn');
  if (laserBtn) {
    laserBtn.addEventListener('click', () => {
      serviceSelect.value = 'Diot Buz Lazer';
    });
  }
});


// ==========================================================================
// ÖZEL GÜN VE ANMA BARLARI (HER YIL OTOMATİK YAYINLAMA & KALDIRMA)
// 1) 29 Ekim Cumhuriyet Bayramı: 28 Ekim 00:00 - 29 Ekim 23:59:59 (Her yıl)
// 2) 10 Kasım Atatürk'ü Anma Günü: 1 Kasım 00:00 - 10 Kasım 23:59:59 (Her yıl)
// ==========================================================================
function initSpecialDaysBanners() {
  const republicBanner = document.getElementById('republicDayBanner');
  const memorialBanner = document.getElementById('ataturkMemorialBanner');
  if (!republicBanner && !memorialBanner) return;

  const now = new Date();
  const currentYear = now.getFullYear();

  // 1. 29 Ekim Cumhuriyet Bayramı (Ay indeksi: 9 = Ekim)
  const republicStart = new Date(currentYear, 9, 28, 0, 0, 0, 0);
  const republicExpire = new Date(currentYear, 9, 29, 23, 59, 59, 999);

  // 2. 10 Kasım Atatürk'ü Anma (Ay indeksi: 10 = Kasım)
  // Anma haftası boyunca aktif kalır, 10 Kasım 23:59:59'da otomatik kapanır
  const memorialStart = new Date(currentYear, 10, 1, 0, 0, 0, 0);
  const memorialExpire = new Date(currentYear, 10, 10, 23, 59, 59, 999);

  // Canlı Önizleme Modu Algılama (URL, Hash, SessionStorage):
  const fullHref = (window.location.href || '').toLowerCase();
  let forceBanner = null;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    forceBanner = urlParams.get('banner');
  } catch (e) { }

  if (!forceBanner) {
    if (fullHref.includes('10kasim') || fullHref.includes('10-kasim')) {
      forceBanner = '10kasim';
    } else if (fullHref.includes('29ekim') || fullHref.includes('29-ekim')) {
      forceBanner = '29ekim';
    } else {
      forceBanner = sessionStorage.getItem('hgm_preview_banner');
    }
  }

  if (fullHref.includes('banner=off') || fullHref.includes('#off')) {
    forceBanner = null;
    sessionStorage.removeItem('hgm_preview_banner');
  } else if (forceBanner) {
    sessionStorage.setItem('hgm_preview_banner', forceBanner);
  }

  let activeBanner = null;
  let activeExpire = null;

  if (forceBanner === '10kasim' && memorialBanner) {
    activeBanner = memorialBanner;
    activeExpire = memorialExpire;
  } else if (forceBanner === '29ekim' && republicBanner) {
    activeBanner = republicBanner;
    activeExpire = republicExpire;
  } else if (now.getTime() >= memorialStart.getTime() && now.getTime() <= memorialExpire.getTime() && memorialBanner) {
    activeBanner = memorialBanner;
    activeExpire = memorialExpire;
  } else if (now.getTime() >= republicStart.getTime() && now.getTime() <= republicExpire.getTime() && republicBanner) {
    activeBanner = republicBanner;
    activeExpire = republicExpire;
  }

  function activateBanner(bannerToActivate) {
    if (republicBanner) republicBanner.style.display = 'none';
    if (memorialBanner) memorialBanner.style.display = 'none';

    if (!bannerToActivate) {
      document.body.classList.remove('has-top-banner');
      document.documentElement.style.removeProperty('--banner-height');
      return;
    }

    bannerToActivate.style.display = 'flex';
    document.body.classList.add('has-top-banner');

    const syncHeight = () => {
      if (bannerToActivate && bannerToActivate.offsetHeight) {
        document.documentElement.style.setProperty('--banner-height', bannerToActivate.offsetHeight + 'px');
      }
    };

    syncHeight();
    window.addEventListener('resize', syncHeight);

    const bannerImg = bannerToActivate.querySelector('.celebration-banner-img');
    if (bannerImg) {
      if (bannerImg.complete) {
        syncHeight();
      } else {
        bannerImg.addEventListener('load', syncHeight);
      }
    }
    setTimeout(syncHeight, 150);
    setTimeout(syncHeight, 500);
  }

  // Global kontroller (konsol veya harici tetikleyiciler için)
  window.show10KasimBanner = () => {
    sessionStorage.setItem('hgm_preview_banner', '10kasim');
    activateBanner(memorialBanner);
  };
  window.show29EkimBanner = () => {
    sessionStorage.setItem('hgm_preview_banner', '29ekim');
    activateBanner(republicBanner);
  };
  window.hideSpecialBanners = () => {
    sessionStorage.removeItem('hgm_preview_banner');
    activateBanner(null);
  };

  activateBanner(activeBanner);

  // Sayfa açıkken süre dolduğunda otomatik anında kaldır
  if (activeExpire && !forceBanner) {
    const msUntilExpire = activeExpire.getTime() - now.getTime();
    if (msUntilExpire > 0 && msUntilExpire < 2147483647) {
      setTimeout(() => {
        activateBanner(null);
      }, msUntilExpire);
    }
  }

  // Yerel dosya veya test ortamında tek tıkla test paneli
  const isLocalDev = window.location.protocol === 'file:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    fullHref.includes('preview') ||
    forceBanner !== null;

  if (isLocalDev && !document.getElementById('specialDaysDevToolbar')) {
    const toolbar = document.createElement('aside');
    toolbar.id = 'specialDaysDevToolbar';
    toolbar.setAttribute('aria-label', 'Özel Gün Banner Test Paneli');
    toolbar.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 99999;
      background: rgba(15, 18, 28, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(12px);
      border-radius: 30px;
      padding: 6px 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7);
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      color: #e2e8f0;
    `;

    toolbar.innerHTML = `
      <span style="font-weight: 600; color: #ff9f1c; display: flex; align-items: center; gap: 4px;">
        ✦ Banner:
      </span>
      <button type="button" id="btnTest10Kasim" style="background: ${activeBanner === memorialBanner ? '#22c55e' : 'rgba(255,255,255,0.1)'}; color: #fff; border: 1px solid rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 14px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.2s;">
        10 Kasım
      </button>
      <button type="button" id="btnTest29Ekim" style="background: ${activeBanner === republicBanner ? '#ef4444' : 'rgba(255,255,255,0.1)'}; color: #fff; border: 1px solid rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 14px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.2s;">
        29 Ekim
      </button>
      <button type="button" id="btnTestOff" style="background: rgba(255,255,255,0.06); color: #94a3b8; border: 1px solid rgba(255,255,255,0.1); padding: 5px 10px; border-radius: 14px; cursor: pointer; font-size: 12px; transition: all 0.2s;">
        ✕ Kapat
      </button>
    `;

    document.body.appendChild(toolbar);

    const b10 = document.getElementById('btnTest10Kasim');
    const b29 = document.getElementById('btnTest29Ekim');
    const bOff = document.getElementById('btnTestOff');

    const updateButtonStyles = (activeType) => {
      if (b10) b10.style.background = activeType === '10' ? '#22c55e' : 'rgba(255,255,255,0.1)';
      if (b29) b29.style.background = activeType === '29' ? '#ef4444' : 'rgba(255,255,255,0.1)';
    };

    b10.addEventListener('click', () => {
      window.show10KasimBanner();
      updateButtonStyles('10');
    });
    b29.addEventListener('click', () => {
      window.show29EkimBanner();
      updateButtonStyles('29');
    });
    bOff.addEventListener('click', () => {
      window.hideSpecialBanners();
      updateButtonStyles('none');
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpecialDaysBanners);
} else {
  initSpecialDaysBanners();
}
