# Admin Dashboard Setup & Configuration Guide

## Overview
This document provides instructions for setting up admin role access to the dashboard and managing data display across all pages.

## System Architecture

### New Components Created

#### 1. **auth-service.js** (`dashboard/assets/js/auth-service.js`)
Handles all authentication and admin role management:
- `loginUser(email, password)` - Login with admin role verification
- `isUserAdmin()` - Check if current user has admin role
- `getCurrentUser()` - Get current authenticated user details
- `logoutUser()` - Sign out current user
- `ensureAdminAccess()` - Middleware to protect dashboard pages
- `getAllAdminUsers()` - Retrieve all admin users
- `registerAdminUser()` - Register new admin users (admin-only)
- `onAuthChange(callback)` - Listen to auth state changes

#### 2. **data-service.js** (`dashboard/assets/js/data-service.js`)
Fetches all data from Firestore collections:
- `getAllApplications()` - Fetch applications
- `getAllOBIApplications()` - Fetch OBI applications
- `getAllAdmissions()` - Fetch admissions
- `getAllStudents()` - Fetch enrolled students
- `getAllNews()` - Fetch news articles
- `getAllContacts()` - Fetch contact submissions
- `getAllCourses()` - Fetch courses/programs
- `getAllEvents()` - Fetch events
- `getAllMinistries()` - Fetch ministry data
- `getAllGalleryItems()` - Fetch gallery items
- `getAllLeadership()` - Fetch leadership information
- `getAllSiteImages()` - Fetch site images
- `getDashboardStats()` - Get comprehensive dashboard statistics
- `getDocumentById(collection, documentId)` - Fetch single document

### Updated Firestore Security Rules

The security rules in `firestore.rules` have been updated to implement role-based access control:

```javascript
// Admin role check function
function isAdmin() {
  return isAuthenticated() && 
         exists(/databases/$(database)/documents/admin-users/$(request.auth.uid)) &&
         get(/databases/$(database)/documents/admin-users/$(request.auth.uid)).data.role == 'admin' &&
         get(/databases/$(database)/documents/admin-users/$(request.auth.uid)).data.active == true;
}
```

**Access Control by Collection:**
- `admin-users`: Admin only (read/write)
- `applications`, `obi-applications`, `admissions`: Public write, Admin read
- `students`: Admin write, Authenticated read
- `contacts`: Public write, Admin read
- `news`, `events`, `courses`, `gallery`, `leadership`, `ministries`: Public read, Admin write
- `site-settings`: Public read, Admin write

## Setting Up Admin Users

### Step 1: Create Admin User Records in Firestore

To set up admin access, you need to create user records in the `admin-users` collection with the following structure:

```json
{
  "uid": "user-uid-from-firebase-auth",
  "email": "admin@example.com",
  "displayName": "Admin Name",
  "role": "admin",
  "active": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "createdBy": "initial-admin-uid"
}
```

### Step 2: Create Firebase Authentication Users

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `oasis-c0682`
3. Navigate to **Authentication** > **Users**
4. Click **Create user** or use the **Add user** button
5. Enter the admin's email and password
6. Copy the **UID** that Firebase assigns
7. Use this UID in the `admin-users` document

### Step 3: Create Admin User via Firestore

1. Go to **Firestore Database**
2. Navigate to or create the `admin-users` collection
3. Click **Add document**
4. Set the document ID to the **UID** from Firebase Auth
5. Add the following fields:
   - `email` (string): Admin email
   - `displayName` (string): Admin's full name
   - `role` (string): "admin"
   - `active` (boolean): true
   - `createdAt` (timestamp): Current date/time
   - `createdBy` (string): Your UID or "system"

### Example Firestore Document:
```
Document ID: "abc123xyz789"
Fields:
  email: "admin@oasisimg.org"
  displayName: "John Administrator"
  role: "admin"
  active: true
  createdAt: December 12, 2024
  createdBy: "system"
```

## Dashboard Pages & Data Display

### Main Dashboard (index.html)
Displays:
- Total applications
- Total students
- Pending applications
- Total contacts
- Active news count
- Total events
- Programs offered
- Ministries
- Recent applications (5 latest)
- Quick action links

**Data Flow:**
1. Page loads
2. `ensureAdminAccess()` checks authentication
3. `getDashboardStats()` fetches all statistics
4. UI updates with real data

### Admissions Page (admissions.html)
Displays all applications with:
- Full application list with filtering
- Status tracking (pending, approved, admitted, rejected)
- Application details modal
- Approve/Reject functionality
- CSV export

### Student Records (students.html)
Displays all enrolled students:
- Student list with search/filter
- Status breakdown (active, graduated, inactive)
- Add/Edit student records
- CSV export

### News Management (news.html)
Displays and manages news articles:
- Article list with search
- Add/Edit/Delete articles
- Category filtering
- Publication status toggle

### Contacts (contacts.html)
Displays contact form submissions:
- Contact list with search
- Read/Unread status tracking
- Contact details modal
- Export functionality

### Additional Pages
- **courses.html**: Programs offered
- **events.html**: Scheduled events
- **ministries.html**: Ministry information
- **gallery.html**: Photo gallery management
- **leadership.html**: Leadership team
- **site-images.html**: Site-wide images

## Authentication Flow

### Login Process
1. User enters email and password on login.html
2. `loginUser()` called with credentials
3. Firebase authenticates user
4. System checks if user has admin role in `admin-users` collection
5. If admin: User logged in, redirected to dashboard
6. If not admin: User logged out with error message

### Dashboard Access
1. Dashboard pages call `ensureAdminAccess()`
2. Checks if user is authenticated
3. Verifies admin role in Firestore
4. If valid: Page loads with data
5. If invalid: Redirected to login.html

### Logout
1. User clicks logout button
2. `logoutUser()` called
3. Firebase auth session ended
4. User redirected to login.html

## Database Schema

### admin-users Collection
```javascript
{
  uid: string,                    // Firebase Auth UID (document ID)
  email: string,                  // Admin email
  displayName: string,            // Full name
  role: string,                   // "admin"
  active: boolean,                // true/false
  createdAt: timestamp,           // Creation date
  createdBy: string,              // Creator's UID
  lastLogin?: timestamp,          // Optional: Last login
  permissions?: object            // Optional: Specific permissions
}
```

### applications/obi-applications Collections
```javascript
{
  id: string,                     // Document ID
  fullName: string,
  email: string,
  phone: string,
  program: string,
  status: string,                 // pending, approved, admitted, rejected
  createdAt: timestamp,
  submittedAt: timestamp,
  ...other application fields
}
```

### students Collection
```javascript
{
  id: string,
  fullName: string,
  studentId: string,
  email: string,
  phone: string,
  program: string,
  status: string,                 // active, graduated, inactive
  enrollmentDate: date,
  church: string,
  ...other student fields
}
```

## Testing Admin Access

### Test with Test Credentials
1. Create a test admin user in Firebase Auth
2. Add corresponding document in `admin-users` collection
3. Use login.html with these credentials
4. Verify redirect to dashboard
5. Test data loads correctly

### Test with Non-Admin User
1. Create a regular user in Firebase Auth
2. Do NOT add to `admin-users` collection
3. Try to login
4. Should see error: "Only administrators can access the dashboard..."

### Console Testing
Open browser console and test functions:
```javascript
// Import services
import { isUserAdmin, getCurrentUser } from './assets/js/auth-service.js';
import { getDashboardStats, getAllStudents } from './assets/js/data-service.js';

// Test admin status
const isAdmin = await isUserAdmin();
console.log('Is Admin:', isAdmin);

// Test current user
const user = await getCurrentUser();
console.log('Current User:', user);

// Test dashboard stats
const stats = await getDashboardStats();
console.log('Dashboard Stats:', stats);
```

## Troubleshooting

### "Only administrators can access the dashboard" Error
**Solution:**
1. Verify user exists in Firebase Auth
2. Check `admin-users` collection for matching UID
3. Ensure `role` field is exactly "admin"
4. Ensure `active` field is true
5. Check browser console for exact error

### Data Not Loading
**Solution:**
1. Check Firestore has data in collections
2. Verify user is authenticated (check auth state)
3. Check browser console for error messages
4. Verify Firestore security rules allow read access
5. Check network tab for failed requests

### Redirect Loop (Login → Dashboard → Login)
**Solution:**
1. Clear browser cache and cookies
2. Check if user auth token is valid
3. Verify `admin-users` document exists
4. Check admin role is set to "admin"
5. Check if `active` field is true

### CORS or Firebase Configuration Errors
**Solution:**
1. Verify Firebase config in `assets/js/firebase-config.js`
2. Check Firebase project credentials are correct
3. Ensure Firestore is enabled in Firebase project
4. Check if user has required Firestore permissions

## Best Practices

### Security
1. **Always** verify admin role server-side (in Firestore rules)
2. Never hardcode admin status in client code
3. Regularly audit `admin-users` collection
4. Set `active: false` to disable accounts instead of deleting
5. Use strong passwords for admin accounts
6. Enable 2FA in Firebase Console if available

### Data Management
1. Archive old applications instead of deleting
2. Soft-delete records (mark as inactive)
3. Keep audit trail of changes
4. Regular backups of Firestore data
5. Monitor collection sizes and growth

### Performance
1. Use pagination for large lists
2. Index commonly filtered fields in Firestore
3. Cache dashboard statistics
4. Lazy load page content
5. Optimize query limits

## Next Steps

1. **Create Initial Admin User**
   - Create admin in Firebase Auth
   - Add to `admin-users` collection

2. **Test All Dashboard Pages**
   - Verify admin access works
   - Check all data displays correctly
   - Test CRUD operations

3. **Deploy Security Rules**
   - Publish updated `firestore.rules` to Firestore

4. **Train Admins**
   - Document how to use dashboard
   - Set up monitoring and alerts
   - Create backup procedures

## Support & Documentation

For more information:
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
