// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const searchContainer = document.getElementById('searchContainer');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    searchResults.innerHTML = '';
    searchResults.style.display = 'none';

    if (searchTerm.length < 2) return;

    const searchableItems = document.querySelectorAll('[data-search]');
    let hasResults = false;

    searchableItems.forEach(item => {
        const searchData = item.getAttribute('data-search').toLowerCase();
        if (searchData.includes(searchTerm)) {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = item.textContent;
            resultDiv.addEventListener('click', () => {
                if (item.href) window.location.href = item.href;
                searchResults.style.display = 'none';
                searchInput.value = '';
            });
            searchResults.appendChild(resultDiv);
            hasResults = true;
        }
    });

    if (hasResults) {
        searchResults.style.display = 'block';
    }
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Hide search results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});
