// JavaScript for JVS Tax Services Landing Page

document.addEventListener('DOMContentLoaded', async function() {
    await injectPartials();
    
    // Initialize all functionality after header/footer are in place
    initNavbar();
    initScrollAnimations();
    initCounterAnimations();
    initScrollToTop();
    initSmoothScrolling();
    initFormValidation();
    initLoadingScreen();
    
    // Navbar functionality
    function initNavbar() {
        const navbar = document.getElementById('mainNav');
        const navLinks = document.querySelectorAll('.nav-link');
        const topBar = document.querySelector('.top-bar');
        // Page-based active state (works for about.html and other pages)
        const currentPath = (location.pathname || '').toLowerCase();
        navLinks.forEach(link => {
            const href = (link.getAttribute('href') || '').toLowerCase();
            link.classList.remove('active');
            if ((currentPath.includes('/about') || currentPath.includes('about.html')) && (href.includes('/about') || href.includes('about.html'))) {
                link.classList.add('active');
            } else if ((currentPath.includes('/protection-plus') || currentPath.includes('protection-plus.html')) && (href.includes('/protection-plus') || href.includes('protection-plus.html'))) {
                link.classList.add('active');
            } else if ((currentPath.includes('/contact') || currentPath.includes('contact.html')) && (href.includes('/contact') || href.includes('contact.html'))) {
                link.classList.add('active');
            } else if ((currentPath.includes('/faqs') || currentPath.includes('faqs.html')) && (href.includes('/faqs') || href.includes('faqs.html'))) {
                link.classList.add('active');
            } else if (!currentPath.includes('/about') && !currentPath.includes('about.html') && !currentPath.includes('/protection-plus') && !currentPath.includes('protection-plus.html') && !currentPath.includes('/contact') && !currentPath.includes('contact.html') && !currentPath.includes('/faqs') && !currentPath.includes('faqs.html') && (href === '#home' || href.endsWith('/#home'))) {
                link.classList.add('active');
            }
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
                if (topBar) {
                    topBar.style.transform = 'translateY(-100%)';
                }
            } else {
                navbar.classList.remove('scrolled');
                if (topBar) {
                    topBar.style.transform = 'translateY(0)';
                }
            }
        });
        
        // Active link highlighting
        window.addEventListener('scroll', function() {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
        
        // Mobile menu close on link click
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
        
        // Dropdown hover effects
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('mouseenter', function() {
                dropdownMenu.classList.add('show');
            });
            
            dropdownMenu.addEventListener('mouseleave', function() {
                dropdownMenu.classList.remove('show');
            });
        }
        
        // Logo animation on scroll
        const logoCircle = document.querySelector('.logo-circle');
        if (logoCircle) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 200) {
                    logoCircle.style.transform = 'scale(0.9)';
                } else {
                    logoCircle.style.transform = 'scale(1)';
                }
            });
        }
    }
    
    // Scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
        
        // Special handling for service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            
            const cardObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            cardObserver.observe(card);
        });
    }
    
    // Counter animations
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Scroll to top functionality
    function initScrollToTop() {
        // Create scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollToTopBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top on click
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Form validation and submission
    function initFormValidation() {
        const contactForm = document.querySelector('#contact form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const name = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const subject = this.querySelectorAll('input[type="text"]')[1].value;
                const message = this.querySelector('textarea').value;
                
                // Basic validation
                if (!name || !email || !subject || !message) {
                    showNotification('Please fill in all fields.', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showNotification('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Loading screen
    function initLoadingScreen() {
        // Create loading screen
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading';
        loadingScreen.innerHTML = `
            <div class="loading-spinner"></div>
        `;
        document.body.appendChild(loadingScreen);
        
        // Hide loading screen when page is loaded
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1000);
        });
    }
    
    // Parallax effect for hero section
    function initParallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroSection && scrolled < heroSection.offsetHeight) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Initialize parallax effect
    initParallaxEffect();
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to hero title
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.innerHTML;
            heroTitle.innerHTML = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
    
    // Initialize typing effect
    initTypingEffect();
    
    // Add particle effect to hero section
    function initParticleEffect() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        
        heroSection.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resizeCanvas() {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        }
        
        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            };
        }
        
        function initParticles() {
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push(createParticle());
            }
        }
        
        function updateParticles() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            });
        }
        
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.fill();
            });
        }
        
        function animate() {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        }
        
        resizeCanvas();
        initParticles();
        animate();
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }
    
    // Initialize particle effect
    initParticleEffect();
    
    // Add scroll progress indicator
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    // Initialize scroll progress
    initScrollProgress();
    
    // Initialize feedback form functionality
    initFeedbackForm();
    
    // Initialize JVS Info download functionality
    initJVSInfoDownload();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
    
    // Performance optimization: Throttle scroll events
    function throttle(func, wait) {
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
    
    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(() => {
        // Scroll-based animations and effects
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Feedback form functionality
    function initFeedbackForm() {
        const feedbackForm = document.getElementById('feedbackForm');
        const submitBtn = document.getElementById('submitFeedback');
        const feedbackModal = document.getElementById('feedbackModal');
        
        if (!feedbackForm || !submitBtn || !feedbackModal) return;
        
        // Handle form submission
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('reviewerName').value.trim(),
                email: document.getElementById('reviewerEmail').value.trim(),
                rating: document.querySelector('input[name="rating"]:checked')?.value,
                title: document.getElementById('reviewTitle').value.trim(),
                review: document.getElementById('reviewText').value.trim(),
                agreeTerms: document.getElementById('agreeTerms').checked
            };
            
            // Validate form
            if (!formData.name) {
                showNotification('Please enter your name.', 'error');
                return;
            }
            
            if (!formData.email || !isValidEmail(formData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            if (!formData.rating) {
                showNotification('Please select a rating.', 'error');
                return;
            }
            
            if (!formData.review) {
                showNotification('Please write your review.', 'error');
                return;
            }
            
            if (!formData.agreeTerms) {
                showNotification('Please agree to the terms and conditions.', 'error');
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showNotification('Thank you for your feedback! Your review has been submitted successfully.', 'success');
                
                // Reset form
                feedbackForm.reset();
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(feedbackModal);
                if (modal) {
                    modal.hide();
                }
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Log the feedback (in a real app, this would be sent to a server)
                console.log('Feedback submitted:', formData);
                
            }, 2000);
        });
        
        // Add real-time validation
        const nameInput = document.getElementById('reviewerName');
        const emailInput = document.getElementById('reviewerEmail');
        const reviewTextarea = document.getElementById('reviewText');
        
        // Name validation
        nameInput.addEventListener('blur', function() {
            if (this.value.trim().length < 2) {
                this.classList.add('is-invalid');
                showFieldError(this, 'Name must be at least 2 characters long.');
            } else {
                this.classList.remove('is-invalid');
                hideFieldError(this);
            }
        });
        
        // Email validation
        emailInput.addEventListener('blur', function() {
            if (!isValidEmail(this.value.trim())) {
                this.classList.add('is-invalid');
                showFieldError(this, 'Please enter a valid email address.');
            } else {
                this.classList.remove('is-invalid');
                hideFieldError(this);
            }
        });
        
        // Review text validation
        reviewTextarea.addEventListener('blur', function() {
            if (this.value.trim().length < 10) {
                this.classList.add('is-invalid');
                showFieldError(this, 'Review must be at least 10 characters long.');
            } else {
                this.classList.remove('is-invalid');
                hideFieldError(this);
            }
        });
        
        // Clear validation on input
        [nameInput, emailInput, reviewTextarea].forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    this.classList.remove('is-invalid');
                    hideFieldError(this);
                }
            });
        });
    }
    
    // Helper function to show field error
    function showFieldError(field, message) {
        hideFieldError(field); // Remove existing error
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        field.parentNode.appendChild(errorDiv);
    }
    
    // Helper function to hide field error
    function hideFieldError(field) {
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // JVS Info download functionality
    function initJVSInfoDownload() {
        const downloadBtn = document.getElementById('downloadJVSInfo');
        
        if (!downloadBtn) return;
        
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Downloading...';
            this.disabled = true;
            
            // Create a sample PDF content (in a real app, this would be a server endpoint)
            const pdfContent = createSamplePDF();
            
            // Create blob and download
            const blob = new Blob([pdfContent], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'JVS_Tax_Services_Info.pdf';
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            // Show success message
            showNotification('JVS Info PDF downloaded successfully!', 'success');
            
            // Reset button
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    }
    
    // Create sample PDF content (this would typically come from a server)
    function createSamplePDF() {
        // This is a simplified example - in reality, you'd use a PDF library like jsPDF
        // or make an API call to generate the PDF on the server
        const sampleContent = `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 12 Tf
100 700 Td
(JVS Tax Services Information) Tj
0 -20 Td
(Professional Tax Preparation Services) Tj
0 -20 Td
(Contact: 718-395-9663) Tj
0 -20 Td
(Email: support@jvstaxservices.com) Tj
0 -20 Td
(Address: 147 Prince Street, Brooklyn, NY 11201) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000204 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
454
%%EOF
        `;
        
        return sampleContent;
    }
    
    console.log('JVS Tax Services landing page initialized successfully!');
    async function injectPartials() {
        const includeTargets = document.querySelectorAll('[data-include]');
        const loaders = [];
        includeTargets.forEach(target => {
            const url = target.getAttribute('data-include');
            if (!url) return;
            const tryPaths = [url, '/' + url.replace(/^\/?/, '')];
            const load = (async () => {
                for (const path of tryPaths) {
                    try {
                        const res = await fetch(path, { cache: 'no-cache' });
                        if (res.ok) {
                            const html = await res.text();
                            target.outerHTML = html;
                            return;
                        }
                    } catch (err) {
                        // try next path
                    }
                }
                console.warn('Failed to load include:', url, '— If viewing via file://, run a local server.');
            })();
            loaders.push(load);
        });
        if (loaders.length) {
            try { await Promise.all(loaders); } catch (e) {}
        }
    }
});

// Intersection-based enter/exit motion for promo posters
document.addEventListener('DOMContentLoaded', function() {
    const motionItems = document.querySelectorAll('[data-motion]');
    if (!motionItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const el = entry.target;
            if (entry.isIntersecting) {
                el.classList.add('is-visible');
                el.classList.remove('is-exit');
            } else {
                // Apply exit style when leaving viewport (for fade out)
                el.classList.remove('is-visible');
                el.classList.add('is-exit');
            }
        });
    }, { threshold: 0.25 });

    motionItems.forEach((el) => observer.observe(el));
});
