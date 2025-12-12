# Quick Admin Setup Reference

## Create Admin User - Step by Step

### Step 1: In Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select "oasis-c0682" project
3. Click **Authentication** in left sidebar
4. Click **Create user** button
5. Enter email (e.g., `admin@oasisimg.org`)
6. Enter a strong password
7. Click **Create user**
8. **Copy the UID** displayed (e.g., `abc123xyz789`)

### Step 2: In Firestore Database

1. Click **Firestore Database** in left sidebar
2. If `admin-users` collection doesn't exist, click **Start collection** and create it
3. Click **+ Add document** button
4. Paste the UID as the document ID
5. Add these fields:

| Field Name | Type | Value | Example |
|-----------|------|-------|---------|
| email | String | Admin's email | admin@oasisimg.org |
| displayName | String | Admin's full name | John Administrator |
| role | String | Must be exactly "admin" | admin |
| active | Boolean | true | true |
| createdAt | Timestamp | Current date/time | [Set to Now] |
| createdBy | String | "system" or your UID | system |

6. Click **Save**

### Step 3: Test Login

1. Go to `https://yourdomain.com/dashboard/login.html`
2. Enter the admin email
3. Enter the password
4. Click Sign In
5. Should redirect to dashboard with data loaded

## One-Click Firestore Document Template

Copy this JSON and modify for your admin user(s):

```json
{
  "email": "admin@oasisimg.org",
  "displayName": "John Administrator",
  "role": "admin",
  "active": true,
  "createdAt": "2024-12-12T12:00:00.000Z",
  "createdBy": "system"
}
```

## Common Admin Users to Create

### Main Administrator
```json
{
  "email": "admin@oasisimg.org",
  "displayName": "Main Administrator",
  "role": "admin",
  "active": true,
  "createdAt": "2024-12-12T00:00:00Z",
  "createdBy": "system"
}
```

### Content Manager
```json
{
  "email": "content@oasisimg.org",
  "displayName": "Content Manager",
  "role": "admin",
  "active": true,
  "createdAt": "2024-12-12T00:00:00Z",
  "createdBy": "system"
}
```

### Admissions Coordinator
```json
{
  "email": "admissions@oasisimg.org",
  "displayName": "Admissions Coordinator",
  "role": "admin",
  "active": true,
  "createdAt": "2024-12-12T00:00:00Z",
  "createdBy": "system"
}
```

## Firestore Rules Upload

1. In Firebase Console, go to **Firestore Database**
2. Click **Rules** tab at top
3. Replace entire content with the updated rules from `/workspaces/obi/firestore.rules`
4. Click **Publish**

## Javascript Console Testing

Paste these in browser console (F12) while logged in as admin:

```javascript
// Import services
import { isUserAdmin, getCurrentUser } from './dashboard/assets/js/auth-service.js';
import { getDashboardStats } from './dashboard/assets/js/data-service.js';

// Check if you're admin
const admin = await isUserAdmin();
console.log('Admin Status:', admin);

// Get your user info
const user = await getCurrentUser();
console.log('User Info:', user);

// Get dashboard stats
const stats = await getDashboardStats();
console.log('Dashboard Stats:', stats);

// All applications
const apps = stats.recentApplications;
console.log('Recent Applications:', apps);

// All students
const { getAllStudents } = await import('./dashboard/assets/js/data-service.js');
const students = await getAllStudents();
console.log('All Students:', students);
```

## Disable Admin Account

To disable an admin without deleting:

1. Open the admin user document in Firestore
2. Change `active` field from `true` to `false`
3. Save

The user can no longer login.

## Re-enable Admin Account

To re-enable a disabled admin:

1. Open the admin user document in Firestore
2. Change `active` field from `false` to `true`
3. Save

The user can login again.

## Reset Admin Password

1. Go to Firebase Console **Authentication** > **Users**
2. Find the admin user
3. Click the **⋮** menu
4. Select **Reset password**
5. Firebase sends password reset email
6. Admin clicks link and creates new password

## Delete Admin Account (Rarely Needed)

1. Go to Firebase Console **Authentication** > **Users**
2. Find the admin user
3. Click the **⋮** menu
4. Select **Delete user**
5. Also delete the corresponding document from `admin-users` collection in Firestore

**Note:** Prefer disabling (`active: false`) over deleting for audit trail.

## Troubleshooting Commands

### Can't Login?
1. Check UID matches between Firebase Auth and Firestore
2. Verify email matches exactly
3. Clear browser cookies
4. Try incognito/private window

### Dashboard Shows No Data?
1. Check Firestore has sample data in collections
2. Open browser DevTools (F12) > Console
3. Run:
```javascript
import { getDashboardStats } from './dashboard/assets/js/data-service.js';
const stats = await getDashboardStats();
console.log(stats);
```
4. Check if collections are returning data

### Pages Keep Redirecting to Login?
1. Verify `active: true` in admin user document
2. Verify `role: "admin"` (case-sensitive)
3. Check UID in admin-users matches Firebase Auth UID
4. Clear browser cache
5. Try different browser

## Dashboard Features Now Available

✅ **Authentication**: Admin role verification on login
✅ **Dashboard**: Real-time statistics from all collections
✅ **Applications**: View all applications with status
✅ **Students**: Manage enrolled students
✅ **News**: Create and manage articles
✅ **Contacts**: View contact submissions
✅ **Events**: Manage events
✅ **Programs**: Manage courses/programs
✅ **Ministries**: Manage ministry information
✅ **Gallery**: Manage photos
✅ **Leadership**: Manage leadership team
✅ **Security**: Role-based Firestore rules

## Need Help?

Check the `ADMIN_SETUP_GUIDE.md` for comprehensive documentation on:
- Complete system architecture
- All security rules
- Data schemas
- Advanced configurations
- Best practices
