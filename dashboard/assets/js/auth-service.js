// Auth Service — Supabase edition
import { supabase } from '../../../assets/js/supabase-config.js';

/**
 * Check whether the currently logged-in user is an admin.
 * Returns true if they have an active row in the admin_users table.
 */
export async function isUserAdmin() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { data, error } = await supabase
            .from('admin_users')
            .select('role, active')
            .eq('auth_id', user.id)
            .single();

        return !error && data?.active === true;
    } catch {
        return false;
    }
}

/**
 * Get the currently logged-in user, or null if not logged in.
 * @returns {Promise<Object|null>}
 */
export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    return {
        uid:         user.id,
        email:       user.email,
        displayName: user.user_metadata?.full_name || user.email.split('@')[0],
    };
}

/**
 * Sign in with email + password.
 * @returns {{ success: boolean, user?: Object, error?: string }}
 */
export async function loginUser(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const user = data.user;
        return {
            success: true,
            user: {
                uid:         user.id,
                email:       user.email,
                displayName: user.user_metadata?.full_name || user.email.split('@')[0],
            },
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Sign out the current user.
 * @returns {{ success: boolean, error?: string }}
 */
export async function logoutUser() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Register a new admin user.
 * Creates the Supabase Auth account AND inserts into admin_users.
 * @returns {{ success: boolean, user?: Object, error?: string }}
 */
export async function registerAdminUser(email, password, displayName) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: displayName } },
        });
        if (error) throw error;

        const user = data.user;
        const { error: insertError } = await supabase.from('admin_users').insert({
            auth_id:      user.id,
            email:        user.email,
            name:         displayName,
            role:         'admin',
            active:       true,
            created_at:   new Date().toISOString(),
        });
        if (insertError) throw insertError;

        return {
            success: true,
            user: { uid: user.id, email: user.email, displayName },
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Redirect to redirectUrl if no active session, otherwise return the user.
 * @param {string} redirectUrl - URL to redirect to when unauthenticated
 * @returns {Promise<Object|null>} session user or null (after redirect)
 */
export async function ensureAdminAccess(redirectUrl = '/dashboard/login.html') {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = redirectUrl;
        return null;
    }
    const user = session.user;
    return {
        uid:         user.id,
        email:       user.email,
        displayName: user.user_metadata?.full_name || user.email.split('@')[0],
    };
}

/**
 * Fetch all admin users from the admin_users table.
 * @returns {Promise<Array>}
 */
export async function getAllAdminUsers() {
    try {
        const { data, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('role', 'admin')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching admin users:', error);
        return [];
    }
}

/**
 * Subscribe to auth state changes.
 * @param {Function} callback - Called with user object or null on each auth change
 * @returns {Function} Unsubscribe function
 */
export function onAuthChange(callback) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        const user = session?.user || null;
        callback(user ? {
            uid:         user.id,
            email:       user.email,
            displayName: user.user_metadata?.full_name || user.email.split('@')[0],
        } : null);
    });
    return () => subscription.unsubscribe();
}