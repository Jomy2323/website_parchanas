/**
 * Parchanas Registration Form - Multi-Step Wizard
 * Manages form state, validation, and navigation
 */

let currentStep = 1;
const totalSteps = 5;
let formData = {};

document.addEventListener('DOMContentLoaded', () => {
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');
    const btnSave = document.getElementById('btn-save');
    const form = document.getElementById('registration-form');

    // Load saved progress if exists
    loadSavedProgress();

    // Next Button
    btnNext.addEventListener('click', () => {
        if (validateCurrentStep()) {
            saveCurrentStepData();
            if (currentStep < totalSteps) {
                goToStep(currentStep + 1);
            } else {
                // Final step - submit form
                submitForm();
            }
        }
    });

    // Back Button
    btnBack.addEventListener('click', () => {
        if (currentStep > 1) {
            saveCurrentStepData();
            goToStep(currentStep - 1);
        }
    });

    // Save Progress Button
    btnSave.addEventListener('click', () => {
        saveCurrentStepData();
        saveProgress();
        alert('Tu progreso ha sido guardado. Puedes continuar más tarde.');
    });

    // Update dietary "other" field visibility
    const dietarySelect = document.getElementById('dietary-restrictions');
    const dietaryOther = document.getElementById('dietary-other');
    dietarySelect.addEventListener('change', () => {
        if (dietarySelect.value === 'other') {
            dietaryOther.classList.remove('hidden');
        } else {
            dietaryOther.classList.add('hidden');
        }
    });

    // Real-time email validation
    const emailInput = document.getElementById('parent-email');
    emailInput.addEventListener('blur', () => {
        validateEmail(emailInput.value);
    });

    // Real-time phone validation
    const phoneInput = document.getElementById('parent-phone');
    phoneInput.addEventListener('blur', () => {
        validatePhone(phoneInput.value);
    });
});

/**
 * Navigate to a specific step
 */
function goToStep(stepNumber) {
    // Hide all steps
    for (let i = 1; i <= totalSteps; i++) {
        document.getElementById(`step-${i}`).classList.add('hidden');
    }

    // Show target step
    document.getElementById(`step-${stepNumber}`).classList.remove('hidden');

    // Update current step
    currentStep = stepNumber;

    // Update progress bar
    const progressPercent = (currentStep / totalSteps) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;

    // Update step indicators
    updateStepIndicators();

    // Update button visibility
    updateButtonVisibility();

    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Update step indicator styles
 */
function updateStepIndicators() {
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`).querySelector('div');
        if (i < currentStep) {
            // Completed step
            indicator.classList.remove('bg-neutral-light', 'text-neutral-gray', 'bg-accent-900', 'text-neutral-black');
            indicator.classList.add('bg-secondary-800', 'text-neutral-white');
        } else if (i === currentStep) {
            // Current step
            indicator.classList.remove('bg-neutral-light', 'text-neutral-gray', 'bg-secondary-800', 'text-neutral-white');
            indicator.classList.add('bg-accent-900', 'text-neutral-black');
        } else {
            // Future step
            indicator.classList.remove('bg-accent-900', 'text-neutral-black', 'bg-secondary-800', 'text-neutral-white');
            indicator.classList.add('bg-neutral-light', 'text-neutral-gray');
        }
    }
}

/**
 * Update button visibility and text
 */
function updateButtonVisibility() {
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');

    // Back button only visible after step 1
    if (currentStep === 1) {
        btnBack.classList.add('hidden');
    } else {
        btnBack.classList.remove('hidden');
    }

    // Change "Next" to "Enviar Pago" on last step
    if (currentStep === totalSteps) {
        btnNext.textContent = 'Enviar Pago';
        btnNext.classList.remove('btn-primary');
        btnNext.classList.add('btn-primary', 'bg-secondary-800', 'hover:bg-secondary-700');
    } else {
        btnNext.textContent = 'Siguiente';
    }
}

/**
 * Validate current step fields
 */
function validateCurrentStep() {
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    let firstInvalidField = null;

    requiredFields.forEach(field => {
        // Remove previous error styling
        field.classList.remove('border-red-500');

        if (!field.value.trim() && field.type !== 'checkbox' && field.type !== 'radio') {
            isValid = false;
            field.classList.add('border-red-500');
            if (!firstInvalidField) firstInvalidField = field;
        }

        // Special validation for radio buttons
        if (field.type === 'radio') {
            const radioGroup = document.querySelectorAll(`[name="${field.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
            }
        }

        // Special validation for checkboxes (terms on step 5)
        if (field.type === 'checkbox' && !field.checked) {
            isValid = false;
            field.classList.add('border-red-500');
            if (!firstInvalidField) firstInvalidField = field;
        }
    });

    // Step 1: Email validation
    if (currentStep === 1) {
        const email = document.getElementById('parent-email').value;
        if (!validateEmail(email)) {
            isValid = false;
            document.getElementById('parent-email').classList.add('border-red-500');
            if (!firstInvalidField) firstInvalidField = document.getElementById('parent-email');
        }

        const phone = document.getElementById('parent-phone').value;
        if (!validatePhone(phone)) {
            isValid = false;
            document.getElementById('parent-phone').classList.add('border-red-500');
            if (!firstInvalidField) firstInvalidField = document.getElementById('parent-phone');
        }
    }

    if (!isValid) {
        alert('Por favor completa todos los campos requeridos correctamente.');
        if (firstInvalidField) {
            firstInvalidField.focus();
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return isValid;
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate phone format (basic - 10+ digits)
 */
function validatePhone(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
}

/**
 * Save current step data to formData object
 */
function saveCurrentStepData() {
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    const inputs = currentStepElement.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.value;
            }
        } else if (input.type === 'checkbox') {
            formData[input.id] = input.checked;
        } else {
            formData[input.id] = input.value;
        }
    });

    // Update summary on step 5
    if (currentStep === 4) {
        updatePaymentSummary();
    }
}

/**
 * Update payment summary on step 5
 */
function updatePaymentSummary() {
    const camperName = `${formData['camper-first-name'] || ''} ${formData['camper-last-name'] || ''}`.trim();
    const session = formData['session'] || 'No seleccionada';

    document.getElementById('summary-camper').textContent = camperName || '-';

    let sessionText = '';
    let price = 0;

    switch(session) {
        case 'session-1':
            sessionText = 'Sesión 1: 15 Dic - 27 Dic';
            price = 450000;
            break;
        case 'session-2':
            sessionText = 'Sesión 2: 2 Ene - 14 Ene';
            price = 450000;
            break;
        case 'session-3':
            sessionText = 'Sesión 3: 19 Ene - 31 Ene';
            price = 450000;
            break;
        case 'full-summer':
            sessionText = 'Sesión Completa: 15 Dic - 31 Ene';
            price = 1200000;
            break;
        default:
            sessionText = 'No seleccionada';
    }

    document.getElementById('summary-session').textContent = sessionText;

    // Apply discounts
    let discountPercent = 0;
    if (formData['discount-sibling']) discountPercent += 10;
    if (formData['discount-early']) discountPercent += 5;
    if (formData['discount-returning']) discountPercent += 5;

    const discountAmount = price * (discountPercent / 100);
    const finalPrice = price - discountAmount;

    document.getElementById('summary-total').textContent = `$${finalPrice.toLocaleString('es-AR')}`;
}

/**
 * Save progress to localStorage
 */
function saveProgress() {
    const progressData = {
        currentStep: currentStep,
        formData: formData,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('parchanas-registration-progress', JSON.stringify(progressData));
}

/**
 * Load saved progress from localStorage
 */
function loadSavedProgress() {
    const saved = localStorage.getItem('parchanas-registration-progress');
    if (saved) {
        const progressData = JSON.parse(saved);
        const confirmRestore = confirm('Encontramos un formulario guardado anteriormente. ¿Deseas continuar donde lo dejaste?');

        if (confirmRestore) {
            formData = progressData.formData;

            // Restore form field values
            Object.keys(formData).forEach(key => {
                const field = document.getElementById(key);
                if (field) {
                    if (field.type === 'radio') {
                        const radio = document.querySelector(`input[name="${key}"][value="${formData[key]}"]`);
                        if (radio) radio.checked = true;
                    } else if (field.type === 'checkbox') {
                        field.checked = formData[key];
                    } else {
                        field.value = formData[key];
                    }
                }
            });

            // Go to saved step
            goToStep(progressData.currentStep);
        } else {
            localStorage.removeItem('parchanas-registration-progress');
        }
    }
}

/**
 * Submit final form
 */
function submitForm() {
    // In production, this would send data to a server
    console.log('Form submitted:', formData);

    // Clear saved progress
    localStorage.removeItem('parchanas-registration-progress');

    // Show success message
    alert('¡Inscripción completada con éxito! Recibirás un email de confirmación en breve.');

    // In production, redirect to confirmation page
    // window.location.href = 'confirmation.html';
}
