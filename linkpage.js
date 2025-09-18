/**
 * ==========================================================
 * --- SCRIPT DEDICADO PARA A LINKPAGE AMANTEUS (V2 - DINÂMICA) ---
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- BANCO DE DADOS (AMOSTRA) ---
    const compradoresDB = [
        { name: 'João Paulo' }, { name: 'Lucas Gonçalves' }, { name: 'Matheus Francisco' }, { name: 'Guilherme Toscano' }, { name: 'Ricardo Alexandre' },
        { name: 'Fernando Maciel' }, { name: 'Vinícius Cordeiro' }, { name: 'Diego Lopes' }, { name: 'Daniel Ribeiro' }, { name: 'Marcelo Veiga' },
        { name: 'André Bittencourt' }, { name: 'Fábio Santos' }, { name: 'Rodrigo Oliveira' }, { name: 'Alexandre Juarez' }, { name: 'Leandro Dionatas' },
        { name: 'Adriano Bastos' }, { name: 'Felipe Nogueira' }, { name: 'Jorge Vianna' }, { name: 'Eduardo Rios' }, { name: 'Leonardo Paiva' },
        { name: 'Caio Rezende' }, { name: 'Danilo Pimenta' }, { name: 'Gustavo Neves' }, { name: 'Hélio Viana' }, { name: 'Ítalo Santos' }
    ];

    const commentTemplates = [
        "Apliquei o conceito do Módulo 3 na mesma noite. A mudança na reação dela foi... palpável. Deixei de ser o 'cara legal' pra ser o cara que ela não conseguia decifrar. Jogo virou.",
        "O mais louco não é nem as mulheres. É como outros homens mudaram o jeito que me tratam. No trabalho, na roda de amigos. A postura muda, a voz muda, e o mundo responde.",
        "O Mapa da Neurodominância sozinho já vale o investimento. Entender como a dopamina funciona e parar de se sabotar com prazeres baratos mudou meu foco e minha disciplina em tudo.",
        "A sensação de entrar num lugar e não se sentir invisível. De ver ela te olhando ANTES de você olhar. Não tem preço. É isso. O resto é consequência.",
        "Minha ex me viu numa festa outro dia... o jeito que ela me olhou, tentando entender o que tinha mudado... aquele olhar valeu cada centavo.",
        "Cansei de ser o 'porto seguro' que elas procuram pra desabafar sobre os caras que elas realmente desejam. Hoje, eu sou o cara.",
        "A comunidade é forte. Ninguém te julga, todo mundo se ajuda. É uma verdadeira irmandade.",
        "Finalmente um lugar que não me trata como um homem quebrado, mas como um lobo adormecido.",
        "O Ritual de Ruptura com o Personagem Infantil do Módulo 1... doloroso, mas necessário. Parece que tirei uma tonelada das costas.",
        "Ok, entrei. Chega de ser espectador da minha própria vida. Hora de virar protagonista.",
        "Acabei de garantir meu acesso. O sentimento não é de comprar um curso, é de entrar pra uma guerra.",
        "Chega de ser o 'cara legal' que fica na friendzone. Se é pra ser perigoso, que comece agora.",
        "O preço de duas cervejas no bar. A decisão foi fácil.", "A parte sobre 'ser percebido como líder sem dizer uma palavra' é ouro puro.",
        "Dentro. A ideia de que a atração não tem a ver com beleza, mas com instinto, é libertadora.",
        "A escolha entre o 'vampiro emocional' e o 'caçador primordial' é o resumo da vida.",
        "O conceito de 'desequilíbrio sexy' é genial.", "A promessa de 'impor presença' ao invés de 'pedir atenção'. É isso."
    ];

    // --- MÓDULO: PRE-LOADER ---
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Garante que a página inteira, incluindo imagens, foi carregada
        window.addEventListener('load', () => {
            // Define o tempo total da animação (2.5s desenho + 1s preenchimento)
            // e adiciona um pequeno delay extra antes de sumir.
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1800); // 2.8 segundos no total
        });
    }
}

    /**
     * MÓDULO 2: Menu Expansível
     */
    function initMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const menuDropdown = document.getElementById('menu-dropdown');
        if (menuToggle && menuDropdown) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('is-open');
                menuDropdown.classList.toggle('is-open');
            });
        }
    }

    /**
     * MÓDULO 3: Carrossel de Depoimentos (Lógica Dinâmica)
     */
    function initLinkpageTestimonials() {
        const swiperWrapper = document.querySelector('.testimonials-slider .swiper-wrapper');
        const template = document.getElementById('testimonial-template');
        if (!swiperWrapper || !template) return;

        // 1. Funções auxiliares para gerar dados (recicladas do original)
        const generateUsername = (name) => {
            const slugify = (text) => text.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const parts = name.split(' ');
            const firstName = slugify(parts[0]);
            const lastNameInitial = parts.length > 1 ? slugify(parts[parts.length - 1]).charAt(0) : '';
            return `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastNameInitial.toUpperCase()}.`;
        };

        // 2. Gera a lista completa de possíveis depoimentos
        const allCommentsData = compradoresDB.map((comprador, index) => ({
            id: 101 + index,
            username: generateUsername(comprador.name),
            text: commentTemplates[index % commentTemplates.length]
        }));

        // 3. Embaralha e seleciona um número limitado de depoimentos para exibir
        const shuffled = allCommentsData.sort(() => 0.5 - Math.random());
        const selectedTestimonials = shuffled.slice(0, 15); // Exibiremos 15 depoimentos aleatórios

        // 4. Popula o HTML com os depoimentos selecionados
        selectedTestimonials.forEach(testimonial => {
            const clone = template.content.cloneNode(true);
            const slide = clone.querySelector('.swiper-slide');
            
            slide.querySelector('.testimonial-text').textContent = `"${testimonial.text}"`;
            slide.querySelector('.testimonial-author-name').textContent = `- ${testimonial.username}`;
            slide.querySelector('.testimonial-author-img').src = `https://i.pravatar.cc/40?u=${testimonial.id}`;
            slide.querySelector('.testimonial-author-img').alt = `Avatar de ${testimonial.username}`;
            
            swiperWrapper.appendChild(slide);
        });

        // 5. Inicializa o Swiper DEPOIS que os slides foram adicionados
        new Swiper('.testimonials-slider', {
            loop: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 1,
            spaceBetween: 20,
        });
    }

    // ==========================================================
    // INICIALIZAÇÃO DE TODOS OS MÓDULOS
    // ==========================================================
    initPreloader();
    initMobileMenu();
    initLinkpageTestimonials();
});
