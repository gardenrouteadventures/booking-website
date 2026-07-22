/* assets/js/rental-details.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== RENTAL GALLERY THUMBNAILS =====
    const thumbnails = document.querySelectorAll('.rental-thumbnails img');
    const mainImage = document.querySelector('.rental-main-image img');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            if (mainImage) {
                mainImage.src = this.src;
                mainImage.alt = this.alt;
            }
            thumbnails.forEach(t => t.style.opacity = '0.5');
            this.style.opacity = '1';
        });
        thumb.style.opacity = '0.5';
    });
    if (thumbnails.length > 0) {
        thumbnails[0].style.opacity = '1';
    }

    // ===== SPECS EXPAND =====
    const specs = document.querySelector('.rental-specs');
    if (specs) {
        const specsGrid = specs.querySelector('.specs-grid');
        if (specsGrid) {
            // Add hover effect
            specsGrid.querySelectorAll('.spec-item').forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.background = 'var(--light-gray)';
                });
                item.addEventListener('mouseleave', function() {
                    this.style.background = 'transparent';
                });
            });
        }
    }

    // ===== RENTAL DURATION CALCULATOR =====
    const durationSelect = document.querySelector('.duration-picker select');
    if (durationSelect) {
        durationSelect.addEventListener('change', function() {
            const days = parseInt(this.value);
            const dailyRate = 2500; // Example rate
            const total = days * dailyRate;
            
            const priceDisplay = document.querySelector('.price-display .price');
            if (priceDisplay) {
                if (days === 1) {
                    priceDisplay.textContent = `R${dailyRate.toLocaleString()}`;
                } else {
                    priceDisplay.textContent = `R${total.toLocaleString()}`;
                }
            }
        });
    }
});