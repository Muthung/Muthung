document.addEventListener("DOMContentLoaded", function() {
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

    // Repository Cards Interaction
    const repoCards = document.querySelectorAll('.repo-card');

    repoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.cursor = 'pointer';
        });

        card.addEventListener('click', () => {
            // You can add links to actual GitHub repositories here
            const repoName = card.querySelector('.repo-name').textContent;
            window.open(`https://github.com/Muthung/Muthung`, '_blank');
        });
    });

    // GitHub Repository Data Fetcher
    async function fetchGitHubData(username) {
        try {
            const response = await fetch(`https://api.github.com/users/Muthung/repos?sort=updated&per_page=3`);
            const repos = await response.json();
            return repos;
        } catch (error) {
            console.error('Error fetching GitHub data:', error);
            return [];
        }
    }

    // Update Repository Cards
    async function updateRepoCards() {
        const repoGrid = document.querySelector('.repo-grid');
        const username = 'Muthung'; // Replace with your GitHub username

        const repos = await fetchGitHubData(username);

        if (repos.length > 0) {
            repoGrid.innerHTML = repos.map(repo => `
                <div class="repo-card">
                    <div class="repo-header">
                        <i class="fab fa-github"></i>
                        <span class="repo-name">${repo.name}</span>
                    </div>
                    <p class="repo-description">${repo.description || 'No description available'}</p>
                    <div class="repo-stats">
                        <span class="stat"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        <span class="stat"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span class="language">
                            <span class="lang-color ${repo.language?.toLowerCase()}"></span>
                            ${repo.language || 'None'}
                        </span>
                    </div>
                </div>
            `).join('');

            // Reattach event listeners
            attachRepoCardListeners();
        }
    }

    function attachRepoCardListeners() {
        const repoCards = document.querySelectorAll('.repo-card');
        repoCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.cursor = 'pointer';
            });

            card.addEventListener('click', () => {
                const repoName = card.querySelector('.repo-name').textContent;
                window.open(`https://github.com/Muthung/${repoName}`, '_blank');
            });
        });
    }

    // Initial update
    updateRepoCards();

    // Update every 5 minutes
    setInterval(updateRepoCards, 300000);
});