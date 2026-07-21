/* assets/js/dashboard.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== DASHBOARD NAVIGATION =====
    const navLinks = document.querySelectorAll('.dashboard-nav ul li a');
    const sections = document.querySelectorAll('.dashboard-section-content');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't navigate if it's logout
            if (this.id === 'logoutBtn') return;
            
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
        });
    });

    // ===== LOGOUT =====
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = 'login.html';
            }
        });
    }

    // ===== PROFILE FORM =====
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Profile updated successfully!');
        });
    }

    // ===== PASSWORD FORM =====
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newPass = document.getElementById('newPassword');
            const confirmPass = document.getElementById('confirmPassword');
            
            if (newPass && confirmPass) {
                if (newPass.value !== confirmPass.value) {
                    alert('Passwords do not match!');
                    return;
                }
                
                if (newPass.value.length < 8) {
                    alert('Password must be at least 8 characters long.');
                    return;
                }
                
                alert('Password updated successfully!');
                passwordForm.reset();
            }
        });
    }

    // ===== QUICK ACTION BUTTONS =====
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Handle quick actions
            const text = this.querySelector('span')?.textContent || '';
            if (text.includes('New Booking')) {
                window.location.href = 'booking.html';
            } else if (text.includes('Download Invoices')) {
                alert('Invoices will be downloaded as PDF.');
            } else if (text.includes('Sign Waiver')) {
                alert('Redirecting to waiver signing...');
            }
        });
    });

    // ===== BOOKING ACTION BUTTONS =====
    document.querySelectorAll('.booking-actions .btn-danger').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to cancel this booking?')) {
                const card = this.closest('.booking-card');
                if (card) {
                    const status = card.querySelector('.booking-status');
                    if (status) {
                        status.className = 'booking-status cancelled';
                        status.textContent = 'Cancelled';
                    }
                    alert('Booking cancelled successfully.');
                }
            }
        });
    });

    // ===== INVOICE DOWNLOAD =====
    document.querySelectorAll('.invoice-item .btn-outline').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Downloading invoice PDF...');
        });
    });

    // ===== WAIVER SIGN =====
    document.querySelectorAll('.waiver-item .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Do you agree to the terms and conditions of the waiver?')) {
                const item = this.closest('.waiver-item');
                if (item) {
                    const status = item.querySelector('.waiver-status');
                    if (status) {
                        status.className = 'waiver-status signed';
                        status.textContent = 'Signed';
                    }
                    this.textContent = 'Signed';
                    this.className = 'btn btn-success btn-sm';
                    alert('Waiver signed successfully!');
                }
            }
        });
    });

    // ===== DELETE ACCOUNT =====
    const deleteBtn = document.querySelector('.btn-danger');
    if (deleteBtn && deleteBtn.textContent.includes('Delete Account')) {
        deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                if (confirm('Please confirm: Do you really want to delete your account and all associated data?')) {
                    alert('Account deletion request submitted. You will be contacted shortly.');
                }
            }
        });
    }

    // ===== NOTIFICATION SETTINGS =====
    document.querySelectorAll('.notification-settings input').forEach(input => {
        input.addEventListener('change', function() {
            const label = this.closest('label');
            const setting = label ? label.textContent.trim() : 'Setting';
            alert(setting + ' preference updated.');
        });
    });
});