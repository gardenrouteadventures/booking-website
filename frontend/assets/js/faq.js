/* assets/js/faq.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('open');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('open')) {
                        otherItem.classList.remove('open');
                    }
                });
                
                // Toggle this item
                if (isOpen) {
                    item.classList.remove('open');
                } else {
                    item.classList.add('open');
                }
            });
        }
    });

    // ===== FAQ CATEGORY FILTER =====
    const categoryBtns = document.querySelectorAll('.faq-category-btn');
    const faqItemsAll = document.querySelectorAll('.faq-item');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;

            faqItemsAll.forEach(item => {
                const itemCategory = item.dataset.category;
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ===== FAQ SEARCH =====
    const searchInput = document.getElementById('faqSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            faqItemsAll.forEach(item => {
                const question = item.querySelector('.faq-question span:not(.faq-icon):not(.faq-toggle)');
                const answer = item.querySelector('.faq-answer');
                const questionText = question ? question.textContent.toLowerCase() : '';
                const answerText = answer ? answer.textContent.toLowerCase() : '';
                
                if (query === '' || questionText.includes(query) || answerText.includes(query)) {
                    item.style.display = 'block';
                    // Highlight matches
                    if (query !== '') {
                        item.style.borderColor = 'var(--primary)';
                    } else {
                        item.style.borderColor = '#eee';
                    }
                } else {
                    item.style.display = 'none';
                }
            });

            // Reset category buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
        });
    }

    // ===== OPEN FIRST FAQ ITEM BY DEFAULT =====
    if (faqItems.length > 0) {
        faqItems[0].classList.add('open');
    }
});