/**
 * Render V2 — A Procópio
 * Motor data-driven atualizado para a nova estrutura de componentes premium
 */

import { buildSecureWhatsAppLink } from '../security.js';
import { initScrollReveals } from './animations.js';

let catalog = null;

export async function initCatalogRenderer() {
    const grid = document.getElementById('lookbook-grid');
    const tabs = document.querySelectorAll('.tab-btn');
    if (!grid) return;

    try {
        const res = await fetch('./data/catalog.json');
        if (!res.ok) throw new Error('Catálogo indisponível');
        catalog = await res.json();

        // Ativa primeira aba
        render('Feminino');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Fade out → troca → fade in
                grid.classList.add('fading');
                setTimeout(() => {
                    render(tab.dataset.filter);
                    grid.classList.remove('fading');
                }, 200);
            });
        });
    } catch (err) {
        console.error(err);
        grid.innerHTML = `<p class="grid-empty">Vitrine temporariamente indisponível.<br>Visite nossas lojas físicas!</p>`;
    }
}

function render(filter) {
    const grid = document.getElementById('lookbook-grid');
    if (!grid || !catalog) return;

    const all = [
        ...catalog.procobio_store.map(p => ({ ...p, storeType: 'store' })),
        ...catalog.procopio_shoes.map(p => ({ ...p, storeType: 'shoes' }))
    ];

    const filtered = filter === 'Todos'
        ? all
        : all.filter(p => p.categoria.toLowerCase() === filter.toLowerCase());

    if (!filtered.length) {
        grid.innerHTML = `<p class="grid-empty">Nenhum produto nesta categoria no momento.</p>`;
        return;
    }

    grid.innerHTML = '';

    filtered.forEach(product => {
        const msg = `Olá! Vi o produto "${product.nome}" no site da Procópio e gostaria de verificar disponibilidade e tamanhos. 🙏`;
        const wppUrl = buildSecureWhatsAppLink(product.storeType, msg);
        const badgeHtml = product.destaque ? `<span class="product-badge">Destaque</span>` : '';

        const card = document.createElement('div');
        card.className = 'product-card reveal';

        card.innerHTML = `
            <div class="product-img-wrap">
                ${badgeHtml}
                <img class="product-img"
                     src="${product.imagemUrl}"
                     alt="${product.nome} — ${product.marca}"
                     loading="lazy">
                <div class="product-action-overlay">
                    <p style="color:rgba(240,237,232,0.65);font-size:0.8rem;letter-spacing:0.1em;text-align:center;max-width:200px;">${product.nome}</p>
                    <a href="${wppUrl}" target="_blank" rel="noopener noreferrer"
                       class="btn btn-gold wpp-secure-btn"
                       style="font-size:0.65rem;padding:0.85rem 1.6rem;">
                        <i class="fab fa-whatsapp"></i> Reservar Peça
                    </a>
                </div>
            </div>
            <div class="product-info">
                <span class="product-brand">${product.marca}</span>
                <h4 class="product-name">${product.nome}</h4>
                <span class="product-tag">${product.tag}</span>
            </div>
        `;
        grid.appendChild(card);
    });

    // Re-observa os novos cards para animar
    initScrollReveals();
}
