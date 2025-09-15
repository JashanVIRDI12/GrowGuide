// Form Handler for Medical Tourism

// Medical Tourism Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const medicalForm = document.getElementById('medical-tourism-form');
    const tradingForm = null;

    // Medical Tourism Form
    if (medicalForm) {
        medicalForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = medicalForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            try {
                // Show progress bar and loading state
                showProgressBar();
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
                
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
                    completeProgressBar();
                    setTimeout(() => {
                        hideProgressBar();
                        showNotification('Success! Your medical tourism inquiry has been submitted. We will contact you soon.', 'success');
                        medicalForm.reset();
                    }, 800);
                } else {
                    hideProgressBar();
                    showNotification(result.message || 'An error occurred. Please try again.', 'error');
                }

            } catch (error) {
                console.error('Form submission error:', error);
                hideProgressBar();
                showNotification('Network error. Please check your connection and try again.', 'error');
            } finally {
                // Reset button state
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 800);
            }
        });
    }

    // Additional non-medical forms removed
});

// Progress Bar Functions
function showProgressBar() {
    // Remove existing progress bar
    const existingProgressBar = document.querySelector('.progress-overlay');
    if (existingProgressBar) {
        existingProgressBar.remove();
    }

    // Create progress bar overlay
    const progressOverlay = document.createElement('div');
    progressOverlay.className = 'progress-overlay';
    progressOverlay.innerHTML = `
        <div class="progress-container">
            <div class="progress-content">
                <div class="progress-icon">
                    <svg class="spinner" width="24" height="24" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                            <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                            <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                        </circle>
                    </svg>
                </div>
                <div class="progress-text">Submitting your inquiry...</div>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="progress-percentage">0%</div>
            </div>
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .progress-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        .progress-container {
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            text-align: center;
            max-width: 400px;
            width: 90%;
            animation: slideUp 0.3s ease-out;
        }
        .progress-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }
        .progress-icon {
            color: #2675C6;
        }
        .spinner {
            animation: rotate 2s linear infinite;
        }
        .progress-text {
            font-family: 'Nata Sans', sans-serif;
            font-size: 18px;
            font-weight: 600;
            color: #333;
        }
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e9ecef;
            border-radius: 4px;
            overflow: hidden;
            position: relative;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #2675C6, #4a90e2);
            border-radius: 4px;
            width: 0%;
            transition: width 0.3s ease;
            position: relative;
        }
        .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: shimmer 1.5s infinite;
        }
        .progress-percentage {
            font-family: 'Nata Sans', sans-serif;
            font-size: 14px;
            font-weight: 600;
            color: #666;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        .progress-success .progress-icon {
            color: #28a745;
        }
        .progress-success .progress-fill {
            background: linear-gradient(90deg, #28a745, #34ce57);
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(progressOverlay);

    // Animate progress bar
    const progressFill = progressOverlay.querySelector('.progress-fill');
    const progressPercentage = progressOverlay.querySelector('.progress-percentage');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random increment between 5-20%
        if (progress > 85) progress = 85; // Cap at 85% until completion
        
        progressFill.style.width = progress + '%';
        progressPercentage.textContent = Math.round(progress) + '%';
    }, 200);

    // Store interval for cleanup
    progressOverlay.progressInterval = interval;
}

function completeProgressBar() {
    const progressOverlay = document.querySelector('.progress-overlay');
    if (!progressOverlay) return;

    // Clear the interval
    if (progressOverlay.progressInterval) {
        clearInterval(progressOverlay.progressInterval);
    }

    const progressFill = progressOverlay.querySelector('.progress-fill');
    const progressPercentage = progressOverlay.querySelector('.progress-percentage');
    const progressText = progressOverlay.querySelector('.progress-text');
    const progressIcon = progressOverlay.querySelector('.progress-icon');
    const progressContainer = progressOverlay.querySelector('.progress-container');

    // Complete the progress bar
    progressFill.style.width = '100%';
    progressPercentage.textContent = '100%';
    progressText.textContent = 'Success! Inquiry submitted.';
    
    // Add success styling
    progressContainer.classList.add('progress-success');
    
    // Change icon to checkmark
    progressIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22,4 12,14.01 9,11.01"></polyline>
        </svg>
    `;
}

function hideProgressBar() {
    const progressOverlay = document.querySelector('.progress-overlay');
    if (progressOverlay) {
        // Clear interval if exists
        if (progressOverlay.progressInterval) {
            clearInterval(progressOverlay.progressInterval);
        }
        
        progressOverlay.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            progressOverlay.remove();
        }, 300);
    }
}

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
