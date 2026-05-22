/**
 * Módulo de Horários de Funcionamento Inteligente
 * Calcula e exibe se as lojas físicas estão abertas em tempo real,
 * travando a lógica no timezone de Brasília (America/Sao_Paulo) para evitar erros
 * com turistas vindos de outros fusos horários.
 */

export function initStoreClock() {
    const storeStatusBadge = document.getElementById('store-status-badge');
    const shoesStatusBadge = document.getElementById('shoes-status-badge');
    const footerStoreBadge = document.getElementById('footer-store-badge');
    const footerShoesBadge = document.getElementById('footer-shoes-badge');

    function updateBadges() {
        try {
            // Configurações de Fuso Horário
            const optionsTime = { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', hour12: false };
            const optionsDay = { timeZone: 'America/Sao_Paulo', weekday: 'long' };

            const now = new Date();
            const timeString = now.toLocaleTimeString('pt-BR', optionsTime);
            const dayString = now.toLocaleDateString('pt-BR', optionsDay).toLowerCase();

            const [hours, minutes] = timeString.split(':').map(Number);
            const currentMinutes = (hours * 60) + minutes;

            // Domingo fechado para ambas as lojas
            const isSunday = dayString.includes('domingo');

            // --- Lógica Procópio Store (Roupas) ---
            // Aberto das 09:00 às 23:00 (Segunda a Sábado)
            const storeOpenMin = 9 * 60;   // 09:00
            const storeCloseMin = 23 * 60; // 23:00
            const isStoreOpen = !isSunday && (currentMinutes >= storeOpenMin && currentMinutes < storeCloseMin);

            applyStatus(storeStatusBadge, isStoreOpen, "Até 23h");
            applyStatus(footerStoreBadge, isStoreOpen, "Até 23h");

            // --- Lógica Procópio Shoes (Sapatos) ---
            // Aberto das 09:00 às 19:30 (Segunda a Sábado)
            const shoesOpenMin = 9 * 60;     // 09:00
            const shoesCloseMin = 19.5 * 60; // 19:30 (19h30)
            const isShoesOpen = !isSunday && (currentMinutes >= shoesOpenMin && currentMinutes < shoesCloseMin);

            applyStatus(shoesStatusBadge, isShoesOpen, "Até 19h30");
            applyStatus(footerShoesBadge, isShoesOpen, "Até 19h30");

        } catch (error) {
            console.error("Erro ao calcular status de funcionamento:", error);
        }
    }

    /**
     * Aplica visualmente o status da loja no elemento HTML
     * @param {HTMLElement} badgeElement 
     * @param {boolean} isOpen 
     * @param {string} closeTimeLabel 
     */
    function applyStatus(badgeElement, isOpen, closeTimeLabel) {
        if (!badgeElement) return;

        if (isOpen) {
            badgeElement.className = "status-badge open";
            badgeElement.innerHTML = `<span class="status-dot"></span> Aberta agora • ${closeTimeLabel}`;
        } else {
            badgeElement.className = "status-badge closed";
            badgeElement.innerHTML = `<span class="status-dot"></span> Fechada no momento`;
        }
    }

    // Inicialização imediata e agendamento de atualização periódica a cada 30 segundos
    updateBadges();
    setInterval(updateBadges, 30000);
}
