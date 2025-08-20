document.addEventListener('DOMContentLoaded', () => {
    
    // --- MÓDULO 1: PRE-LOADER ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Usa o evento 'load' para garantir que tudo, incluindo imagens, carregou
        window.addEventListener('load', () => {
            // A animação CSS dura 2.5s para desenhar e 1s para preencher
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 3000); // Esconde após 3 segundos
        });
    }

    // --- MÓDULO 2: EFEITO PARALLAX "MESA DO MENTOR" ---
    const desk = document.getElementById('mentors-desk');
    if (desk) {
        // Apenas executa a animação em telas maiores que 600px
        if (window.innerWidth > 600) {
            desk.addEventListener('mousemove', (e) => {
                const rect = desk.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const items = desk.querySelectorAll('.desk-item');
                items.forEach(item => {
                    const depth = item.dataset.depth || 0.2;
                    const moveX = x * depth / 10;
                    const moveY = y * depth / 10;
                    item.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            });

            desk.addEventListener('mouseleave', () => {
                const items = desk.querySelectorAll('.desk-item');
                items.forEach(item => {
                    item.style.transform = 'translate(0, 0)';
                });
            });
        }
    }
});
