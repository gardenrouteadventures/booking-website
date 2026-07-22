/* assets/js/admin.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== SIDEBAR TOGGLE =====
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('adminSidebar');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }

    // ===== ADMIN NAVIGATION =====
    const navLinks = document.querySelectorAll('.sidebar-nav ul li a');
    const sections = document.querySelectorAll('.admin-section');
    const pageTitle = document.getElementById('pageTitle');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't navigate for logout
            if (this.href && this.href.includes('index.html')) return;
            
            e.preventDefault();
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.dataset.section;
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === 'section-' + sectionId) {
                    section.classList.add('active');
                }
            });
            
            // Update page title
            if (pageTitle) {
                const text = this.querySelector('span')?.textContent || 'Dashboard';
                pageTitle.textContent = text;
            }
            
            // Close mobile sidebar
            if (sidebar) {
                sidebar.classList.remove('open');
            }
        });
    });

    // ===== ADMIN SEARCH =====
    const searchInput = document.getElementById('adminSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const tables = document.querySelectorAll('.admin-table tbody');
            
            tables.forEach(table => {
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = query === '' || text.includes(query) ? '' : 'none';
                });
            });
        });
    }

    // ===== TABLE ROW ACTIONS =====
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (this.classList.contains('danger')) {
                if (confirm('Are you sure you want to delete this item?')) {
                    const row = this.closest('tr');
                    if (row) {
                        row.style.opacity = '0';
                        setTimeout(() => {
                            row.remove();
                        }, 300);
                    }
                }
            } else if (this.querySelector('.fa-eye')) {
                alert('Viewing details...');
            } else if (this.querySelector('.fa-edit')) {
                alert('Edit mode activated.');
            }
        });
    });

    // ===== BULK SELECT =====
    document.querySelectorAll('.admin-table thead input[type="checkbox"]').forEach(headerCheck => {
        headerCheck.addEventListener('change', function() {
            const table = this.closest('table');
            const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
            checkboxes.forEach(cb => {
                cb.checked = this.checked;
            });
        });
    });

    // ===== PAGINATION =====
    document.querySelectorAll('.table-pagination .page-btn:not(.next)').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.table-pagination');
            const btns = parent.querySelectorAll('.page-btn:not(.next)');
            btns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    document.querySelectorAll('.table-pagination .next').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.table-pagination');
            const active = parent.querySelector('.page-btn.active');
            const next = active ? active.nextElementSibling : null;
            if (next && !next.classList.contains('next')) {
                next.click();
            }
        });
    });

    // ===== SETTINGS FORM =====
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Settings saved successfully!');
        });
    }

    // ===== REVENUE CHART ANIMATION =====
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        setTimeout(() => {
            const height = bar.style.height;
            bar.style.height = '0';
            setTimeout(() => {
                bar.style.height = height;
            }, 50);
        }, index * 100);
    });

    // ===== NOTIFICATION CLICK =====
    const notificationBell = document.querySelector('.topbar-notifications');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('You have 3 unread notifications.');
        });
    }

    // ===== PROFILE DROPDOWN =====
    const profileEl = document.querySelector('.topbar-profile');
    if (profileEl) {
        profileEl.addEventListener('click', function() {
            // Navigate to profile or show dropdown
            window.location.href = '../dashboard.html';
        });
    }

    // ===== RESPONSIVE TABLE SCROLL =====
    const tables = document.querySelectorAll('.admin-table');
    tables.forEach(table => {
        const parent = table.closest('.card-body');
        if (parent && table.scrollWidth > parent.clientWidth) {
            parent.style.overflowX = 'auto';
        }
    });

    // ===== STAT COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        // Only animate numbers
        if (/^[\d,]+$/.test(text.replace(/,/g, ''))) {
            const target = parseInt(text.replace(/,/g, ''));
            let current = 0;
            const increment = Math.ceil(target / 30);
            const interval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                stat.textContent = current.toLocaleString();
            }, 50);
        }
    });

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        // Ctrl + S to save settings
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            const settingsForm = document.querySelector('.settings-form');
            if (settingsForm) {
                settingsForm.dispatchEvent(new Event('submit'));
            }
        }
    });
});