document.addEventListener("DOMContentLoaded", function() {
    // Services Section Toggle
    const serviceToggles = document.querySelectorAll(".service-toggle"); // Select all service toggles
    serviceToggles.forEach((toggle) => {
        toggle.addEventListener("click", function() {
            const targetList = document.querySelector(this.getAttribute("href"));
            if (targetList) {
                targetList.classList.toggle("show");
            }
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a.nav-link').forEach((link) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Section Visibility Observer
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target); // Stop observing after it becomes visible
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Testimonial Carousel
    const testimonials = document.querySelectorAll('#testimonials .blockquote');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Initialize carousel
    if (testimonials.length > 0) {
        showTestimonial(currentTestimonial);
        setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds
    }
});