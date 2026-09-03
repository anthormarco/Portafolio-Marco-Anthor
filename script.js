// Script.js - Portafolio con Navbar Glass + Auto-Scroll

// Smooth scroll con active link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.secciones');

function setActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        }
    });
});

// Navbar glass + shadow on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// Intersection para project y contact
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.project-card, .contact-icon').forEach(el => observer.observe(el));

// Skills - Auto scroll infinito + drag + spotlight + tilt
const skillsSection = document.querySelector('.skills-section');
const skillsIcons = document.querySelector('.skills-icons');

if (skillsSection && skillsIcons) {
    skillsSection.addEventListener('mousemove', e => {
        const rect = skillsSection.getBoundingClientRect();
        skillsSection.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        skillsSection.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
    skillsSection.addEventListener('mouseleave', () => {
        skillsSection.style.setProperty('--mouse-x', `50%`);
        skillsSection.style.setProperty('--mouse-y', `50%`);
    });

    // Duplicar para loop infinito
    if (skillsIcons.children.length > 0 && skillsIcons.children.length < 24) {
        const icons = Array.from(skillsIcons.children);
        icons.forEach(icon => {
            const clone = icon.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            skillsIcons.appendChild(clone);
        });
    }

    let isDown = false;
    let startX, scrollLeft, isDragging = false;

    skillsIcons.addEventListener('mousedown', (e) => {
        isDown = true; isDragging = false;
        skillsIcons.style.animationPlayState = 'paused';
        startX = e.pageX - skillsIcons.offsetLeft;
        scrollLeft = skillsIcons.scrollLeft;
    });
    skillsIcons.addEventListener('mouseleave', () => {
        isDown = false;
        if (!isDragging) skillsIcons.style.animationPlayState = 'running';
    });
    skillsIcons.addEventListener('mouseup', () => {
        isDown = false;
        setTimeout(() => {
            isDragging = false;
            if (!skillsIcons.matches(':hover')) skillsIcons.style.animationPlayState = 'running';
        }, 100);
    });
    skillsIcons.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        isDragging = true;
        const x = e.pageX - skillsIcons.offsetLeft;
        const walk = (x - startX) * 2;
        skillsIcons.scrollLeft = scrollLeft - walk;
    });

    // Touch
    let touchStartX = 0;
    skillsIcons.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        skillsIcons.style.animationPlayState = 'paused';
    }, { passive: true });
    skillsIcons.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].clientX;
        skillsIcons.scrollLeft += touchStartX - touchX;
        touchStartX = touchX;
    }, { passive: true });
    skillsIcons.addEventListener('touchend', () => {
        setTimeout(() => { skillsIcons.style.animationPlayState = 'running'; }, 2000);
    });

    skillsIcons.querySelectorAll('.skill-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => { skillsIcons.style.animationPlayState = 'paused'; });
        icon.addEventListener('mouseleave', () => { if (!isDown) skillsIcons.style.animationPlayState = 'running'; });
    });

    // Tilt foto
    const profileContainer = document.querySelector('.profile-image-container');
    const profileImg = document.querySelector('.profile-image');
    if (profileContainer && profileImg) {
        profileContainer.addEventListener('mousemove', (e) => {
            const rect = profileContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            profileImg.style.transform = `perspective(1000px) rotateX(${y/-12}deg) rotateY(${x/12}deg) scale(1.05)`;
        });
        profileContainer.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }
}

localStorage.setItem('portfolioVisits', (parseInt(localStorage.getItem('portfolioVisits') || 0) + 1));

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    .animate-in { animation: fadeIn 0.6s ease-out forwards !important; }
    .project-card, .contact-icon { opacity:0; }
`;
document.head.appendChild(style);
const contactSection = document.querySelector('.contact-section');
if (contactSection) {
  contactSection.addEventListener('mousemove', e => {
    const rect = contactSection.getBoundingClientRect();
    contactSection.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    contactSection.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
}