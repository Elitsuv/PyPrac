document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Search functionality with autosuggest
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const gridItems = document.querySelectorAll('.grid-item');
    const faqItems = document.querySelectorAll('.faq details');
    const navLinks = document.querySelectorAll('.nav-links a');
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');

    // Suggestions for autosuggest
    const suggestions = [
        'Submit Questions',
        'Grade 11 MCQs',
        'Grade 12 MCQs',
        'Basics of Python',
        'Practice Questions',
        'Monthly Qs',
        'Logic Gates',
        'Advanced Python',
        'MySQL',
        'Why choose PyPrac',
        'Unlimited questions',
        'Quality of content',
        'Grade 11',
        'Grade 12'
    ];

    function showSuggestions(query) {
        searchResults.innerHTML = '';
        if (!query) {
            searchResults.style.display = 'none';
            return;
        }

        const filteredSuggestions = suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(query.toLowerCase())
        );

        filteredSuggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.textContent = suggestion;

            // Find matching resource, nav link, or dropdown link
            let targetUrl = '#';
            gridItems.forEach(item => {
                if (item.getAttribute('data-search').toLowerCase().includes(suggestion.toLowerCase())) {
                    targetUrl = item.getAttribute('href');
                }
            });
            faqItems.forEach(item => {
                if (item.getAttribute('data-search').toLowerCase().includes(suggestion.toLowerCase())) {
                    targetUrl = '#faq';
                }
            });
            navLinks.forEach(link => {
                if (link.textContent.toLowerCase().includes(suggestion.toLowerCase())) {
                    targetUrl = link.getAttribute('href');
                }
            });
            dropdownLinks.forEach(link => {
                if (link.textContent.toLowerCase().includes(suggestion.toLowerCase())) {
                    targetUrl = link.getAttribute('href');
                    const grade = link.getAttribute('data-grade');
                    if (grade) {
                        updateResources(grade);
                    }
                }
            });

            div.addEventListener('click', () => {
                if (targetUrl !== '#') {
                    window.location.href = targetUrl;
                }
                searchInput.value = '';
                searchResults.style.display = 'none';
            });

            searchResults.appendChild(div);
        });

        searchResults.style.display = filteredSuggestions.length ? 'block' : 'none';
    }

    searchInput.addEventListener('input', () => {
        showSuggestions(searchInput.value);
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            searchResults.style.display = 'none';
        }, 200);
    });

    searchInput.addEventListener('focus', () => {
        showSuggestions(searchInput.value);
    });

    // Grade switcher functionality (from navbar dropdown)
    function updateResources(grade) {
        const resourceTitle = document.getElementById('resourceTitle');
        const notificationBox = document.getElementById('notificationBox');
        const gridItems = document.querySelectorAll('.grid-item');

        resourceTitle.textContent = `Grade ${grade} Resources`;
        notificationBox.style.display = grade === '12' ? 'block' : 'none';



        gridItems.forEach(item => {
            if (item.getAttribute('data-grade') === grade) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Handle dropdown link clicks
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const grade = link.getAttribute('data-grade');
            updateResources(grade);
            window.location.hash = link.getAttribute('href').substring(1);
        });
    });

    // Initialize resources (default to Grade 11)
    updateResources('11');
});