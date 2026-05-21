/**
 * App - Controlador Central do Portal Procópio
 * Inicializa todos os módulos na carga da página (DOMContentLoaded)
 */

import { initHeaderEffects, initScrollReveals } from './modules/animations.js';
import { initStoreClock } from './modules/clock.js';
import { initCatalogRenderer } from './modules/render.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa o relógio dinâmico de status das lojas físicas
    initStoreClock();

    // 2. Inicializa o renderizador de vitrines dinâmicas (catalog.json)
    initCatalogRenderer();

    // 3. Inicializa efeitos visuais de rolagem (header fixo com blur) e menu responsivo
    initHeaderEffects();

    // 4. Inicializa observadores de scroll (reveal fade-in)
    initScrollReveals();

    console.log("Portal Híbrido Procópio inicializado com sucesso [UX Premium & Ofuscação de Contatos Ativos].");
});
