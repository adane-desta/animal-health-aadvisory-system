const translations = {
    en: {
        title: "Welcome to the Animal Health Advisory System",
        subtitle: "Your trusted platform for better animal health and care",
        features: [
            { title: "For Farmers", description: "Get expert advice to keep your livestock healthy and productive." },
            { title: "For Veterinarians", description: "Collaborate with farmers and share your expertise to improve animal care." },
            { title: "Resources", description: "Access a wealth of knowledge, articles, and guides tailored to animal health." },
            { title: "Appointments", description: "Schedule and manage appointments efficiently through our platform." },
            { title: "News and Updates", description: "Stay informed with the latest trends and news in animal health." },
            { title: "Ask Questions", description: "Post your questions and get answers from veterinary experts." },
        ],
        login: "Login",
        joinUs: "Join Us",
        footer: "&copy; 2025 Animal Health Advisory System. All Rights Reserved."
    },
    am: {
        title: "እንኳን ወደ እንስሳት ጤና አማካሪ ስርዓት በሰላም መጡ",
        subtitle: "የተአምነት መድረክዎ ለምርጥ እንስሳት ጤና እና እንክብካቤ",
        features: [
            { title: "ለገበያኖች", description: "እንስሳትዎን ጤናማ እና ምርታማ እንዲሆኑ የተሟላ ምክር ያግኙ።" },
            { title: "ለእንስሳት ሀኪሞች", description: "ከገበያኖች ጋር በመስራት ዕውቀትዎን ማካፈል በማብራር እንስሳትን ይሻሻሉ።" },
            { title: "ምንጮች", description: "በእንስሳት ጤና ላይ የተሰማራ እውቀት፣ ጽሑፎች፣ እና መመሪያዎችን ያግኙ።" },
            { title: "ቀጠሮዎች", description: "በመድረክው ቀጠሮዎችን በቀላሉ ያስተካክሉ።" },
            { title: "ዜና እና መረጃዎች", description: "በእንስሳት ጤና ላይ የአዲስ ትኩረት ዜና እና ተግባራትን ይከታተሉ።" },
            { title: "ጥያቄ ይጠይቁ", description: "ጥያቄዎችን ያቅርቡ እና ከእንስሳት ባለሙያዎች አንደበት መልስ ይገኛሉ።" },
        ],
        login: "መግቢያ",
        joinUs: "አባል ይሁኑ",
        footer: "&copy; 2025 እንስሳት ጤና አማካሪ ስርዓት። መብቱ በተጠበቀ ነው።"
    },
    or: {
        title: "Baga Nagaan Dhuftan Gara Sirna Gorsa Fayyaa Horii",
        subtitle: "Wiirtuu Dinqisiisoo Gorsa Fayyaa Horiif Amanamaa",
        features: [
            { title: "Farmaa’otaaf", description: "Gorsa ogeessota irraa argachuun horii keesaan fayyaa qabaachisuun ni danda’ama." },
            { title: "Ogeessota Fayyaa Horii", description: "Ogeessota waliin hojii waloon taasifachuun gosa gargaarsa fayyaa fooyyessuuf tumsaa." },
            { title: "Qabeenyaa", description: "Wabiiwwan, barruulee fi kitaabaaleen fayyaa horii irratti xiyyeeffatanitti fayyadamuu." },
            { title: "Waamicha", description: "Tajaajilaafi yeroo waamicha ofumaan to’achaa." },
            { title: "Oduuwwanifi Odeeffannoo", description: "Oduuwwan yeroo ammaa tamsa’an waliin walbaruu." },
            { title: "Gaaffii kaasuuf", description: "Gaaffii keesaan dhiyeeffachuun deebii ogeessotaa argachuuf." },
        ],
        login: "Galmaa’i",
        joinUs: "Hirmaadhu",
        footer: "&copy; 2025 Sirna Gorsa Fayyaa Horii. Mirga Hunda Ni Eegama."
    }
};

const languageSelector = document.getElementById("language-selector");

languageSelector.addEventListener('change', (event) => {
    const selectedLang = event.target.value;
    const content = translations[selectedLang];

    document.querySelector("header h1").textContent = content.title;
    document.querySelector("header p").textContent = content.subtitle;

    const features = document.querySelectorAll(".feature-card");
    content.features.forEach((feature, index) => {
        features[index].querySelector("h3").textContent = feature.title;
        features[index].querySelector("p").textContent = feature.description;
    });

    const buttons = document.querySelector(".buttons").children;
    buttons[0].textContent = content.login;
    buttons[1].textContent = content.joinUs;

    document.querySelector("footer p").innerHTML = content.footer;
});


        document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const mobileCloseBtn = document.querySelector('.mobile-close-btn');
            const mobileNav = document.querySelector('.mobile-nav');
            const mobileOverlay = document.querySelector('.mobile-menu-overlay');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
            
            function openMobileMenu() {
                mobileNav.classList.add('active');
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            function closeMobileMenu() {
                mobileNav.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener('click', openMobileMenu);
            }
            
            if (mobileCloseBtn) {
                mobileCloseBtn.addEventListener('click', closeMobileMenu);
            }
            
            if (mobileOverlay) {
                mobileOverlay.addEventListener('click', closeMobileMenu);
            }
            
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
            
            // Language Selector
            const languageSelectors = document.querySelectorAll('#language-selector, #mobile-language-selector');
            
            languageSelectors.forEach(selector => {
                selector.addEventListener('change', function() {
                    const selectedLanguage = this.value;
                    //change the languag
                    console.log('Language changed to:', selectedLanguage);
                    
                    // Update all selectors to match
                    languageSelectors.forEach(s => {
                        if (s !== this) s.value = selectedLanguage;
                    });
                    
                    // Show a notification
                    showNotification(`Language changed to ${getLanguageName(selectedLanguage)}`);
                });
            });
            
            function getLanguageName(code) {
                const languages = {
                    'en': 'English',
                    'am': 'አማርኛ',
                    'or': 'Afaan Oromoo'
                };
                return languages[code] || code;
            }
            
            // Animate Statistics
            function animateStats() {
                const statNumbers = document.querySelectorAll('.stat-number');
                
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    const suffix = stat.textContent.includes('%') ? '%' : '';
                    const duration = 1500; // 1.5 seconds
                    const step = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(current) + suffix;
                        
                        // Add animation class
                        if (!stat.classList.contains('counting')) {
                            stat.classList.add('counting');
                        }
                    }, 16);
                });
            }
            
            // Initialize stats animation when in viewport
            const observerOptions = {
                threshold: 0.5
            };
            
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                statsObserver.observe(heroSection);
            }
            
            // Initialize Swiper for testimonials
            const testimonialsSwiper = new Swiper('.testimonials-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    }
                }
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    // Skip if it's not an anchor link or it's just "#"
                    if (href === '#' || !href.startsWith('#')) return;
                    
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Add active class to nav links based on scroll position
            function updateActiveNavLink() {
                const sections = document.querySelectorAll('section[id]');
                const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"], .mobile-nav-link[href^="#"]');
                
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.clientHeight;
                    
                    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                        currentSection = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    
                    if (href === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }
            
            window.addEventListener('scroll', updateActiveNavLink);
            
            // Notification system
            function showNotification(message, type = 'info') {
                // Create notification element
                const notification = document.createElement('div');
                notification.className = `notification-toast notification-${type}`;
                notification.innerHTML = `
                    <div class="notification-content">
                        <i class="fas fa-info-circle"></i>
                        <span>${message}</span>
                    </div>
                    <button class="notification-close">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                // Add styles if not already added
                if (!document.querySelector('#notification-styles')) {
                    const style = document.createElement('style');
                    style.id = 'notification-styles';
                    style.textContent = `
                        .notification-toast {
                            position: fixed;
                            top: 20px;
                            right: 20px;
                            background: white;
                            border-radius: 8px;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                            padding: 1rem 1.5rem;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            gap: 1rem;
                            z-index: 10000;
                            animation: slideInRight 0.3s ease-out;
                            max-width: 350px;
                            border-left: 4px solid var(--primary-color);
                        }
                        
                        .notification-info {
                            border-left-color: var(--primary-color);
                        }
                        
                        .notification-success {
                            border-left-color: var(--success-color);
                        }
                        
                        .notification-warning {
                            border-left-color: var(--warning-color);
                        }
                        
                        .notification-error {
                            border-left-color: var(--danger-color);
                        }
                        
                        .notification-content {
                            display: flex;
                            align-items: center;
                            gap: 0.75rem;
                            flex: 1;
                        }
                        
                        .notification-content i {
                            font-size: 1.25rem;
                        }
                        
                        .notification-info .notification-content i {
                            color: var(--primary-color);
                        }
                        
                        .notification-close {
                            background: none;
                            border: none;
                            color: var(--gray-color);
                            cursor: pointer;
                            font-size: 1rem;
                            padding: 0;
                            width: 24px;
                            height: 24px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 4px;
                            transition: all 0.2s;
                        }
                        
                        .notification-close:hover {
                            background-color: rgba(0,0,0,0.05);
                            color: var(--dark-color);
                        }
                        
                        @keyframes slideInRight {
                            from {
                                transform: translateX(100%);
                                opacity: 0;
                            }
                            to {
                                transform: translateX(0);
                                opacity: 1;
                            }
                        }
                        
                        @keyframes slideOutRight {
                            from {
                                transform: translateX(0);
                                opacity: 1;
                            }
                            to {
                                transform: translateX(100%);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                document.body.appendChild(notification);
                
                // Add close functionality
                const closeBtn = notification.querySelector('.notification-close');
                closeBtn.addEventListener('click', () => {
                    notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                });
                
                // Auto remove after 5 seconds
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
                        setTimeout(() => {
                            if (notification.parentNode) {
                                notification.parentNode.removeChild(notification);
                            }
                        }, 300);
                    }
                }, 5000);
            }
            
            // Add animation for feature cards on scroll
            const featureCards = document.querySelectorAll('.feature-card');
            const featureObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('fade-in-up');
                        }, index * 100);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            featureCards.forEach(card => {
                featureObserver.observe(card);
            });
            
            // Add animation for steps
            const steps = document.querySelectorAll('.step');
            const stepObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('fade-in-up');
                        }, index * 200);
                    }
                });
            }, {
                threshold: 0.2
            });
            
            steps.forEach(step => {
                stepObserver.observe(step);
            });
            
            // Demo video play button
            const playButton = document.querySelector('.play-button');
            if (playButton) {
                playButton.addEventListener('click', function() {
                    showNotification('Video player would open here in a real implementation', 'info');
                });
            }
            
            // Initialize the page
            updateActiveNavLink();
        });
    
