<meta name='viewport' content='width=device-width, initial-scale=1'/><script>// Throttle function for performance
const throttle = (func, delay) => {
    let lastCall = 0;
    return function(...args) {
        const now = (new Date()).getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
};

// --- Core Animation & UX Functions ---

// Scroll Reveal Animation
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Uncomment to run only once
            }
            /* else {
                entry.target.classList.remove('active'); // Uncomment to repeat animation on scroll back
            } */
        });
    }, { rootMargin: "0px 0px -10% 0px" });

    reveals.forEach(el => {
        // Apply staggered delay using CSS variable
        const delay = el.getAttribute('style') ? el.getAttribute('style').match(/--delay:(\d?\.?\d+s)/) : null;
        if (!delay) {
             el.style.setProperty('--delay', '0s'); // Default delay
        }
        observer.observe(el);
    });
}

// Parallax Effect (Simple background movement)
function initParallax() {
    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', throttle(() => {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.2}px)`;
        }, 50));
    }
}

// Smooth Scroll (Modified to exclude #login link)
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const targetId = anchor.getAttribute('href');
        
        // Skip smooth scrolling for the login link; handled by initLoginModal
        if (targetId === '#login') {
            return;
        }
        
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Dynamic Typing (Typing effect on Hero h1) - Placeholder function
function initDynamicTyping() {
    console.log('Dynamic Typing Placeholder initialized.');
}

// --- Interactive Components Functions ---

// Stat Counter (Placeholder)
function initStatCounter() {
    console.log('Stat Counter Placeholder initialized.');
}

// Portfolio Filter (Placeholder)
function initPortfolioFilter() {
    console.log('Portfolio Filter Placeholder initialized.');
}

// Testimonial Slider (Placeholder)
function initTestimonialSlider() {
    console.log('Testimonial Slider Placeholder initialized.');
}

// Contact Form Validation and Submission Simulation
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const messageEl = document.getElementById('form-submission-message');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Clear previous errors
        document.getElementById('name-error').textContent = '';
        document.getElementById('email-error').textContent = '';
        document.getElementById('message-error').textContent = '';
        messageEl.textContent = '';

        // Simple validation logic
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.length < 2) {
            document.getElementById('name-error').textContent = 'দয়া করে আপনার পুরো নাম লিখুন।';
            isValid = false;
        }

        if (!emailRegex.test(email)) {
            document.getElementById('email-error').textContent = 'একটি বৈধ ইমেইল দিন।';
            isValid = false;
        }

        if (message.length < 10) {
            document.getElementById('message-error').textContent = 'বার্তাটি কমপক্ষে ১০ অক্ষরের হতে হবে।';
            isValid = false;
        }

        if (isValid) {
            // Submission Simulation
            messageEl.style.color = 'var(--accent1)';
            messageEl.textContent = 'বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।';
            form.reset(); 
            
            // You would replace this with an actual AJAX fetch call to your server endpoint
            console.log('Form Submitted Data:', { name, email, message });
        }
    });
}

// NEW: Google Social Login Handler (from login 9.html)
function handleGoogleLogin(response) {
    const idToken = response.credential;
    console.log("Google Login Token received. Send this to your secure backend.");
    console.log("ID Token:", idToken); 
    alert('Google Login Successful (Token received)!');
    // TODO: সার্ভারে টোকেন পাঠানোর কোড এখানে লিখুন
}

// NEW: Facebook SDK Initialization and Login Logic (from login 9.html)
function initFacebookLogin() {
    // 1. Initialize Facebook SDK
    window.fbAsyncInit = function() {
        FB.init({
            appId      : 'YOUR_FACEBOOK_APP_ID', // <-- আপনার Facebook App ID দিন
            cookie     : true,
            xfbml      : true,
            version    : 'v18.0' 
        });
    };
    
    // Load the SDK asynchronously
    (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // 2. Add Event Listener to the Button
    const facebookBtn = document.getElementById('facebook-login-btn-front');
    if (facebookBtn) {
        facebookBtn.addEventListener('click', () => {
            if (typeof FB === 'undefined') {
                console.error('Facebook SDK not loaded yet.');
                alert('Facebook SDK লোড হচ্ছে, অনুগ্রহ করে আবার চেষ্টা করুন।');
                return;
            }
            
            FB.login(function(response) {
                if (response.authResponse) {
                    const accessToken = response.authResponse.accessToken;
                    console.log('Facebook Login Successful. Send token to backend.');
                    console.log('Access Token:', accessToken);
                    alert('Facebook Login Successful (Token received)!');
                    // TODO: সার্ভারে টোকেন পাঠানোর কোড এখানে লিখুন
                } else {
                    console.log('User cancelled Facebook operation.');
                }
            }, {scope: 'email,public_profile'}); 
        });
    }
}


// NEW: Regular Form Validation for Email/Password (Login Section)
function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Clear previous errors
        document.getElementById('login-email-error').textContent = '';
        document.getElementById('login-password-error').textContent = '';

        const emailInput = document.getElementById('login-email');
        const emailError = document.getElementById('login-email-error');
        const passwordInput = document.getElementById('login-password');
        const passwordError = document.getElementById('login-password-error');

        // Simple client-side validation logic
        if (emailInput.value.trim().length < 5) {
            emailError.textContent = 'ব্যবহারকারীর নাম/ইমেইল লিখুন।';
            isValid = false;
        } 

        if (passwordInput.value.trim().length < 6) {
            passwordError.textContent = 'পাসওয়ার্ডটি কমপক্ষে ৬ অক্ষরের হতে হবে।';
            isValid = false;
        } 

        if (isValid) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // --- SUCCESS SIMULATION ---
            console.log('Login Attempt Data (Simulated Success):', data);
            
            alert('সফলভাবে লগইন করা হয়েছে (Simulation)!');
            // form.reset(); // Don't reset if we expect a redirect 
        }
    });
}

// NEW: Login Modal Handler
function initLoginModal() {
    const modal = document.getElementById('loginModal');
    const openBtn = document.querySelector('a[href="#login"]');
    const closeBtn = modal.querySelector('.modal-close');
    
    if (!modal || !openBtn || !closeBtn) return;
    
    // Function to open modal
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    });

    // Function to close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Close button click
    closeBtn.addEventListener('click', closeModal);

    // Click outside modal to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}


// FAQ Toggle
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Close others
            document.querySelectorAll('.faq-question').forEach(q => {
                if (q !== question && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.display = 'none';
                    q.querySelector('i').classList.remove('fa-chevron-up');
                    q.querySelector('i').classList.add('fa-chevron-down');
                }
            });

            // Toggle current
            question.classList.toggle('active');
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                answer.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
}

// Case Studies (Placeholder)
function initCaseStudies() {
    console.log('Case Studies Placeholder initialized.');
}

// Guarantee Section (Placeholder)
function initGuarantee() {
    console.log('Guarantee Section Placeholder initialized.');
}

// Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav .links');
    
    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
        toggle.classList.toggle('fa-bars');
        toggle.classList.toggle('fa-times');
    });
    
    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (links.classList.contains('active')) {
                links.classList.remove('active');
                toggle.classList.remove('fa-times');
                toggle.classList.add('fa-bars');
            }
        });
    });
}

// Back to Top Button visibility
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    const toggleVisibility = throttle(() => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }, 100);

    window.addEventListener('scroll', toggleVisibility);
}

// Floating CTAs visibility
function initFloatingCTAs() {
    const floatingCTA = document.querySelector('.floating-cta');
    const contactSection = document.getElementById('contact');
    if (!floatingCTA || !contactSection) return;
    
    // Hide CTAs when contact section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const floatingCTA = document.querySelector('.floating-cta');
            if (!floatingCTA) return;
            
            if (window.matchMedia('(min-width: 992px)').matches) {
                if (entry.isIntersecting) {
                    floatingCTA.style.display = 'none';
                } else if (window.scrollY > 500) {
                    floatingCTA.style.display = 'block';
                }
            }
        });
    }, { rootMargin: "0px 0px 0px 0px", threshold: 0 }); 

    observer.observe(contactSection);
    
    // Show CTAs only after scrolling down a bit (mobile only)
    window.addEventListener('scroll', throttle(() => {
        if (window.matchMedia('(max-width: 992px)').matches) {
             if (window.scrollY < 500) {
                floatingCTA.style.display = 'none';
            } else if (contactSection && contactSection.getBoundingClientRect().top > window.innerHeight) {
                floatingCTA.style.display = 'block';
            }
        }
    }, 100));
}


// --- Main Execution Block ---
document.addEventListener('DOMContentLoaded', () => {
    // Core Animation & UX
    initScrollReveal(); 
    initParallax();
    initSmoothScroll();
    initDynamicTyping();

    // Interactive Components
    initStatCounter();
    initPortfolioFilter();
    initTestimonialSlider();
    initFormValidation();
    initLoginForm();        // Initialize Login Form (Email/Pass)
    initFacebookLogin();    // Initialize Facebook SDK
    initLoginModal();       // Initialize Login Modal Handler
    initFAQ();
    initCaseStudies(); 
    initGuarantee(); 
    initMobileMenu();
    initBackToTop();
    initFloatingCTAs(); 
});
</script>
