// Sticky Navigation Header on Scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile Responsive Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
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

// Smooth scrolling for anchor links without showing # in URL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    
    e.preventDefault();
    
    // Skip if it's just '#' or '#anasayfa'
    if (targetId === '#' || targetId === '#anasayfa') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      if (history.pushState) {
        history.pushState(null, null, '/');
      }
      return;
    }
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Calculate offset for fixed header
      const headerOffset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      if (history.pushState) {
        const cleanPath = targetId.replace('#', '');
        history.pushState(null, null, '/' + cleanPath);
      }
    }
  });
});

// Clean hash from URL and scroll smoothly on page load
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    const hash = window.location.hash;
    const targetElement = document.querySelector(hash);
    
    if (targetElement) {
      // Prevent native instant jump
      window.scrollTo(0, 0);

      // Smooth scroll to the section
      setTimeout(() => {
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Remove the #hash from the URL bar immediately
        if (history.replaceState) {
          history.replaceState(null, null, window.location.pathname);
        }
      }, 100);
    }
  }
});
