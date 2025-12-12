// Data Service - Fetch all collections from Firestore
import { collection, getDocs, doc, getDoc, query, where, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { db as firebaseDb } from '../../../assets/js/firebase-config.js';

const getDb = () => {
    if (firebaseDb) {
        return firebaseDb;
    }
    if (window.db) {
        return window.db;
    }
    const error = 'Firebase database not initialized. Check firebase-config.js is loaded.';
    console.error(error);
    throw new Error(error);
};

/**
 * Fetch all applications
 * @returns {Promise<Array>} Array of applications
 */
export async function getAllApplications() {
    try {
        const db = getDb();
        const applicationsCol = collection(db, 'applications');
        const querySnapshot = await getDocs(applicationsCol);
        
        const applications = [];
        querySnapshot.forEach((doc) => {
            applications.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return applications.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } catch (error) {
        console.error('Error fetching applications:', error);
        return [];
    }
}

/**
 * Fetch all OBI applications
 * @returns {Promise<Array>} Array of OBI applications
 */
export async function getAllOBIApplications() {
    try {
        const db = getDb();
        const obiAppCol = collection(db, 'obi-applications');
        const querySnapshot = await getDocs(obiAppCol);
        
        const applications = [];
        querySnapshot.forEach((doc) => {
            applications.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return applications.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } catch (error) {
        console.error('Error fetching OBI applications:', error);
        return [];
    }
}

/**
 * Fetch all admissions
 * @returns {Promise<Array>} Array of admissions
 */
export async function getAllAdmissions() {
    try {
        const db = getDb();
        const admissionsCol = collection(db, 'admissions');
        const querySnapshot = await getDocs(admissionsCol);
        
        const admissions = [];
        querySnapshot.forEach((doc) => {
            admissions.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return admissions.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } catch (error) {
        console.error('Error fetching admissions:', error);
        return [];
    }
}

/**
 * Fetch all students
 * @returns {Promise<Array>} Array of students
 */
export async function getAllStudents() {
    try {
        const db = getDb();
        const studentsCol = collection(db, 'students');
        const querySnapshot = await getDocs(studentsCol);
        
        const students = [];
        querySnapshot.forEach((doc) => {
            students.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return students.sort((a, b) => (a.fullName || '').localeCompare(b.fullName || ''));
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
}

/**
 * Fetch all news articles
 * @returns {Promise<Array>} Array of news articles
 */
export async function getAllNews() {
    try {
        const db = getDb();
        const newsCol = collection(db, 'news');
        const querySnapshot = await getDocs(newsCol);
        
        const news = [];
        querySnapshot.forEach((doc) => {
            news.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return news.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

/**
 * Fetch all contacts
 * @returns {Promise<Array>} Array of contacts
 */
export async function getAllContacts() {
    try {
        const db = getDb();
        const contactsCol = collection(db, 'contacts');
        const querySnapshot = await getDocs(contactsCol);
        
        const contacts = [];
        querySnapshot.forEach((doc) => {
            contacts.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return contacts.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
}

/**
 * Fetch all courses/programs
 * @returns {Promise<Array>} Array of courses
 */
export async function getAllCourses() {
    try {
        const db = getDb();
        const coursesCol = collection(db, 'courses');
        const querySnapshot = await getDocs(coursesCol);
        
        const courses = [];
        querySnapshot.forEach((doc) => {
            courses.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return courses.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

/**
 * Fetch all events
 * @returns {Promise<Array>} Array of events
 */
export async function getAllEvents() {
    try {
        const db = getDb();
        const eventsCol = collection(db, 'events');
        const querySnapshot = await getDocs(eventsCol);
        
        const events = [];
        querySnapshot.forEach((doc) => {
            events.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return events.sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0));
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

/**
 * Fetch all ministries
 * @returns {Promise<Array>} Array of ministries
 */
export async function getAllMinistries() {
    try {
        const db = getDb();
        const ministriesCol = collection(db, 'ministries');
        const querySnapshot = await getDocs(ministriesCol);
        
        const ministries = [];
        querySnapshot.forEach((doc) => {
            ministries.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return ministries.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } catch (error) {
        console.error('Error fetching ministries:', error);
        return [];
    }
}

/**
 * Fetch all gallery items
 * @returns {Promise<Array>} Array of gallery items
 */
export async function getAllGalleryItems() {
    try {
        const db = getDb();
        const galleryCol = collection(db, 'gallery');
        const querySnapshot = await getDocs(galleryCol);
        
        const gallery = [];
        querySnapshot.forEach((doc) => {
            gallery.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return gallery.sort((a, b) => new Date(b.uploadedAt || b.createdAt || 0) - new Date(a.uploadedAt || a.createdAt || 0));
    } catch (error) {
        console.error('Error fetching gallery:', error);
        return [];
    }
}

/**
 * Fetch all leadership members
 * @returns {Promise<Array>} Array of leadership members
 */
export async function getAllLeadership() {
    try {
        const db = getDb();
        const leadershipCol = collection(db, 'leadership');
        const querySnapshot = await getDocs(leadershipCol);
        
        const leadership = [];
        querySnapshot.forEach((doc) => {
            leadership.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return leadership.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } catch (error) {
        console.error('Error fetching leadership:', error);
        return [];
    }
}

/**
 * Fetch all site images
 * @returns {Promise<Array>} Array of site images
 */
export async function getAllSiteImages() {
    try {
        const db = getDb();
        const imagesCol = collection(db, 'site-images');
        const querySnapshot = await getDocs(imagesCol);
        
        const images = [];
        querySnapshot.forEach((doc) => {
            images.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return images.sort((a, b) => new Date(b.uploadedAt || b.createdAt || 0) - new Date(a.uploadedAt || a.createdAt || 0));
    } catch (error) {
        console.error('Error fetching site images:', error);
        return [];
    }
}

/**
 * Fetch dashboard statistics
 * @returns {Promise<Object>} Statistics object
 */
export async function getDashboardStats() {
    try {
        const [
            applications,
            obiApplications,
            students,
            news,
            contacts,
            courses,
            events,
            ministries,
            gallery,
            leadership
        ] = await Promise.all([
            getAllApplications(),
            getAllOBIApplications(),
            getAllStudents(),
            getAllNews(),
            getAllContacts(),
            getAllCourses(),
            getAllEvents(),
            getAllMinistries(),
            getAllGalleryItems(),
            getAllLeadership()
        ]);

        // Calculate status breakdown for applications
        const applicationsByStatus = {
            pending: applications.filter(a => a.status === 'pending').length,
            approved: applications.filter(a => a.status === 'approved').length,
            admitted: applications.filter(a => a.status === 'admitted').length,
            rejected: applications.filter(a => a.status === 'rejected').length
        };

        // Calculate status breakdown for OBI applications
        const obiApplicationsByStatus = {
            pending: obiApplications.filter(a => a.status === 'pending').length,
            approved: obiApplications.filter(a => a.status === 'approved').length,
            admitted: obiApplications.filter(a => a.status === 'admitted').length,
            rejected: obiApplications.filter(a => a.status === 'rejected').length
        };

        // Calculate student status breakdown
        const studentsByStatus = {
            active: students.filter(s => s.status === 'active').length,
            graduated: students.filter(s => s.status === 'graduated').length,
            inactive: students.filter(s => s.status === 'inactive').length
        };

        return {
            totalApplications: applications.length,
            applicationsByStatus,
            totalOBIApplications: obiApplications.length,
            obiApplicationsByStatus,
            totalStudents: students.length,
            studentsByStatus,
            totalNews: news.length,
            totalContacts: contacts.length,
            totalCourses: courses.length,
            totalEvents: events.length,
            totalMinistries: ministries.length,
            totalGalleryItems: gallery.length,
            totalLeadershipMembers: leadership.length,
            recentApplications: applications.slice(0, 5),
            recentNews: news.slice(0, 5),
            recentContacts: contacts.slice(0, 5),
            upcomingEvents: events.slice(0, 5)
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return {
            totalApplications: 0,
            applicationsByStatus: { pending: 0, approved: 0, admitted: 0, rejected: 0 },
            totalOBIApplications: 0,
            obiApplicationsByStatus: { pending: 0, approved: 0, admitted: 0, rejected: 0 },
            totalStudents: 0,
            studentsByStatus: { active: 0, graduated: 0, inactive: 0 },
            totalNews: 0,
            totalContacts: 0,
            totalCourses: 0,
            totalEvents: 0,
            totalMinistries: 0,
            totalGalleryItems: 0,
            totalLeadershipMembers: 0,
            recentApplications: [],
            recentNews: [],
            recentContacts: [],
            upcomingEvents: []
        };
    }
}

/**
 * Fetch a single document by ID
 * @param {string} collection - Collection name
 * @param {string} documentId - Document ID
 * @returns {Promise<Object>} Document data or null
 */
export async function getDocumentById(collection, documentId) {
    try {
        const db = getDb();
        const docRef = doc(db, collection, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            };
        }
        return null;
    } catch (error) {
        console.error(`Error fetching document from ${collection}:`, error);
        return null;
    }
}
