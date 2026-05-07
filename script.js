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
});

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


function initImageLightbox() {
    // Para carrosséis, adicionar listener ao container para pegar a imagem ativa
    document.querySelectorAll('.carousel').forEach(carousel => {
        carousel.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                const activeImage = carousel.querySelector('img.active');
                if (activeImage) {
                    openImageModal(activeImage.src, activeImage.alt);
                }
            }
        });
    });

    // Para imagens simples (sem carrossel)
    document.querySelectorAll('.produto-card img:not(.carousel img), .card img:not(.carousel img)').forEach(image => {
        image.addEventListener('click', () => openImageModal(image.src, image.alt));
    });
}

function openImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.tabIndex = -1;

    const modalImage = document.createElement('img');
    modalImage.src = src;
    modalImage.alt = alt || 'Imagem ampliada';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-modal';
    closeButton.type = 'button';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Fechar visualização de imagem');
    closeButton.addEventListener('click', () => closeModal(modal));

    modal.addEventListener('click', event => {
        if (event.target === modal) closeModal(modal);
    });

    modal.append(modalImage, closeButton);
    document.body.appendChild(modal);
    closeButton.focus();
}

function closeModal(modal) {
    modal.remove();
}

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

    // Fechar menu ao clicar em um link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function updateContactLinks() {
    // Atualizar todos os links de WhatsApp (mantendo o texto do produto se existir)
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        const url = new URL(link.href);
        const currentText = url.searchParams.get('text') || '';

        // Se já tem um texto (de produto), mantém. Caso contrário, usa genérico
        let message = currentText || 'Olá, gostaria de mais informações!';

        link.href = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    });

    // Atualizar todos os links de email
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.href = `mailto:${CONTACT_INFO.email}`;
    });

    // Atualizar links do Instagram e YouTube no rodapé se necessário
    const instaLink = document.querySelector('a[href*="instagram"]');
    if (instaLink) {
        instaLink.href = CONTACT_INFO.instagram;
    }

    // Atualizar formulário de contato
    const contactForm = document.querySelector('form[action*="formsubmit"]');
    if (contactForm) {
        contactForm.action = `https://formsubmit.co/${CONTACT_INFO.email}`;
    }
}

function extractProductsFromPage() {
    const productsSection = document.querySelector('#produtos');
    if (!productsSection) return [];

    return Array.from(productsSection.querySelectorAll('.card'))
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

    // Extrair todos os produtos da página (se estiver em products.html)
    const allProducts = extractProductsFromPage();

    // Pré-preencher busca se vier de query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        searchInput.value = decodeURIComponent(searchQuery);
        if (allProducts.length > 0) {
            filterAndDisplayProducts(searchQuery);
        }
    }

    // Busca em tempo real
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (query.length === 0) {
            suggestionsList.classList.remove('active');
            showAllProducts();
            return;
        }

        if (allProducts.length === 0) {
            // Se não tem produtos na página (não está em products.html)
            suggestionsList.classList.remove('active');
            return;
        }

        // Filtrar produtos
        const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        // Mostrar sugestões
        if (filtered.length > 0) {
            displaySuggestions(filtered, suggestionsList, query);
            filterAndDisplayProducts(query);
        } else {
            // Nenhum resultado encontrado
            displayNoResults(suggestionsList, query);
        }
    });

    // Fechar sugestões ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            suggestionsList.classList.remove('active');
        }
    });

    // Submit do formulário
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();

        if (!query) {
            alert('Por favor, digite o nome do produto que deseja buscar.');
            return;
        }

        // Se já está em products.html
        if (window.location.pathname.includes('products.html')) {
            // Apenas filtra
            filterAndDisplayProducts(query);
            return;
        }

        // Se está em outra página, verifica se tem produtos antes de redirecionar
        const checkProducts = extractProductsFromPage();
        if (checkProducts.length === 0) {
            // Redireciona para products
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
    });
}

function displayNoResults(container, query) {
    container.innerHTML = '';

    const noResult = document.createElement('div');
    noResult.className = 'search-no-results';
    noResult.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <p style="margin-bottom: 8px; font-weight: 500;">Nenhum produto encontrado</p>
            <p style="font-size: 0.85rem; opacity: 0.7;">"${query}" não corresponde a nenhum produto</p>
        </div>
    `;

    container.appendChild(noResult);
    container.classList.add('active');
}

function displaySuggestions(products, container, query) {
    container.innerHTML = '';

    // Mostrar até 6 sugestões
    products.slice(0, 6).forEach(product => {
        const item = document.createElement('div');
        item.className = 'search-suggestion-item';

        // Destacar o termo buscado no nome do produto
        const regex = new RegExp(`(${query})`, 'gi');
        const highlightedName = product.name.replace(regex, '<strong style="color: var(--rosa);">$1</strong>');

        item.innerHTML = highlightedName;

        item.addEventListener('click', () => {
            document.getElementById('search-input').value = product.name;
            container.classList.remove('active');

            // Rolar até o produto
            if (product.element) {
                product.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                product.element.classList.add('highlight');
                setTimeout(() => {
                    product.element.classList.remove('highlight');
                }, 2000);
            }
        });

        container.appendChild(item);
    });

    if (products.length > 6) {
        const moreItem = document.createElement('div');
        moreItem.className = 'search-suggestion-item';
        moreItem.style.textAlign = 'center';
        moreItem.style.fontStyle = 'italic';
        moreItem.style.color = 'var(--cinza)';
        moreItem.textContent = `+${products.length - 6} resultado(s)`;
        container.appendChild(moreItem);
    }

    container.classList.add('active');
}

function filterAndDisplayProducts(query) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        if (title.includes(query.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function showAllProducts() {
    document.querySelectorAll('.card').forEach(card => {
        card.style.display = 'block';
    });
}
