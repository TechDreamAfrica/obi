# Example Data for Testing

This document provides example data structures for testing the admin dashboard.

## Admin User Example

### Firestore Document

**Collection:** `admin-users`
**Document ID:** `abc123xyz789` (Firebase Auth UID)

```json
{
  "email": "admin@oasisimg.org",
  "displayName": "John Administrator",
  "role": "admin",
  "active": true,
  "createdAt": "2024-12-12T12:00:00.000Z",
  "createdBy": "system",
  "lastLogin": "2024-12-12T14:30:00.000Z"
}
```

## Application Data Examples

### OBI Application Document

**Collection:** `obi-applications`
**Document ID:** `auto-generated`

```json
{
  "id": "doc-id-here",
  "name": "John Peter Doe",
  "fullName": "John Peter Doe",
  "email": "john.doe@example.com",
  "phone": "+234 80 1234 5678",
  "address": "123 Church Street, Lagos",
  "dob": "1995-06-15",
  "dateOfBirth": "1995-06-15",
  "age": 29,
  "gender": "Male",
  "sex": "Male",
  "maritalStatus": "Single",
  "churchAttending": "Redeemed Christian Church of God",
  "church": "RCCG",
  "saved": "Yes",
  "baptized": "Yes",
  "holySpirit": "Yes",
  "ministry": ["Preaching", "Music"],
  "educationLevel": "Bachelors Degree",
  "school": "University of Lagos",
  "degrees": "B.Sc Computer Science",
  "workExperience": "5 years as Software Developer",
  "pastor1": "Pastor Samuel Johnson",
  "pastor1Phone": "+234 80 2222 2222",
  "pastor2": "Pastor Grace Adekunle",
  "pastor2Phone": "+234 80 3333 3333",
  "referredBy": "Church Website",
  "aboutYourself": "I have been a Christian for 15 years and feel called to full-time ministry...",
  "program": "Bible Institute",
  "status": "pending",
  "createdAt": "2024-12-10T10:30:00.000Z",
  "submittedAt": "2024-12-10T10:30:00.000Z",
  "updatedAt": "2024-12-10T10:30:00.000Z"
}
```

### Student Record Document

**Collection:** `students`
**Document ID:** `auto-generated`

```json
{
  "id": "doc-id-here",
  "fullName": "John Peter Doe",
  "studentId": "OBI123456",
  "email": "john.doe@example.com",
  "phone": "+234 80 1234 5678",
  "dob": "1995-06-15",
  "dateOfBirth": "1995-06-15",
  "gender": "Male",
  "program": "Bible Institute",
  "enrollmentDate": "2024-12-11",
  "status": "active",
  "church": "RCCG",
  "address": "123 Church Street, Lagos",
  "notes": "Admitted from application on 12/10/2024",
  "applicationId": "original-application-doc-id",
  "createdAt": "2024-12-11T09:00:00.000Z",
  "updatedAt": "2024-12-11T09:00:00.000Z"
}
```

## News Article Examples

### News Document

**Collection:** `news`
**Document ID:** `auto-generated`

```json
{
  "id": "doc-id-here",
  "title": "New Bible Study Program Launched",
  "excerpt": "We are excited to announce a new comprehensive Bible study program...",
  "content": "We are excited to announce a new comprehensive Bible study program designed for all levels of spiritual maturity. The program will run from January to June 2025 with sessions every Wednesday evening. Register now to secure your spot!",
  "category": "Academic",
  "author": "Admin",
  "image": "https://example.com/image.jpg",
  "published": true,
  "views": 145,
  "createdAt": "2024-12-10T14:20:00.000Z",
  "updatedAt": "2024-12-12T10:15:00.000Z"
}
```

## Contact Submission Example

### Contact Document

**Collection:** `contacts`
**Document ID:** `auto-generated`

```json
{
  "id": "doc-id-here",
  "name": "Grace Adekunle",
  "email": "grace.adekunle@example.com",
  "phone": "+234 80 5555 5555",
  "subject": "Inquiry about admission requirements",
  "message": "Hello, I would like to know more about the admission requirements for the OBI program. Do I need to have any prior theological education?",
  "read": false,
  "createdAt": "2024-12-12T08:45:00.000Z",
  "submittedAt": "2024-12-12T08:45:00.000Z"
}
```

## Event Example

### Event Document

**Collection:** `events`
**Document ID:** `auto-generated`

```json
{
  "id": "doc-id-here",
  "name": "Opening Ceremony 2025",
  "title": "Opening Ceremony 2025",
  "description": "Official opening ceremony of the 2025 academic year with all students, staff, and invited guests.",
  "date": "2025-01-15",
  "startTime": "10:00 AM",
  "endTime": "1:00 PM",
  "location": "Main Auditorium, Lekki Campus",
  "category": "Ceremony",
  "speaker": "Pastor Enoch Adeboye",
  "image": "https://example.com/event.jpg",
  "published": true,
  "createdAt": "2024-12-05T12:00:00.000Z",
  "updatedAt": "2024-12-12T10:00:00.000Z"
}
```

## Course/Program Example

### Course Document

**Collection:** `courses`
**Document ID:** `auto-generated`

```json
{
  "id": "doc-id-here",
  "name": "Bible Institute Certificate",
  "title": "Bible Institute Certificate Program",
  "description": "A comprehensive two-year program covering Old Testament, New Testament, Christian Doctrine, and Ministry Skills.",
  "duration": "2 years",
  "level": "Certificate",
  "modules": [
    "Old Testament Studies",
    "New Testament Studies",
    "Christian Doctrine",
    "Homiletics",
    "Church History"
  ],
  "requirements": "Secondary School Certificate",
  "cost": "Contact for pricing",
  "startDate": "2025-01-20",
  "image": "https://example.com/course.jpg",
  "active": true,
  "createdAt": "2024-11-01T00:00:00.000Z",
  "updatedAt": "2024-12-10T14:30:00.000Z"
}
```

## Ministry Example

### Ministry Document

**Collection:** `ministries`
**Document ID:** `auto-generated`

```json
{
  "id": "doc-id-here",
  "name": "Student Outreach Ministry",
  "description": "Engaging in community outreach and evangelism programs to reach the lost with the Gospel message.",
  "leader": "Pastor Samuel Johnson",
  "contact": "outreach@oasisimg.org",
  "phone": "+234 80 6666 6666",
  "members": 45,
  "meetingDay": "Saturday",
  "meetingTime": "3:00 PM",
  "location": "Fellowship Hall",
  "image": "https://example.com/ministry.jpg",
  "active": true,
  "createdAt": "2024-06-01T00:00:00.000Z",
  "updatedAt": "2024-12-10T09:30:00.000Z"
}
```

## Gallery Item Example

### Gallery Document

**Collection:** `gallery`
**Document ID:** `auto-generated`

```json
{
  "id": "doc-id-here",
  "title": "Convocation 2024",
  "description": "Students during the 2024 graduation ceremony.",
  "imageUrl": "https://drive.google.com/uc?export=view&id=FILE_ID",
  "thumbnailUrl": "https://drive.google.com/uc?export=view&id=THUMB_ID",
  "category": "Graduation",
  "uploadedBy": "Admin",
  "uploadedAt": "2024-12-01T16:00:00.000Z",
  "createdAt": "2024-12-01T16:00:00.000Z"
}
```

## Leadership Member Example

### Leadership Document

**Collection:** `leadership`
**Document ID:** `auto-generated`

```json
{
  "id": "doc-id-here",
  "name": "Reverend Dr. Paul Okafor",
  "position": "Principal",
  "title": "Principal & Head of Academic Affairs",
  "bio": "Dr. Okafor has over 20 years of experience in theological education and ministry. He holds a PhD in Biblical Studies from Princeton Theological Seminary.",
  "email": "p.okafor@oasisimg.org",
  "phone": "+234 80 7777 7777",
  "image": "https://example.com/paul-okafor.jpg",
  "department": "Administration",
  "active": true,
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-12-10T11:00:00.000Z"
}
```

## Site Image Example

### Site Image Document

**Collection:** `site-images`
**Document ID:** `auto-generated`

```json
{
  "id": "doc-id-here",
  "name": "Campus Main Building",
  "title": "Main Campus Building",
  "description": "The main building of the Oasis IMG ministry campus in Lekki, Lagos.",
  "imageUrl": "https://drive.google.com/uc?export=view&id=FILE_ID",
  "section": "Campus",
  "uploadedBy": "Admin",
  "uploadedAt": "2024-10-20T10:00:00.000Z",
  "createdAt": "2024-10-20T10:00:00.000Z"
}
```

## Bulk Data for Testing

To populate your Firestore for testing, copy and modify these templates for multiple entries:

### Script to Create Test Applications

```javascript
// Paste in browser console (while logged in as admin)
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { db } from './assets/js/firebase-config.js';

async function createTestApplications() {
  const names = [
    'Grace Adekunle', 'Samuel Johnson', 'Mary Okonkwo',
    'James Adeyemi', 'Faith Okafor', 'David Okoro'
  ];
  
  const churches = [
    'RCCG', 'Living Faith Church', 'Foursquare Gospel Church',
    'Deeper Life Ministry', 'Christ Embassy', 'Winners Chapel'
  ];
  
  for (let i = 0; i < names.length; i++) {
    const status = ['pending', 'approved', 'admitted', 'rejected'][i % 4];
    
    const app = {
      fullName: names[i],
      email: `${names[i].toLowerCase().replace(' ', '.')}@example.com`,
      phone: `+234 ${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
      church: churches[i % churches.length],
      age: 20 + Math.floor(Math.random() * 15),
      gender: i % 2 === 0 ? 'Male' : 'Female',
      status: status,
      program: 'Bible Institute',
      createdAt: new Date().toISOString(),
      submittedAt: new Date().toISOString()
    };
    
    try {
      const docRef = await addDoc(collection(db, 'obi-applications'), app);
      console.log(`Created application: ${docRef.id}`);
    } catch (error) {
      console.error('Error creating application:', error);
    }
  }
}

createTestApplications();
```

## Testing Data Checklist

When preparing test environment:

- [ ] Create at least 1 admin user
- [ ] Create 10-20 test applications with mixed statuses
- [ ] Create 5-10 test students
- [ ] Create 3-5 test news articles
- [ ] Create 5-10 contact submissions
- [ ] Create 2-3 test events (upcoming and past)
- [ ] Create 2-3 test courses
- [ ] Create 2-3 test ministries
- [ ] Create 5-10 gallery items
- [ ] Create 3-5 leadership members
- [ ] Create 5-10 site images

---

**Note:** All example data is fictional and for testing purposes only. Use realistic data when deploying to production.
