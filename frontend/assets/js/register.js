/* assets/js/register.js */
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

    // ===== REGISTER FORM =====
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('regPassword');
            const confirm = document.getElementById('regConfirmPassword');
            
            // Validate password match
            if (password && confirm && password.value !== confirm.value) {
                alert('Passwords do not match!');
                confirm.style.borderColor = '#dc3545';
                return;
            }
            
            // Validate password length
            if (password && password.value.length < 8) {
                alert('Password must be at least 8 characters long.');
                password.style.borderColor = '#dc3545';
                return;
            }
            
            // Validate email
            const email = document.getElementById('regEmail');
            if (email) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value)) {
                    alert('Please enter a valid email address.');
                    email.style.borderColor = '#dc3545';
                    return;
                }
            }
            
            // Simulate registration
            const btn = this.querySelector('.btn');
            const originalText = btn.textContent;
            btn.textContent = 'Creating account...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('Account created successfully! Please check your email to verify your account.');
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // ===== INPUT VALIDATION =====
    const inputs = document.querySelectorAll('.register-form input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '#ddd';
        });
    });

    // ===== PHONE FORMATTING =====
    const phoneInput = document.getElementById('regPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.startsWith('27')) {
                    value = '+' + value;
                } else if (value.startsWith('0')) {
                    value = '+27' + value.slice(1);
                } else if (value.length <= 10) {
                    value = '+27' + value;
                }
                this.value = value;
            }
        });
    }

    // ===== STRONG PASSWORD INDICATOR =====
    const passwordInput = document.getElementById('regPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const val = this.value;
            let strength = 0;
            
            if (val.length >= 8) strength++;
            if (/[a-z]/.test(val) && /[A-Z]/.test(val)) strength++;
            if (/\d/.test(val)) strength++;
            if (/[^a-zA-Z0-9]/.test(val)) strength++;
            
            // Could add visual indicator here
        });
    }
});