document.addEventListener('DOMContentLoaded', () => {
    const desk = document.getElementById('mentors-desk');
    if (!desk) return;

    // Apenas executa a animação em telas maiores que 600px
    if (window.innerWidth > 600) {
        desk.addEventListener('mousemove', (e) => {
            // Calcula a posição do mouse em relação ao centro da "mesa"
            const rect = desk.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move cada item com uma "profundidade" diferente
            const items = desk.querySelectorAll('.desk-item');
            items.forEach(item => {
                const depth = item.dataset.depth || 0.2;
                const moveX = x * depth / 10;
                const moveY = y * depth / 10;
                item.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });

        // Reseta a posição quando o mouse sai da mesa
        desk.addEventListener('mouseleave', () => {
            const items = desk.querySelectorAll('.desk-item');
            items.forEach(item => {
                item.style.transform = 'translate(0, 0)';
            });
        });
    }
});
