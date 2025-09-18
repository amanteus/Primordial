/**
 * ==========================================================
 * --- SCRIPT DEDICADO PARA A LINKPAGE AMANTEUS ---
 * ==========================================================
 */

// Espera o HTML da página ser completamente carregado para executar os scripts
document.addEventListener('DOMContentLoaded', () => {

    /**
     * MÓDULO 1: Controla a animação de saída do pre-loader.
     * Ele espera todos os recursos da página (imagens, etc.) carregarem.
     */
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                preloader.classList.add('hidden');
            });
        }
    }

    /**
     * MÓDULO 2: Controla a interatividade do menu expansível no header.
     */
    function initMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const menuDropdown = document.getElementById('menu-dropdown');

        if (menuToggle && menuDropdown) {
            menuToggle.addEventListener('click', () => {
                // Adiciona ou remove a classe 'is-open' no botão e no menu
                menuToggle.classList.toggle('is-open');
                menuDropdown.classList.toggle('is-open');
            });
        }
    }

    /**
     * MÓDULO 3: Inicializa o carrossel de depoimentos (Swiper.js).
     */
    function initTestimonialsSlider() {
        // Verifica se o container do slider existe na página
        if (document.querySelector('.testimonials-slider')) {
            const swiper = new Swiper('.testimonials-slider', {
                // Opcional: faz o slider girar infinitamente
                loop: true,

                // Inicia a passagem automática dos slides
                autoplay: {
                    delay: 4000, // Passa para o próximo a cada 4 segundos
                    disableOnInteraction: false, // Não para o autoplay se o usuário mexer
                },

                // Bolinhas de navegação na parte inferior
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                // Quantos slides são visíveis por vez
                slidesPerView: 1,
                
                // Espaçamento entre os slides
                spaceBetween: 20,
            });
        }
    }

    // ==========================================================
    // INICIALIZAÇÃO DE TODOS OS MÓDULOS
    // ==========================================================
    initPreloader();
    initMobileMenu();
    initTestimonialsSlider();

});
