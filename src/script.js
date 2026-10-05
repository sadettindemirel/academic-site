document.addEventListener('DOMContentLoaded', () => {
    // Blog code snippets: language label + copy button
    document.querySelectorAll('.post-content pre.code-block').forEach(pre => {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-snippet';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const bar = document.createElement('div');
        bar.className = 'code-snippet-bar';
        const label = document.createElement('span');
        label.textContent = pre.dataset.lang || '';
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'code-copy';
        button.textContent = 'Kopyala';
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(pre.innerText);
                button.textContent = 'Kopyalandı ✓';
            } catch (e) {
                button.textContent = 'Kopyalanamadı';
            }
            setTimeout(() => { button.textContent = 'Kopyala'; }, 2000);
        });
        bar.append(label, button);
        wrapper.appendChild(bar);
    });

    // Blog banner: auto-rotating carousel over a scroll-snap track (works by swipe/scroll without JS)
    const banner = document.querySelector('.blog-banner');
    if (banner) {
        const track = banner.querySelector('.banner-track');
        const slides = [...track.children];
        const dots = [...banner.querySelectorAll('.banner-dot')];
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let paused = false;

        const current = () => Math.round(track.scrollLeft / track.clientWidth);
        const goTo = i => track.scrollTo({
            left: ((i + slides.length) % slides.length) * track.clientWidth,
            behavior: reduceMotion.matches ? 'auto' : 'smooth'
        });
        const sync = () => dots.forEach((d, i) => d.classList.toggle('active', i === current()));

        track.addEventListener('scroll', sync, { passive: true });
        dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
        banner.querySelector('.banner-prev').addEventListener('click', () => goTo(current() - 1));
        banner.querySelector('.banner-next').addEventListener('click', () => goTo(current() + 1));
        window.addEventListener('resize', () => goTo(current()));
        sync();

        ['mouseenter', 'focusin'].forEach(e => banner.addEventListener(e, () => { paused = true; }, { passive: true }));
        // Touch has no "leave" event: resume a few seconds after the finger lifts
        let resume;
        banner.addEventListener('touchstart', () => { paused = true; clearTimeout(resume); }, { passive: true });
        banner.addEventListener('touchend', () => { resume = setTimeout(() => { paused = false; }, 8000); }, { passive: true });
        ['mouseleave', 'focusout'].forEach(e => banner.addEventListener(e, () => { paused = false; }));
        setInterval(() => {
            if (!paused && !reduceMotion.matches && !document.hidden) goTo(current() + 1);
        }, 5000);
    }

    // Set Current Year in Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // =========================================================================
    // Dark Mode Toggle (Warm Editorial Theme)
    // =========================================================================
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Theme is applied by the inline script in <head> before first paint (no light flash);
    // here we only sync the toggle icon. Until the visitor picks one, the system setting is followed.
    const currentTheme = html.getAttribute('data-theme');
    if (themeToggle) {
        updateThemeIcon(currentTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeIcon(next);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (!icon) return;
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // =========================================================================
    // Language Toggle (TR/EN) — only on main page
    // =========================================================================
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('lang') || 'tr';

    if (langToggle) {
        // Initialize
        updateLangLabel(currentLang);
        if (currentLang === 'en') {
            applyLanguage('en');
        }

        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'tr' ? 'en' : 'tr';
            localStorage.setItem('lang', currentLang);
            updateLangLabel(currentLang);
            applyLanguage(currentLang);
        });
    }

    function updateLangLabel(lang) {
        if (!langToggle) return;
        const label = langToggle.querySelector('.lang-label');
        // Show the OTHER language as the action
        label.textContent = lang === 'tr' ? 'EN' : 'TR';
    }

    function applyLanguage(lang) {
        // Update text content for elements with data-tr and data-en
        document.querySelectorAll('[data-tr][data-en]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                // If contains HTML (like links), use innerHTML
                if (text.includes('<')) {
                    el.innerHTML = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // Update placeholders
        document.querySelectorAll(`[data-${lang}-placeholder]`).forEach(el => {
            el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
        });

        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    // =========================================================================
    // Header Scroll Effect
    // =========================================================================
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =========================================================================
    // Mobile Menu Toggle
    // =========================================================================
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
            if (navbar && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                if (mobileIcon) {
                    mobileIcon.classList.remove('fa-times');
                    mobileIcon.classList.add('fa-bars');
                }
            }
        });
    });

    // =========================================================================
    // Active Link Highlighting based on Scroll Position
    // =========================================================================
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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

    // =========================================================================
    // Smooth Scrolling for Anchor Links
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================================================
    // Math CAPTCHA for Contact Form
    // =========================================================================
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
