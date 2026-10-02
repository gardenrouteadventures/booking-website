/* assets/js/booking.js - COMPLETE FIXED FILE */
document.addEventListener('DOMContentLoaded', function() {
    // ===== BOOKING STEPS NAVIGATION =====
    let currentStep = 1;
    const totalSteps = 6;
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.booking-step');

    function updateStep(step) {
        // Update step indicators
        steps.forEach((s, index) => {
            const num = index + 1;
            s.classList.remove('active', 'completed');
            if (num === step) {
                s.classList.add('active');
            } else if (num < step) {
                s.classList.add('completed');
            }
        });

        // Update content
        stepContents.forEach((content, index) => {
            content.classList.remove('active');
            if (index + 1 === step) {
                content.classList.add('active');
            }
        });

        currentStep = step;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ===== EXPERIENCE SELECTION - FIXED =====
    const experienceCards = document.querySelectorAll('.experience-card');
    const selectExperienceBtns = document.querySelectorAll('.select-experience');

    // Click on the card itself selects it
    experienceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the button inside
            if (e.target.closest('.select-experience')) return;
            
            experienceCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Auto-advance to step 2 after selection
            setTimeout(() => {
                if (currentStep === 1) {
                    updateStep(2);
                }
            }, 400);
        });
    });

    // Click on the "Select Tour" or "Select Rental" button
    selectExperienceBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click from firing twice
            
            const parentCard = this.closest('.experience-card');
            if (!parentCard) return;
            
            // Remove selection from all cards
            experienceCards.forEach(c => c.classList.remove('selected'));
            
            // Select this card
            parentCard.classList.add('selected');
            
            // Store the selected type
            const type = this.dataset.type || 'tour';
            parentCard.dataset.selectedType = type;
            
            // Move to step 2
            if (currentStep === 1) {
                updateStep(2);
            }
        });
    });

    // ===== NEXT/PREVIOUS BUTTONS =====
    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', function() {
            const next = currentStep + 1;
            if (next <= totalSteps) {
                // Validate current step
                if (currentStep === 1) {
                    const selected = document.querySelector('.experience-card.selected');
                    if (!selected) {
                        alert('Please select an experience first (Tour or Rental).');
                        // Highlight the cards to draw attention
                        document.querySelector('.experience-options').style.border = '2px solid var(--primary)';
                        document.querySelector('.experience-options').style.borderRadius = '12px';
                        setTimeout(() => {
                            document.querySelector('.experience-options').style.border = 'none';
                        }, 2000);
                        return;
                    }
                }
                if (currentStep === 2) {
                    const date = document.getElementById('bookingDate');
                    const time = document.getElementById('bookingTime');
                    if (!date.value || !time.value) {
                        alert('Please select a date and time.');
                        return;
                    }
                }
                if (currentStep === 3) {
                    const form = document.getElementById('riderDetailsForm');
                    const inputs = form.querySelectorAll('input[required]');
                    let valid = true;
                    inputs.forEach(input => {
                        if (!input.value.trim()) {
                            valid = false;
                            input.style.borderColor = '#dc3545';
                        } else {
                            input.style.borderColor = '#ddd';
                        }
                    });
                    if (!valid) {
                        alert('Please fill in all required fields.');
                        return;
                    }
                }
                if (currentStep === 4) {
                    // Add-ons are optional - just continue
                }
                if (currentStep === 5) {
                    const waiver = document.getElementById('waiverAgree');
                    if (!waiver || !waiver.checked) {
                        alert('Please agree to the terms and conditions.');
                        return;
                    }
                }
                updateStep(next);
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentStep > 1) {
                updateStep(currentStep - 1);
            }
        });
    });

    // ===== DATE PICKER =====
    const dateInput = document.getElementById('bookingDate');
    const availabilityIndicator = document.getElementById('availabilityIndicator');

    if (dateInput) {
        // Set min date to today
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${year}-${month}-${day}`;

        dateInput.addEventListener('change', function() {
            if (availabilityIndicator) {
                availabilityIndicator.innerHTML = '<span class="available"><i class="fas fa-check-circle"></i> Available for booking</span>';
            }
        });
    }

    // ===== CALENDAR GENERATION =====
    const calendarGrid = document.getElementById('calendarGrid');
    if (calendarGrid) {
        function generateCalendar() {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Clear existing
            calendarGrid.innerHTML = '';
            
            // Day labels
            const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            dayLabels.forEach(label => {
                const el = document.createElement('div');
                el.className = 'day-label';
                el.textContent = label;
                calendarGrid.appendChild(el);
            });
            
            // Empty days
            for (let i = 0; i < firstDay; i++) {
                const el = document.createElement('div');
                el.className = 'day disabled';
                calendarGrid.appendChild(el);
            }
            
            // Days
            const today = now.getDate();
            for (let d = 1; d <= daysInMonth; d++) {
                const el = document.createElement('div');
                el.className = 'day';
                el.textContent = d;
                
                if (d < today) {
                    el.classList.add('disabled');
                } else {
                    el.classList.add('available');
                    el.addEventListener('click', function() {
                        document.querySelectorAll('.day.available').forEach(day => {
                            day.classList.remove('selected');
                        });
                        this.classList.add('selected');
                        
                        const selectedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                        if (dateInput) {
                            dateInput.value = selectedDate;
                            dateInput.dispatchEvent(new Event('change'));
                        }
                    });
                }
                
                calendarGrid.appendChild(el);
            }
        }
        generateCalendar();
    }

    // ===== ADD-ONS SELECTION =====
    const addonCheckboxes = document.querySelectorAll('#addonsGrid input[type="checkbox"]');
    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const option = this.closest('.addon-option');
            if (option) {
                option.classList.toggle('selected', this.checked);
            }
            updatePaymentSummary();
        });
    });

    // ===== PAYMENT SUMMARY UPDATE =====
    function updatePaymentSummary() {
        const experience = document.querySelector('.experience-card.selected');
        const date = document.getElementById('bookingDate');
        const time = document.getElementById('bookingTime');
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        
        // Update summary fields
        const summaryExperience = document.getElementById('summaryExperience');
        const summaryDate = document.getElementById('summaryDate');
        const summaryTime = document.getElementById('summaryTime');
        const summaryRider = document.getElementById('summaryRider');
        const summaryAddons = document.getElementById('summaryAddons');
        const summaryTotal = document.getElementById('summaryTotal');
        const summaryDeposit = document.getElementById('summaryDeposit');
        
        if (summaryExperience && experience) {
            const title = experience.querySelector('h3');
            const type = experience.dataset.type || '';
            const typeLabel = type === 'rental' ? ' (Rental)' : ' (Tour)';
            summaryExperience.textContent = title ? title.textContent + typeLabel : '-';
        }
        
        if (summaryDate && date && date.value) {
            summaryDate.textContent = date.value;
        }
        
        if (summaryTime && time && time.value) {
            const selectedOption = time.options[time.selectedIndex];
            summaryTime.textContent = selectedOption ? selectedOption.text : '-';
        }
        
        if (summaryRider && firstName && lastName) {
            summaryRider.textContent = `${firstName.value || ''} ${lastName.value || ''}`.trim() || '-';
        }
        
        // Calculate total
        let total = 0;
        let basePrice = 4500; // Default base price
        
        // Get base price from experience type
        if (experience) {
            const type = experience.dataset.type || 'tour';
            if (type === 'rental') {
                basePrice = 2000; // Rental base price
            } else {
                basePrice = 4500; // Tour base price
            }
        }
        
        total = basePrice;
        
        // Add add-ons
        const addonOptions = document.querySelectorAll('.addon-option.selected');
        let addonNames = [];
        addonOptions.forEach(option => {
            const price = parseInt(option.dataset.price) || 0;
            total += price;
            const label = option.querySelector('label');
            if (label) addonNames.push(label.textContent);
        });
        
        if (summaryAddons) {
            summaryAddons.textContent = addonNames.length > 0 ? addonNames.join(', ') : 'None selected';
        }
        
        if (summaryTotal) {
            summaryTotal.textContent = `R${total.toLocaleString()}`;
        }
        
        if (summaryDeposit) {
            const deposit = Math.round(total * 0.3);
            summaryDeposit.textContent = `R${deposit.toLocaleString()}`;
        }
    }

    // Listen to form changes
    document.querySelectorAll('#riderDetailsForm input').forEach(input => {
        input.addEventListener('input', updatePaymentSummary);
    });

    // ===== PAYMENT METHOD SELECTION =====
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ===== SUBMIT BOOKING =====
    const submitBtn = document.getElementById('submitBooking');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const waiver = document.getElementById('waiverAgree');
            if (!waiver || !waiver.checked) {
                alert('Please agree to the terms and conditions.');
                return;
            }
            
            // Generate booking reference
            const ref = 'GRA-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 9000) + 1000);
            const refElement = document.getElementById('bookingRef');
            if (refElement) {
                refElement.textContent = ref;
            }
            
            // Go to confirmation step
            updateStep(6);
        });
    }

    // ===== INITIALIZE =====
    updateStep(1);
    updatePaymentSummary();

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        // Enter key to continue
        if (e.key === 'Enter') {
            const activeStep = document.querySelector('.booking-step.active');
            if (activeStep) {
                const nextBtn = activeStep.querySelector('.next-step');
                if (nextBtn) {
                    nextBtn.click();
                }
            }
        }
        // Escape key to go back
        if (e.key === 'Escape') {
            const activeStep = document.querySelector('.booking-step.active');
            if (activeStep) {
                const prevBtn = activeStep.querySelector('.prev-step');
                if (prevBtn) {
                    prevBtn.click();
                }
            }
        }
    });
});