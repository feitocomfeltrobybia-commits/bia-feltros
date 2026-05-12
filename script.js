// Constantes de contato - altere aqui para atualizar em todo o site
const CONTACT_INFO = {
    whatsapp: '5519953321819',
    email: 'feitocomfeltrobybia@gmail.com',
    instagram: 'https://instagram.com/biankacriz'
};

document.addEventListener('DOMContentLoaded', () => {
    setActiveNavigationLink();
    initSmoothScroll();
    initFadeAnimations();
    initCarousels();
    initImageLightbox();
    initMobileMenu();
    initSearch();
    updateContactLinks();
    initConsentBanner();
});

// ============================================================
// ANALYTICS — ativado apenas após consentimento LGPD
// ============================================================

function enableAnalytics() {
    if (typeof gtag === 'function') {
        gtag('config', 'G-2EBXNZ5Y7X');
    }
}

// ============================================================
// LGPD — banner de consentimento de cookies
// ============================================================

function initConsentBanner() {
    const consent = localStorage.getItem('lgpd_consent');
    if (consent === 'accepted') { enableAnalytics(); return; }
    if (consent === 'refused') return;

    const banner = document.createElement('div');
    banner.id = 'lgpd-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Aviso de privacidade e cookies');

    const content = document.createElement('div');
    content.className = 'lgpd-content';

    const text = document.createElement('p');
    text.appendChild(document.createTextNode('Este site usa cookies do Google Analytics para analisar o tráfego. Conforme a '));
    const strong = document.createElement('strong');
    strong.textContent = 'LGPD';
    text.appendChild(strong);
    text.appendChild(document.createTextNode(', precisamos do seu consentimento antes de coletar dados.'));

    const buttons = document.createElement('div');
    buttons.className = 'lgpd-buttons';

    const acceptBtn = document.createElement('button');
    acceptBtn.id = 'lgpd-accept';
    acceptBtn.className = 'lgpd-btn lgpd-accept';
    acceptBtn.textContent = 'Aceitar';

    const refuseBtn = document.createElement('button');
    refuseBtn.id = 'lgpd-refuse';
    refuseBtn.className = 'lgpd-btn lgpd-refuse';
    refuseBtn.textContent = 'Recusar';

    buttons.append(acceptBtn, refuseBtn);
    content.append(text, buttons);
    banner.appendChild(content);
    document.body.appendChild(banner);

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('lgpd_consent', 'accepted');
        enableAnalytics();
        banner.remove();
    });

    refuseBtn.addEventListener('click', () => {
        localStorage.setItem('lgpd_consent', 'refused');
        banner.remove();
    });
}

// ============================================================
// HELPERS
// ============================================================

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Cria um DocumentFragment com o texto onde o termo buscado fica em negrito.
// Não usa innerHTML — evita XSS.
function highlightMatch(text, query) {
    const fragment = document.createDocumentFragment();
    const regex = new RegExp(escapeRegex(query), 'gi');
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }
        const strong = document.createElement('strong');
        strong.style.color = 'var(--rosa)';
        strong.textContent = match[0];
        fragment.appendChild(strong);
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    return fragment;
}

// ============================================================
// NAVEGAÇÃO ATIVA
// ============================================================

function setActiveNavigationLink() {
    const navLinks = document.querySelectorAll('.nav-links a[href]');
    if (!navLinks.length) return;

    const currentFile = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkFile = link.getAttribute('href')?.split('/').pop() || 'index.html';
        const isActive = linkFile === currentFile || (currentFile === '' && linkFile === 'index.html');

        link.classList.toggle('active', isActive);

        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

// ============================================================
// SCROLL SUAVE
// ============================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                event.preventDefault();
                window.scrollTo({ top: target.offsetTop - 90, behavior: 'smooth' });
            }
        });
    });
}

// ============================================================
// ANIMAÇÕES DE ENTRADA (fade-in)
// ============================================================

function initFadeAnimations() {
    const elements = document.querySelectorAll('.card, .produto-card, .cat-card, .depoimento-card, .hero-content, .form-contato, section h2, .footer');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    elements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// ============================================================
// CARROSSEL DE IMAGENS
// ============================================================

function initCarousels() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const images = [...carousel.querySelectorAll('img')];
        if (!images.length) return;

        let current = 0;
        images.forEach(img => img.classList.remove('active'));
        images[current].classList.add('active');

        if (images.length > 1) {
            let prev = carousel.querySelector('button.prev');
            let next = carousel.querySelector('button.next');

            if (!prev || !next) {
                prev = document.createElement('button');
                next = document.createElement('button');
                prev.className = 'btn-carousel prev';
                next.className = 'btn-carousel next';
                prev.type = 'button';
                next.type = 'button';
                prev.textContent = '❮';
                next.textContent = '❯';
                prev.setAttribute('aria-label', 'Imagem anterior');
                next.setAttribute('aria-label', 'Próxima imagem');
                carousel.append(prev, next);
            } else {
                prev.classList.add('btn-carousel');
                next.classList.add('btn-carousel');
            }

            const showImage = index => {
                images[current].classList.remove('active');
                current = (index + images.length) % images.length;
                images[current].classList.add('active');
            };

            prev.addEventListener('click', () => showImage(current - 1));
            next.addEventListener('click', () => showImage(current + 1));
        }
    });
}

// ============================================================
// LIGHTBOX — com armadilha de foco e tecla Escape
// ============================================================

function initImageLightbox() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        carousel.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                const activeImage = carousel.querySelector('img.active');
                if (activeImage) {
                    openImageModal(activeImage.src, activeImage.alt, e.target);
                }
            }
        });
    });

    document.querySelectorAll('.produto-card img:not(.carousel img), .card img:not(.carousel img)').forEach(image => {
        image.addEventListener('click', () => openImageModal(image.src, image.alt, image));
    });
}

function openImageModal(src, alt, triggerElement) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', alt || 'Imagem ampliada');
    modal.tabIndex = -1;

    const modalImage = document.createElement('img');
    modalImage.src = src;
    modalImage.alt = alt || 'Imagem ampliada';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-modal';
    closeButton.type = 'button';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Fechar visualização de imagem');

    const close = () => {
        modal.remove();
        document.removeEventListener('keydown', handleKey);
        if (triggerElement) triggerElement.focus();
    };

    const handleKey = (e) => {
        if (e.key === 'Escape') { close(); return; }
        if (e.key === 'Tab') { e.preventDefault(); closeButton.focus(); }
    };

    closeButton.addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', handleKey);

    modal.append(modalImage, closeButton);
    document.body.appendChild(modal);
    closeButton.focus();
}

// ============================================================
// MENU MOBILE
// ============================================================

function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-navigation');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', event => {
        if (!nav.contains(event.target) && !toggle.contains(event.target)) {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ============================================================
// ATUALIZAR LINKS DE CONTATO
// ============================================================

function updateContactLinks() {
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        const url = new URL(link.href);
        const currentText = url.searchParams.get('text') || '';
        const message = currentText || 'Olá, gostaria de mais informações!';
        link.href = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    });

    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.href = `mailto:${CONTACT_INFO.email}`;
    });

    // Atualiza todos os links do Instagram (não apenas o primeiro)
    document.querySelectorAll('a[href*="instagram"]').forEach(link => {
        link.href = CONTACT_INFO.instagram;
    });

    const contactForm = document.querySelector('form[action*="formsubmit"]');
    if (contactForm) {
        contactForm.action = `https://formsubmit.co/${CONTACT_INFO.email}`;
    }
}

// ============================================================
// BUSCA DE PRODUTOS
// ============================================================

// Coleta todos os cards de produto da página, independente da seção
function extractProductsFromPage() {
    return Array.from(document.querySelectorAll('.produto-card, .card'))
        .map(card => {
            const title = card.querySelector('h3')?.textContent?.trim();
            return title ? { name: title, element: card } : null;
        })
        .filter(Boolean);
}

function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    const suggestionsList = document.getElementById('search-suggestions');

    if (!searchInput || !searchForm) return;

    const allProducts = extractProductsFromPage();

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        searchInput.value = decodeURIComponent(searchQuery);
        if (allProducts.length > 0) {
            filterAndDisplayProducts(searchQuery);
        }
    }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (query.length === 0) {
            if (suggestionsList) suggestionsList.classList.remove('active');
            showAllProducts();
            return;
        }

        if (allProducts.length === 0) {
            if (suggestionsList) suggestionsList.classList.remove('active');
            return;
        }

        const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        if (filtered.length > 0) {
            if (suggestionsList) displaySuggestions(filtered, suggestionsList, query);
            filterAndDisplayProducts(query);
        } else {
            if (suggestionsList) displayNoResults(suggestionsList, query);
        }
    });

    document.addEventListener('click', (e) => {
        if (suggestionsList && !e.target.closest('.search-container')) {
            suggestionsList.classList.remove('active');
        }
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();

        if (!query) {
            showSearchError('Digite o nome do produto que deseja buscar.');
            return;
        }

        if (window.location.pathname.includes('products.html')) {
            filterAndDisplayProducts(query);
            return;
        }

        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    });
}

function showSearchError(message) {
    const input = document.getElementById('search-input');
    if (!input) return;

    let errorEl = document.getElementById('search-error');
    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.id = 'search-error';
        errorEl.setAttribute('role', 'alert');
        errorEl.className = 'search-error-msg';
        input.closest('form, .search-container')?.insertAdjacentElement('afterend', errorEl)
            ?? input.parentNode.insertAdjacentElement('afterend', errorEl);
    }
    errorEl.textContent = message;
    setTimeout(() => { if (errorEl.parentNode) errorEl.remove(); }, 4000);
}

function displayNoResults(container, query) {
    container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding: 20px; text-align: center;';

    const p1 = document.createElement('p');
    p1.style.cssText = 'margin-bottom: 8px; font-weight: 500;';
    p1.textContent = 'Nenhum produto encontrado';

    const p2 = document.createElement('p');
    p2.style.cssText = 'font-size: 0.85rem; opacity: 0.7;';
    p2.textContent = `"${query}" não corresponde a nenhum produto`;

    wrapper.append(p1, p2);
    container.appendChild(wrapper);
    container.classList.add('active');
}

function displaySuggestions(products, container, query) {
    container.innerHTML = '';

    products.slice(0, 6).forEach(product => {
        const item = document.createElement('div');
        item.className = 'search-suggestion-item';
        item.appendChild(highlightMatch(product.name, query));

        item.addEventListener('click', () => {
            document.getElementById('search-input').value = product.name;
            container.classList.remove('active');

            if (product.element) {
                product.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                product.element.classList.add('highlight');
                setTimeout(() => product.element.classList.remove('highlight'), 2000);
            }
        });

        container.appendChild(item);
    });

    if (products.length > 6) {
        const moreItem = document.createElement('div');
        moreItem.className = 'search-suggestion-item';
        moreItem.style.cssText = 'text-align: center; font-style: italic; color: var(--cinza);';
        moreItem.textContent = `+${products.length - 6} resultado(s)`;
        container.appendChild(moreItem);
    }

    container.classList.add('active');
}

function filterAndDisplayProducts(query) {
    document.querySelectorAll('.card').forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        card.style.display = title.includes(query.toLowerCase()) ? 'block' : 'none';
    });
}

function showAllProducts() {
    document.querySelectorAll('.card').forEach(card => {
        card.style.display = 'block';
    });
}
