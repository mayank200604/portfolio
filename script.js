// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTypingEffect();
    initSkillBars();
    initProjectCards();
    initScrollAnimations();
    initContactForm();
    initSmoothScroll();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Typing effect for hero subtitle
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const texts = ['Machine Learning Engineer', 'Junior Data Scientist', 'AI/ML Engineer', 'GenAI Engineer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Skill bars animation on scroll
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
                bar.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Check on initial load
}

// Project cards expand/collapse functionality
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        const projectDetails = card.querySelector('.project-details');
        
        if (expandBtn && projectDetails) {
            expandBtn.addEventListener('click', () => {
                const isExpanded = !projectDetails.classList.contains('hidden');

                // Close all other project details
                projectCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        const otherDetails = otherCard.querySelector('.project-details');
                        const otherBtn = otherCard.querySelector('.expand-btn');
                        if (otherDetails && otherBtn) {
                            otherDetails.classList.add('hidden');
                            otherBtn.classList.remove('expanded');
                            otherBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
                        }
                    }
                });

                if (isExpanded) {
                    projectDetails.classList.add('hidden');
                    expandBtn.classList.remove('expanded');
                    expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
                } else {
                    projectDetails.classList.remove('hidden');
                    expandBtn.classList.add('expanded');
                    expandBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
                }
            });
        }
    });
}

// Scroll animations for elements
function initScrollAnimations() {
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

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .roadmap-item, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
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
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff006e, #ff4458)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #00d4ff, #7c3aed)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Animated counter for statistics
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const animateCounter = (counter) => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericTarget = parseInt(target.replace(/\D/g, ''));
        let count = 0;
        
        const increment = numericTarget / speed;
        
        const updateCounter = () => {
            if (count < numericTarget) {
                count += increment;
                let displayValue = Math.ceil(count);
                
                if (isPlus) displayValue += '+';
                if (isPercentage) displayValue += '%';
                
                counter.textContent = displayValue;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initParallaxEffect();
    initCounters();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
    
    // Add cursor trail effect (optional visual enhancement)
    let mouseTrail = [];
    const maxTrailLength = 5;
    
    document.addEventListener('mousemove', (e) => {
        if (mouseTrail.length >= maxTrailLength) {
            const oldTrail = mouseTrail.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #00d4ff, #7c3aed);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.6;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(trail);
        mouseTrail.push(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 400);
    });
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-intensive functions
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations that are performance-intensive
}, 10));
