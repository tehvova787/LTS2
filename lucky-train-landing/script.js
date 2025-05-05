document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });

    // Redirect CTA buttons to Telegram
    const ctaButtons = document.querySelectorAll('.cta-button, .ticket-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Replace with actual Telegram mini app link
            window.open('https://t.me/your_bot_name', '_blank');
        });
    });

    // Animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .step, .ticket-card, .security-feature');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Countdown timer (optional feature - for token launch)
    function setupCountdown() {
        const countdownElement = document.querySelector('.token-countdown');
        if (!countdownElement) return;
        
        // Set launch date (replace with actual date)
        const launchDate = new Date('2025-09-01T00:00:00').getTime();
        
        const countdownInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = launchDate - now;
            
            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            countdownElement.innerHTML = `
                <div class="countdown-item"><span>${days}</span> дней</div>
                <div class="countdown-item"><span>${hours}</span> часов</div>
                <div class="countdown-item"><span>${minutes}</span> минут</div>
                <div class="countdown-item"><span>${seconds}</span> секунд</div>
            `;
            
            // If countdown finished
            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = "<div class='launched'>TrainCoin запущен!</div>";
            }
        }, 1000);
    }

    setupCountdown();

    // Mobile menu toggle (for smaller screens)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Add animation classes to CSS
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .feature-card, .step, .ticket-card, .security-feature {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .feature-card.animate, .step.animate, .ticket-card.animate, .security-feature.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .step:nth-child(1), .feature-card:nth-child(1), .ticket-card:nth-child(1), .security-feature:nth-child(1) {
                transition-delay: 0.1s;
            }
            
            .step:nth-child(2), .feature-card:nth-child(2), .ticket-card:nth-child(2), .security-feature:nth-child(2) {
                transition-delay: 0.2s;
            }
            
            .step:nth-child(3), .feature-card:nth-child(3), .ticket-card:nth-child(3), .security-feature:nth-child(3) {
                transition-delay: 0.3s;
            }
            
            .step:nth-child(4), .feature-card:nth-child(4), .ticket-card:nth-child(4) {
                transition-delay: 0.4s;
            }
            
            header.scrolled {
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                padding: 5px 0;
            }
            
            .countdown-item {
                display: inline-block;
                margin: 0 10px;
                text-align: center;
            }
            
            .countdown-item span {
                display: block;
                font-size: 2rem;
                font-weight: 700;
                color: var(--primary);
            }
        </style>
    `);
}); 