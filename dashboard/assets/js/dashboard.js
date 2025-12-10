// Dashboard Real-time Data Management
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, where, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const db = window.db;

// ============ DASHBOARD DATA LOADERS ============

// Load Applications with Real-time Updates
export function loadApplicationsRealtime(callback) {
    const q = query(collection(db, 'admissions'), orderBy('timestamp', 'desc'));

    return onSnapshot(q, (snapshot) => {
        const applications = [];
        snapshot.forEach(doc => {
            applications.push({ id: doc.id, ...doc.data() });
        });
        callback(applications);
    });
}

// Load Contacts with Real-time Updates
export function loadContactsRealtime(callback) {
    const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'));

    return onSnapshot(q, (snapshot) => {
        const contacts = [];
        snapshot.forEach(doc => {
            contacts.push({ id: doc.id, ...doc.data() });
        });
        callback(contacts);
    });
}

// Load News for Dashboard
export async function loadNewsForDashboard() {
    try {
        const q = query(collection(db, 'news'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const news = [];
        snapshot.forEach(doc => {
            news.push({ id: doc.id, ...doc.data() });
        });
        return news;
    } catch (error) {
        console.error('Error loading news:', error);
        return [];
    }
}

// ============ CRUD OPERATIONS ============

// Add News Article
export async function addNewsArticle(data) {
    try {
        const newsData = {
            ...data,
            date: new Date().toISOString(),
            timestamp: new Date().toISOString(),
            author: 'Admin'
        };

        const docRef = await addDoc(collection(db, 'news'), newsData);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding news:', error);
        return { success: false, error: error.message };
    }
}

// Update News Article
export async function updateNewsArticle(id, data) {
    try {
        const newsRef = doc(db, 'news', id);
        await updateDoc(newsRef, data);
        return { success: true };
    } catch (error) {
        console.error('Error updating news:', error);
        return { success: false, error: error.message };
    }
}

// Delete News Article
export async function deleteNewsArticle(id) {
    try {
        await deleteDoc(doc(db, 'news', id));
        return { success: true };
    } catch (error) {
        console.error('Error deleting news:', error);
        return { success: false, error: error.message };
    }
}

// Add Leader
export async function addLeader(data) {
    try {
        const leaderData = {
            ...data,
            timestamp: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, 'leadership'), leaderData);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding leader:', error);
        return { success: false, error: error.message };
    }
}

// Update Leader
export async function updateLeader(id, data) {
    try {
        const leaderRef = doc(db, 'leadership', id);
        await updateDoc(leaderRef, data);
        return { success: true };
    } catch (error) {
        console.error('Error updating leader:', error);
        return { success: false, error: error.message };
    }
}

// Delete Leader
export async function deleteLeader(id) {
    try {
        await deleteDoc(doc(db, 'leadership', id));
        return { success: true };
    } catch (error) {
        console.error('Error deleting leader:', error);
        return { success: false, error: error.message };
    }
}

// Update Application Status
export async function updateApplicationStatus(id, status) {
    try {
        const appRef = doc(db, 'admissions', id);
        await updateDoc(appRef, { status, updatedAt: new Date().toISOString() });
        return { success: true };
    } catch (error) {
        console.error('Error updating application:', error);
        return { success: false, error: error.message };
    }
}

// Mark Contact as Read
export async function markContactAsRead(id) {
    try {
        const contactRef = doc(db, 'contacts', id);
        await updateDoc(contactRef, { read: true, readAt: new Date().toISOString() });
        return { success: true };
    } catch (error) {
        console.error('Error marking contact as read:', error);
        return { success: false, error: error.message };
    }
}

// Delete Contact
export async function deleteContact(id) {
    try {
        await deleteDoc(doc(db, 'contacts', id));
        return { success: true };
    } catch (error) {
        console.error('Error deleting contact:', error);
        return { success: false, error: error.message };
    }
}

// ============ STUDENT MANAGEMENT ============

// Add Student
export async function addStudent(data) {
    try {
        const studentData = {
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, 'students'), studentData);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding student:', error);
        return { success: false, error: error.message };
    }
}

// Update Student
export async function updateStudent(id, data) {
    try {
        const studentRef = doc(db, 'students', id);
        await updateDoc(studentRef, { ...data, updatedAt: new Date().toISOString() });
        return { success: true };
    } catch (error) {
        console.error('Error updating student:', error);
        return { success: false, error: error.message };
    }
}

// Delete Student
export async function deleteStudent(id) {
    try {
        await deleteDoc(doc(db, 'students', id));
        return { success: true };
    } catch (error) {
        console.error('Error deleting student:', error);
        return { success: false, error: error.message };
    }
}

// Load Students with Real-time Updates
export function loadStudentsRealtime(callback) {
    const q = query(collection(db, 'students'), orderBy('enrollmentDate', 'desc'));

    return onSnapshot(q, (snapshot) => {
        const students = [];
        snapshot.forEach(doc => {
            students.push({ id: doc.id, ...doc.data() });
        });
        callback(students);
    });
}

// Create Student from Approved Application
export async function createStudentFromApplication(applicationData) {
    try {
        // Check if student already exists for this application
        const existingStudent = await getDocs(
            query(collection(db, 'students'), where('applicationId', '==', applicationData.id))
        );

        if (existingStudent.size > 0) {
            return { success: false, error: 'Student record already exists for this application' };
        }

        const studentData = {
            fullName: applicationData.fullName || applicationData.name,
            studentId: `OBI${Date.now().toString().slice(-6)}`, // Generate unique ID
            email: applicationData.email,
            phone: applicationData.phone,
            dob: applicationData.dob || applicationData.dateOfBirth,
            gender: applicationData.gender,
            program: applicationData.program,
            enrollmentDate: new Date().toISOString().split('T')[0],
            status: 'active',
            church: applicationData.church || applicationData.churchName,
            address: applicationData.address,
            notes: `Admitted from application on ${new Date().toLocaleDateString()}`,
            applicationId: applicationData.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, 'students'), studentData);
        return { success: true, id: docRef.id, studentData };
    } catch (error) {
        console.error('Error creating student from application:', error);
        return { success: false, error: error.message };
    }
}

// ============ STATISTICS ============

// Get Dashboard Statistics
export async function getDashboardStats() {
    try {
        const [admissions, students, contacts, news, leadership, events, courses, ministries] = await Promise.all([
            getDocs(collection(db, 'admissions')),
            getDocs(collection(db, 'students')),
            getDocs(collection(db, 'contacts')),
            getDocs(collection(db, 'news')),
            getDocs(collection(db, 'leadership')),
            getDocs(collection(db, 'events')),
            getDocs(collection(db, 'courses')),
            getDocs(collection(db, 'ministries'))
        ]);

        const pendingApps = await getDocs(
            query(collection(db, 'admissions'), where('status', '==', 'pending'))
        );

        return {
            totalApplications: admissions.size,
            pendingApplications: pendingApps.size,
            totalStudents: students.size,
            totalContacts: contacts.size,
            activeNews: news.size,
            totalLeaders: leadership.size,
            totalEvents: events.size,
            totalCourses: courses.size,
            totalMinistries: ministries.size
        };
    } catch (error) {
        console.error('Error getting stats:', error);
        return {
            totalApplications: 0,
            pendingApplications: 0,
            totalStudents: 0,
            totalContacts: 0,
            activeNews: 0,
            totalLeaders: 0,
            totalEvents: 0,
            totalCourses: 0,
            totalMinistries: 0
        };
    }
}

// Export to CSV
export function exportToCSV(data, filename) {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row =>
            headers.map(header =>
                JSON.stringify(row[header] || '')
            ).join(',')
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// ============ UI HELPERS ============

// Render Applications Table
export function renderApplicationsTable(applications) {
    const tbody = document.getElementById('applications-table');
    if (!tbody) return;

    tbody.innerHTML = '';

    applications.forEach(app => {
        const row = document.createElement('tr');
        const statusClass = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        }[app.status] || 'bg-gray-100 text-gray-800';

        row.innerHTML = `
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(app.fullName || app.name)}" class="w-10 h-10 rounded-full mr-3">
                    <div>
                        <p class="font-semibold">${app.fullName || app.name}</p>
                        <p class="text-sm text-gray-500">${app.email}</p>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4">${app.program}</td>
            <td class="px-6 py-4">${new Date(app.timestamp).toLocaleDateString()}</td>
            <td class="px-6 py-4">
                <span class="${statusClass} text-xs px-2 py-1 rounded-full">${app.status}</span>
            </td>
            <td class="px-6 py-4">
                <button onclick="viewApplication('${app.id}')" class="text-blue-600 hover:text-blue-700 mr-3"><i class="fas fa-eye"></i></button>
                <button onclick="approveApplication('${app.id}')" class="text-green-600 hover:text-green-700 mr-3"><i class="fas fa-check"></i></button>
                <button onclick="rejectApplication('${app.id}')" class="text-red-600 hover:text-red-700"><i class="fas fa-times"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Render Contacts
export function renderContacts(contacts) {
    const container = document.querySelector('#contacts-container');
    if (!container) return;

    container.innerHTML = '';

    contacts.forEach(contact => {
        const div = document.createElement('div');
        div.className = `p-6 hover:bg-gray-50 cursor-pointer ${contact.read ? 'bg-gray-50' : ''}`;

        const initials = (contact.name || 'UN').split(' ').map(n => n[0]).join('').toUpperCase();

        div.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex items-start space-x-4">
                    <div class="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold">
                        ${initials}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-2">
                            <h3 class="font-bold ${contact.read ? 'text-gray-500' : ''}">${contact.name}</h3>
                            ${!contact.read ? '<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">New</span>' : '<span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Read</span>'}
                        </div>
                        <p class="text-sm ${contact.read ? 'text-gray-500' : 'text-gray-600'} mb-2">${contact.email}</p>
                        <p class="text-sm font-semibold ${contact.read ? 'text-gray-600' : 'text-gray-700'} mb-2">Subject: ${contact.subject}</p>
                        <p class="${contact.read ? 'text-gray-500' : 'text-gray-600'}">${contact.message}</p>
                        <p class="text-xs ${contact.read ? 'text-gray-400' : 'text-gray-500'} mt-3">${new Date(contact.timestamp).toLocaleString()}</p>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="markAsRead('${contact.id}')" class="text-green-600 hover:text-green-700 p-2" title="Mark as Read">
                        <i class="fas fa-check-circle"></i>
                    </button>
                    <button onclick="replyToContact('${contact.email}')" class="text-blue-600 hover:text-blue-700 p-2" title="Reply">
                        <i class="fas fa-reply"></i>
                    </button>
                    <button onclick="deleteContactItem('${contact.id}')" class="text-red-600 hover:text-red-700 p-2" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Make functions globally available
window.renderApplicationsTable = renderApplicationsTable;
window.renderContacts = renderContacts;
window.exportToCSV = exportToCSV;
window.getDashboardStats = getDashboardStats;
window.updateApplicationStatus = updateApplicationStatus;
window.markContactAsRead = markContactAsRead;
window.deleteContact = deleteContact;
window.addNewsArticle = addNewsArticle;
window.addLeader = addLeader;
window.addStudent = addStudent;
window.updateStudent = updateStudent;
window.deleteStudent = deleteStudent;
window.loadStudentsRealtime = loadStudentsRealtime;
window.createStudentFromApplication = createStudentFromApplication;