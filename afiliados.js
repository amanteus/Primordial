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
    // --- MÓDULO 1: SCROLL HORIZONTAL ---
    // ==========================================================
    function initHorizontalScroll() {
        const secaoComando = document.querySelector('.secao-comando');
        const track = document.querySelector('.comando-track');
        if (!secaoComando || !track) return;

        // Apenas em telas desktop
        ScrollTrigger.matchMedia({
            "(min-width: 769px)": function () {
                const scrollDistance = track.offsetWidth - window.innerWidth;
                secaoComando.style.height = `${scrollDistance * 1.5}px`;

                gsap.to(track, {
                    x: -scrollDistance,
                    ease: "none",
                    scrollTrigger: {
                        trigger: secaoComando,
                        pin: ".comando-wrapper",
                        scrub: 1,
                        start: "top top",
                        end: "bottom bottom",
                    }
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

            gsap.fromTo(counter,
                { textContent: 0 },
                {
                    textContent: endValue,
                    duration: 2.5,
                    ease: 'power3.out',
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: counter,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    onUpdate: function () {
                        const value = parseFloat(this.targets()[0].textContent);
                        this.targets()[0].textContent =
                            `R$ ${value.toFixed(2).replace('.', ',')}`;
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

        // --- Base de dados dos dossiês ---
        const dossierData = {
            primordial: {
                title: "Dossiê: O Primordial (Produto Principal)",
                content: `<p><strong>Como Funciona:</strong> Produto central do funil...</p>`
            },
            bump: {
                title: "Dossiê: Order Bump",
                content: `<p><strong>Como Funciona:</strong> Oferta complementar imediata...</p>`
            },
            upsell: {
                title: "Dossiê: Upsell (Protocolo de Ativação)",
                content: `<p><strong>Como Funciona:</strong> Um programa intensivo de 30 dias com acompanhamento para mestria avançada.</p>
                          <p><strong>Base Científica:</strong> Imersão Focada e Feedback Contínuo.</p>
                          <p><strong>Estratégia no Funil:</strong> Oferta de alto valor para clientes mais engajados.</p>
                          <p><strong>Objetivo:</strong> Transformar conhecimento em habilidade rapidamente.</p>`
            },
            downsell: {
                title: "Dossiê: Downsell",
                content: `<p><strong>Como Funciona:</strong> Alternativa de menor valor para recuperar clientes.</p>
                          <p><strong>Estratégia no Funil:</strong> Garante receita parcial mantendo percepção positiva.</p>`
            },
            oraculo: {
                title: "Dossiê: O Oráculo (Lançamento Futuro)",
                content: `<p><strong>Status:</strong> Em desenvolvimento.</p>
                          <p><strong>Como Funciona:</strong> Agente de IA para calibragem em tempo real.</p>
                          <p><strong>Estratégia no Funil:</strong> Produto de assinatura recorrente (MRR).</p>`
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
    initHorizontalScroll();
    initCountUpAnimations();
    initStaggeredReveals();
    initFunnelBlueprint();
});
