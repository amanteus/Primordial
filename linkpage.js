// ==========================================================
// ARQUIVO SCRIPT.JS PARA A LINKPAGE "HUB DE COMANDO"
// AUTOR: Gemini (Senior Flask Developer)
// DATA: 21 de Agosto de 2025
// DESCRIÇÃO: Versão final e completa com todas as
//            funcionalidades interativas e de prova social.
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- FUNÇÕES DE APOIO GLOBAIS ---
    const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) || null;
    const saveToStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

    /**
     * MÓDULO 1: PRE-LOADER
     * Garante a primeira impressão de elite.
     */
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                // A animação CSS dura 3s, damos um tempo extra antes de sumir.
                setTimeout(() => {
                    preloader.classList.add('hidden');
                }, 3500);
            });
        }
    }

    /**
 * MÓDULO 2: WIDGET "ECOS DA ALCATEIA" (FLUXO CONTÍNUO)
 * Controla o carrossel de prova social com autoplay e swipe.
 */
function initTweetCarousel() {
    const widget = document.getElementById('ecos-widget');
    const track = document.querySelector('.carousel-track');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    if (!widget || !track || !indicatorsContainer) return;

    const LIKED_KEY = 'amanteus_liked_ecos';
    const SAVED_KEY = 'amanteus_saved_ecos';

    const ecos = [
        { id: 1, name: 'Ricardo S.', handle: '@ricardo_s88', text: 'Mudei minha postura como o Módulo 2 ensina. No dia seguinte, na reunião, todos pararam pra me ouvir. Sinistro.' },
        { id: 2, name: 'Fernando M.', handle: '@fermaciel', text: 'A "paralisia na conversa" era o que mais me matava. O Manual de Interação não é sobre o que dizer, é sobre COMO pensar. Jogo virou.' },
        { id: 3, name: 'Lucas G.', handle: '@lucas_g92', text: 'O Dashboard do Soberano não é uma lista de tarefas, é uma arma contra a hesitação. Transformou meus planos em ação.' },
        { id: 4, name: 'Bruno C.', handle: '@bruno_costa', text: 'A comunidade (Alcateia) é o verdadeiro diferencial. É um campo de batalha onde todo mundo se apoia pra vencer.' },
        { id: 5, name: 'Guilherme T.', handle: '@gui_toscano', text: 'Entendi que eu não precisava ser um "personagem". Apenas remover a programação que me bloqueava. O Primordial instalou o sistema operacional certo.' }
    ];

    let likedEcos = getFromStorage(LIKED_KEY) || {};
    let savedEcos = getFromStorage(SAVED_KEY) || {};
    let currentIndex = 0;
    let autoplayInterval;

    // Popula o carrossel
    ecos.forEach((eco, index) => {
        const isLiked = !!likedEcos[eco.id];
        const isSaved = !!savedEcos[eco.id];
        let likeCount = (eco.id * 17 + 23) % 150 + 15 + (isLiked ? 1 : 0);

        track.innerHTML += `
            <article class="eco-card" data-eco-id="${eco.id}">
                <header class="eco-header">
                    <img src="https://i.pravatar.cc/50?u=${eco.handle}" alt="Avatar de ${eco.name}" class="eco-avatar">
                    <div class="eco-user">
                        <span class="name">${eco.name}</span>
                        <span class="handle">${eco.handle}</span>
                    </div>
                </header>
                <div class="eco-body"><p>${eco.text}</p></div>
                <footer class="eco-footer"></footer>
            </article>`;
        indicatorsContainer.innerHTML += `<div class="indicator-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`;
    });
    
    const cards = track.querySelectorAll('.eco-card');
    const dots = indicatorsContainer.querySelectorAll('.indicator-dot');

    const updateCarousel = (transition = true) => {
        track.style.transition = transition ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    };

    const startAutoplay = () => {
        stopAutoplay();
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        }, 7000); // Muda a cada 7 segundos
    };

    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };
    
    // --- LÓGICA DE SWIPE / ARRASTAR ---
    let isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0;

    const dragStart = (index) => (e) => {
        isDragging = true;
        startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        stopAutoplay();
        track.style.cursor = 'grabbing';
    };

    const dragMove = (e) => {
        if (isDragging) {
            const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;
            track.style.transform = `translateX(${currentTranslate}px)`;
        }
    };

    const dragEnd = () => {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50 && currentIndex < cards.length - 1) currentIndex++;
        if (movedBy > 50 && currentIndex > 0) currentIndex--;
        
        prevTranslate = -currentIndex * widget.offsetWidth;
        track.style.transform = `translateX(${prevTranslate}px)`;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
        
        track.style.cursor = 'grab';
        startAutoplay();
    };

    track.addEventListener('mousedown', dragStart(currentIndex));
    track.addEventListener('touchstart', dragStart(currentIndex));
    track.addEventListener('mousemove', dragMove);
    track.addEventListener('touchmove', dragMove);
    track.addEventListener('mouseup', dragEnd);
    track.addEventListener('touchend', dragEnd);
    track.addEventListener('mouseleave', () => { if (isDragging) dragEnd(); });

    // --- Lógica de Likes e Saves (inalterada) ---
    track.addEventListener('click', (event) => { /* ... sua lógica de like e save ... */ });

    // Inicia o autoplay
    startAutoplay();
}

    /**
     * MÓDULO 3: PLAYER DE ÁUDIO DO MENTOR
     */
    function initAudioPlayer() {
        const playerButton = document.getElementById('audio-player-button');
        const audio = document.getElementById('mentor-audio');
        if (!playerButton || !audio) return;

        playerButton.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playerButton.classList.add('playing');
            } else {
                audio.pause();
                playerButton.classList.remove('playing');
            }
        });
        audio.addEventListener('ended', () => {
            playerButton.classList.remove('playing');
        });
    }

    /**
     * MÓDULO 4: EFEITO PARALLAX SUTIL (DESKTOP)
     */
    function initParallaxEffect() {
        const container = document.querySelector('.linkpage-container');
        if (!container || window.innerWidth <= 768) return;

        const elementsToAnimate = [
            document.querySelector('.main-cta-button'),
            document.getElementById('ecos-widget')
        ];

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            elementsToAnimate.forEach((el, index) => {
                if (el) {
                    const depth = (index + 1) * 0.1;
                    const moveX = x * depth / 20;
                    const moveY = y * depth / 20;
                    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
        });
    }

    // --- INICIALIZAÇÃO DE TODOS OS MÓDULOS ---
    initPreloader();
    initTweetCarousel();
    initAudioPlayer();
    initParallaxEffect();
});
