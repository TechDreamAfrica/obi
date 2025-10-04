# Oasis IMG Ministries Ghana Website

A modern, responsive website for Oasis IMG Ministries Ghana built with HTML5, Tailwind CSS, Core JavaScript, and Firebase.

## 🚀 Features

### Main Website
- **Home Page**: Hero carousel, statistics counter, ministry highlights, leadership preview
- **About Us**: Mission, vision, core values, beliefs, and history
- **Admissions**: Program information, requirements, application process
- **Credential Application**: Form for ministry credential applications
- **Sponsor a Student**: Sponsorship tiers and donation forms
- **Ministries**: Complete ministry directory
- **Ministry Detail**: Dynamic pages for individual ministries
- **Leadership**: Team profiles and organizational structure
- **Contact**: Contact form with Google Maps integration
- **Gallery**: Photo gallery with Google Drive integration

### Oasis Bible Institute (OBI) Sub-Website
- **OBI Home**: Institute overview and programs
- **OBI Admissions**: Admission requirements and application
- **Events**: Upcoming and past events
- **News**: News articles and updates
- **News Detail**: Individual news article pages

### Admin Dashboard
- **Authentication**: Firebase-based login system
- **Role-Based Access**: Secure admin panel
- **Manage Admissions**: View and process applications
- **Manage News**: Create, edit, delete news articles
- **View Contacts**: Access contact form submissions
- **Gallery Management**: Update gallery images
- **Leadership Management**: Manage team profiles

## 📋 Tech Stack

- **Frontend**: HTML5, Tailwind CSS
- **JavaScript**: Vanilla JavaScript (ES6+)
- **Backend**: Firebase (Firestore, Authentication)
- **Icons**: Font Awesome 6.4.0
- **Maps**: Google Maps Embed API

## 🛠️ Setup Instructions

### 1. Firebase Configuration

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firebase Authentication** (Email/Password)
3. Enable **Cloud Firestore**
4. Copy your Firebase config
5. Update the config in `assets/js/main.js`:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 2. Firestore Database Structure

Create the following collections in Firestore:

```
- contacts/
  - {auto-id}: {name, email, phone, subject, message, timestamp, status}

- credentials/
  - {auto-id}: {fullName, email, phone, dob, gender, address, city, region, qualification, institution, year, experience, statement, timestamp, status}

- sponsors/
  - {auto-id}: {fullName, email, phone, level, paymentMethod, message, timestamp, status}

- admissions/
  - {auto-id}: {fullName, email, phone, program, documents, timestamp, status}

- news/
  - {auto-id}: {title, content, image, category, author, date, timestamp}

- ministries/
  - {auto-id}: {id, name, description, image, activities, meetingTimes, leader, contact}

- leadership/
  - {auto-id}: {name, title, bio, image, order}

- events/
  - {auto-id}: {title, description, date, location, image, category}
```

### 3. Firebase Security Rules

Add these security rules to Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read, authenticated write
    match /contacts/{document} {
      allow read: if request.auth != null;
      allow create: if true;
    }

    match /credentials/{document} {
      allow read: if request.auth != null;
      allow create: if true;
    }

    match /sponsors/{document} {
      allow read: if request.auth != null;
      allow create: if true;
    }

    match /admissions/{document} {
      allow read: if request.auth != null;
      allow create: if true;
    }

    // Admin only
    match /news/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /ministries/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /leadership/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /events/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Create Admin User

1. Go to Firebase Console > Authentication
2. Add a new user with email and password
3. Use these credentials to login at `/dashboard/login.html`

### 5. Google Maps Setup

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com)
2. Update the iframe src in `index.html` and `contact.html` with your coordinates

### 6. Images Setup

Replace placeholder images in `/assets/images/`:
- `logo.png` - Organization logo
- `hero1.jpg`, `hero2.jpg`, `hero3.jpg` - Carousel images
- `about-home.jpg` - About section image
- `ministry1.jpg`, `ministry2.jpg`, `ministry3.jpg` - Ministry images
- `leader1.jpg`, `leader2.jpg`, `leader3.jpg`, `leader4.jpg` - Leadership photos
- `our-story.jpg` - About page image

## 📁 Project Structure

```
oasis-img/
├── index.html
├── about.html
├── admissions.html
├── credential-application.html
├── sponsor-student.html
├── ministries.html
├── ministry-detail.html
├── leadership.html
├── contact.html
├── gallery.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── [image files]
├── obi/
│   ├── index.html
│   ├── admissions.html
│   ├── events.html
│   ├── news.html
│   └── news-item.html
├── dashboard/
│   ├── login.html
│   ├── index.html
│   ├── admissions.html
│   ├── news.html
│   ├── contacts.html
│   ├── gallery.html
│   ├── leadership.html
│   └── assets/
│       └── js/
│           ├── auth.js
│           └── dashboard.js
└── README.md
```

## 🎨 Color Scheme

- Primary Blue: `#1e40af` (blue-800)
- Secondary Blue: `#2563eb` (blue-600)
- Success Green: `#10b981` (green-500)
- Dark: `#111827` (gray-900)
- Light: `#f9fafb` (gray-50)

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Security Features

- Firebase Authentication for admin access
- Role-based access control
- Secure Firestore rules
- Form validation
- XSS protection

## 🚀 Deployment

### Option 1: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Option 2: Static Hosting
Upload all files to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

## 📝 Usage

### For Visitors
- Browse ministries and programs
- Submit applications and contact forms
- View news and events
- Access gallery

### For Administrators
1. Login at `/dashboard/login.html`
2. Manage content through the admin panel
3. View and process applications
4. Publish news and updates

## 🤝 Support

For technical support or questions:
- Email: info@oasisimg.org
- Phone: +233 123 456 789

## 📄 License

© 2024 Oasis IMG Ministries Ghana. All rights reserved.

## 🔄 Updates & Maintenance

### Regular Tasks:
- Update news and events
- Process applications
- Update gallery images
- Manage leadership profiles
- Monitor contact submissions

### Backup:
- Regularly export Firestore data
- Backup uploaded images
- Keep Firebase config secure

---

**Built with ❤️ for Oasis IMG Ministries Ghana**
