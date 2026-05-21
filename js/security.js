/**
 * Módulo de Segurança e Ofuscação de Dados Sensíveis
 * Impede que scrapers coletem os telefones das lojas diretamente no código HTML bruto.
 */

// Partes dos números de telefone de Bombinhas (ofuscados em pedaços separados)
const secureConfig = {
    store: {
        country: "55",
        area: "48",
        prefix: "99802",
        suffix: "3745"
    },
    shoes: {
        country: "55",
        area: "47",
        prefix: "99111",
        suffix: "9255"
    }
};

/**
 * Cria dinamicamente o link seguro do WhatsApp
 * @param {string} type - Tipo de loja ('store' ou 'shoes')
 * @param {string} message - Mensagem personalizada pré-definida
 * @returns {string} - Link pronto para redirecionamento seguro
 */
export function buildSecureWhatsAppLink(type, message = "") {
    const data = secureConfig[type];
    if (!data) return "#";
    
    // Concatena o número em tempo de execução
    const phoneNumber = `${data.country}${data.area}${data.prefix}${data.suffix}`;
    const encodedMessage = encodeURIComponent(message);
    
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Registra o redirecionamento de clique seguro nos botões de conversão
 * @param {HTMLElement} element - O elemento do botão
 * @param {string} type - Tipo de loja ('store' ou 'shoes')
 * @param {string} message - Mensagem personalizada
 */
export function setupSecureClick(element, type, message) {
    if (!element) return;
    
    element.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Constrói o link apenas no clique do usuário real
        const targetUrl = buildSecureWhatsAppLink(type, message);
        
        // Abre em aba segura e previne roubo de contexto (tabnabbing)
        const newWindow = window.open(targetUrl, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    });
}
