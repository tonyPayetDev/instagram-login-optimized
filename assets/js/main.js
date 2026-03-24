/* ============================================
   Instagram Login - Main JS
   ============================================ */

(function () {
  'use strict';

  // ---- Toast Notification ----
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ---- Modal System ----
  function openModal(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      const firstInput = overlay.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 200);
    }
  }

  function closeModal(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Close modal on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) closeModal(this.id);
    });
  });

  // Close modal on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => {
        closeModal(m.id);
      });
    }
  });

  // Close buttons
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', function () {
      const overlay = this.closest('.modal-overlay');
      if (overlay) closeModal(overlay.id);
    });
  });

  // Open modal buttons
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', function () {
      openModal(this.dataset.openModal);
    });
  });

  // ---- Login Form ----
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const identifier = this.querySelector('#identifier').value.trim();
      const password = this.querySelector('#password').value;

      if (!identifier) {
        showToast('Veuillez saisir votre identifiant.');
        document.getElementById('identifier').focus();
        return;
      }
      if (!password) {
        showToast('Veuillez saisir votre mot de passe.');
        document.getElementById('password').focus();
        return;
      }

      const btn = this.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Connexion en cours…';

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Se connecter';
        showToast('Connexion réussie ! Redirection…');
      }, 1800);
    });
  }

  // ---- Reset Password Form ----
  const resetForm = document.getElementById('reset-form');
  if (resetForm) {
    resetForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = this.querySelector('#reset-email').value.trim();
      if (!email) {
        showToast('Veuillez saisir votre adresse e-mail.');
        return;
      }
      showToast('Lien de réinitialisation envoyé à ' + email);
      closeModal('modal-reset');
    });
  }

  // ---- Register Form ----
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = this.querySelector('#reg-name').value.trim();
      if (!name) {
        showToast('Veuillez saisir votre nom.');
        return;
      }
      showToast('Compte créé avec succès !');
      closeModal('modal-register');
    });
  }

  // ---- Language Tags ----
  document.querySelectorAll('.lang-tag').forEach(tag => {
    tag.addEventListener('click', function () {
      document.querySelectorAll('.lang-tag').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      showToast('Langue sélectionnée : ' + this.textContent.trim());
    });
  });

  // ---- Facebook Login ----
  document.querySelectorAll('.btn-facebook').forEach(btn => {
    btn.addEventListener('click', function () {
      showToast('Connexion Facebook en cours…');
    });
  });

  // ---- Intersection Observer for fade-in ----
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .stat-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // ---- Password visibility toggle ----
  document.querySelectorAll('[data-toggle-password]').forEach(btn => {
    btn.addEventListener('click', function () {
      const targetId = this.dataset.togglePassword;
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      this.setAttribute('aria-label', isPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe');
      this.textContent = isPassword ? '🙈' : '👁';
    });
  });

})();
