document.addEventListener('DOMContentLoaded', () => {

    function safeAddEventListener(selector, event, handler) {
        const element = document.getElementById(selector);
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

    // --- Header Scroll Effect ---
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

    // --- GSAP Scroll Animations ---
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

    // --- EmailJS Init ---


    // --- Contact Modal Logic ---
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

    // Modal open/close buttons
    safeAddEventListener('open-contact-modal', 'click', openModal);
    safeAddEventListener('hero-contact-button', 'click', openModal);
    safeAddEventListener('close-contact-modal', 'click', closeModal);
    safeAddEventListener('open-contact-modal-mobile', 'click', (e) => {
        e.preventDefault();
        document.getElementById('mobile-menu')?.classList.add('hidden');
        openModal();
    });

    // Close modal on background click
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) closeModal();
        });
    }

    // --- Main Page Contact Form ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector("button[type='submit']");
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";
            if (formStatus) formStatus.innerText = "";

            emailjs.send("service_ie5htsq", "template_5ztkwno", {
                name: contactForm.querySelector("[name='name']").value,
                email: contactForm.querySelector("[name='email']").value,
                message: contactForm.querySelector("[name='message']").value,
            }).then(function() {
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
                if (formStatus) {
                    formStatus.style.color = "green";
                    formStatus.innerText = "✅ Message sent successfully!";
                }
                contactForm.reset();
            }, function(error) {
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
                if (formStatus) {
                    formStatus.style.color = "red";
                    formStatus.innerText = "❌ Failed to send. Try again!";
                }
                console.error("EmailJS Error:", error);
            });
        });
    }

    // --- Modal Contact Form ---
    const modalForm = document.getElementById('modal-contact-form');
    const modalStatus = document.getElementById('modal-form-status');

    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = modalForm.querySelector("button[type='submit']");
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";
            if (modalStatus) modalStatus.innerText = "";

            emailjs.send("service_ie5htsq", "template_5ztkwno", {
                name: modalForm.querySelector("[name='name']").value,
                email: modalForm.querySelector("[name='email']").value,
                message: modalForm.querySelector("[name='message']").value,
            }).then(function() {
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
                if (modalStatus) {
                    modalStatus.style.color = "green";
                    modalStatus.innerText = "✅ Message sent successfully!";
                }
                modalForm.reset();
            }, function(error) {
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
                if (modalStatus) {
                    modalStatus.style.color = "red";
                    modalStatus.innerText = "❌ Failed to send. Try again!";
                }
                console.error("EmailJS Error:", error);
            });
        });
    }

    // --- Scroll To Top ---
    safeAddEventListener('scroll-to-top', 'click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        });
    }

});

// --- Hero Avatar ---
document.addEventListener('DOMContentLoaded', function() {
    var heroImg = document.querySelector('#home img');
    if (heroImg) {
        heroImg.classList.add('hero-avatar');
    }
});