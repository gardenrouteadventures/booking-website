/* assets/js/login.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== PASSWORD TOGGLE =====
    const toggleBtns = document.querySelectorAll('.toggle-password');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.closest('.input-with-icon').querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // ===== LOGIN FORM =====
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');
            
            if (email && password && email.value && password.value) {
                // Simulate login
                const btn = this.querySelector('.btn');
                const originalText = btn.textContent;
                btn.textContent = 'Logging in...';
                btn.disabled = true;
                
                setTimeout(() => {
                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        });
    }

    // ===== REMEMBER ME =====
    const rememberCheck = document.querySelector('.remember-me input');
    if (rememberCheck) {
        // Load saved email if exists
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            const emailInput = document.getElementById('loginEmail');
            if (emailInput) {
                emailInput.value = savedEmail;
                rememberCheck.checked = true;
            }
        }

        rememberCheck.addEventListener('change', function() {
            const emailInput = document.getElementById('loginEmail');
            if (this.checked && emailInput) {
                localStorage.setItem('rememberedEmail', emailInput.value);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
        });
    }

    // ===== FORGOT PASSWORD =====
    const forgotLink = document.querySelector('.forgot-password');
    if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Please contact us at info@gardenrouteadv.com to reset your password.');
        });
    }
});