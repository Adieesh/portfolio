document.addEventListener('DOMContentLoaded', function () {
        // ===== YOUTUBE VIDEO MODAL =====
    const ytOverlay = document.querySelector('.video-modal-overlay');
    const ytIframe = document.querySelector('.video-modal iframe');
    const ytCloseBtn = document.querySelector('.video-modal-close');
    const ytTriggers = document.querySelectorAll('.video-trigger');

    function openYoutubeModal(src) {
      if (!ytOverlay || !ytIframe) return;
      // add autoplay param safely
      const url = src.includes('?') ? src + '&autoplay=1' : src + '?autoplay=1';
      ytIframe.src = url;
      ytOverlay.classList.add('open');
    }

    function closeYoutubeModal() {
      if (!ytOverlay || !ytIframe) return;
      ytOverlay.classList.remove('open');
      ytIframe.src = ""; // stop video
    }

    ytTriggers.forEach(trigger => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const src = this.getAttribute('data-video');
        if (src) {
          openYoutubeModal(src);
        }
      });
    });

    if (ytCloseBtn) {
      ytCloseBtn.addEventListener('click', closeYoutubeModal);
    }

    if (ytOverlay) {
      ytOverlay.addEventListener('click', function (e) {
        if (e.target === ytOverlay) {
          closeYoutubeModal();
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeYoutubeModal();
      }
    });


  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe about section elements
  const aboutTitle = document.querySelector('.about-title');
  const aboutPhoto = document.querySelector('.about-photo');
  const aboutPara = document.querySelector('.about-para');

  if (aboutTitle) observer.observe(aboutTitle);
  if (aboutPhoto) observer.observe(aboutPhoto);
  if (aboutPara) observer.observe(aboutPara);

  // Observe skills section images
  const skillHeading = document.querySelector('.skills-heading');
  const skillCreative = document.querySelector('.skills-creative');
  const skillTechnical = document.querySelector('.skills-technical');
  const skillLeadership = document.querySelector('.skills-leadership');

  if (skillHeading) observer.observe(skillHeading);
  if (skillCreative) observer.observe(skillCreative);
  if (skillTechnical) observer.observe(skillTechnical);
  if (skillLeadership) observer.observe(skillLeadership);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  

  // Overlay toggle with "O"
  document.addEventListener('keydown', function (e) {
    if (e.key === 'o' || e.key === 'O') {
      document.body.classList.toggle('hide-overlay');
    }
  });


  document.querySelectorAll('.project-card, .design-card').forEach(el => {
  observer.observe(el);
  });

  function bindCase(cardSelector, popupId) {
  const card = document.querySelector(cardSelector);
  const popup = document.getElementById(popupId);
  const box = popup.querySelector('.case-box');
  const closeBtn = popup.querySelector('.case-close');

  card.addEventListener('click', () => {
    const rect = card.getBoundingClientRect();

    box.style.top = rect.top + 'px';
    box.style.left = rect.left + 'px';
    box.style.width = rect.width + 'px';
    box.style.height = rect.height + 'px';
    box.style.borderRadius = '18px';

    popup.classList.add('open');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      box.style.top = '0';
      box.style.left = '0';
      box.style.width = '100vw';
      box.style.height = '100vh';
      box.style.borderRadius = '0';
      box.style.transform = 'scale(1)';
    });

  });

  closeBtn.addEventListener('click', () => {
    const rect = card.getBoundingClientRect();

    box.style.top = rect.top + 'px';
    box.style.left = rect.left + 'px';
    box.style.width = rect.width + 'px';
    box.style.height = rect.height + 'px';
    box.style.borderRadius = '18px';
    box.style.transform = 'scale(0.98)';

      setTimeout(() => {
    popup.classList.add('closing');
  }, 50);


     setTimeout(() => {
    popup.classList.remove('open', 'closing');
    document.body.style.overflow = '';
    box.style.transform = ''; // reset
  }, 600);

  });
}

// Bind all three
bindCase('.project-1', 'case-skillsim');
bindCase('.project-2', 'case-omniflow');
bindCase('.project-3', 'case-school');


});
