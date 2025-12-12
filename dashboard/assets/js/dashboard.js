// Dashboard Utilities - Minimal Implementation
// Most dashboard pages implement their own data loading inline
// This file only exports the one function that's actually used externally
import { collection, getDocs, addDoc, doc, where, query } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { db as firebaseDb } from '../../../assets/js/firebase-config.js';

// Get database reference
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
 * Create a student record from an approved application
 * Used by: dashboard/admissions.html
 * @param {Object} applicationData - The application data from admissions collection
 * @returns {Promise<Object>} Success status and student ID or error message
 */
export async function createStudentFromApplication(applicationData) {
    try {
        // Check if student already exists for this application
        const existingStudent = await getDocs(
            query(collection(getDb(), 'students'), where('applicationId', '==', applicationData.id))
        );

        if (existingStudent.size > 0) {
            return { success: false, error: 'Student record already exists for this application' };
        }

        // Map application data to student data
        const studentData = {
            fullName: applicationData.fullName || applicationData.name || 'N/A',
            studentId: `OBI${Date.now().toString().slice(-6)}`,
            email: applicationData.email || '',
            phone: applicationData.phone || '',
            dob: applicationData.dob || applicationData.dateOfBirth || '',
            gender: applicationData.gender || applicationData.sex || '',
            program: applicationData.program || 'Bible Institute',
            enrollmentDate: new Date().toISOString().split('T')[0],
            status: 'active',
            church: applicationData.church || applicationData.churchName || applicationData.churchAttending || '',
            address: applicationData.address || '',
            notes: `Admitted from application on ${new Date().toLocaleDateString()}`,
            applicationId: applicationData.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const docRef = await addDoc(collection(getDb(), 'students'), studentData);
        return { success: true, id: docRef.id, studentData };
    } catch (error) {
        console.error('Error creating student from application:', error);
        return { success: false, error: error.message };
    }
}