// Initialize AOS (Animate On Scroll) - Optimized
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    mirror: false,
    offset: 50,
    delay: 0
});

// Simple and efficient loading screen handler
function hideLoadingScreen() {
    const loader = document.querySelector('.loading-overlay');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
            if (loader && loader.parentNode) {
                loader.remove();
            }
        }, 300);
    }
}

// Hide loader when page is ready
if (document.readyState === 'complete') {
    hideLoadingScreen();
} else {
    window.addEventListener('load', hideLoadingScreen);
}

// Simplified Interactive Background System
class InteractiveBackground {
    constructor() {
        this.isActive = true;
        this.init();
    }

    init() {
        // Only create particles on desktop for better performance
        if (window.innerWidth > 768) {
            this.createParticles();
        }
    }

    createParticles() {
        const background = document.querySelector('.interactive-background');
        if (!background) return;

        // Reduced particle count for better performance
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            
            const size = Math.random() * 2 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            background.appendChild(particle);
        }
    }

    pause() {
        this.isActive = false;
        document.querySelectorAll('.particle').forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    }

    resume() {
        this.isActive = true;
        document.querySelectorAll('.particle').forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
}

// Initialize Interactive Background
let interactiveBackground;

// Optimized event handlers
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Interactive Background
    interactiveBackground = new InteractiveBackground();
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
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
    }

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

    // Optimized scroll handlers with throttling
    let ticking = false;
    
    function updateOnScroll() {
        const navbar = document.querySelector('.navbar');
        const heroBackground = document.querySelector('.hero-background');
        
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        }
        
        if (heroBackground) {
            const scrolled = window.pageYOffset;
            heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Video section functionality
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
        
        // Auto-play video when scrolled into view
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video is visible, start playing
                    console.log('Video section visible - starting playback');
                    video.play().catch(error => {
                        console.log('Auto-play prevented by browser:', error);
                        // Try to play again after user interaction
                        document.addEventListener('click', function playVideo() {
                            video.play().catch(e => console.log('Still cannot play:', e));
                            document.removeEventListener('click', playVideo);
                        }, { once: true });
                    });
                } else {
                    // Video is not visible, pause it
                    console.log('Video section not visible - pausing');
                    video.pause();
                }
            });
        }, {
            threshold: 0.3, // Trigger when 30% of video is visible (more sensitive)
            rootMargin: '0px 0px -50px 0px' // Smaller margin for earlier trigger
        });
        
        videoObserver.observe(video);
        
        // Also try to play immediately if video is already visible
        if (video.getBoundingClientRect().top < window.innerHeight) {
            setTimeout(() => {
                console.log('Video already visible - attempting to play');
                video.play().catch(error => {
                    console.log('Initial auto-play failed:', error);
                });
            }, 1000);
        }
        
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
        
        // Handle video errors
        video.addEventListener('error', function() {
            console.log('Video failed to load');
            videoContainer.style.opacity = '0.5';
        });
    }

    // Optimized typing effect
    function typeWriter(element, text, speed = 60) {
        if (!element) return;
        
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect
    const typingText = document.querySelector('#typing-text');
    if (typingText) {
        const text = 'انضم لأكبر مجتمع لاعبين في الشرق الأوسط';
        typeWriter(typingText, text, 60);
    }

    // Simple scroll progress indicator
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
        
        let ticking = false;
        
        function updateProgress() {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        });
    }

    createScrollProgress();

    // Simple form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (!name || !email || !message) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                return;
            }
            
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
            this.reset();
        });
    }

    // Performance optimization: Pause background on mobile
    if (window.innerWidth <= 768) {
        interactiveBackground.pause();
    }

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (interactiveBackground) {
                interactiveBackground.pause();
            }
        } else {
            if (interactiveBackground) {
                interactiveBackground.resume();
            }
        }
    });
});

console.log('🎮 Legends Gaming Optimized Features Loaded Successfully! 🚀');
