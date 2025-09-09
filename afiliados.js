// ==========================================================
// --- SCRIPT DEFINITIVO PARA A PÁGINA DE AFILIADOS (VERSÃO 33.0) ---
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- ORQUESTRADOR PRINCIPAL DA PÁGINA DE AFILIADOS ---
    function initAfiliadosPage() {
        const afiliadosPageIdentifier = document.querySelector('.afiliados-page');
        if (!afiliadosPageIdentifier) return;

        gsap.registerPlugin(ScrollTrigger);
        
        initHorizontalScroll();
        initCountUpAnimations();
        initStaggeredReveals();
        initFunnelBlueprint();
        initRewardTrailAnimation();
    }

    // --- MÓDULO 1: SCROLL HORIZONTAL (VERSÃO CORRIGIDA E ROBUSTA) ---
    function initHorizontalScroll() {
        const secaoComando = document.getElementById('comando-section');
        if (!secaoComando) return;

        const track = secaoComando.querySelector('.comando-track');
        const cards = gsap.utils.toArray(secaoComando.querySelectorAll('.dossier-card'));
        if (!track || cards.length === 0) return;
        
        // Lógica de scroll horizontal que funciona em TODAS as telas
        gsap.to(track, {
            // Move o track horizontalmente pela sua largura de scroll menos a largura da tela
            x: () => -(track.scrollWidth - document.documentElement.clientWidth),
            ease: "none",
            scrollTrigger: {
                trigger: secaoComando,
                pin: true,
                scrub: 1,
                end: () => "+=" + track.scrollWidth, // A duração do pin é a largura total do track
            }
        });
    }

    // --- MÓDULO 2: ANIMAÇÃO DE CONTAGEM DE NÚMEROS ---
    function initCountUpAnimations() {
        const counters = document.querySelectorAll('[data-count-up]');
        counters.forEach(counter => {
            const endValue = parseFloat(counter.dataset.countUp);
            if (isNaN(endValue)) return;
            gsap.fromTo(counter, 
                { textContent: "R$ 0,00" },
                {
                    textContent: endValue,
                    duration: 2.5,
                    ease: 'power3.out',
                    snap: { textContent: 0.01 },
                    scrollTrigger: {
                        trigger: counter,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    onUpdate: function() {
                        const value = parseFloat(this.targets()[0].textContent);
                        this.targets()[0].textContent = `R$ ${value.toFixed(2).replace('.', ',')}`;
                    }
                }
            );
        });
    }

    // --- MÓDULO 3: ANIMAÇÃO DE ENTRADA DAS SEÇÕES ---
    function initStaggeredReveals() {
        const sectionsToAnimate = ['.regras-card', '.trilha-item'];
        sectionsToAnimate.forEach(selector => {
            const elements = gsap.utils.toArray(selector);
            if (elements.length === 0) return;
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: elements[0].parentElement,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.2
            });
        });
    }
    
    // --- MÓDULO 4: ANIMAÇÃO DA TRILHA DA RECOMPENSA ---
    function initRewardTrailAnimation() {
        const container = document.getElementById('trilha-container');
        const icon = document.getElementById('trilha-icon-animado');
        if (!container || !icon) return;
        gsap.to(icon, {
            scrollTrigger: {
                trigger: container,
                start: "top center",
                end: "bottom center",
                scrub: 1.5,
            },
            y: container.offsetHeight - icon.offsetHeight,
            ease: "none"
        });
    
    // ==========================================================
// --- MÓDULO: SALA DE GUERRA DO AFILIADO (VERSÃO FINAL E COMPLETA) ---
// ==========================================================
function initFunnelBlueprint() {
    // --- 1. SELEÇÃO DE ELEMENTOS ---
    const section = document.getElementById('funnel-blueprint-section');
    if (!section) return; // Guarda de segurança principal

    const svgContainer = section.querySelector('.blueprint-svg-container');
    const menu = section.querySelector('.product-menu-scrollable');
    const modal = document.getElementById('dossier-modal');
    
    // Guarda de segurança para os elementos internos
    if (!svgContainer || !menu || !modal) return;

    const modalContent = document.getElementById('dossier-details');
    const closeModalBtn = modal.querySelector('.dossier-close-btn');
    const backdrop = modal.querySelector('.dossier-modal-backdrop');

    // --- 2. BASE DE DADOS DOS DOSSIÊS (com a adição do Oráculo) ---
    const dossierData = {
        primordial: {
            title: "Dossiê: O Primordial (Produto Principal)",
            content: `<p><strong>Como Funciona:</strong> O ponto de entrada. Um sistema de 4 módulos que desinstala a programação social defeituosa e recalibra o instinto masculino.</p>
                      <p><strong>Base Científica:</strong> Neuroplasticidade, Psicologia Evolutiva e Cognição Incorporada. Ataca a raiz do problema (o software mental), não os sintomas.</p>
                      <p><strong>Estratégia no Funil:</strong> A oferta principal. Qualifica apenas os homens mais comprometidos, criando um cliente de altíssimo valor que está pronto para a próxima etapa.</p>
                      <p><strong>Objetivo para o Cliente:</strong> Quebrar a inércia, destruir a persona do "bom moço" e construir a fundação da confiança inabalável.</p>`
        },
        bump: {
            title: "Dossiê: Order Bump (Aceleração Imediata)",
            content: `<p><strong>Como Funciona:</strong> Um protocolo de ação rápida oferecido no checkout para gerar uma vitória instantânea.</p>
                      <p><strong>Base Científica:</strong> Princípio do Compromisso e Consistência. Uma pequena primeira vitória (o "sim" ao bump) aumenta drasticamente a probabilidade de o cliente se manter engajado no processo principal.</p>
                      <p><strong>Estratégia no Funil:</strong> Aumenta o Valor Médio do Carrinho (AOV) sem adicionar fricção à compra principal.</p>
                      <p><strong>Objetivo para o Cliente:</strong> Uma ferramenta de aplicação imediata que gera um resultado tangível nas primeiras 24 horas.</p>`
        },
        upsell: {
            title: "Dossiê: Upsell (Protocolo de Ativação)",
            content: `<p><strong>Como Funciona:</strong> Um programa intensivo de 30 dias com acompanhamento para mestria avançada.</p>
            <p><strong>Base Científica:</strong> Imersão Focada e Feedback Contínuo, os dois aceleradores de aprendizado mais potentes.</p>
            <p><strong>Estratégia no Funil:</strong> Oferta de alto valor para os clientes mais engajados, maximizando o Lucro Por Cliente (LTV).</p>
            <p><strong>Objetivo para o Cliente:</strong> Transformar o conhecimento em habilidade de forma acelerada, sob orientação direta.</p>`
        },
        downsell: {
            title: "Dossiê: Downsell (Arsenal de Conversa)",
            content: `<p><strong>Como Funciona:</strong> Um manual de bolso digital com 30 frameworks de conversa.</p>
            <p><strong>Base Científica:</strong> Heurísticas e Modelos Mentais. Oferece "atalhos" cognitivos para momentos de alta pressão, como a abordagem inicial.</p>
            <p><strong>Estratégia no Funil:</strong> Recupera parte da receita de clientes que recusam o Upsell. Garante que mesmo aqueles que não estão prontos para a imersão total saiam com uma ferramenta valiosa, mantendo uma percepção positiva da marca.</p>
            <p><strong>Objetivo para o Cliente:</strong> O "kit de primeiros socorros" para aniquilar a paralisia na conversa.</p>`
        },
        // NOVO DOSSIÊ PARA O ORÁCULO
        oraculo: {
            title: "Dossiê: O Oráculo (Lançamento Futuro)",
            content: `<p><strong>Status:</strong> Em desenvolvimento.</p>
                      <p><strong>Como Funciona:</strong> Um Agente de IA treinado com a filosofia Amanteus, servindo como um mentor 24/7 no bolso do cliente para calibragem de interações em tempo real.</p>
                      <p><strong>Estratégia no Funil:</strong> Será o nosso principal produto de assinatura (MRR), criando uma fonte de receita recorrente e de longo prazo para nossos parceiros.</p>
                      <p><strong>Objetivo para o Cliente:</strong> A aniquilação do delay entre o conhecimento e a dominação, com feedback instantâneo e socrático.</p>`
        }
    };
    
    // --- 3. LÓGICA DA ANIMAÇÃO DO FLUXOGRAMA (GSAP) ---
    // Injeta o SVG dinamicamente
    svgContainer.innerHTML = `
        <svg id="funnel-svg" viewBox="0 0 900 250" preserveAspectRatio="xMidYMid meet">
            <g class="node" id="node-primordial"><rect x="20" y="100" width="160" height="50" rx="5"/><text x="100" y="130">O Primordial</text></g>
            <g class="node" id="node-bump"><rect x="220" y="100" width="160" height="50" rx="5"/><text x="300" y="130">Order Bump</text></g>
            <g class="node" id="node-upsell"><rect x="420" y="30" width="160" height="50" rx="5"/><text x="500" y="60">Upsell</text></g>
            <g class="node" id="node-downsell"><rect x="420" y="170" width="160" height="50" rx="5"/><text x="500" y="200">Downsell</text></g>
            <g class="node" id="node-final"><rect x="620" y="100" width="160" height="50" rx="5"/><text x="700" y="130">Alcateia</text></g>
            <path class="path" id="path-1" d="M 180 125 H 220"/>
            <path class="path" id="path-2" d="M 380 125 C 400 125, 400 55, 420 55"/>
            <path class="path" id="path-3" d="M 580 55 C 600 55, 600 125, 620 125"/>
            <path class="path" id="path-4" d="M 500 80 V 170"/>
        </svg>`;
        
    const paths = gsap.utils.toArray("#funnel-svg .path");
    paths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom 80%",
            scrub: 1.5,
        }
    });

    tl
        .to("#node-primordial", { opacity: 1, duration: 1 })
        .to("#path-1", { strokeDashoffset: 0, duration: 2 })
        .to("#node-bump", { opacity: 1, duration: 1 })
        .to("#path-2", { strokeDashoffset: 0, duration: 2 })
        .to("#node-upsell", { opacity: 1, duration: 1 })
        .to("#path-4", { strokeDashoffset: 0, duration: 2 }, "<")
        .to("#node-downsell", { opacity: 1, duration: 1 })
        .to("#path-3", { strokeDashoffset: 0, duration: 2 })
        .to("#node-final", { opacity: 1, duration: 1 });
    
    // --- 4. LÓGICA DO MODAL (POP-UP) ---
    const openModal = (dossierId) => {
        const data = dossierData[dossierId];
        if (!data || !modalContent) return;
        modalContent.innerHTML = `<h4>${data.title}</h4>${data.content}`;
        modal.classList.add('visible');
    };
    const closeModal = () => {
        if (modal) modal.classList.remove('visible');
    };

    menu.addEventListener('click', e => {
        if (e.target.matches('.product-menu-button')) {
            openModal(e.target.dataset.dossier);
        }
    });
    if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if(backdrop) backdrop.addEventListener('click', closeModal);
}

    // --- INICIALIZAÇÃO DE TODOS OS MÓDULOS ---
    initHorizontalScroll();
    initFunnelBlueprint();
    initCountUpAnimations();
    initStaggeredReveals();
});
