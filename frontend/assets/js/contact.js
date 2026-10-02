/* assets/js/contact.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const modalClose = successModal ? successModal.querySelector('.modal-close') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success modal
            if (successModal) {
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
            }, 2000);
        });
    }

    // ===== CLOSE SUCCESS MODAL =====
    function closeSuccessModal() {
        if (successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeSuccessModal);
    }

    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeSuccessModal();
            }
        });
    }

    // Make close function globally available
    window.closeSuccessModal = closeSuccessModal;

    // ===== PHONE NUMBER FORMATTING =====
    const phoneInput = document.getElementById('contactPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Remove non-numeric characters
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.startsWith('27')) {
                    value = '+' + value;
                } else if (value.startsWith('0')) {
                    value = '+27' + value.slice(1);
                } else if (value.length <= 10) {
                    value = '+27' + value;
                }
                this.value = value;
            }
        });
    }

    // ===== MAP INTERACTION =====
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            // Open in Google Maps
            window.open('https://maps.google.com/maps?q=Mossel+Bay+South+Africa', '_blank');
        });
    }

    // ===== GET DIRECTIONS BUTTON =====
    const directionsBtn = document.querySelector('.map-actions .btn');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://maps.google.com/maps?q=Mossel+Bay+South+Africa', '_blank');
        });
    }

    // ===== PARTNERSHIP CARD ANIMATIONS =====
    const partnershipCards = document.querySelectorAll('.partnership-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
            }
        });
    }, observerOptions);

    partnershipCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`;
        observer.observe(card);
    });
});