/**
 * Módulo de Animações Premium — A Procópio
 * Scroll Reveals, Efeitos de Header, Paralaxe do Hero e Cursor Magnético Físico (Apple/Tesla Style)
 */

export function initScrollReveals() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-premium');
    if (!els.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => obs.observe(el));
}

export function initHeaderEffects() {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerLinks = document.querySelectorAll('#mobile-drawer .nav-link');

    if (!header) return;

    // Blur ao rolar
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Drawer móvel
    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.toggle('open');
            mobileToggle.innerHTML = isOpen
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
    }
}

/**
 * Efeito de Paralaxe Cinemático de Alta Performance na Imagem do Hero
 */
export function initHeroParallax() {
    const heroMedia = document.querySelector('.hero-media img');
    if (!heroMedia) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        // Só aplica se estiver visível no topo da página
        if (scrolled <= window.innerHeight) {
            heroMedia.style.transform = `translate3d(0, ${scrolled * 0.32}px, 0)`;
        }
    }, { passive: true });
}

/**
 * Indicador de Progresso de Rolagem Luxuoso
 */
export function initScrollProgress() {
    const progressLine = document.querySelector('.header-scroll-progress');
    if (!progressLine) return;

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        if (scrollHeight > 0) {
            const percentage = (scrolled / scrollHeight) * 100;
            progressLine.style.width = `${percentage}%`;
        }
    }, { passive: true });
}

/**
 * Efeito Magnético Físico nos Links e Botões (Física de atração suave ao passar o cursor)
 */
export function initMagneticElements() {
    // Desativar efeito magnético em dispositivos móveis e touch
    if (window.matchMedia('(max-width: 1024px)').matches || 'ontouchstart' in window) return;

    const targets = document.querySelectorAll('.site-header .nav-link, .site-header .nav-instagram, .btn, .mosaic-cta');
    if (!targets.length) return;

    targets.forEach(target => {
        target.addEventListener('mousemove', (e) => {
            const rect = target.getBoundingClientRect();
            // Centro absoluto do elemento
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            // Distância do ponteiro do mouse ao centro
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;

            // Fator de atração física (menor para links, maior para botões)
            const isLink = target.classList.contains('nav-link') || target.classList.contains('nav-instagram');
            const strength = isLink ? 0.22 : 0.35;
            
            const x = dx * strength;
            const y = dy * strength;

            // Desloca o elemento na direção do ponteiro
            target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            target.style.transition = 'transform 0.08s ease-out'; // Acompanhamento rápido
            
            // Efeito interno para a linha do mosaico cta
            const innerLine = target.querySelector('.cta-line');
            if (innerLine) {
                innerLine.style.transform = `translate3d(${x * 0.3}px, 0, 0)`;
                innerLine.style.transition = 'transform 0.12s ease-out';
            }
        });

        target.addEventListener('mouseleave', () => {
            // Retorna ao centro com amortecimento suave
            target.style.transform = 'translate3d(0, 0, 0)';
            target.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
            
            const innerLine = target.querySelector('.cta-line');
            if (innerLine) {
                innerLine.style.transform = 'translate3d(0, 0, 0)';
                innerLine.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
            }
        });
    });
}
