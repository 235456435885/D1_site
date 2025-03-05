// Scroll Reveal Animation
function checkScroll() {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}

// Cursor Follow Effect
function initCursorFollow() {
    const cursorFollow = document.querySelector('.cursor-follow');
    
    document.addEventListener('mousemove', (e) => {
        cursorFollow.style.left = `${e.clientX}px`;
        cursorFollow.style.top = `${e.clientY}px`;
    });
}

// Parallax Image Effect
function initParallaxImages() {
    const parallaxImages = document.querySelectorAll('.image-parallax');
    
    window.addEventListener('scroll', () => {
        parallaxImages.forEach(img => {
            const speed = 0.5;
            const yPos = -(window.pageYOffset * speed);
            img.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Navigation Smooth Scroll
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Initialize all animations and effects
window.addEventListener('load', () => {
    checkScroll();
    initCursorFollow();
    initParallaxImages();
    initSmoothScroll();
});

window.addEventListener('scroll', checkScroll);
