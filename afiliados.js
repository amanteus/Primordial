// ==========================================================
// --- SCRIPT DEDICADO PARA A PÁGINA DE AFILIADOS ---
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Guarda de segurança: só executa se estivermos na página de afiliados
    const comandoSection = document.getElementById('comando-section');
    if (!comandoSection) return;

    // Registra o plugin ScrollTrigger do GSAP
    gsap.registerPlugin(ScrollTrigger);

// ==========================================================
// --- MÓDULO 1: LÓGICA CONDICIONAL (VERSÃO FINAL E ROBUSTA) ---
// ==========================================================

function initComandoSection() {
    gsap.matchMedia().add({
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)"
    }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
            // --- CÓDIGO DO SCROLL HORIZONTAL PARA DESKTOP (CORRIGIDO E ROBUSTO) ---
            const secaoComando = document.querySelector('.secao-comando');
            const track = document.querySelector('.comando-track');
            const pinWrapper = document.querySelector('.comando-desktop-wrapper');
            if (!secaoComando || !track || !pinWrapper) return;

            // Damos um pequeno tempo para o navegador renderizar tudo antes de calcular
            setTimeout(() => {
                // CORREÇÃO 1: O cálculo da distância agora usa o container como referência, mais estável.
                const scrollDistance = track.scrollWidth - pinWrapper.offsetWidth;

                gsap.to(track, {
                    x: -scrollDistance,
                    ease: "none",
                    scrollTrigger: {
                        trigger: secaoComando,
                        pin: pinWrapper,
                        scrub: 1,
                        start: "top top",
                        end: () => `+=${scrollDistance}`,
                        invalidateOnRefresh: true,
                    }
                });

                // CORREÇÃO 2: Forçamos o ScrollTrigger a recalcular tudo, garantindo as medidas corretas.
                ScrollTrigger.refresh();
            }, 100); // 100ms é um delay seguro.

        }

        } else if (isMobile) {
            const desktopCards = document.querySelectorAll('.comando-track .dossier-card');
            const accordionContainer = document.querySelector('.accordion-mobile-container');
            if (!desktopCards.length || !accordionContainer) return;

            accordionContainer.innerHTML = '';

            desktopCards.forEach((card) => {
                const titleText = card.querySelector('h4').textContent;
                const numberText = card.querySelector('.dossier-number').textContent;

                // --- LÓGICA DE EXTRAÇÃO DE CONTEÚDO (A MUDANÇA ESTÁ AQUI) ---
                const cardClone = card.cloneNode(true); // 1. Clona o card em memória
                const bigNumber = cardClone.querySelector('.dossier-number'); // 2. Encontra o número no clone
                if (bigNumber) {
                    bigNumber.remove(); // 3. Remove o número do clone
                }
                // 4. Pega o HTML limpo, já sem o número gigante
                const contentHTML = cardClone.innerHTML; 

                const item = document.createElement('div');
                item.className = 'accordion-item';

                item.innerHTML = `
                    <button class="accordion-button">
                        <span>${numberText}</span>
                        <h4>${titleText}</h4>
                        <span class="accordion-icon"></span>
                    </button>
                    <div class="accordion-content">
                        <div class="accordion-content-inner">
                            ${contentHTML}
                        </div>
                    </div>
                `;
                accordionContainer.appendChild(item);
            });
            
            const accordionItems = accordionContainer.querySelectorAll('.accordion-item');
            if (accordionItems.length > 0) {
                accordionItems[0].classList.add('active');
            }

            accordionItems.forEach(item => {
                const button = item.querySelector('.accordion-button');
                button.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    accordionItems.forEach(otherItem => otherItem.classList.remove('active'));
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            });
        }
    });
}
    
    // ==========================================================
    // --- MÓDULO 2: ANIMAÇÃO DE CONTAGEM DE NÚMEROS ---
    // ==========================================================
function initCountUpAnimations() {
    const counters = document.querySelectorAll('[data-count-up]');

    counters.forEach(counter => {
        const endValue = parseFloat(counter.dataset.countUp);
        if (isNaN(endValue)) return;

        // Detecta se deve formatar como moeda
        const isCurrency = counter.dataset.currency === "true";

        gsap.fromTo(counter,
            { textContent: 0 },
            {
                textContent: endValue,
                duration: 2.5,
                ease: "power3.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                onUpdate: function() {
                    const value = parseFloat(this.targets()[0].textContent);
                    counter.textContent = isCurrency
                        ? `R$ ${value.toFixed(2).replace('.', ',')}`
                        : value.toLocaleString("pt-BR");
                }
            }
        );
    });
}


    // ==========================================================
    // --- MÓDULO 3: ANIMAÇÃO DE ENTRADA (STAGGERED REVEALS) ---
    // ==========================================================
    function initStaggeredReveals() {
        const sectionsToAnimate = ['.regras-card', '.recompensa-card'];
        sectionsToAnimate.forEach(selector => {
            const elements = gsap.utils.toArray(selector);
            if (elements.length === 0) return;

            gsap.from(elements, {
                scrollTrigger: {
                    trigger: elements[0].parentElement,
                    start: 'top 80%',
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

    // ==========================================================
    // --- MÓDULO 4: SALA DE GUERRA (FUNIL + MODAL) ---
    // ==========================================================
    function initFunnelBlueprint() {
        const section = document.getElementById('funnel-blueprint-section');
        if (!section) return;

        const svgContainer = section.querySelector('.blueprint-svg-container');
        const menu = section.querySelector('.product-menu-scrollable');
        const modal = document.getElementById('dossier-modal');
        const modalContent = document.getElementById('dossier-details');
        const closeModalBtn = modal?.querySelector('.dossier-close-btn');
        const backdrop = modal?.querySelector('.dossier-modal-backdrop');

        if (!svgContainer || !menu || !modal || !modalContent) return;

         // --- 2. BASE DE DADOS DOS DOSSIÊS (com a adição do Oráculo) ---
    const dossierData = {
        primordial: {
            title: "O Primordial",
            content: `<p><strong>Como Funciona:</strong> O ponto de entrada. Um sistema de 4 módulos que desinstala a programação social defeituosa e recalibra o instinto masculino.</p>
                      <p><strong>Base Científica:</strong> Neuroplasticidade, Psicologia Evolutiva e Cognição Incorporada. Ataca a raiz do problema (o software mental), não os sintomas.</p>
                      <p><strong>Estratégia no Funil:</strong> A oferta principal. Qualifica apenas os homens mais comprometidos, criando um cliente de altíssimo valor que está pronto para a próxima etapa.</p>
                      <p><strong>Objetivo para o Cliente:</strong> Quebrar a inércia, destruir a persona do "bom moço" e construir a fundação da confiança inabalável.</p>`
        },
        bump: {
            title: "Order Bump",
            content: `<p><strong>Como Funciona:</strong> Um protocolo de ação rápida oferecido no checkout para gerar uma vitória instantânea.</p>
                      <p><strong>Base Científica:</strong> Princípio do Compromisso e Consistência. Uma pequena primeira vitória (o "sim" ao bump) aumenta drasticamente a probabilidade de o cliente se manter engajado no processo principal.</p>
                      <p><strong>Estratégia no Funil:</strong> Aumenta o Valor Médio do Carrinho (AOV) sem adicionar fricção à compra principal.</p>
                      <p><strong>Objetivo para o Cliente:</strong> Uma ferramenta de aplicação imediata que gera um resultado tangível nas primeiras 24 horas.</p>`
        },
        upsell: {
            title: "Upsell - Protocolo de Ativação",
            content: `<p><strong>Como Funciona:</strong> Um programa intensivo de 30 dias com acompanhamento para mestria avançada.</p>
            <p><strong>Base Científica:</strong> Imersão Focada e Feedback Contínuo, os dois aceleradores de aprendizado mais potentes.</p>
            <p><strong>Estratégia no Funil:</strong> Oferta de alto valor para os clientes mais engajados, maximizando o Lucro Por Cliente (LTV).</p>
            <p><strong>Objetivo para o Cliente:</strong> Transformar o conhecimento em habilidade de forma acelerada, sob orientação direta.</p>`
        },
        downsell: {
            title: "Downsell - Arsenal de Conversa",
            content: `<p><strong>Como Funciona:</strong> Um manual de bolso digital com 30 frameworks de conversa.</p>
            <p><strong>Base Científica:</strong> Heurísticas e Modelos Mentais. Oferece "atalhos" cognitivos para momentos de alta pressão, como a abordagem inicial.</p>
            <p><strong>Estratégia no Funil:</strong> Recupera parte da receita de clientes que recusam o Upsell. Garante que mesmo aqueles que não estão prontos para a imersão total saiam com uma ferramenta valiosa, mantendo uma percepção positiva da marca.</p>
            <p><strong>Objetivo para o Cliente:</strong> O "kit de primeiros socorros" para aniquilar a paralisia na conversa.</p>`
        },
        // NOVO DOSSIÊ PARA O ORÁCULO
        oraculo: {
            title: "O Oráculo (Lançamento Futuro)",
            content: `<p><strong>Status:</strong> Em desenvolvimento.</p>
                      <p><strong>Como Funciona:</strong> Um Agente de IA treinado com a filosofia Amanteus, servindo como um mentor 24/7 no bolso do cliente para calibragem de interações em tempo real.</p>
                      <p><strong>Estratégia no Funil:</strong> Será o nosso principal produto de assinatura (MRR), criando uma fonte de receita recorrente e de longo prazo para nossos parceiros.</p>
                      <p><strong>Objetivo para o Cliente:</strong> A aniquilação do delay entre o conhecimento e a dominação, com feedback instantâneo e socrático.</p>`
        }
    };

        // --- Injeta o SVG do funil ---
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

        // --- Prepara paths para animação ---
        const paths = gsap.utils.toArray("#funnel-svg .path");
        paths.forEach(path => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
        });

        // --- Timeline do funil ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom 80%",
                scrub: 1.5,
            }
        });

        tl.to("#node-primordial", { opacity: 1, duration: 1 })
            .to("#path-1", { strokeDashoffset: 0, duration: 2 })
            .to("#node-bump", { opacity: 1, duration: 1 })
            .to("#path-2", { strokeDashoffset: 0, duration: 2 })
            .to("#node-upsell", { opacity: 1, duration: 1 })
            .to("#path-4", { strokeDashoffset: 0, duration: 2 }, "<")
            .to("#node-downsell", { opacity: 1, duration: 1 })
            .to("#path-3", { strokeDashoffset: 0, duration: 2 })
            .to("#node-final", { opacity: 1, duration: 1 });

        // --- Modal ---
        const openModal = (dossierId) => {
            const data = dossierData[dossierId];
            if (!data) return;
            modalContent.innerHTML = `<h4>${data.title}</h4>${data.content}`;
            modal.classList.add('visible');
        };

        const closeModal = () => modal.classList.remove('visible');

        menu.addEventListener('click', e => {
            if (e.target.matches('.product-menu-button')) {
                openModal(e.target.dataset.dossier);
            }
        });
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (backdrop) backdrop.addEventListener('click', closeModal);
    }

    // ==========================================================
    // --- INICIALIZAÇÃO DE TODOS OS MÓDULOS ---
    // ==========================================================
    initComandoSection();
    initCountUpAnimations();
    initStaggeredReveals();
    initFunnelBlueprint();
});
