// Data Service — Supabase edition
import { supabase } from '../../../assets/js/supabase-config.js';

// ─── Helpers ─────────────────────────────────────────────────

/** Generic fetch-all for any table, sorted by a given column desc */
async function fetchAll(table, orderCol = 'created_at') {
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .order(orderCol, { ascending: false });
    if (error) { console.error(`Error fetching ${table}:`, error); return []; }
    return data || [];
}

/** Generic fetch-single by id */
async function fetchById(table, id) {
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single();
    if (error) { console.error(`Error fetching ${table}/${id}:`, error); return null; }
    return data;
}

// ─── Public functions ─────────────────────────────────────────

export async function getAllApplications()    { return fetchAll('applications'); }
export async function getAllOBIApplications() { return fetchAll('obi_applications', 'submitted_at'); }
export async function getAllAdmissions()      { return fetchAll('admissions'); }
export async function getAllStudents()        { return fetchAll('students'); }
export async function getAllNews()            { return fetchAll('news', 'published_at'); }
export async function getAllContacts()        { return fetchAll('contacts'); }
export async function getAllCourses()         { return fetchAll('courses', 'sort_order'); }
export async function getAllEvents()          { return fetchAll('events', 'date'); }
export async function getAllMinistries()      { return fetchAll('ministries', 'sort_order'); }
export async function getAllGalleryItems()    { return fetchAll('gallery', 'upload_date'); }
export async function getAllLeadership()      { return fetchAll('leadership', 'sort_order'); }
export async function getAllSiteImages()      { return fetchAll('site_images', 'uploaded_at'); }
export async function getAllCredentials()     { return fetchAll('credentials'); }
export async function getAllSponsors()        { return fetchAll('sponsors'); }

/** Fetch a single row by ID from any table */
export async function getDocumentById(table, id) {
    return fetchById(table, id);
}

/** Aggregate dashboard statistics */
export async function getDashboardStats() {
    try {
        const [
            applications, obiApplications, students, news, contacts,
            courses, events, ministries, gallery, leadership
        ] = await Promise.all([
            getAllApplications(), getAllOBIApplications(), getAllStudents(),
            getAllNews(), getAllContacts(), getAllCourses(), getAllEvents(),
            getAllMinistries(), getAllGalleryItems(), getAllLeadership()
        ]);

        const byStatus = (arr) => ({
            pending:  arr.filter(a => a.status === 'pending').length,
            approved: arr.filter(a => a.status === 'approved').length,
            admitted: arr.filter(a => a.status === 'admitted').length,
            rejected: arr.filter(a => a.status === 'rejected').length,
        });

        return {
            totalApplications:    applications.length,
            applicationsByStatus: byStatus(applications),
            totalOBIApplications:    obiApplications.length,
            obiApplicationsByStatus: byStatus(obiApplications),
            totalStudents: students.length,
            studentsByStatus: {
                active:    students.filter(s => s.status === 'active').length,
                graduated: students.filter(s => s.status === 'graduated').length,
                inactive:  students.filter(s => s.status === 'inactive').length,
            },
            totalNews:              news.length,
            totalContacts:          contacts.length,
            totalCourses:           courses.length,
            totalEvents:            events.length,
            totalMinistries:        ministries.length,
            totalGalleryItems:      gallery.length,
            totalLeadershipMembers: leadership.length,
            recentApplications: applications.slice(0, 5),
            recentNews:         news.slice(0, 5),
            recentContacts:     contacts.slice(0, 5),
            upcomingEvents:     events.slice(0, 5),
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return {
            totalApplications: 0, applicationsByStatus: { pending: 0, approved: 0, admitted: 0, rejected: 0 },
            totalOBIApplications: 0, obiApplicationsByStatus: { pending: 0, approved: 0, admitted: 0, rejected: 0 },
            totalStudents: 0, studentsByStatus: { active: 0, graduated: 0, inactive: 0 },
            totalNews: 0, totalContacts: 0, totalCourses: 0, totalEvents: 0,
            totalMinistries: 0, totalGalleryItems: 0, totalLeadershipMembers: 0,
            recentApplications: [], recentNews: [], recentContacts: [], upcomingEvents: [],
        };
    }
}