document.addEventListener('DOMContentLoaded', () => {
    // Set Current Year in Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    const mobileIcon = document.querySelector('.mobile-menu-btn i');

    if (mobileBtn && navbar) {
        mobileBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');

            if (navbar.classList.contains('active')) {
                mobileIcon.classList.remove('fa-bars');
                mobileIcon.classList.add('fa-times');
            } else {
                mobileIcon.classList.remove('fa-times');
                mobileIcon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                mobileIcon.classList.remove('fa-times');
                mobileIcon.classList.add('fa-bars');
            }
        });
    });

    // Active Link Highlighting based on Scroll Position
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth Scrolling API for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Account for fixed header height
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Math CAPTCHA for contact form
    const captchaQuestion = document.getElementById('captchaQuestion');
    const contactForm = document.getElementById('contactForm');

    if (captchaQuestion && contactForm) {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const captchaAnswer = num1 + num2;
        captchaQuestion.textContent = `${num1} + ${num2} = ?`;

        contactForm.addEventListener('submit', function (e) {
            const userAnswer = parseInt(document.getElementById('captcha').value, 10);
            if (userAnswer !== captchaAnswer) {
                e.preventDefault();
                // Show error
                const captchaInput = document.getElementById('captcha');
                captchaInput.style.borderColor = '#e74c3c';
                captchaInput.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.15)';

                let errorMsg = document.getElementById('captchaError');
                if (!errorMsg) {
                    errorMsg = document.createElement('p');
                    errorMsg.id = 'captchaError';
                    errorMsg.style.cssText = 'color: #e74c3c; font-size: 0.85rem; margin-top: 0.25rem;';
                    captchaInput.parentNode.appendChild(errorMsg);
                }
                errorMsg.textContent = '❌ Yanlış cevap, lütfen tekrar deneyin.';
                captchaInput.focus();
            }
        });
    }
});

