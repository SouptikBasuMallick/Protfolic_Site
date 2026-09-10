// =====================================================
// GLOBAL THEME TOGGLE (DARK / LIGHT MODE)
// =====================================================

const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Check saved theme from localStorage
const savedTheme = localStorage.getItem('selectedTheme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

themeToggleBtn.addEventListener('click', () => {
    // Toggle dark mode class on document body
    document.body.classList.toggle('dark-mode');

    const isDarkMode = document.body.classList.contains('dark-mode');

    // Save user choice in localStorage
    localStorage.setItem('selectedTheme', isDarkMode ? 'dark' : 'light');

    // Toggle icon state
    if (themeIcon) {
        if (isDarkMode) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }
});


// =====================================================
// MOBILE NAVIGATION MENU TOGGLE
// =====================================================

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile nav menu when clicking any navigation link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}


// =====================================================
// CONTACT FORM EMAIL SUBMISSION (AJAX)
// =====================================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        // Feedback state: Sending...
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            // Sends data using Formspree endpoint defined in HTML
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert("Thank you! Your message has been sent successfully.");
                contactForm.reset();
            } else {
                alert("Oops! There was a problem sending your message. Please try again.");
            }
        } catch (error) {
            alert("Error connecting to the mail service. Please check your connection.");
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}


// =====================================================
// DYNAMIC FOOTER YEAR
// =====================================================

const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}