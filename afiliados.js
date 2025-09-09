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

    // --- INICIALIZAÇÃO DE TODOS OS MÓDULOS ---
    initHorizontalScroll();
    initCountUpAnimations();
    initStaggeredReveals();
});
