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
function initFunnelBlueprint() {
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

    const svgContainer = section.querySelector('.blueprint-svg-container');
    const menu = section.querySelector('.product-menu-scrollable');
    const modal = document.getElementById('dossier-modal');
    const modalContent = document.getElementById('dossier-details');
    const closeModalBtn = modal.querySelector('.dossier-close-btn');
    const backdrop = modal.querySelector('.dossier-modal-backdrop');

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
            <p><strong>Estratégia no Funil:</strong> Oferta de alto valor para os clientes mais engajados, maximizando o Lucro Por Cliente (LTV). <strong>No futuro, esta etapa será substituída pelo Acesso ao Agente de IA 'O Oráculo'</strong>, uma ferramenta de calibragem em tempo real.</p>
            <p><strong>Objetivo para o Cliente:</strong> Transformar o conhecimento em habilidade de forma acelerada, sob orientação direta.</p>`
        },
        downsell: {
            title: "Dossiê: Downsell (Arsenal de Conversa)",
            content: `<p><strong>Como Funciona:</strong> Um manual de bolso digital com 30 frameworks de conversa.</p>
            <p><strong>Base Científica:</strong> Heurísticas e Modelos Mentais. Oferece "atalhos" cognitivos para momentos de alta pressão, como a abordagem inicial.</p>
            <p><strong>Estratégia no Funil:</strong> Recupera parte da receita de clientes que recusam o Upsell. Garante que mesmo aqueles que não estão prontos para a imersão total saiam com uma ferramenta valiosa, mantendo uma percepção positiva da marca.</p>
            <p><strong>Objetivo para o Cliente:</strong> O "kit de primeiros socorros" para aniquilar a paralisia na conversa.</p>`
        }
    };
    
    // Injeta o SVG dinamicamente
    svgContainer.innerHTML = `
        <svg id="funnel-svg" viewBox="0 0 900 250" preserveAspectRatio="xMidYMid meet">
            <path id="funnel-svg-path" d="M50 125 H 250 L 350 50 L 550 50 L 650 125 L 850 125 M 550 50 L 550 200 L 350 200" />
        </svg>`;
    const path = document.getElementById('funnel-svg-path');
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    // Anima o "desenho" do fluxograma com GSAP ScrollTrigger
    gsap.to(path, {
        strokeDashoffset: 0,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom bottom",
            scrub: 1.5,
        }
    });

    // Lógica do Modal
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
    closeModalBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
}

    // --- INICIALIZAÇÃO DE TODOS OS MÓDULOS ---
    initHorizontalScroll();
    initFunnelBlueprint();
    initCountUpAnimations();
    initStaggeredReveals();
});
