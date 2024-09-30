const apiKey = "ce70cd5f6719418ab450c018d9d63261"; // Replace with your NewsAPI key
const newsContainer = document.getElementById("news-content");
const navLinks = document.querySelectorAll(".nav-links li a");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

// Array of news categories to choose from for random default news
const categories = ["general", "world", "business", "technology", "sports", "entertainment"];

// Function to fetch news based on category or search query
function fetchNews(category = "general", query = "") {
    let url;

    if (query) {
        url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${apiKey}`;
    } else {
        url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${apiKey}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
        })
        .catch(error => {
            console.error("Error fetching news:", error);
            newsContainer.innerHTML = "<p>Error loading news articles. Please try again later.</p>";
        });
}

// Function to display news articles
function displayNews(articles) {
    newsContainer.innerHTML = ""; // Clear previous news articles

    if (articles.length === 0) {
        newsContainer.innerHTML = "<p>No news articles found for this category.</p>";
        return;
    }

    // Create a news card for each article
    articles.forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");

        newsCard.innerHTML = `
            <img src="${article.urlToImage || 'placeholder.jpg'}" alt="News Image">
            <div class="news-info">
                <h3>${article.title}</h3>
                <p>${article.description || "Description not available."}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            </div>
        `;

        newsContainer.appendChild(newsCard);
    });
}

// Event listeners for category navigation
navLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        const category = event.target.getAttribute("data-category");
        fetchNews(category);
    });
});

// Event listener for search button
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchNews("", query);
    }
});

// Load random category news when the page is loaded
window.addEventListener("load", () => {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    fetchNews(randomCategory);
});
