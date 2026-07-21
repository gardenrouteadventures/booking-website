/* assets/js/legal.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== SMOOTH SCROLL FOR LEGAL NAV =====
    const legalLinks = document.querySelectorAll('.legal-section-block h2');
    if (legalLinks.length > 0) {
        // Make h2s clickable for easy navigation
        legalLinks.forEach((h2, index) => {
            h2.style.cursor = 'pointer';
            h2.addEventListener('click', function() {
                // Scroll to top of this section
                const block = this.closest('.legal-section-block');
                if (block) {
                    block.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ===== PRINT FUNCTIONALITY =====
    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn-outline btn-sm';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print';
    printBtn.style.position = 'fixed';
    printBtn.style.bottom = '20px';
    printBtn.style.right = '90px';
    printBtn.style.zIndex = '999';
    
    const legalWrapper = document.querySelector('.legal-wrapper');
    if (legalWrapper && !document.querySelector('.print-btn')) {
        printBtn.classList.add('print-btn');
        printBtn.addEventListener('click', function() {
            window.print();
        });
        document.body.appendChild(printBtn);
    }

    // ===== BACK TO TOP =====
    const backToTop = document.createElement('button');
    backToTop.className = 'scroll-top visible';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.style.position = 'fixed';
    backToTop.style.bottom = '20px';
    backToTop.style.right = '20px';
    backToTop.style.zIndex = '999';
    
    if (legalWrapper) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(backToTop);
    }
});