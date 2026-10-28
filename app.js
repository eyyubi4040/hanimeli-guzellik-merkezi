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
      const bannerOffset = document.body.classList.contains("has-top-banner") ? 45 : 0; const headerOffset = 90 + bannerOffset;
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
        const bannerOffset = document.body.classList.contains("has-top-banner") ? 45 : 0; const headerOffset = 90 + bannerOffset;
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
// 29 EKİM CUMHURİYET BAYRAMI ÖZEL KUTLAMA BARI
// ==========================================================================
function initRepublicDayBanner() {
  const banner = document.getElementById('republicDayBanner');
  if (!banner) return;

  const now = new Date();
  const currentYear = now.getFullYear();

  // Bitiş Zamanı: 29 Ekim 23:59:59 (Bayram gününün bitimi / 30 Ekim 00:00)
  const expireDate = new Date(currentYear, 9, 29, 23, 59, 59, 999);
  const startDate = new Date(currentYear, 9, 28, 0, 0, 0, 0);

  // Tarih kontrolü: Süre bittiyse veya henüz başlamadıysa gösterme
  if (now.getTime() > expireDate.getTime() || now.getTime() < startDate.getTime()) {
    banner.style.display = 'none';
    document.body.classList.remove('has-top-banner');
    return;
  }

  // Ziyaretçi bu oturumda kapattıysa gösterme
  if (sessionStorage.getItem('republicBannerDismissed') === 'true') {
    banner.style.display = 'none';
    document.body.classList.remove('has-top-banner');
    return;
  }

  // Cumhuriyet yılını otomatik hesapla (1923'ten günümüze)
  const yearsPassed = currentYear - 1923;
  const descEl = document.getElementById('celebrationDesc');
  if (descEl) {
    descEl.innerHTML = `Cumhuriyetimizin <strong>${yearsPassed}. yılında</strong> Gazi Mustafa Kemal Atatürk ve silah arkadaşlarını saygı, minnet ve rahmetle anıyoruz.`;
  }

  // Barı göster ve sayfa üst boşluğunu ayarla
  banner.style.display = 'block';
  document.body.classList.add('has-top-banner');

  const syncHeight = () => {
    if (banner && banner.offsetHeight) {
      document.documentElement.style.setProperty('--banner-height', banner.offsetHeight + 'px');
    }
  };

  // DOM ve fontlar tam oturduğunda yüksekliği senkronize et
  syncHeight();
  window.addEventListener('resize', syncHeight);
  setTimeout(syncHeight, 100);

  // Kapatma butonu işlevi
  const closeBtn = document.getElementById('closeRepublicBanner');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
      document.body.classList.remove('has-top-banner');
      sessionStorage.setItem('republicBannerDismissed', 'true');
    });
  }

  // Sayfa açıkken süre dolduğunda otomatik anında kaldır
  const msUntilExpire = expireDate.getTime() - now.getTime();
  if (msUntilExpire > 0 && msUntilExpire < 2147483647) {
    setTimeout(() => {
      banner.style.display = 'none';
      document.body.classList.remove('has-top-banner');
    }, msUntilExpire);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRepublicDayBanner);
} else {
  initRepublicDayBanner();
}
