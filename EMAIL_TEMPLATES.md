# EmailJS Template Configuration

This file contains the exact templates you need to create in your EmailJS account.

## Template 1: Applicant Notification

**Template Name:** `Admission Status Notification`  
**Template ID:** `template_applicant_notification`

### Subject:
```
{{subject}}
```

### HTML Content:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9fafb; padding: 30px; margin: 20px 0; border-radius: 8px; }
        .details { background-color: white; padding: 20px; margin: 20px 0; border-left: 4px solid #2563eb; }
        .detail-row { margin: 10px 0; }
        .label { font-weight: bold; color: #4b5563; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
        .status-approved { color: #059669; font-weight: bold; }
        .status-rejected { color: #dc2626; font-weight: bold; }
        .status-pending { color: #d97706; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{institute_name}}</h1>
            <p>Application Status Update</p>
        </div>
        
        <div class="content">
            <h2>Dear {{to_name}},</h2>
            
            <p>{{message}}</p>
            
            <div class="details">
                <h3>Application Details</h3>
                <div class="detail-row">
                    <span class="label">Program:</span> {{program}}
                </div>
                <div class="detail-row">
                    <span class="label">Application Date:</span> {{application_date}}
                </div>
                <div class="detail-row">
                    <span class="label">Current Status:</span> 
                    <span class="status-{{status}}">{{status}}</span>
                </div>
            </div>
            
            <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
            
            <div class="detail-row">
                <span class="label">Email:</span> {{institute_email}}
            </div>
            <div class="detail-row">
                <span class="label">Phone:</span> {{institute_phone}}
            </div>
        </div>
        
        <div class="footer">
            <p>&copy; 2025 {{institute_name}}. All rights reserved.</p>
            <p>This is an automated message. Please do not reply directly to this email.</p>
        </div>
    </div>
</body>
</html>
```

### Plain Text Content:
```
Dear {{to_name}},

{{message}}

Application Details:
- Program: {{program}}
- Application Date: {{application_date}}
- Status: {{status}}

If you have any questions, please contact us:
Email: {{institute_email}}
Phone: {{institute_phone}}

Best regards,
{{institute_name}}

---
This is an automated message from {{institute_name}}.
```

---

## Template 2: Admin Notification

**Template Name:** `Admin Application Update`  
**Template ID:** `template_admin_notification`

### Subject:
```
Application Update - {{applicant_name}}
```

### HTML Content:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1f2937; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9fafb; padding: 30px; margin: 20px 0; border-radius: 8px; }
        .alert { background-color: #dbeafe; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; }
        .details { background-color: white; padding: 20px; margin: 20px 0; }
        .detail-row { margin: 12px 0; padding: 8px; border-bottom: 1px solid #e5e7eb; }
        .label { font-weight: bold; color: #4b5563; display: inline-block; min-width: 140px; }
        .value { color: #1f2937; }
        .status-approved { color: #059669; font-weight: bold; }
        .status-rejected { color: #dc2626; font-weight: bold; }
        .status-pending { color: #d97706; font-weight: bold; }
        .button { display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔔 Admin Notification</h1>
            <p>Application Status Changed</p>
        </div>
        
        <div class="content">
            <div class="alert">
                <strong>{{message}}</strong>
            </div>
            
            <div class="details">
                <h3>Application Information</h3>
                
                <div class="detail-row">
                    <span class="label">Applicant Name:</span>
                    <span class="value">{{applicant_name}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="label">Email:</span>
                    <span class="value">{{applicant_email}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="label">Program:</span>
                    <span class="value">{{program}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="label">New Status:</span>
                    <span class="status-{{status}}">{{status}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="label">Action Date:</span>
                    <span class="value">{{action_date}}</span>
                </div>
            </div>
            
            <p style="text-align: center; margin-top: 30px;">
                <a href="https://yourdomain.com/dashboard/admissions.html" class="button">
                    View in Dashboard
                </a>
            </p>
        </div>
    </div>
</body>
</html>
```

### Plain Text Content:
```
Application Status Update - Admin Notification

{{message}}

Applicant Information:
- Name: {{applicant_name}}
- Email: {{applicant_email}}
- Program: {{program}}
- New Status: {{status}}
- Action Date: {{action_date}}

Log in to the dashboard to view full application details and take further action.

---
This is an automated notification from the OBI Dashboard.
```

---

## Template 3: Welcome Email for New Students

**Template Name:** `Student Welcome Email`  
**Template ID:** `template_welcome_student`

### Subject:
```
Welcome to {{institute_name}} - Your Journey Begins!
```

### HTML Content:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #059669; color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { background-color: #f9fafb; padding: 30px; margin: 20px 0; border-radius: 8px; }
        .welcome-box { background: linear-gradient(135deg, #2563eb 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .info-card { background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .info-row { margin: 12px 0; padding: 10px; background-color: #f3f4f6; border-radius: 4px; }
        .label { font-weight: bold; color: #4b5563; }
        .value { color: #1f2937; }
        .next-steps { background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .next-steps h3 { color: #1e40af; margin-top: 0; }
        .next-steps ul { padding-left: 20px; }
        .next-steps li { margin: 10px 0; }
        .contact-box { background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 {{institute_name}}</h1>
            <p>Welcome to Our Community!</p>
        </div>
        
        <div class="content">
            <div class="welcome-box">
                <h2 style="margin: 0;">Congratulations, {{to_name}}!</h2>
                <p style="margin: 10px 0 0 0; font-size: 18px;">Your journey in ministry education begins now.</p>
            </div>
            
            <p style="font-size: 16px;">
                We are thrilled to welcome you to {{institute_name}}. You are now part of a community 
                dedicated to spiritual growth, biblical education, and ministry preparation.
            </p>
            
            <div class="info-card">
                <h3>Your Student Information</h3>
                
                <div class="info-row">
                    <span class="label">Student ID:</span>
                    <span class="value">{{student_id}}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Program:</span>
                    <span class="value">{{program}}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Enrollment Date:</span>
                    <span class="value">{{enrollment_date}}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Status:</span>
                    <span class="value" style="color: #059669; font-weight: bold;">Active</span>
                </div>
            </div>
            
            <div class="next-steps">
                <h3>📋 Next Steps</h3>
                <ul>
                    <li>Check your email regularly for important updates and announcements</li>
                    <li>Review your program curriculum and course schedule</li>
                    <li>Connect with your academic advisor</li>
                    <li>Join orientation sessions (dates will be sent separately)</li>
                    <li>Complete any required registration forms</li>
                </ul>
            </div>
            
            <div class="contact-box">
                <h3 style="margin-top: 0; color: #92400e;">📞 Need Help?</h3>
                <p style="margin: 10px 0;">Our team is here to support you throughout your journey.</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> {{institute_email}}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> {{institute_phone}}</p>
            </div>
            
            <p style="text-align: center; font-size: 18px; margin-top: 30px; color: #2563eb;">
                <strong>We look forward to seeing you grow and thrive!</strong>
            </p>
        </div>
        
        <div class="footer">
            <p>&copy; 2025 {{institute_name}}. All rights reserved.</p>
            <p>You received this email because you have been admitted to our institute.</p>
        </div>
    </div>
</body>
</html>
```

### Plain Text Content:
```
Welcome to {{institute_name}}!

Congratulations, {{to_name}}!

We are thrilled to welcome you to {{institute_name}}. You are now part of a community dedicated to spiritual growth, biblical education, and ministry preparation.

YOUR STUDENT INFORMATION:
- Student ID: {{student_id}}
- Program: {{program}}
- Enrollment Date: {{enrollment_date}}
- Status: Active

NEXT STEPS:
1. Check your email regularly for important updates
2. Review your program curriculum and course schedule
3. Connect with your academic advisor
4. Join orientation sessions (dates will be sent separately)
5. Complete any required registration forms

NEED HELP?
Our team is here to support you throughout your journey.
Email: {{institute_email}}
Phone: {{institute_phone}}

We look forward to seeing you grow and thrive!

Best regards,
{{institute_name}}

---
© 2025 {{institute_name}}. All rights reserved.
You received this email because you have been admitted to our institute.
```

---

## Template Variables Reference

### Applicant Notification Variables:
- `{{to_email}}` - Recipient email address
- `{{to_name}}` - Applicant's full name
- `{{subject}}` - Email subject line
- `{{message}}` - Status-specific message
- `{{status}}` - approved/rejected/pending
- `{{program}}` - Program name
- `{{application_date}}` - Date application was submitted
- `{{institute_name}}` - Institute name
- `{{institute_email}}` - Contact email
- `{{institute_phone}}` - Contact phone

### Admin Notification Variables:
- `{{to_email}}` - Admin email address
- `{{applicant_name}}` - Applicant's full name
- `{{applicant_email}}` - Applicant's email
- `{{program}}` - Program name
- `{{status}}` - New status
- `{{message}}` - Action description
- `{{action_date}}` - Date/time of action

### Welcome Email Variables:
- `{{to_email}}` - Student email address
- `{{to_name}}` - Student's full name
- `{{student_id}}` - Generated student ID
- `{{program}}` - Enrolled program
- `{{enrollment_date}}` - Date of enrollment
- `{{institute_name}}` - Institute name
- `{{institute_email}}` - Contact email
- `{{institute_phone}}` - Contact phone

## Setup Instructions

1. Copy each template's HTML content
2. Log in to EmailJS dashboard
3. Go to Email Templates
4. Click "Create New Template"
5. Paste the Template ID exactly as shown
6. Paste the Subject line
7. Switch to HTML editor and paste HTML content
8. Add plain text version as fallback
9. Save template
10. Repeat for all three templates

## Testing Templates

In EmailJS dashboard:
1. Select a template
2. Click "Test It"
3. Fill in test values for all variables
4. Send test email
5. Check inbox and verify formatting
6. Adjust as needed

## Customization Tips

- Replace placeholder phone numbers and emails with your actual contact info
- Adjust colors to match your branding
- Add your logo URL to header sections
- Customize messages for your institution
- Update footer text as needed

## Important Notes

- Template IDs must match exactly in `email-service.js`
- All variables are case-sensitive
- HTML templates provide better formatting
- Plain text is fallback for email clients that don't support HTML
- Test thoroughly before going live
