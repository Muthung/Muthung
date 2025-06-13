// script.js
const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        // Reactive data for the referral form
        const referralCodeInput = ref('');
        const referralMessage = ref('');
        const referralMessageType = ref('');
        const referralApplied = ref(false);

        // Mock referral codes
        const mockReferralCodes = [
            { code: 'MAESTRO10', discount: '10% off your first service!', source: 'Customer A' },
            { code: 'TECHGURU15', discount: '15% off any service over $1000!', source: 'Employee B' },
            { code: 'DIGITALDEAL20', discount: '20% off Software Design projects!', source: 'Online Ad' },
            { code: 'PARTNERFIVE', discount: 'Get a free 1-hour consultation!', source: 'Partner C' }
        ];

        const currentYear = computed(() => new Date().getFullYear());

        // Modal state for quote request
        const selectedService = ref('');
        const quoteName = ref('');
        const quoteEmail = ref('');
        const quoteDetails = ref('');
        const quoteSuccess = ref('');
        const quoteError = ref('');

        // --- Referral Code Validation ---
        const validateReferralCode = () => {
            const code = referralCodeInput.value.trim().toUpperCase();
            const foundCode = mockReferralCodes.find(mock => mock.code === code);

            if (foundCode) {
                referralMessage.value = `Success! You get ${foundCode.discount}`;
                referralMessageType.value = 'success';
                referralApplied.value = true;
            } else {
                referralMessage.value = 'Invalid referral code. Please check your code and try again.';
                referralMessageType.value = 'danger';
                referralApplied.value = false;
            }
        };

        // --- Core App Methods ---
        const requestQuote = (serviceName) => {
            selectedService.value = serviceName;
            quoteName.value = '';
            quoteEmail.value = '';
            quoteDetails.value = '';
            quoteSuccess.value = '';
            quoteError.value = '';
            const modal = new bootstrap.Modal(document.getElementById('quoteModal'));
            modal.show();
        };

        const submitQuoteRequest = () => {
            if (quoteName.value && quoteEmail.value && quoteDetails.value) {
                quoteSuccess.value = 'Your quote request has been sent! We will contact you soon.';
                quoteError.value = '';
            } else {
                quoteError.value = 'Please fill in all fields.';
                quoteSuccess.value = '';
            }
        };

        // --- Social & Download Button Persistence Logic ---
        const showSocialBtn = ref('');
        const showDownloadBtn = ref('');

        function onSocialEnter(platform) {
            showSocialBtn.value = platform;
        }
        function onSocialLeave(platform) {
            setTimeout(() => {
                if (!document.activeElement.classList.contains('social-btn') || document.activeElement.dataset.platform !== platform) {
                    showSocialBtn.value = '';
                }
            }, 100);
        }
        function onSocialBtnEnter(platform) {
            showSocialBtn.value = platform;
        }
        function onSocialBtnLeave(platform) {
            setTimeout(() => {
                if (!document.activeElement.classList.contains('social-btn') || document.activeElement.dataset.platform !== platform) {
                    showSocialBtn.value = '';
                }
            }, 100);
        }

        function onDownloadEnter(doc) {
            showDownloadBtn.value = doc;
        }
        function onDownloadLeave(doc) {
            setTimeout(() => {
                if (!document.activeElement.classList.contains('download-btn') || document.activeElement.dataset.doc !== doc) {
                    showDownloadBtn.value = '';
                }
            }, 100);
        }
        function onDownloadBtnEnter(doc) {
            showDownloadBtn.value = doc;
        }
        function onDownloadBtnLeave(doc) {
            setTimeout(() => {
                if (!document.activeElement.classList.contains('download-btn') || document.activeElement.dataset.doc !== doc) {
                    showDownloadBtn.value = '';
                }
            }, 100);
        }

        // --- Download Button Persistence Logic ---
        const visibleDownloadBtn = ref('');
        let downloadBtnTimeout = null;

        function showDownloadButton(doc) {
            clearTimeout(downloadBtnTimeout);
            visibleDownloadBtn.value = doc;
        }
        function hideDownloadButton() {
            downloadBtnTimeout = setTimeout(() => {
                visibleDownloadBtn.value = '';
            }, 7000); // 7 seconds
        }
        function keepDownloadButton(doc) {
            clearTimeout(downloadBtnTimeout);
            visibleDownloadBtn.value = doc;
        }
        function leaveDownloadButton(doc) {
            downloadBtnTimeout = setTimeout(() => {
                visibleDownloadBtn.value = '';
            }, 7000);
        }

        // --- Contact Button Persistence Logic ---
        const visibleContactBtn = ref('');
        let contactBtnTimeout = null;

        function showContactButton(platform) {
            clearTimeout(contactBtnTimeout);
            visibleContactBtn.value = platform;
        }
        function hideContactButton() {
            contactBtnTimeout = setTimeout(() => {
                visibleContactBtn.value = '';
            }, 7000); // 7 seconds
        }
        function keepContactButton(platform) {
            clearTimeout(contactBtnTimeout);
            visibleContactBtn.value = platform;
        }
        function leaveContactButton() {
            contactBtnTimeout = setTimeout(() => {
                visibleContactBtn.value = '';
            }, 7000);
        }

        // --- Download Email Modal State and Methods ---
        const selectedDownloadDoc = ref('');
        const downloadEmail = ref('');
        const downloadSuccess = ref('');
        const downloadError = ref('');

        function openDownloadModal(doc) {
            selectedDownloadDoc.value = doc;
            downloadEmail.value = '';
            downloadSuccess.value = '';
            downloadError.value = '';
            const modal = new bootstrap.Modal(document.getElementById('downloadEmailModal'));
            modal.show();
        }

        function submitDownloadRequest() {
            if (!downloadEmail.value || !downloadEmail.value.includes('@')) {
                downloadError.value = 'Please enter a valid email address.';
                downloadSuccess.value = '';
                return;
            }
            // Simulate sending document
            downloadSuccess.value = `The ${selectedDownloadDoc.value} will be sent to ${downloadEmail.value}!`;
            downloadError.value = '';
        }

        return {
            currentYear,
            // Referral form data and methods
            referralCodeInput,
            referralMessage,
            referralMessageType,
            referralApplied,
            validateReferralCode,
            // Modal state and methods
            selectedService,
            quoteName,
            quoteEmail,
            quoteDetails,
            quoteSuccess,
            quoteError,
            requestQuote,
            submitQuoteRequest,
            // Social & Download Button Persistence
            showSocialBtn, showDownloadBtn,
            onSocialEnter, onSocialLeave, onSocialBtnEnter, onSocialBtnLeave,
            onDownloadEnter, onDownloadLeave, onDownloadBtnEnter, onDownloadBtnLeave,
            visibleDownloadBtn,
            showDownloadButton,
            hideDownloadButton,
            keepDownloadButton,
            leaveDownloadButton,
            // Contact Button Persistence
            visibleContactBtn,
            showContactButton,
            hideContactButton,
            keepContactButton,
            leaveContactButton,
            // Download Email Modal
            selectedDownloadDoc,
            downloadEmail,
            downloadSuccess,
            downloadError,
            openDownloadModal,
            submitDownloadRequest
        };
    }
}).mount('#app');

// --- ScrollSpy Implementation ---
window.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = ['home', 'services', 'contact', 'referrals'].map(id => document.getElementById(id));

    function onScrollSpy() {
        let currentSection = null;
        const scrollPos = window.scrollY + window.innerHeight / 3;

        for (const section of sections) {
            if (section && section.offsetTop <= scrollPos) {
                currentSection = section;
            }
        }

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentSection && href.replace('#', '') === currentSection.id) {
                link.parentElement.classList.add('active-scrollspy');
            } else {
                link.parentElement.classList.remove('active-scrollspy');
            }
        });
    }

    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const section = document.getElementById(href.substring(1));
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // --- Universal Fade-in on Scroll Implementation ---
    function revealOnScroll() {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // When scrolling down: fade in and move up as element enters from below
            if (rect.top < windowHeight * 0.90 && rect.bottom > 0) {
                el.classList.add('visible');
                el.classList.remove('hidden-up');
            }
            // When scrolling up: fade out and move down as element leaves upwards
            else if (rect.bottom <= 0) {
                el.classList.remove('visible');
                el.classList.add('hidden-up');
            }
            // When element is below the viewport: reset to initial state
            else {
                el.classList.remove('visible', 'hidden-up');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll(); // Initial check on load
});