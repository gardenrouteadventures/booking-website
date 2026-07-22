/* assets/js/sales.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== SALES FILTERS =====
    const bikeTypeFilter = document.getElementById('bikeType');
    const priceRangeFilter = document.getElementById('priceRange');
    const yearFilter = document.getElementById('yearFilter');
    const salesCards = document.querySelectorAll('.sales-card');

    function filterSales() {
        const bikeType = bikeTypeFilter ? bikeTypeFilter.value : 'all';
        const priceRange = priceRangeFilter ? priceRangeFilter.value : 'all';
        const year = yearFilter ? yearFilter.value : 'all';

        salesCards.forEach(card => {
            const cardType = card.dataset.type || '';
            const cardPrice = parseInt(card.dataset.price) || 0;
            const cardYear = card.dataset.year || '';

            let typeMatch = bikeType === 'all' || cardType === bikeType;
            
            let priceMatch = true;
            if (priceRange !== 'all') {
                switch(priceRange) {
                    case 'under100k': priceMatch = cardPrice < 100000; break;
                    case '100k-200k': priceMatch = cardPrice >= 100000 && cardPrice <= 200000; break;
                    case '200k-300k': priceMatch = cardPrice > 200000 && cardPrice <= 300000; break;
                    case 'over300k': priceMatch = cardPrice > 300000; break;
                }
            }
            
            let yearMatch = year === 'all' || cardYear === year;

            card.style.display = (typeMatch && priceMatch && yearMatch) ? 'block' : 'none';
        });
    }

    if (bikeTypeFilter) bikeTypeFilter.addEventListener('change', filterSales);
    if (priceRangeFilter) priceRangeFilter.addEventListener('change', filterSales);
    if (yearFilter) yearFilter.addEventListener('change', filterSales);

    // ===== ENQUIRY MODAL =====
    const enquiryModal = document.getElementById('enquiryModal');
    const modalClose = enquiryModal ? enquiryModal.querySelector('.modal-close') : null;
    const enquiryBtns = document.querySelectorAll('.enquiry-btn');

    enquiryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const bikeName = this.dataset.bike || 'Motorcycle';
            const modalBikeName = document.getElementById('modalBikeName');
            if (modalBikeName) {
                modalBikeName.textContent = bikeName;
            }
            if (enquiryModal) {
                enquiryModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            enquiryModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (enquiryModal) {
        enquiryModal.addEventListener('click', function(e) {
            if (e.target === this) {
                enquiryModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== ENQUIRY FORM SUBMIT =====
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your enquiry! Our sales team will contact you within 24 hours.');
            this.reset();
        });
    }

    // ===== MODAL ENQUIRY FORM =====
    const modalEnquiryForm = document.getElementById('modalEnquiryForm');
    if (modalEnquiryForm) {
        modalEnquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! We will get back to you shortly.');
            enquiryModal.classList.remove('active');
            document.body.style.overflow = '';
            this.reset();
        });
    }
});