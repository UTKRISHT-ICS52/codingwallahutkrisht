document.addEventListener('DOMContentLoaded', () => {
    // A helper function to safely add event listeners
    function safeAddEventListener(selector, event, handler) {
        const element = document.getElementById(selector);
        // This is the guard clause: only add listener if element exists
        if (element) {
            element.addEventListener(event, handler);
        } else {
            console.warn(`Element with ID "${selector}" not found.`);
        }
    }

    // --- Mobile Menu Toggle ---
    safeAddEventListener('mobile-menu-button', 'click', () => {
        document.getElementById('mobile-menu')?.classList.toggle('hidden');
    });

    // --- Header scroll effect ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-white/80', 'backdrop-blur-sm');
            } else {
                header.classList.remove('bg-white/80', 'backdrop-blur-sm');
            }
        });
    }

    // --- GSAP Scroll Animations (if you are using it) ---
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        const sections = document.querySelectorAll('.section-hidden');
        sections.forEach(section => {
            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleClass: 'section-visible',
                    once: true
                }
            });
        });
    }

    // --- Contact Modal Logic (NOW MORE ROBUST) ---
    const contactModal = document.getElementById('contact-modal');

    function openModal(e) {
        if (e) e.preventDefault();
        if (contactModal) {
            contactModal.classList.remove('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (contactModal) {
            contactModal.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = '';
        }
    }

    // Safely add listeners for all buttons that open/close the modal
    safeAddEventListener('open-contact-modal', 'click', openModal);
    safeAddEventListener('hero-contact-button', 'click', openModal);
    safeAddEventListener('close-contact-modal', 'click', closeModal); // This will now only work if the ID is correct
    safeAddEventListener('open-contact-modal-mobile', 'click', (e) => {
        e.preventDefault();
        document.getElementById('mobile-menu')?.classList.add('hidden');
        openModal();
    });

    // Add listener for clicking the modal background to close
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            // Closes modal only if the click is on the dark background itself
            if (e.target === contactModal) {
                closeModal();
            }
        });
    }

    // --- Form Submission Logic (Unchanged but included for completeness) ---
    async function handleFormSubmission(formId, statusId) {
        const form = document.getElementById(formId);
        const formStatus = document.getElementById(statusId);
        if (!form || !formStatus) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.textContent = 'Sending...';
            // ... rest of your form submission logic
        });
    }

    handleFormSubmission('contact-form', 'form-status');
    handleFormSubmission('modal-contact-form', 'modal-form-status');

    // --- Scroll-to-top button logic ---
    safeAddEventListener('scroll-to-top', 'click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if(scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        });
    }
});
// Add hero-avatar class to the hero image after DOM loads
    document.addEventListener('DOMContentLoaded', function() {
        var heroImg = document.querySelector('#home img');
        if (heroImg) {
            heroImg.classList.add('hero-avatar');
        }
    });