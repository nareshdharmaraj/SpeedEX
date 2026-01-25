document.addEventListener('DOMContentLoaded', () => {
    // Editorial Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.big-text, .speed-ex-card, .image-layer').forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });

    // Kinetic Image Parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.layer-1').forEach(el => {
            el.style.transform = `translateY(${scrolled * -0.1}px)`;
        });
        document.querySelectorAll('.layer-2').forEach(el => {
            el.style.transform = `translateY(${scrolled * 0.05}px)`;
        });
        document.querySelectorAll('.layer-3').forEach(el => {
            el.style.transform = `translateY(${scrolled * -0.2}px)`;
        });
    });

    // Mobile Menu Management
    const navActions = document.querySelector('.nav-actions');
    const navLinks = document.querySelector('.nav-links');

    if (navActions && navLinks) {
        // Create Hamburger
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.id = 'nav-hamburger'; // CRITICAL: ID for dashboard control
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        navActions.insertBefore(hamburger, navActions.firstChild);

        // Create Mobile Overlay with Toggles and Login
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';

        // Find existing buttons to clone
        const loginBtn = document.querySelector('.nav-btn');

        const isInitiallyRTL = document.documentElement.getAttribute('dir') === 'rtl';
        overlay.innerHTML = `
            <button class="mobile-menu-close" style="position: absolute; top: 1.5rem; right: 1.5rem; background: var(--c-kinetic); color: white; border: none; width: 50px; height: 50px; font-size: 1.5rem; cursor: pointer; z-index: 12000; display: flex; align-items: center; justify-content: center; border-radius: 5px; font-weight: 1000;">✕</button>
            <div class="mobile-menu-links">
                ${navLinks.innerHTML}
                <div class="mobile-menu-extra" style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
                    ${loginBtn ? `<a href="login.html">${loginBtn.innerText}</a>` : ''}
                    <div style="display:flex; gap:2rem; justify-content:center; align-items:center; width:100%;">
                        <button class="icon-btn mobile-theme-btn">☀️</button>
                        <button class="icon-btn mobile-rtl-btn">🌐</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const closeMenu = () => {
            hamburger.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
        });

        overlay.querySelector('.mobile-menu-close').addEventListener('click', closeMenu);

        // Hook up cloned toggles
        overlay.querySelector('.mobile-theme-btn').addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        overlay.querySelector('.mobile-rtl-btn').addEventListener('click', (e) => {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            if (isRTL) {
                document.documentElement.removeAttribute('dir');
            } else {
                document.documentElement.setAttribute('dir', 'rtl');
            }
        });

        // Close menu when clicking a link
        overlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // Theme Switch with Flare
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});
