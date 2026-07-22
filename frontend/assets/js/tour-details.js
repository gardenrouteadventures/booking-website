/* assets/js/tour-details.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== TOUR GALLERY THUMBNAILS =====
    const thumbnails = document.querySelectorAll('.tour-thumbnails img');
    const mainImage = document.querySelector('.tour-main-image img');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            if (mainImage) {
                mainImage.src = this.src;
                mainImage.alt = this.alt;
            }
            
            // Highlight active thumbnail
            thumbnails.forEach(t => t.style.opacity = '0.5');
            this.style.opacity = '1';
        });
        // Set initial opacity
        thumb.style.opacity = '0.5';
    });
    // Set first thumbnail active
    if (thumbnails.length > 0) {
        thumbnails[0].style.opacity = '1';
    }

    // ===== BOOK NOW BUTTONS =====
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Book Now') || btn.textContent.includes('Book This Tour')) {
            btn.addEventListener('click', function(e) {
                // The href already goes to booking page
            });
        }
    });

    // ===== PRICE DISPLAY =====
    const priceEl = document.querySelector('.price-display .price');
    if (priceEl) {
        // Add hover effect
        priceEl.closest('.booking-card-sidebar').addEventListener('mouseenter', function() {
            this.style.boxShadow = 'var(--shadow-hover)';
        });
        priceEl.closest('.booking-card-sidebar').addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow)';
        });
    }
});