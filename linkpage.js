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

// ==========================================================
// --- MÓDULO: WIDGET DE ECOS DA ALCATEIA (VERSÃO FINAL) ---
// ==========================================================
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

    // Popula o carrossel e os indicadores dinamicamente
    track.innerHTML = '';
    indicatorsContainer.innerHTML = '';
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
                <footer class="eco-footer">
                    <div class="eco-actions">
                        <div class="eco-action like-btn ${isLiked ? 'active' : ''}" data-action="like" title="Curtir">
                            <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            <span class="like-count">${likeCount}</span>
                        </div>
                        <div class="eco-action save-btn ${isSaved ? 'active' : ''}" data-action="save" title="Salvar">
                            <svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                        </div>
                    </div>
                    <time class="eco-timestamp">${index + 1}d</time>
                </footer>
            </article>`;
        
        indicatorsContainer.innerHTML += `<div class="indicator-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`;
    });
    
    const cards = track.querySelectorAll('.eco-card');
    const dots = indicatorsContainer.querySelectorAll('.indicator-dot');
    const cardWidth = cards[0].offsetWidth;

    // --- LÓGICA DE SWIPE / ARRASTAR ---
    let isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0, animationID;

    const updateUI = () => {
        track.style.transform = `translateX(${prevTranslate}px)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    };

    const getPositionX = (e) => e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;

    const dragStart = (e) => {
        isDragging = true;
        startPos = getPositionX(e);
        animationID = requestAnimationFrame(animation);
        track.style.transition = 'none';
        track.style.cursor = 'grabbing';
    };

    const dragMove = (e) => {
        if (isDragging) {
            const currentPosition = getPositionX(e);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    };

    const dragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        cancelAnimationFrame(animationID);
        
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -50 && currentIndex < cards.length - 1) currentIndex++;
        if (movedBy > 50 && currentIndex > 0) currentIndex--;

        prevTranslate = -currentIndex * cardWidth;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        track.style.cursor = 'grab';
        updateUI();
    };

    function animation() {
        track.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    }
    
    track.addEventListener('mousedown', dragStart);
    track.addEventListener('touchstart', dragStart, { passive: true });
    track.addEventListener('mousemove', dragMove);
    track.addEventListener('touchmove', dragMove, { passive: true });
    track.addEventListener('mouseup', dragEnd);
    track.addEventListener('touchend', dragEnd);
    track.addEventListener('mouseleave', () => { if (isDragging) dragEnd(); });

    // --- Lógica de Likes e Saves ---
    track.addEventListener('click', (event) => {
        const actionBtn = event.target.closest('.eco-action');
        if (!actionBtn) return;
        
        // Impede que o clique acione o drag
        event.stopPropagation();

        const action = actionBtn.dataset.action;
        const card = actionBtn.closest('.eco-card');
        const ecoId = card.dataset.ecoId;

        if (action === 'like') {
            const countEl = actionBtn.querySelector('.like-count');
            let count = parseInt(countEl.textContent);
            likedEcos[ecoId] = !likedEcos[ecoId];
            countEl.textContent = likedEcos[ecoId] ? count + 1 : count - 1;
            saveToStorage(LIKED_KEY, likedEcos);
            actionBtn.classList.toggle('active');
        }

        if (action === 'save') {
            savedEcos[ecoId] = !savedEcos[ecoId];
            saveToStorage(SAVED_KEY, savedEcos);
            actionBtn.classList.toggle('active');
        }
    });
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
