// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Interactive Background System
class InteractiveBackground {
    constructor() {
        this.particles = [];
        this.mouseTrails = [];
        this.isActive = true;
        this.init();
    }

    init() {
        this.createParticles();
        this.createMouseTrail();
        this.animateParticles();
        this.handleMouseMove();
        this.handleScroll();
    }

    createParticles() {
        const background = document.querySelector('.interactive-background');
        if (!background) return;

        const particleCount = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--particle-count'));

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation delay
            particle.style.animationDelay = Math.random() * 3 + 's';
            
            // Random size variation
            const size = Math.random() * 2 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            background.appendChild(particle);
            this.particles.push(particle);
        }
    }

    createMouseTrail() {
        this.mouseTrailContainer = document.createElement('div');
        this.mouseTrailContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(this.mouseTrailContainer);
    }

    handleMouseMove() {
        let mouseX = 0, mouseY = 0;
        let isMoving = false;
        let moveTimeout;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMoving = true;

            clearTimeout(moveTimeout);
            moveTimeout = setTimeout(() => {
                isMoving = false;
            }, 100);

            if (isMoving && this.isActive) {
                this.createMouseTrail(mouseX, mouseY);
            }
        });

        // Touch support for mobile
        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            mouseX = touch.clientX;
            mouseY = touch.clientY;
            
            if (this.isActive) {
                this.createMouseTrail(mouseX, mouseY);
            }
        });
    }

    createMouseTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        // Random color variation
        const colors = ['#9b5de5', '#00f5d4', '#ff6b6b', '#4ecdc4'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        trail.style.background = randomColor;
        trail.style.boxShadow = `0 0 10px ${randomColor}`;
        
        this.mouseTrailContainer.appendChild(trail);
        
        // Remove trail after animation
        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 500);
    }

    animateParticles() {
        this.particles.forEach((particle, index) => {
            // Add interactive hover effect
            particle.addEventListener('mouseenter', () => {
                particle.style.transform = 'scale(2)';
                particle.style.filter = 'blur(0px)';
                particle.style.boxShadow = '0 0 20px currentColor';
            });
            
            particle.addEventListener('mouseleave', () => {
                particle.style.transform = 'scale(1)';
                particle.style.filter = 'blur(0.5px)';
                particle.style.boxShadow = '0 0 10px currentColor';
            });
        });
    }

    handleScroll() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            // Pause particles during fast scroll for performance
            this.isActive = false;
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                this.isActive = true;
            }, 100);
        });
    }

    // Performance optimization
    pause() {
        this.isActive = false;
        this.particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    }

    resume() {
        this.isActive = true;
        this.particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
}

// Initialize Interactive Background
let interactiveBackground;

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add glow effect to service cards on hover
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(155, 93, 229, 0.8)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Add glow effect to legend cards on hover
document.querySelectorAll('.legend-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(155, 93, 229, 0.8)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Add glow effect to partner items on hover
document.querySelectorAll('.partner-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(0, 245, 212, 0.8)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Video section functionality
document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.querySelector('.video-container');
    const video = document.querySelector('.video-wrapper video');
    
    if (videoContainer && video) {
        // Add hover effect to video container
        videoContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 0 30px rgba(155, 93, 229, 0.8)';
        });
        
        videoContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 0 20px rgba(155, 93, 229, 0.6)';
        });
        
        // Add click to play/pause functionality
        videoContainer.addEventListener('click', function(e) {
            if (e.target === video) {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        });
        
        // Add video loading state
        video.addEventListener('loadstart', function() {
            videoContainer.style.opacity = '0.7';
        });
        
        video.addEventListener('canplay', function() {
            videoContainer.style.opacity = '1';
        });
    }

    // Legends Journey Section functionality
    const journeySection = document.querySelector('.legends-journey');
    const stepItems = document.querySelectorAll('.step-item');
    
    if (journeySection) {
        
        // Add hover effects to step items
        stepItems.forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(-10px) scale(1.02)';
                this.style.boxShadow = '0 0 25px rgba(155, 93, 229, 0.4)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
                this.style.boxShadow = '0 0 20px rgba(155, 93, 229, 0.3)';
            });
            
            // Add staggered animation delay
            item.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Add glow effect to journey image on hover
        const journeyImage = document.querySelector('.journey-image');
        if (journeyImage) {
            journeyImage.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.05)';
                this.style.boxShadow = '0 0 35px rgba(155, 93, 229, 0.9)';
            });
            
            journeyImage.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 0 20px rgba(155, 93, 229, 0.6)';
            });
        }
    }

    // Gaming Control App functionality
    const appMockup = document.querySelector('.app-mockup');
    const downloadBtns = document.querySelectorAll('.download-btn');
    const gameItems = document.querySelectorAll('.game-item');
    
    if (appMockup) {
        // Add 3D hover effect to app mockup
        appMockup.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(-5deg) scale(1.05)';
        });
        
        appMockup.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-15deg) scale(1)';
        });
    }

    // Add glow effect to download buttons
    downloadBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add interactive game items
    gameItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            gameItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Add timer animation
    const timeCircle = document.querySelector('.time-circle');
    if (timeCircle) {
        // Simulate countdown timer
        let timeLeft = 150; // 2:30 in seconds
        const timeDisplay = timeCircle.querySelector('.time');
        
        const updateTimer = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft > 0) {
                timeLeft--;
                setTimeout(updateTimer, 1000);
            }
        };
        
        // Start timer when section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateTimer();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(timeCircle);
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 245, 212, 0.9)' : 'rgba(155, 93, 229, 0.9)'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.type === 'submit') return; // Don't animate form submit buttons
        
        // Add loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
        this.disabled = true;
        
        // Simulate loading
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 2000);
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .legend-card, .partner-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const typingText = document.querySelector('#typing-text');
    if (typingText) {
        const text = 'انضم لأكبر مجتمع لاعبين في الشرق الأوسط';
        typeWriter(typingText, text, 80);
    }
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #9b5de5, #00f5d4);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add hover sound effect (optional)
document.querySelectorAll('.btn, .service-card, .legend-card, .partner-item').forEach(element => {
    element.addEventListener('mouseenter', function() {
        // Add a subtle scale effect
        this.style.transform = 'scale(1.02)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
}, 16)); // ~60fps

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up
            console.log('Swipe up detected');
        } else {
            // Swipe down
            console.log('Swipe down detected');
        }
    }
}

// Initialize all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Interactive Background
    interactiveBackground = new InteractiveBackground();
    
    // Add focus styles for accessibility
    document.querySelectorAll('a, button, input, textarea').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #00f5d4';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Performance optimization: Pause background on mobile
    if (window.innerWidth <= 768) {
        interactiveBackground.pause();
    }
    
    // Add loading state to page
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid #9b5de5; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 20px; color: #00f5d4;">جاري التحميل...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
    
    // Enhanced interactive effects for service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(155, 93, 229, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
    
    // Enhanced interactive effects for legend cards
    document.querySelectorAll('.legend-card').forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Add floating effect
            this.style.animation = 'legendFloat 0.3s ease-out forwards';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = 'legendFloatBack 0.3s ease-out forwards';
        });
    });
});

// Add new keyframe animations
const newAnimations = document.createElement('style');
newAnimations.textContent = `
    @keyframes rippleEffect {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    @keyframes legendFloat {
        0% {
            transform: translateY(0) scale(1);
        }
        100% {
            transform: translateY(-15px) scale(1.05);
        }
    }
    
    @keyframes legendFloatBack {
        0% {
            transform: translateY(-15px) scale(1.05);
        }
        100% {
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(newAnimations);

// Performance monitoring
let frameCount = 0;
let lastTime = performance.now();

function checkPerformance() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Auto-adjust particle count based on performance
        if (fps < 30 && interactiveBackground) {
            const currentCount = parseInt(getComputedStyle(document.documentElement)
                .getPropertyValue('--particle-count'));
            if (currentCount > 20) {
                document.documentElement.style.setProperty('--particle-count', (currentCount - 5).toString());
            }
        }
        
        frameCount = 0;
        lastTime = currentTime;
    }
    
    requestAnimationFrame(checkPerformance);
}

// Start performance monitoring
requestAnimationFrame(checkPerformance);

// Add spin animation for loader
const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loaderStyle);
