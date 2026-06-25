// Dashboard Utilities — Supabase edition
import { supabase } from '../../../assets/js/supabase-config.js';

/**
 * Create a student record from an approved application.
 * Used by: dashboard/admissions.html
 * @param {Object} applicationData - The application data from admissions collection
 * @returns {Promise<Object>} Success status and student id or error message
 */
export async function createStudentFromApplication(applicationData) {
    try {
        // Check if student already exists for this application
        const { data: existing } = await supabase
            .from('students')
            .select('id')
            .eq('application_id', applicationData.id)
            .maybeSingle();

        if (existing) {
            return { success: false, error: 'Student record already exists for this application' };
        }

        const studentData = {
            full_name:        applicationData.fullName || applicationData.name || 'N/A',
            student_id:       `OBI${Date.now().toString().slice(-6)}`,
            email:            applicationData.email || '',
            phone:            applicationData.phone || '',
            dob:              applicationData.dob || applicationData.dateOfBirth || '',
            gender:           applicationData.gender || applicationData.sex || '',
            program:          applicationData.program || 'Bible Institute',
            enrollment_date:  new Date().toISOString().split('T')[0],
            status:           'active',
            church:           applicationData.church || applicationData.churchName || applicationData.churchAttending || '',
            address:          applicationData.address || '',
            notes:            `Admitted from application on ${new Date().toLocaleDateString()}`,
            application_id:   applicationData.id,
            created_at:       new Date().toISOString(),
            updated_at:       new Date().toISOString(),
        };

        const { data, error } = await supabase.from('students').insert(studentData).select().single();
        if (error) throw error;
        return { success: true, id: data.id, studentData };
    } catch (error) {
        console.error('Error creating student from application:', error);
        return { success: false, error: error.message };
    }
}