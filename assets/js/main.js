// Firebase Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, where } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Firebase config - Replace with your actual config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Export for use in other modules
window.db = db;
window.auth = auth;

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.carousel-indicator');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
        slide.style.zIndex = i === index ? '10' : '1';
    });

    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.style.background = 'white';
        } else {
            indicator.style.background = 'rgba(255, 255, 255, 0.5)';
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-advance carousel
if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
    statsObserver.observe(el);
});

// Form Validation and Submission
async function handleFormSubmit(formId, collectionName) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        data.timestamp = new Date().toISOString();
        data.status = 'pending';

        try {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
            submitBtn.disabled = true;

            await addDoc(collection(db, collectionName), data);

            showToast('Form submitted successfully!', 'success');
            form.reset();

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        } catch (error) {
            console.error('Error submitting form:', error);
            showToast('Error submitting form. Please try again.', 'error');

            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
        }
    });
}

// Toast Notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Back to Top Button
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Lazy Loading Images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Initialize Forms
handleFormSubmit('contact-form', 'contacts');
handleFormSubmit('credential-form', 'credentials');
handleFormSubmit('sponsor-form', 'sponsors');
handleFormSubmit('admission-form', 'admissions');

// Get URL Parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// ============ DYNAMIC DATA RETRIEVAL FUNCTIONS ============

// Load Gallery Images (for carousel and gallery page)
async function loadGalleryImages(limit = 4) {
    try {
        const q = query(collection(db, 'gallery'), orderBy('timestamp', 'desc'), limit(limit));
        const snapshot = await getDocs(q);
        const images = [];
        snapshot.forEach(doc => {
            images.push({ id: doc.id, ...doc.data() });
        });
        return images;
    } catch (error) {
        console.error('Error loading gallery:', error);
        return [];
    }
}

// Load Ministries
async function loadMinistries(limit = null) {
    try {
        let q = collection(db, 'ministries');
        if (limit) {
            q = query(q, orderBy('order'), limit(limit));
        } else {
            q = query(q, orderBy('order'));
        }
        const snapshot = await getDocs(q);
        const ministries = [];
        snapshot.forEach(doc => {
            ministries.push({ id: doc.id, ...doc.data() });
        });
        return ministries;
    } catch (error) {
        console.error('Error loading ministries:', error);
        return [];
    }
}

// Load Leadership
async function loadLeadership(limit = null) {
    try {
        let q = collection(db, 'leadership');
        if (limit) {
            q = query(q, orderBy('order'), limit(limit));
        } else {
            q = query(q, orderBy('order'));
        }
        const snapshot = await getDocs(q);
        const leaders = [];
        snapshot.forEach(doc => {
            leaders.push({ id: doc.id, ...doc.data() });
        });
        return leaders;
    } catch (error) {
        console.error('Error loading leadership:', error);
        return [];
    }
}

// Load News
async function loadNews(limit = 3) {
    try {
        const q = query(collection(db, 'news'), orderBy('date', 'desc'), limit(limit));
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

// Load Events
async function loadEvents(limit = 3) {
    try {
        const q = query(collection(db, 'events'), orderBy('date', 'desc'), limit(limit));
        const snapshot = await getDocs(q);
        const events = [];
        snapshot.forEach(doc => {
            events.push({ id: doc.id, ...doc.data() });
        });
        return events;
    } catch (error) {
        console.error('Error loading events:', error);
        return [];
    }
}

// Load Statistics
async function loadStats() {
    try {
        const snapshot = await getDocs(collection(db, 'statistics'));
        if (!snapshot.empty) {
            return snapshot.docs[0].data();
        }
        return {
            livesImpacted: 1000,
            ministries: 50,
            studentsTrained: 200,
            yearsOfService: 15
        };
    } catch (error) {
        console.error('Error loading stats:', error);
        return {
            livesImpacted: 1000,
            ministries: 50,
            studentsTrained: 200,
            yearsOfService: 15
        };
    }
}

// Update Home Page Carousel with Gallery Images
async function updateCarousel() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;

    const images = await loadGalleryImages(3);
    if (images.length === 0) return;

    carousel.innerHTML = '';
    images.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide absolute w-full h-full transition-opacity duration-1000 ${index === 0 ? '' : 'opacity-0'}`;
        slide.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60"></div>
            <img src="${img.imageUrl || img.url}" alt="${img.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center text-white px-4">
                    <h1 class="text-5xl md:text-6xl font-bold mb-4">${img.title || 'Welcome to Oasis IMG'}</h1>
                    <p class="text-xl md:text-2xl mb-8">${img.description || 'Transforming Lives Through the Gospel'}</p>
                </div>
            </div>
        `;
        carousel.appendChild(slide);
    });

    // Reinitialize carousel
    initCarousel();
}

// Initialize/Reinitialize Carousel
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');

    if (slides.length === 0) return;

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
            slide.style.zIndex = i === index ? '10' : '1';
        });

        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.style.background = 'white';
            } else {
                indicator.style.background = 'rgba(255, 255, 255, 0.5)';
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance
    setInterval(nextSlide, 5000);
}

// Update Ministries on Home Page
async function updateHomeMinistriesPreview() {
    const container = document.getElementById('ministries-preview');
    if (!container) return;

    const ministries = await loadMinistries(3);
    if (ministries.length === 0) return;

    container.innerHTML = '';
    ministries.forEach(ministry => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition';
        card.innerHTML = `
            <img src="${ministry.image}" alt="${ministry.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-3">${ministry.name}</h3>
                <p class="text-gray-600 mb-4">${ministry.description}</p>
                <a href="ministry-detail.html?id=${ministry.id}" class="text-blue-600 font-semibold hover:text-blue-700">Learn More →</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Update Leadership Preview on Home Page
async function updateHomeLeadership() {
    const container = document.getElementById('leadership-preview');
    if (!container) return;

    const leaders = await loadLeadership(4);
    if (leaders.length === 0) return;

    container.innerHTML = '';
    leaders.forEach(leader => {
        const card = document.createElement('div');
        card.className = 'text-center';
        card.innerHTML = `
            <img src="${leader.image}" alt="${leader.name}" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover">
            <h3 class="text-lg font-bold text-gray-900">${leader.name}</h3>
            <p class="text-gray-600">${leader.title}</p>
        `;
        container.appendChild(card);
    });
}

// Update News on OBI Page
async function updateOBINews() {
    const container = document.getElementById('obi-news-preview');
    if (!container) return;

    const news = await loadNews(3);
    if (news.length === 0) return;

    container.innerHTML = '';
    news.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-lg overflow-hidden';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="text-sm text-teal-600 mb-2">${new Date(item.date).toLocaleDateString()}</div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">${item.title}</h3>
                <p class="text-gray-600 mb-4">${item.excerpt || item.content.substring(0, 100)}...</p>
                <a href="news-item.html?id=${item.id}" class="text-teal-600 font-semibold hover:text-teal-700">Read More →</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Update Statistics
async function updateStatistics() {
    const stats = await loadStats();

    const elements = {
        livesImpacted: document.querySelector('[data-stat="lives"]'),
        ministries: document.querySelector('[data-stat="ministries"]'),
        studentsTrained: document.querySelector('[data-stat="students"]'),
        yearsOfService: document.querySelector('[data-stat="years"]')
    };

    if (elements.livesImpacted) elements.livesImpacted.setAttribute('data-count', stats.livesImpacted);
    if (elements.ministries) elements.ministries.setAttribute('data-count', stats.ministries);
    if (elements.studentsTrained) elements.studentsTrained.setAttribute('data-count', stats.studentsTrained);
    if (elements.yearsOfService) elements.yearsOfService.setAttribute('data-count', stats.yearsOfService);
}

// Export functions for global use
window.showToast = showToast;
window.getUrlParameter = getUrlParameter;
window.handleFormSubmit = handleFormSubmit;
window.loadGalleryImages = loadGalleryImages;
window.loadMinistries = loadMinistries;
window.loadLeadership = loadLeadership;
window.loadNews = loadNews;
window.loadEvents = loadEvents;
window.loadStats = loadStats;

// Auto-load dynamic content on page load
window.addEventListener('load', async () => {
    document.body.classList.add('loaded');

    // Load dynamic content based on page
    if (document.getElementById('carousel')) {
        await updateCarousel();
    }

    if (document.getElementById('ministries-preview')) {
        await updateHomeMinistriesPreview();
    }

    if (document.getElementById('leadership-preview')) {
        await updateHomeLeadership();
    }

    if (document.getElementById('obi-news-preview')) {
        await updateOBINews();
    }

    await updateStatistics();
});

// Service Worker Registration (for PWA - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

console.log('Oasis IMG Website Loaded Successfully');