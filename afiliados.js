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

function initHorizontalScroll() {
    const track = document.querySelector('.comando-track');
    const cards = gsap.utils.toArray('.dossier-card');
    const secaoComando = document.querySelector('.secao-comando');

    if (!track || cards.length === 0 || !secaoComando) return;

    // USA O matchMedia DO GSAP PARA APLICAR ANIMAÇÕES APENAS EM DESKTOP
    ScrollTrigger.matchMedia({
        "(min-width: 769px)": function() {
            // Esta animação só será criada em telas com mais de 768px
            gsap.to(cards, {
                xPercent: -100 * (cards.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: secaoComando,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (cards.length - 1),
                    end: () => "+=" + track.offsetWidth
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

    // --- INICIALIZAÇÃO DE TODOS OS MÓDULOS ---
    initHorizontalScroll();
    initCountUpAnimations();
    initStaggeredReveals();
});
