// Authentication Service - Admin Role Management
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { auth as firebaseAuth, db as firebaseDb } from '../../assets/js/firebase-config.js';

// Get references
const getAuth = () => {
    if (firebaseAuth) return firebaseAuth;
    if (window.auth) return window.auth;
    throw new Error('Firebase auth not initialized');
};

const getDb = () => {
    if (firebaseDb) return firebaseDb;
    if (window.db) return window.db;
    throw new Error('Firebase database not initialized');
};

/**
 * Check if current user has admin role
 * @returns {Promise<boolean>} True if user is admin
 */
export async function isUserAdmin() {
    try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
            return false;
        }

        const db = getDb();
        const userDocRef = doc(db, 'admin-users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            return userData.role === 'admin' && userData.active === true;
        }

        return false;
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}

/**
 * Get current authenticated user
 * @returns {Promise<Object|null>} Current user object or null
 */
export async function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (user) {
                resolve({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName || user.email.split('@')[0]
                });
            } else {
                resolve(null);
            }
        });
    });
}

/**
 * Login with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Login result with success status and message
 */
export async function loginUser(email, password) {
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        return { 
            success: true, 
            user: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || user.email.split('@')[0]
            }
        };
    } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'Login failed. Please try again.';
        
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'Email not found.';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address.';
        }
        
        return { success: false, error: errorMessage };
    }
}

/**
 * Logout current user
 * @returns {Promise<Object>} Logout result
 */
export async function logoutUser() {
    try {
        const auth = getAuth();
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Register a new admin user (requires existing admin)
 * @param {string} email - New admin email
 * @param {string} password - New admin password
 * @param {string} displayName - Display name
 * @returns {Promise<Object>} Registration result
 */
export async function registerAdminUser(email, password, displayName) {
    try {
        // Check if current user is admin
        const isCurrentUserAdmin = await isUserAdmin();
        if (!isCurrentUserAdmin) {
            return { 
                success: false, 
                error: 'Only existing admins can register new admin users.' 
            };
        }

        const auth = getAuth();
        
        // Create new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create admin user record
        const db = getDb();
        const userDocRef = doc(db, 'admin-users', user.uid);
        await setDoc(userDocRef, {
            email: email,
            displayName: displayName,
            role: 'admin',
            active: true,
            createdAt: new Date().toISOString(),
            createdBy: auth.currentUser.uid
        });

        return { 
            success: true, 
            user: {
                uid: user.uid,
                email: email,
                displayName: displayName
            }
        };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Check authentication and redirect if not authorized
 * @param {string} redirectUrl - URL to redirect to if not authenticated (default: login.html)
 */
export async function ensureAdminAccess(redirectUrl = 'login.html') {
    try {
        const auth = getAuth();
        
        return new Promise((resolve) => {
            onAuthStateChanged(auth, async (user) => {
                if (!user) {
                    window.location.href = redirectUrl;
                    resolve(false);
                    return;
                }

                resolve(true);
            });
        });
    } catch (error) {
        console.error('Error checking authentication:', error);
        window.location.href = redirectUrl;
    }
}

/**
 * Get all admin users
 * @returns {Promise<Array>} Array of admin users
 */
export async function getAllAdminUsers() {
    try {
        const db = getDb();
        const adminUsersCol = collection(db, 'admin-users');
        const q = query(adminUsersCol, where('role', '==', 'admin'));
        const querySnapshot = await getDocs(q);
        
        const admins = [];
        querySnapshot.forEach((doc) => {
            admins.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return admins;
    } catch (error) {
        console.error('Error fetching admin users:', error);
        return [];
    }
}

/**
 * Listen to authentication state changes
 * @param {Function} callback - Callback function that receives auth state
 * @returns {Function} Unsubscribe function
 */
export function onAuthChange(callback) {
    const auth = getAuth();
    return onAuthStateChanged(auth, callback);
}
