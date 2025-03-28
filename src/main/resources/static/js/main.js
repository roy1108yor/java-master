/*
 * Spring Boot & MyBatis Seed Project
 * Main JavaScript file for interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components and animations
    initPageTransitions();
    initStickyNavbar();
    initSmoothScrolling();
    initMobileNavToggle();
    initFeatureCardEffects();
});

/**
 * Page load transitions - animates elements as they come into view
 */
function initPageTransitions() {
    // Add initial animation to hero content
    document.querySelectorAll('.hero-content > *').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animation = `fadeInUp 0.8s ease ${index * 0.2}s forwards`;
    });

    // Setup IntersectionObserver for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe all section titles and feature cards
    document.querySelectorAll('.section-title, .section-subtitle, .feature-card, .tech-item, .step').forEach(element => {
        observer.observe(element);
    });
}

/**
 * Sticky navbar effect when scrolling
 */
function initStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling when not at top
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide navbar when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            navbar.style.top = '-80px';
        } else {
            navbar.style.top = '0';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Offset for navbar height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

/**
 * Mobile menu toggle functionality
 */
function initMobileNavToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }
}

/**
 * Enhanced hover effects for feature cards
 */
function initFeatureCardEffects() {
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add subtle movement effect to tech stack items
    document.querySelectorAll('.tech-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Show active section in navigation
 */
function updateActiveNavLink() {
    // Get all sections that have an ID defined
    const sections = document.querySelectorAll("section[id]");
    
    // Add an event listener listening for scroll
    window.addEventListener("scroll", navHighlighter);
    
    function navHighlighter() {
        // Get current scroll position
        let scrollY = window.pageYOffset;
        
        // Loop through sections to get height, top and ID values
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(".nav-links a[href*=" + sectionId + "]").classList.add("active");
            } else {
                document.querySelector(".nav-links a[href*=" + sectionId + "]").classList.remove("active");
            }
        });
    }
}

// Add copy to clipboard functionality for code blocks
document.querySelectorAll('.code-block').forEach(block => {
    block.addEventListener('click', function() {
        const range = document.createRange();
        range.selectNode(block);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        
        // Show "Copied!" message
        const message = document.createElement('div');
        message.textContent = 'Copied to clipboard!';
        message.className = 'copy-message';
        message.style.position = 'absolute';
        message.style.right = '10px';
        message.style.top = '10px';
        message.style.background = '#28a745';
        message.style.color = 'white';
        message.style.padding = '5px 10px';
        message.style.borderRadius = '3px';
        message.style.opacity = '0';
        message.style.transition = 'opacity 0.3s';
        
        block.style.position = 'relative';
        block.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 2000);
    });
});