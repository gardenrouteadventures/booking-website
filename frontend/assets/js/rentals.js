/* assets/js/rentals.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== RENTAL CARD ANIMATIONS =====
    const rentalCards = document.querySelectorAll('.rental-card');
    
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

    rentalCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
        observer.observe(card);
    });

    // ===== RENTAL FILTER (if implemented) =====
    const categoryTitles = document.querySelectorAll('.category-title');
    categoryTitles.forEach(title => {
        title.addEventListener('click', function() {
            const parent = this.closest('.rental-category');
            const grid = parent.querySelector('.rental-grid');
            if (grid) {
                grid.style.display = grid.style.display === 'none' ? 'grid' : 'none';
            }
        });
    });
});