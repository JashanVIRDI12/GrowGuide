// Form Handler for Medical Tourism

// Medical Tourism Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const medicalForm = document.getElementById('medical-tourism-form');
    const tradingForm = null;

    // Medical Tourism Form
    if (medicalForm) {
        // Create loader overlay
        const loaderOverlay = document.createElement('div');
        loaderOverlay.className = 'form-loader-overlay';
        loaderOverlay.innerHTML = `
            <div class="loader-spinner"></div>
            <div class="loader-text">
                Sending your inquiry<span class="loader-dots"></span>
            </div>
            <div class="loader-progress">
                <div class="loader-progress-bar"></div>
            </div>
        `;
        
        // Add loader to form container
        const formContainer = medicalForm.closest('.form-container');
        if (formContainer) {
            formContainer.appendChild(loaderOverlay);
        }
        
        medicalForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = medicalForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            try {
                // Show beautiful loader
                if (loaderOverlay) {
                    loaderOverlay.classList.add('active');
                }
                
                // Disable form interactions
                submitBtn.disabled = true;
                const formInputs = medicalForm.querySelectorAll('input, textarea, button');
                formInputs.forEach(input => input.disabled = true);
                
                const formData = new FormData(medicalForm);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    query: formData.get('query')
                };

                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...data, type: 'medical-tourism' })
                });

                const result = await response.json();

                if (result.success) {
                    showNotification('Success! Your medical tourism inquiry has been submitted. We will contact you soon.', 'success');
                    medicalForm.reset();
                } else {
                    showNotification(result.message || 'An error occurred. Please try again.', 'error');
                }

            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Network error. Please check your connection and try again.', 'error');
            } finally {
                // Hide loader
                if (loaderOverlay) {
                    loaderOverlay.classList.remove('active');
                }
                
                // Re-enable form interactions
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                const formInputs = medicalForm.querySelectorAll('input, textarea, button');
                formInputs.forEach(input => input.disabled = false);
            }
        });
    }

    // Additional non-medical forms removed
});

// Notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-family: 'Nata Sans', sans-serif;
        animation: slideIn 0.3s ease-out;
    `;

    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#d4edda';
        notification.style.color = '#155724';
        notification.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f8d7da';
        notification.style.color = '#721c24';
        notification.style.border = '1px solid #f5c6cb';
    } else {
        notification.style.backgroundColor = '#d1ecf1';
        notification.style.color = '#0c5460';
        notification.style.border = '1px solid #bee5eb';
    }

    // Add CSS for notification content
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
        }
        .notification-message {
            flex: 1;
            line-height: 1.5;
        }
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            color: inherit;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        .notification-close:hover {
            opacity: 1;
        }
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}
