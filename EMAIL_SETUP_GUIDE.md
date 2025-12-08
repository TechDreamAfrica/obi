# Email Notification Setup Guide

This guide will help you set up email notifications for the OBI Dashboard using EmailJS.

## Overview

The dashboard now includes email notifications that are triggered when:
- An application status is changed (approved, rejected, or pending)
- A new student is admitted to the institute

Notifications are sent to:
- **The applicant** - receives status updates
- **The admin** - receives notification of all status changes

## Setup Instructions

### 1. Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)
3. Verify your email address

### 2. Set Up Email Service

1. In your EmailJS dashboard, click on **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down your **Service ID** (e.g., `service_abc123`)

### 3. Create Email Templates

You need to create 3 email templates:

#### Template 1: Applicant Notification
- Click **"Email Templates"** → **"Create New Template"**
- Name: `Admission Status Notification`
- Template ID: `template_applicant_notification`
- Subject: `{{subject}}`
- Content:
```
Dear {{to_name}},

{{message}}

Application Details:
- Program: {{program}}
- Application Date: {{application_date}}
- Status: {{status}}

If you have any questions, please contact us at:
Email: {{institute_email}}
Phone: {{institute_phone}}

Best regards,
{{institute_name}}
```

#### Template 2: Admin Notification
- Create another template
- Name: `Admin Application Update`
- Template ID: `template_admin_notification`
- Subject: `Application Status Update - {{applicant_name}}`
- Content:
```
Application Status Update

Applicant: {{applicant_name}}
Email: {{applicant_email}}
Program: {{program}}
New Status: {{status}}
Action: {{message}}
Date: {{action_date}}

Login to the dashboard to view full details.
```

#### Template 3: Welcome Email (Optional)
- Create another template
- Name: `Student Welcome Email`
- Template ID: `template_welcome_student`
- Subject: `Welcome to {{institute_name}}`
- Content:
```
Dear {{to_name}},

Congratulations and welcome to {{institute_name}}!

Your Student Information:
- Student ID: {{student_id}}
- Program: {{program}}
- Enrollment Date: {{enrollment_date}}

We look forward to having you in our community.

Contact Information:
Email: {{institute_email}}
Phone: {{institute_phone}}

Best regards,
{{institute_name}}
```

### 4. Get Your Public Key

1. In EmailJS dashboard, go to **"Account"** → **"General"**
2. Find your **Public Key** (e.g., `abc123XYZ`)
3. Copy this key

### 5. Update the Configuration File

1. Open `/workspaces/obi/dashboard/assets/js/email-service.js`
2. Update the configuration at the top of the file:

```javascript
export const emailConfig = {
    serviceId: 'YOUR_SERVICE_ID',  // Replace with your Service ID from step 2
    templateIdAdmin: 'template_admin_notification',  // Must match template ID from step 3
    templateIdApplicant: 'template_applicant_notification',  // Must match template ID from step 3
    publicKey: 'YOUR_PUBLIC_KEY'  // Replace with your Public Key from step 4
};
```

3. Update the admin email address in the `sendAdmissionNotification` function:
```javascript
const adminParams = {
    to_email: 'your-admin@email.com',  // Replace with your actual admin email
    // ... rest of params
};
```

4. Update contact information in the templates:
```javascript
institute_email: 'info@yourinstitute.org',  // Replace with your email
institute_phone: '+1 (XXX) XXX-XXXX'  // Replace with your phone
```

### 6. Test the Email System

1. Log in to the dashboard
2. Go to Admissions page
3. Open the browser console (F12)
4. Change an application status
5. Check the console for email sending status
6. Check your email inbox for the notification

### 7. Troubleshooting

**Emails not sending:**
- Check browser console for errors
- Verify all IDs match exactly (Service ID, Template IDs)
- Ensure Public Key is correct
- Check EmailJS dashboard for quota limits
- Make sure EmailJS script is loaded (check for 404 errors)

**Emails going to spam:**
- Add your sending email to recipient's contacts
- Configure SPF/DKIM records in EmailJS service settings
- Use a custom domain email instead of free email services

**Template variables not showing:**
- Check template variable names match exactly (case-sensitive)
- Verify all parameters are being passed in the JavaScript code
- Test templates in EmailJS dashboard first

## Email Quota

- **Free Tier**: 200 emails/month
- **Personal Plan**: $7/month for 500 emails
- **Professional Plan**: $15/month for 1000 emails

Monitor your usage in the EmailJS dashboard.

## Security Notes

- The Public Key is safe to expose in client-side code
- Never expose your Private Key
- EmailJS prevents unauthorized use through domain whitelisting
- Add your domain to the allowed list in EmailJS settings

## Additional Features

### Test Email Configuration

You can test your email setup using the test function:

```javascript
await testEmailConfiguration('test@example.com');
```

This will send a test email to verify everything is working.

### Bulk Notifications (Future Enhancement)

The email service includes a bulk notification function for sending emails to multiple recipients:

```javascript
const recipients = [
    { email: 'student1@example.com', name: 'Student 1' },
    { email: 'student2@example.com', name: 'Student 2' }
];
await sendBulkNotification(recipients, 'Subject', 'Message');
```

## Support

For EmailJS support:
- Documentation: https://www.emailjs.com/docs/
- Support: support@emailjs.com

For dashboard issues:
- Check browser console for errors
- Review the email-service.js implementation
- Ensure Firebase is properly configured
