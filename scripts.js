// script.js
const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
    setup() {
        const activeSection = ref('home');

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

        // Back to Top button visibility
        const showBackToTop = ref(false);

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
        const scrollToSection = (sectionId) => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                activeSection.value = sectionId;
            }
        };

        // Back to Top Button Logic
        const handleScrollForBackToTop = () => {
            showBackToTop.value = window.scrollY > 300; // Show after 300px scroll
        };

        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        // --- Lifecycle Hooks ---
        onMounted(() => {
            window.addEventListener('scroll', handleScrollForBackToTop);
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScrollForBackToTop);
        });

        return {
            activeSection,
            scrollToSection,
            currentYear,
            // Referral form data and methods
            referralCodeInput,
            referralMessage,
            referralMessageType,
            referralApplied,
            validateReferralCode,
            // Back to Top button
            showBackToTop,
            scrollToTop
        };
    }
}).mount('#app');