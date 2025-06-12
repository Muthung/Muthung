// script.js
const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
    setup() {
        const activeSection = ref('home');
        let sectionObserver = null;
        let animationObserver = null; // For sketch lines
        let counterObserver = null; // For animated counters

        // Reactive data for the contact form
        const firstName = ref('');
        const lastName = ref('');
        const email = ref('');
        const services = ref([
            'Software Design and Development',
            'Hardware Diagnostics and Repairs',
            'Database Management',
            'Security Tests and Auditing'
        ]);
        const selectedService = ref('');
        const message = ref('');

        // Form Validation States
        const firstNameValid = ref(false);
        const firstNameInvalid = ref(false);
        const lastNameValid = ref(false);
        const lastNameInvalid = ref(false);
        const emailValid = ref(false);
        const emailInvalid = ref(false);
        const selectedServiceValid = ref(false);
        const selectedServiceInvalid = ref(false);
        const messageValid = ref(false);
        const messageInvalid = ref(false);

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

        // --- Form Validation Methods ---
        const validateFirstName = () => {
            firstNameValid.value = firstName.value.length > 0;
            firstNameInvalid.value = !firstNameValid.value;
        };
        const validateLastName = () => {
            lastNameValid.value = lastName.value.length > 0;
            lastNameInvalid.value = !lastNameValid.value;
        };
        const validateEmail = () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            emailValid.value = emailRegex.test(email.value);
            emailInvalid.value = !emailValid.value;
        };
        const validateSelectedService = () => {
            selectedServiceValid.value = selectedService.value !== '';
            selectedServiceInvalid.value = !selectedServiceValid.value;
        };
        const validateMessage = () => {
            messageValid.value = message.value.length > 0;
            messageInvalid.value = !messageValid.value;
        };

        const validateAllFormFields = () => {
            validateFirstName();
            validateLastName();
            validateEmail();
            validateSelectedService();
            validateMessage();
            return firstNameValid.value && lastNameValid.value && emailValid.value && selectedServiceValid.value && messageValid.value;
        };

        // --- Core App Methods ---
        const scrollToSection = (sectionId) => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                activeSection.value = sectionId;
            }
        };

        const requestQuote = (serviceName) => {
            selectedService.value = serviceName;
            scrollToSection('contact');
        };

        const submitForm = () => {
            if (!validateAllFormFields()) {
                console.log('Form validation failed.');
                return; // Stop submission if validation fails
            }

            console.log('Contact Form Submitted!');
            console.log('First Name:', firstName.value);
            console.log('Last Name:', lastName.value);
            console.log('Email:', email.value);
            console.log('Service:', selectedService.value);
            console.log('Message:', message.value);

            if (referralApplied.value) {
                console.log('Referral Discount Applied:', referralMessage.value);
            }

            // Show success modal (using Bootstrap's Modal JS API)
            const successModalElement = document.getElementById('successModal');
            const successModal = new bootstrap.Modal(successModalElement);
            successModal.show();

            // Clear form fields
            firstName.value = '';
            lastName.value = '';
            email.value = '';
            selectedService.value = '';
            message.value = '';
            referralCodeInput.value = '';
            referralMessage.value = '';
            referralMessageType.value = '';
            referralApplied.value = false;

            // Reset validation states
            firstNameValid.value = firstNameInvalid.value = false;
            lastNameValid.value = lastNameInvalid.value = false;
            emailValid.value = emailInvalid.value = false;
            selectedServiceValid.value = selectedServiceInvalid.value = false;
            messageValid.value = messageInvalid.value = false;
        };

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

        // --- Scroll-based Animations and UI ---

        // Section Observer for navigation highlighting
        const setupSectionObserver = () => {
            sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        activeSection.value = entry.target.id;
                    }
                });
            }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

            document.querySelectorAll('main section').forEach(section => {
                sectionObserver.observe(section);
            });
        };

        // Sketch Line Animation Observer
        const setupAnimationObserver = () => {
            animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-drawn');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            document.querySelectorAll('main section .content-animated-container').forEach(contentContainer => {
                animationObserver.observe(contentContainer);
            });

            // Initial animation for the first section if already in view
            const homeContentContainer = document.querySelector('#home .content-animated-container');
            if (homeContentContainer) {
                if (homeContentContainer.getBoundingClientRect().top < window.innerHeight) {
                    homeContentContainer.classList.add('is-drawn');
                }
            }
        };

        // Animated Counters Logic
        const animateCounter = (entry) => {
            const counterElement = entry.target;
            const target = +counterElement.dataset.target; // Use '+' to convert to number
            let current = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // ~60 frames per second

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counterElement.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    counterElement.innerText = target;
                }
            };
            requestAnimationFrame(updateCount);
        };

        const setupCounterObserver = () => {
            counterObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry);
                        observer.unobserve(entry.target); // Animate once
                    }
                });
            }, { threshold: 0.8 }); // Trigger when 80% of counter is visible

            document.querySelectorAll('.counter').forEach(counter => {
                counterObserver.observe(counter);
            });
        };


        // Blob animation logic
        let blobElement = null;
        let animationFrameId = null;

        const updateBlobPosition = () => {
            if (!blobElement) return;

            const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            // Ensure totalScrollHeight is not zero to avoid division by zero
            const scrollProgress = totalScrollHeight > 0 ? window.scrollY / totalScrollHeight : 0;

            const minScale = 0.1;
            const maxScale = 2.0; // This might need fine-tuning for "half the page" visual
            const currentScale = minScale + (scrollProgress * (maxScale - minScale));

            // Adjust vertical position to make it seem like it's coming from the bottom-center
            // It starts at bottom: 0 and effectively grows upwards.
            blobElement.style.transform = `translateX(-50%) scale(${currentScale})`;

            animationFrameId = requestAnimationFrame(updateBlobPosition);
        };

        const startBlobAnimation = () => {
            if (!blobElement) { // Ensure blobElement is set only once
                blobElement = document.getElementById('background-blob');
            }
            if (blobElement && !animationFrameId) { // Only start if not already running
                animationFrameId = requestAnimationFrame(updateBlobPosition);
            }
        };

        const stopBlobAnimation = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        // Scroll Progress Bar Logic
        const updateScrollProgressBar = () => {
            const progressBar = document.getElementById('scroll-progress-bar');
            if (progressBar) {
                const scrollY = window.scrollY;
                const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (scrollY / totalHeight) * 100;
                progressBar.style.width = `${progress}%`;
            }
            requestAnimationFrame(updateScrollProgressBar);
        };

        let scrollProgressBarAnimationFrameId = null;

        const startScrollProgressBar = () => {
            const progressBar = document.getElementById('scroll-progress-bar');
            if (progressBar && !scrollProgressBarAnimationFrameId) {
                 scrollProgressBarAnimationFrameId = requestAnimationFrame(updateScrollProgressBar);
            }
        };

        const stopScrollProgressBar = () => {
            if (scrollProgressBarAnimationFrameId) {
                cancelAnimationFrame(scrollProgressBarAnimationFrameId);
                scrollProgressBarAnimationFrameId = null;
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
            setupSectionObserver();
            setupAnimationObserver();
            setupCounterObserver();

            // Start all scroll-dependent animations and UI updates
            startBlobAnimation();
            startScrollProgressBar();
            window.addEventListener('scroll', handleScrollForBackToTop);
        });

        onUnmounted(() => {
            // Clean up observers and event listeners
            if (sectionObserver) sectionObserver.disconnect();
            if (animationObserver) animationObserver.disconnect();
            if (counterObserver) counterObserver.disconnect();

            stopBlobAnimation();
            stopScrollProgressBar();
            window.removeEventListener('scroll', handleScrollForBackToTop);
        });

        return {
            activeSection,
            scrollToSection,
            currentYear,
            // Contact form data and methods
            firstName,
            lastName,
            email,
            services,
            selectedService,
            message,
            submitForm,
            requestQuote,
            // Referral form data and methods
            referralCodeInput,
            referralMessage,
            referralMessageType,
            referralApplied,
            validateReferralCode,
            // Form Validation states and methods
            firstNameValid,
            firstNameInvalid,
            validateFirstName,
            lastNameValid,
            lastNameInvalid,
            validateLastName,
            emailValid,
            emailInvalid,
            validateEmail,
            selectedServiceValid,
            selectedServiceInvalid,
            validateSelectedService,
            messageValid,
            messageInvalid,
            validateMessage,
            // Back to Top button
            showBackToTop,
            scrollToTop
        };
    }
}).mount('#app');