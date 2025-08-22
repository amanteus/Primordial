document.addEventListener('DOMContentLoaded', () => {

    /**
     * MÓDULO 1: CARROSSEL DE "ECOS DA ALCATEIA"
     */
    function initTweetCarousel() {
        const track = document.querySelector('.tweet-carousel-track');
        if (!track) return;

        const prevButton = document.getElementById('prev-tweet');
        const nextButton = document.getElementById('next-tweet');
        const LIKED_KEY = 'amanteus_liked_tweets';
        const SAVED_KEY = 'amanteus_saved_tweets';

        const tweets = [
            { id: 1, name: 'Ricardo S.', handle: '@ricardo_s88', text: 'Mudei minha postura como o Módulo 2 ensina. No dia seguinte, na reunião, todos pararam pra me ouvir. Sinistro.' },
            { id: 2, name: 'Fernando M.', handle: '@fermaciel', text: 'A "paralisia na conversa" era o que mais me matava. O Manual de Interação não é sobre o que dizer, é sobre COMO pensar. Jogo virou.' },
            { id: 3, name: 'Lucas G.', handle: '@lucas_g92', text: 'O Dashboard do Soberano não é uma lista de tarefas, é uma arma contra a hesitação. Transformou meus planos em ação.' },
            { id: 4, name: 'Bruno C.', handle: '@bruno_costa', text: 'A comunidade (Alcateia) é o verdadeiro diferencial. É um campo de batalha onde todo mundo se apoia pra vencer.' },
            { id: 5, name: 'Guilherme T.', handle: '@gui_toscano', text: 'Entendi que eu não precisava ser um "personagem". Apenas remover a programação que me bloqueava. O Primordial instalou o sistema operacional certo.' }
        ];

        let likedTweets = JSON.parse(localStorage.getItem(LIKED_KEY)) || {};
        let savedTweets = JSON.parse(localStorage.getItem(SAVED_KEY)) || {};
        
        tweets.forEach(tweet => {
            const isLiked = likedTweets[tweet.id];
            const isSaved = savedTweets[tweet.id];
            const likeCount = 15 + Math.floor(Math.random() * 200) + (isLiked ? 1 : 0);

            track.innerHTML += `
                <div class="tweet-card">
                    <div class="tweet-header">
                        <div class="tweet-avatar"></div>
                        <div class="tweet-user">
                            <span class="name">${tweet.name}</span>
                            <span class="handle">${tweet.handle}</span>
                        </div>
                    </div>
                    <div class="tweet-body">${tweet.text}</div>
                    <div class="tweet-footer">
                        <div class="tweet-action like-btn ${isLiked ? 'active' : ''}" data-tweet-id="${tweet.id}">
                            <svg viewBox="0 0 24 24">${isLiked ? '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>' : '<path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>'}</svg>
                            <span class="like-count">${likeCount}</span>
                        </div>
                        <div class="tweet-action save-btn ${isSaved ? 'active' : ''}" data-tweet-id="${tweet.id}">
                             <svg viewBox="0 0 24 24">${isSaved ? '<path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>' : '<path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>'}</svg>
                        </div>
                    </div>
                </div>
            `;
        });
        
        const cards = track.querySelectorAll('.tweet-card');
        let currentIndex = 0;

        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        });
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        });

        track.addEventListener('click', (event) => {
            const likeBtn = event.target.closest('.like-btn');
            const saveBtn = event.target.closest('.save-btn');

            if (likeBtn) {
                const tweetId = likeBtn.dataset.tweetId;
                const countEl = likeBtn.querySelector('.like-count');
                let count = parseInt(countEl.textContent);
                
                likedTweets[tweetId] = !likedTweets[tweetId];
                likeBtn.classList.toggle('active');
                countEl.textContent = likedTweets[tweetId] ? count + 1 : count - 1;
                
                localStorage.setItem(LIKED_KEY, JSON.stringify(likedTweets));
            }

            if (saveBtn) {
                const tweetId = saveBtn.dataset.tweetId;
                savedTweets[tweetId] = !savedTweets[tweetId];
                saveBtn.classList.toggle('active');
                localStorage.setItem(SAVED_KEY, JSON.stringify(savedTweets));
            }
        });
    }

    /**
     * MÓDULO 2: PLAYER DE ÁUDIO DO MENTOR
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

    // --- INICIALIZAÇÃO DE TODOS OS MÓDULOS DA PÁGINA ---
    initTweetCarousel();
    initAudioPlayer();
});
