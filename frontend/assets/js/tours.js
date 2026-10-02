/* assets/js/tours.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== TOUR FILTER =====
    const filterSelect = document.getElementById('tourFilter');
    const sortSelect = document.getElementById('tourSort');
    const tourItems = document.querySelectorAll('.tour-item');

    function filterTours() {
        const filterValue = filterSelect ? filterSelect.value : 'all';
        const sortValue = sortSelect ? sortSelect.value : 'popular';

        let visibleItems = [];

        tourItems.forEach(item => {
            const category = item.dataset.category;
            const shouldShow = filterValue === 'all' || category === filterValue;
            item.style.display = shouldShow ? 'grid' : 'none';
            if (shouldShow) {
                visibleItems.push(item);
            }
        });

        // Sorting
        if (sortValue !== 'popular') {
            const container = document.getElementById('tourList');
            if (container) {
                const items = Array.from(container.children);
                items.sort((a, b) => {
                    const priceA = parseInt(a.dataset.price);
                    const priceB = parseInt(b.dataset.price);
                    const durationA = parseInt(a.dataset.duration);
                    const durationB = parseInt(b.dataset.duration);

                    if (sortValue === 'price-low') return priceA - priceB;
                    if (sortValue === 'price-high') return priceB - priceA;
                    if (sortValue === 'duration') return durationA - durationB;
                    return 0;
                });

                items.forEach(item => {
                    if (item.style.display !== 'none') {
                        container.appendChild(item);
                    }
                });
            }
        }
    }

    if (filterSelect) {
        filterSelect.addEventListener('change', filterTours);
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', filterTours);
    }

    // ===== TOUR CARD ANIMATIONS =====
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
                }, index * 100);
            }
        });
    }, observerOptions);

    tourItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // ===== PRICE FORMATTING =====
    document.querySelectorAll('.tour-item-price').forEach(el => {
        const price = el.textContent.trim();
        // Keep as is - prices are already formatted
    });
});