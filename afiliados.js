// ==========================================================
// --- SCRIPT DEDICADO PARA A PÁGINA DE AFILIADOS ---
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

    // Guarda de segurança: só executa se estivermos na página de afiliados
    const comandoSection = document.getElementById('comando-section');
    if (!comandoSection) {
        return;
    }

    // Registra o plugin ScrollTrigger do GSAP
    gsap.registerPlugin(ScrollTrigger);

// SUBSTITUA A FUNÇÃO initHorizontalScroll PELA VERSÃO ABAIXO
function initHorizontalScroll() {
    const secaoComando = document.querySelector('.secao-comando');
    const track = document.querySelector('.comando-track');
    if (!secaoComando || !track) return;

    // Apenas executa a animação em telas de desktop
    ScrollTrigger.matchMedia({
        "(min-width: 769px)": function() {

            // Calcula a distância total que o track precisa rolar
            const scrollDistance = track.offsetWidth - window.innerWidth;

            // Define a altura da seção dinamicamente para ser o dobro da distância de rolagem
            // Isso cria um ritmo de scroll confortável, sem espaços vazios excessivos
            secaoComando.style.height = `${scrollDistance * 1.5}px`;

            gsap.to(track, {
                x: -scrollDistance, // Anima o eixo X até o final do track
                ease: "none",
                scrollTrigger: {
                    trigger: secaoComando,
                    pin: ".comando-wrapper", // "Pina" o wrapper na tela
                    scrub: 1,
                    start: "top top",
                    end: "bottom bottom", // A animação dura toda a altura da seção
                }
            });
        }
    });
}

    // --- MÓDULO 2: ANIMAÇÃO DE CONTAGEM DE NÚMEROS (CORRIGIDO) ---
    function initCountUpAnimations() {
        const counters = document.querySelectorAll('[data-count-up]');

        counters.forEach(counter => {
            const endValue = parseFloat(counter.dataset.countUp);
            if (isNaN(endValue)) return;

            // Usamos .fromTo() para definir o início e o fim, corrigindo o bug
            gsap.fromTo(counter, 
                { textContent: 0 }, // Estado inicial
                {
                    textContent: endValue, // Estado final
                    duration: 2.5,
                    ease: 'power3.out',
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: counter,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    onUpdate: function() {
                        const value = parseFloat(this.targets()[0].textContent);
                        // Formata para moeda brasileira
                        this.targets()[0].textContent = `R$ ${value.toFixed(2).replace('.', ',')}`;
                    }
                }
            );
        });
    }

    // --- MÓDULO 3: ANIMAÇÃO DE ENTRADA PARA NOVAS SEÇÕES ---
    function initStaggeredReveals() {
        const sectionsToAnimate = ['.regras-card', '.recompensa-card'];

        sectionsToAnimate.forEach(selector => {
            const elements = gsap.utils.toArray(selector);
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: elements[0].parentElement, // O container pai dos elementos
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.2 // Efeito de cascata
            });
        });
    }

    // --- MÓDULO: SALA DE GUERRA DO AFILIADO (FLUXOGRAMA E DOSSIÊS) ---
    // ==========================================================
// --- MÓDULO: SALA DE GUERRA DO AFILIADO (VERSÃO FINAL E COMPLETA) ---
// ==========================================================
function initFunnelBlueprint() {
    // --- 1. SELEÇÃO DE ELEMENTOS ---
    const section = document.getElementById('funnel-blueprint-section');
    const svg = document.getElementById('funnel-svg');
    if (!section || !svg) return;

    // Seleciona todos os nós e caminhos
    const nodes = gsap.utils.toArray("#funnel-svg .node");
    const paths = gsap.utils.toArray("#funnel-svg .path");

    // Prepara os caminhos para a animação de "desenho"
    paths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
    });

    // Cria a linha do tempo principal com o ScrollTrigger
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom bottom",
            scrub: 1.5,
        }
    });

    // Adiciona as animações em sequência à linha do tempo
    tl
        .to("#node-primordial", { opacity: 1, duration: 0.5 })
        .to("#path-1", { strokeDashoffset: 0, duration: 1 })
        .to("#node-bump", { opacity: 1, duration: 0.5 })
        .to("#path-2", { strokeDashoffset: 0, duration: 1 })
        .to("#node-upsell", { opacity: 1, duration: 0.5 })
        .to("#path-4", { strokeDashoffset: 0, duration: 1 }, "<") // Anima ao mesmo tempo que a anterior
        .to("#node-downsell", { opacity: 1, duration: 0.5 })
        .to("#path-3", { strokeDashoffset: 0, duration: 1 })
        .to("#node-final", { opacity: 1, duration: 0.5 });
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
@@ -162,7 +136,7 @@
            title: "Dossiê: Upsell (Protocolo de Ativação)",
            content: `<p><strong>Como Funciona:</strong> Um programa intensivo de 30 dias com acompanhamento para mestria avançada.</p>
            <p><strong>Base Científica:</strong> Imersão Focada e Feedback Contínuo, os dois aceleradores de aprendizado mais potentes.</p>
            <p><strong>Estratégia no Funil:</strong> Oferta de alto valor para os clientes mais engajados, maximizando o Lucro Por Cliente (LTV). <strong>No futuro, esta etapa será substituída pelo Acesso ao Agente de IA 'O Oráculo'</strong>, uma ferramenta de calibragem em tempo real.</p>
            <p><strong>Estratégia no Funil:</strong> Oferta de alto valor para os clientes mais engajados, maximizando o Lucro Por Cliente (LTV).</p>
            <p><strong>Objetivo para o Cliente:</strong> Transformar o conhecimento em habilidade de forma acelerada, sob orientação direta.</p>`
        },
        downsell: {
@@ -171,52 +145,82 @@
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
            <path id="funnel-svg-path" d="M50 125 H 250 L 350 50 L 550 50 L 650 125 L 850 125 M 550 50 L 550 200 L 350 200" />
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
    const path = document.getElementById('funnel-svg-path');
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    // Anima o "desenho" do fluxograma com GSAP ScrollTrigger
    gsap.to(path, {
        strokeDashoffset: 0,
        ease: "power1.inOut",
        
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
            end: "bottom bottom",
            end: "bottom 80%",
            scrub: 1.5,
        }
    });

    // Lógica do Modal
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
        if (!data) return;
        if (!data || !modalContent) return;
        modalContent.innerHTML = `<h4>${data.title}</h4>${data.content}`;
        modal.classList.add('visible');
    };
    const closeModal = () => modal.classList.remove('visible');
    const closeModal = () => {
        if (modal) modal.classList.remove('visible');
    };

    menu.addEventListener('click', e => {
        if (e.target.matches('.product-menu-button')) {
            openModal(e.target.dataset.dossier);
        }
    });
    closeModalBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if(backdrop) backdrop.addEventListener('click', closeModal);
}

    // --- INICIALIZAÇÃO DE TODOS OS MÓDULOS ---
    initHorizontalScroll();
    initFunnelBlueprint();
    initCountUpAnimations();
    initStaggeredReveals();
});
