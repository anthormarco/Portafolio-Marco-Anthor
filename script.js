// Script.js - Funcionalidades JavaScript para el portafolio

// Smooth scroll para los links de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animación de entrada para los elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.project-card, .skill-icon, .contact-icon').forEach(el => {
    observer.observe(el);
});

// Animación de scroll en la barra de navegación
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(100, 108, 255, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Contador de visitas (opcional)
function initVisitCounter() {
    let visits = localStorage.getItem('portfolioVisits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('portfolioVisits', visits);
    console.log(`Visitas: ${visits}`);
}

// Inicializar al cargar la página
window.addEventListener('load', function() {
    initVisitCounter();
    
    // Animación de fade-in para los elementos principales
    const heroSection = document.querySelector('.hero-section');
    heroSection.style.opacity = '0';
    heroSection.style.animation = 'fadeIn 0.8s ease-in forwards';
});

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeIn 0.6s ease-in forwards !important;
    }
    
    .project-card, .skill-icon, .contact-icon {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Toggle para tema oscuro/claro (opcional)
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });
    }
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
}

// Validar formulario de contacto (si lo agregas)
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí puedes agregar lógica para enviar el email
            alert('Gracias por tu mensaje! Me pondré en contacto pronto.');
            this.reset();
        });
    }
}

// Inicializar funciones
initThemeToggle();
initContactForm();

