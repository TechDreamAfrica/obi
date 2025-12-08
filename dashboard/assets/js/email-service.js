// Email Notification Service using EmailJS
// Initialize EmailJS with your public key

export const emailConfig = {
    serviceId: 'service_obi', // Replace with your EmailJS service ID
    templateIdAdmin: 'template_admin_notification', // Template for admin notifications
    templateIdApplicant: 'template_applicant_notification', // Template for applicant notifications
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY' // Replace with your EmailJS public key
};

// Initialize EmailJS
export function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(emailConfig.publicKey);
    }
}

// Send email notification for admission status change
export async function sendAdmissionNotification(applicationData, status) {
    try {
        // Validate EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS library not loaded');
            return { success: false, error: 'EmailJS library not loaded' };
        }

        const statusMessages = {
            approved: {
                subject: 'Congratulations! Your Application Has Been Approved',
                message: 'We are pleased to inform you that your application to Oasis Bible Institute has been approved. Welcome to OBI!',
                adminMessage: 'Application has been approved'
            },
            rejected: {
                subject: 'Application Status Update',
                message: 'Thank you for your interest in Oasis Bible Institute. After careful consideration, we regret to inform you that we are unable to offer you admission at this time.',
                adminMessage: 'Application has been rejected'
            },
            pending: {
                subject: 'Application Status Update',
                message: 'Your application is currently under review. We will notify you once a decision has been made.',
                adminMessage: 'Application status set to pending'
            }
        };

        const statusInfo = statusMessages[status] || statusMessages.pending;

        // Send notification to applicant
        const applicantParams = {
            to_email: applicationData.email,
            to_name: applicationData.fullName || applicationData.name,
            subject: statusInfo.subject,
            message: statusInfo.message,
            status: status,
            program: applicationData.program || 'N/A',
            application_date: applicationData.timestamp ? new Date(applicationData.timestamp).toLocaleDateString() : 'N/A',
            institute_name: 'Oasis Bible Institute',
            institute_email: 'oasisimggh@gmail.com',
            institute_phone: '+233 539 267 422'
        };

        // Send notification to admin
        const adminParams = {
            to_email: 'admin@oasisbibleinstitute.org', // Replace with actual admin email
            applicant_name: applicationData.fullName || applicationData.name,
            applicant_email: applicationData.email,
            program: applicationData.program || 'N/A',
            status: status,
            message: statusInfo.adminMessage,
            action_date: new Date().toLocaleString()
        };

        // Send both emails
        const results = await Promise.allSettled([
            emailjs.send(emailConfig.serviceId, emailConfig.templateIdApplicant, applicantParams),
            emailjs.send(emailConfig.serviceId, emailConfig.templateIdAdmin, adminParams)
        ]);

        const applicantSent = results[0].status === 'fulfilled';
        const adminSent = results[1].status === 'fulfilled';

        return {
            success: applicantSent || adminSent,
            applicantSent,
            adminSent,
            message: `Notification sent - Applicant: ${applicantSent ? 'Success' : 'Failed'}, Admin: ${adminSent ? 'Success' : 'Failed'}`
        };
    } catch (error) {
        console.error('Error sending email notification:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Send welcome email to new student
export async function sendWelcomeEmail(studentData) {
    try {
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS library not loaded');
            return { success: false, error: 'EmailJS library not loaded' };
        }

        const params = {
            to_email: studentData.email,
            to_name: studentData.fullName,
            student_id: studentData.studentId,
            program: studentData.program,
            enrollment_date: new Date(studentData.enrollmentDate).toLocaleDateString(),
            institute_name: 'Oasis Bible Institute',
            institute_email: 'oasisiimggh@gmail.com',
            institute_phone: '+233 539 267 422'
        };

        const result = await emailjs.send(emailConfig.serviceId, 'template_welcome_student', params);
        
        return {
            success: true,
            message: 'Welcome email sent successfully'
        };
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Send bulk notification
export async function sendBulkNotification(recipients, subject, message) {
    try {
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS library not loaded');
            return { success: false, error: 'EmailJS library not loaded' };
        }

        const results = await Promise.allSettled(
            recipients.map(recipient => {
                const params = {
                    to_email: recipient.email,
                    to_name: recipient.name,
                    subject: subject,
                    message: message,
                    institute_name: 'Oasis Bible Institute'
                };
                return emailjs.send(emailConfig.serviceId, 'template_bulk_notification', params);
            })
        );

        const successCount = results.filter(r => r.status === 'fulfilled').length;
        const failCount = results.length - successCount;

        return {
            success: successCount > 0,
            successCount,
            failCount,
            message: `Sent ${successCount} of ${results.length} emails`
        };
    } catch (error) {
        console.error('Error sending bulk notification:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Test email configuration
export async function testEmailConfiguration(testEmail) {
    try {
        if (typeof emailjs === 'undefined') {
            return {
                success: false,
                error: 'EmailJS library not loaded. Please add the EmailJS script to your HTML.'
            };
        }

        const params = {
            to_email: testEmail,
            to_name: 'Test User',
            subject: 'Email Configuration Test',
            message: 'This is a test email from Oasis Bible Institute dashboard. If you receive this, your email configuration is working correctly!',
            institute_name: 'Oasis Bible Institute'
        };

        await emailjs.send(emailConfig.serviceId, emailConfig.templateIdApplicant, params);
        
        return {
            success: true,
            message: 'Test email sent successfully'
        };
    } catch (error) {
        console.error('Error sending test email:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Make functions globally available
window.initEmailJS = initEmailJS;
window.sendAdmissionNotification = sendAdmissionNotification;
window.sendWelcomeEmail = sendWelcomeEmail;
window.sendBulkNotification = sendBulkNotification;
window.testEmailConfiguration = testEmailConfiguration;
