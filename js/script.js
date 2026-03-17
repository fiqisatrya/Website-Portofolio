// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simple alert (replace with real backend/email service)
    alert('Terima kasih! Pesan Anda telah dikirim. Saya akan balas segera.');
    contactForm.reset();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate profile features
            if (entry.target.id === 'about') {
                animateProfileFeatures();
            }
        }
    });
}, observerOptions);

// Observe sections for fade-in
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Animate Profile Stats and Skills
function animateProfileFeatures() {
    // Animate stats counters
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((number, index) => {
        setTimeout(() => {
            const target = parseInt(number.dataset.target);
            let current = 0;
            const increment = target / 50;
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    number.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    number.textContent = target;
                }
            };
            updateCounter();
        }, index * 200);
    });

    // Animate skill bars
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        const progress = bar.dataset.progress;
        bar.style.width = progress + '%';
    });
}


// Navbar background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Elegant Particles Background
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('.hero').offsetHeight + 70; // + nav height

    const particles = [];
    const mouse = { x: 0, y: 0 };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        draw() {
            ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    // Mouse move attraction
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Connect nearby particles to mouse
        particles.forEach(particle => {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / 100})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(mouse.x, mouse.y);
                ctx.lineTo(particle.x, particle.y);
                ctx.stroke();
            }

            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }
    animate();

    // Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = document.querySelector('.hero').offsetHeight + 70;
    });
}

if (document.getElementById('particles')) {
    initParticles();
}
