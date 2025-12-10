# Dashboard Admissions - Firebase Data Integration

## Overview
The dashboard admissions page (`dashboard/admissions.html`) is fully configured to fetch and display all admission applications from Firebase Firestore.

## Data Flow

### 1. **Data Source**
- **Collection**: `obi-applications` in Firebase Firestore
- **Fetch Method**: `getDocs(collection(db, 'obi-applications'))`
- **Sorting**: Applications sorted by `submittedAt` date (newest first) in JavaScript

### 2. **Page Load Initialization**
On page load, the following sequence occurs:

```
1. DOMContentLoaded event fires
   ↓
2. initEmailJS() - Initialize email service
   ↓
3. loadApplications() - Fetch all data from Firebase
   ↓
4. updateStatistics() - Calculate and display counts
   ↓
5. filterByStatus('all') - Display all applications
   ↓
6. hideLoading() - Hide the loading overlay
   ↓
7. setupSearchListener() - Enable search functionality
```

### 3. **Data Display**
Applications are rendered in a table with:
- **Columns**: Applicant, Contact, Church, Date, Status, Actions
- **Pagination**: 10 items per page
- **Status Badges**: Pending, Admitted, Approved, Rejected (color-coded)
- **Action Buttons**: View, Approve, Reject

### 4. **Features Implemented**
✅ **Fetch all applications** from Firebase  
✅ **Real-time statistics** (Total, Pending, Approved, Rejected counts)  
✅ **Status filtering** (All, Pending, Approved, Rejected)  
✅ **Search functionality** (by name, email, phone)  
✅ **Pagination** (10 items per page)  
✅ **View details** in modal dialog  
✅ **Quick actions** (Approve, Reject)  
✅ **Update status** with email notifications  
✅ **Create student records** from approved applications  
✅ **Export to CSV** functionality  
✅ **Refresh data** button to reload applications  
✅ **Print support** with custom styles  

### 5. **Error Handling**
- Loading overlay prevents user interaction during fetch
- Error messages displayed if data fails to load
- Console logging for debugging
- Graceful fallbacks for missing data fields

### 6. **Performance**
- No composite index required (sorting done in JavaScript)
- Efficient pagination (only renders visible items)
- Client-side search (no additional queries)
- Asynchronous loading (non-blocking UI)

## Testing
To test the admissions dashboard:
1. Visit `dashboard/admissions.html`
2. Wait for "Loading applications..." overlay to disappear
3. Verify all application counts appear in the statistics section
4. Check that applications are listed in the table
5. Test filtering by status
6. Test search by applicant name/email
7. Click "View" to see full application details

## Database Schema
Expected document structure in `obi-applications`:
```javascript
{
  id: "document_id",
  name: "Full Name",
  email: "email@example.com",
  phone: "phone number",
  address: "address",
  age: 25,
  sex: "Male/Female",
  dob: "date of birth",
  churchAttending: "church name",
  status: "pending|admitted|approved|rejected",
  submittedAt: "2025-12-10T10:30:00.000Z",
  // ... other application fields
}
```

## Troubleshooting
- **No applications showing**: Check if documents exist in `obi-applications` collection
- **Slow loading**: May be due to large number of documents (pagination helps)
- **Status updates not working**: Verify Firestore rules allow updates
- **Emails not sending**: Check EmailJS configuration in `email-service.js`

