// afiliados.js
document.addEventListener('DOMContentLoaded', () => {
    // Garante que o GSAP e o ScrollTrigger estão disponíveis
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP ou ScrollTrigger não encontrados. Verifique a inclusão no HTML.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Animação para os cards de pilares e seletividade
    const cards = document.querySelectorAll('.pilar-card, .seletividade-box');
    cards.forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
        });
    });

    // Animação de contagem para os números
    const counters = document.querySelectorAll('[data-count-up]');
    counters.forEach(counter => {
        const endValue = parseFloat(counter.dataset.countUp);
        if (isNaN(endValue)) return;

        gsap.from(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
            textContent: 0,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
                // Formata o número para ter duas casas decimais e usar vírgula
                const value = parseFloat(this.targets()[0].textContent);
                this.targets()[0].textContent = `R$ ${value.toFixed(2).replace('.', ',')}`;
            }
        });
    });
});
