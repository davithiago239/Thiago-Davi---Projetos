/**
 * script.js - Funções de Interação do Portfólio Moderno
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer for Scroll Animations
    // Faz os elementos aparecerem suavemente ao fazer o scroll da página.
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento entrou na área visível da tela
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Parar de observar o elemento depois de carregado, para não repetir
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Adiciona o observer em todos os elementos principais e cards que têm a classe .hidden
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => {
        sectionObserver.observe(el);
    });

    // 2. Transição Suave para os Links da Navbar (Smooth Scroll)
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                // Rola para a seção escolhida
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Efeito Parallax simples no Avatar baseado na movimentação do mouse (opcional de charme visual)
    const heroSection = document.getElementById('hero');
    const heroImage = document.getElementById('profile-pic');
    
    if (heroSection && heroImage) {
        heroSection.addEventListener('mousemove', (e) => {
            // Calcula o centro da tela
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            // Aplica um transform super delicado com base na posição
            heroImage.style.transform = `translateY(${yAxis}px) translateX(${xAxis}px)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            // Reseta a posição quando afastar o mouse
            heroImage.style.transform = `translateY(0px) translateX(0px)`;
            heroImage.style.transition = 'transform 0.5s ease';
        });

        heroSection.addEventListener('mouseenter', () => {
            heroImage.style.transition = 'none'; // remove transição para rastrear mouse perfeitamente
        });
    }
});
