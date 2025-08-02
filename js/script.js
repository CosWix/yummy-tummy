// Core JavaScript functionality for Yummy Tummy

// Global state management
let recipes = [...sampleRecipes];
let leftoverItems = [...sampleLeftovers];
let filteredRecipes = [...recipes];

// DOM elements
const recipeGrid = document.getElementById('recipeGrid');
const ingredientSearch = document.getElementById('ingredientSearch');
const filterType = document.getElementById('filterType');
const filterState = document.getElementById('filterState');
const filterCourse = document.getElementById('filterCourse');
const applyFiltersBtn = document.getElementById('applyFilters');
const submitForm = document.getElementById('submitForm');
const leftoverForm = document.getElementById('leftoverForm');
const leftoverList = document.getElementById('leftoverList');
const factsList = document.getElementById('factsList');
const fridgeImage = document.getElementById('fridgeImage');
const fridgeResults = document.getElementById('fridgeResults');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  renderRecipes(recipes);
  renderTips();
  renderLeftoverItems();
  setupEventListeners();
  addScrollAnimations();
}

// Event listeners setup
function setupEventListeners() {
  // Search and filter functionality
  ingredientSearch.addEventListener('input', debounce(handleSearch, 300));
  applyFiltersBtn.addEventListener('click', applyFilters);

  // Form submissions
  submitForm.addEventListener('submit', handleRecipeSubmission);
  leftoverForm.addEventListener('submit', handleLeftoverSubmission);

  // Fridge image upload
  fridgeImage.addEventListener('change', handleFridgeImageUpload);

  // Smooth scrolling for navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
  });
}

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Search functionality
function handleSearch() {
  const searchTerm = ingredientSearch.value.toLowerCase().trim();

  if (searchTerm === '') {
    filteredRecipes = [...recipes];
  } else {
    const searchTerms = searchTerm.split(',').map(term => term.trim());
    filteredRecipes = recipes.filter(recipe => {
      return searchTerms.some(term =>
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(term)
        ) || recipe.title.toLowerCase().includes(term)
      );
    });
  }

  applyCurrentFilters();
  renderRecipes(filteredRecipes);
}

// Filter functionality
function applyFilters() {
  applyCurrentFilters();
  renderRecipes(filteredRecipes);

  // Add visual feedback
  applyFiltersBtn.textContent = 'Applied!';
  applyFiltersBtn.style.background = 'var(--secondary-color)';

  setTimeout(() => {
    applyFiltersBtn.textContent = 'Apply Filters';
    applyFiltersBtn.style.background = '';
  }, 1000);
}

function applyCurrentFilters() {
  const typeFilter = filterType.value;
  const stateFilter = filterState.value;
  const courseFilter = filterCourse.value;

  filteredRecipes = filteredRecipes.filter(recipe => {
    return (!typeFilter || recipe.type === typeFilter) &&
           (!stateFilter || recipe.state === stateFilter) &&
           (!courseFilter || recipe.course === courseFilter);
  });
}

// Recipe rendering
function renderRecipes(recipesToRender) {
  if (recipesToRender.length === 0) {
    recipeGrid.style.display = 'none';
    document.getElementById('noRecipes').style.display = 'block';
    return;
  }

  recipeGrid.style.display = 'grid';
  document.getElementById('noRecipes').style.display = 'none';

  recipeGrid.innerHTML = recipesToRender.map(recipe => createRecipeCard(recipe)).join('');

  // Add event listeners to vote buttons
  document.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', handleVote);
  });
}

function createRecipeCard(recipe) {
  const ingredientsList = recipe.ingredients.slice(0, 4).join(', ') +
    (recipe.ingredients.length > 4 ? '...' : '');

  return `
    <div class="recipe-card animate-fade-in-up" data-recipe-id="${recipe.id}">
      <div class="recipe-image">
        🍽️
      </div>
      <div class="recipe-content">
        <h3 class="recipe-title">${recipe.title}</h3>
        <p class="recipe-ingredients">${ingredientsList}</p>

        <div class="recipe-meta">
          <div class="recipe-tags">
            <span class="card-tag primary">${recipe.type}</span>
            <span class="card-tag">${recipe.course}</span>
            <span class="card-tag secondary">${recipe.cookTime}</span>
          </div>
        </div>

        <div class="recipe-actions">
          <div class="vote-buttons">
            <button class="vote-btn" data-recipe-id="${recipe.id}" data-action="upvote">
              👍 ${recipe.votes}
            </button>
            <button class="btn btn-ghost btn-sm" onclick="viewRecipe(${recipe.id})">
              View Recipe
            </button>
          </div>
        </div>

        <div style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-secondary);">
          By ${recipe.author} • ${recipe.timeAgo}
        </div>
      </div>
    </div>
  `;
}

// Vote handling
function handleVote(event) {
  const recipeId = parseInt(event.target.dataset.recipeId);
  const recipe = recipes.find(r => r.id === recipeId);

  if (recipe) {
    recipe.votes += 1;
    event.target.innerHTML = `👍 ${recipe.votes}`;

    // Add visual feedback
    event.target.style.transform = 'scale(1.1)';
    setTimeout(() => {
      event.target.style.transform = '';
    }, 200);

    // Save to localStorage
    saveToLocalStorage();
  }
}

// View recipe details
function viewRecipe(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  const modal = createRecipeModal(recipe);
  document.body.appendChild(modal);

  // Add close functionality
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.remove();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

function createRecipeModal(recipe) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(10px);
  `;

  modal.innerHTML = `
    <div class="modal-content" style="
      background: var(--background-tertiary);
      border-radius: var(--radius-2xl);
      padding: var(--spacing-2xl);
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      margin: var(--spacing-lg);
      box-shadow: 0 20px 60px var(--shadow-heavy);
      border: 1px solid var(--border-color);
    ">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
        <h2 style="margin: 0; color: var(--text-primary);">${recipe.title}</h2>
        <button class="modal-close" style="
          background: none;
          border: none;
          font-size: var(--font-size-2xl);
          cursor: pointer;
          color: var(--text-secondary);
          padding: var(--spacing-sm);
          border-radius: var(--radius-md);
        ">×</button>
      </div>

      <div style="margin-bottom: var(--spacing-lg);">
        <div style="display: flex; gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
          <span class="card-tag primary">${recipe.type}</span>
          <span class="card-tag">${recipe.course}</span>
          <span class="card-tag secondary">${recipe.cookTime}</span>
          <span class="card-tag">${recipe.difficulty}</span>
        </div>
        <p style="color: var(--text-secondary); margin: 0;">By ${recipe.author} • ${recipe.timeAgo}</p>
      </div>

      <div style="margin-bottom: var(--spacing-lg);">
        <h3 style="color: var(--text-primary); margin-bottom: var(--spacing-md);">Ingredients:</h3>
        <ul style="color: var(--text-secondary); line-height: 1.6;">
          ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
      </div>

      <div>
        <h3 style="color: var(--text-primary); margin-bottom: var(--spacing-md);">Instructions:</h3>
        <div style="color: var(--text-secondary); line-height: 1.6; white-space: pre-line;">
          ${recipe.steps}
        </div>
      </div>

      <div style="margin-top: var(--spacing-xl); text-align: center;">
        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">
          Got it! 👍
        </button>
      </div>
    </div>
  `;

  return modal;
}

// Recipe form submission (moved to end of file to avoid duplication)

// Leftover form submission
function handleLeftoverSubmission(event) {
  event.preventDefault();

  const itemName = document.getElementById('itemName').value.trim();
  const location = document.getElementById('location').value.trim();
  const details = document.getElementById('itemDetails').value.trim();

  if (!itemName || !location) {
    showNotification('Please fill in item name and location', 'error');
    return;
  }

  const newLeftover = {
    id: Date.now(),
    itemName,
    location,
    details: details || 'No additional details provided',
    timePosted: 'Just now',
    status: 'available'
  };

  leftoverItems.unshift(newLeftover);
  renderLeftoverItems();

  // Reset form
  event.target.reset();

  // Show success message
  showNotification('Item posted successfully! 📦', 'success');

  // Save to localStorage
  saveToLocalStorage();
}

// Render leftover items
function renderLeftoverItems() {
  leftoverList.innerHTML = leftoverItems.map(item => `
    <div class="leftover-item animate-slide-in-right" data-status="${item.status}">
      <div class="leftover-header">
        <span class="leftover-name">${item.itemName}</span>
        <span class="leftover-location">📍 ${item.location}</span>
      </div>
      <p class="leftover-details">${item.details}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
        <small style="color: var(--text-secondary);">${item.timePosted}</small>
        <span class="card-tag ${item.status === 'available' ? 'secondary' : ''}" style="
          background: ${item.status === 'available' ? 'rgba(52, 199, 89, 0.1)' : 'rgba(142, 142, 147, 0.1)'};
          color: ${item.status === 'available' ? 'var(--secondary-color)' : 'var(--text-secondary)'};
        ">
          ${item.status === 'available' ? '✅ Available' : '❌ Taken'}
        </span>
      </div>
    </div>
  `).join('');
}

// Render tips
function renderTips() {
  factsList.innerHTML = sustainabilityTips.map(tip => `
    <div class="tip-card animate-fade-in">
      <div class="tip-icon">${tip.icon}</div>
      <h4 style="margin-bottom: var(--spacing-sm); color: var(--text-primary);">${tip.title}</h4>
      <p class="tip-text">${tip.text}</p>
    </div>
  `).join('');
}

// Fridge scanning functionality
function handleFridgeImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Show loading state
  showNotification('Analyzing your fridge... 🔍', 'info');

  // Simulate AI processing
  setTimeout(() => {
    const randomSuggestion = fridgeSuggestions[Math.floor(Math.random() * fridgeSuggestions.length)];
    displayFridgeResults(randomSuggestion);
    showNotification('Analysis complete! Check your suggestions below. ✨', 'success');
  }, 2000);
}

function scanFridge() {
  const fileInput = document.getElementById('fridgeImage');
  if (!fileInput.files[0]) {
    showNotification('Please select an image first', 'error');
    return;
  }

  handleFridgeImageUpload({ target: fileInput });
}

function displayFridgeResults(suggestion) {
  fridgeResults.innerHTML = `
    <div class="card animate-fade-in-up" style="margin-top: var(--spacing-xl);">
      <h3 style="color: var(--text-primary); margin-bottom: var(--spacing-md);">
        🎯 Recipe Suggestions
      </h3>
      <p style="color: var(--text-secondary); margin-bottom: var(--spacing-lg);">
        Based on detected ingredients: <strong>${suggestion.ingredients.join(', ')}</strong>
      </p>
      <div class="grid grid-3">
        ${suggestion.suggestions.map(recipe => `
          <div class="card" style="text-align: center; padding: var(--spacing-lg);">
            <div style="font-size: var(--font-size-2xl); margin-bottom: var(--spacing-sm);">🍽️</div>
            <h4 style="color: var(--text-primary); margin-bottom: var(--spacing-sm);">${recipe}</h4>
            <button class="btn btn-outline btn-sm" onclick="searchForRecipe('${recipe}')">
              Find Recipe
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function searchForRecipe(recipeName) {
  ingredientSearch.value = recipeName;
  handleSearch();
  document.getElementById('recipes').scrollIntoView({ behavior: 'smooth' });
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    background: ${type === 'success' ? 'var(--secondary-color)' :
                 type === 'error' ? 'var(--warning-color)' : 'var(--primary-color)'};
    color: white;
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--radius-lg);
    box-shadow: 0 8px 25px var(--shadow-medium);
    z-index: 10001;
    transform: translateX(100%);
    transition: var(--transition-normal);
    max-width: 300px;
    font-weight: 500;
  `;

  notification.textContent = message;
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Smooth scrolling for navigation
function handleSmoothScroll(event) {
  event.preventDefault();
  const targetId = event.target.getAttribute('href');
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Local storage functions
function saveToLocalStorage() {
  try {
    localStorage.setItem('yummyTummyRecipes', JSON.stringify(recipes));
    localStorage.setItem('yummyTummyLeftovers', JSON.stringify(leftoverItems));
  } catch (error) {
    console.warn('Could not save to localStorage:', error);
  }
}

function loadFromLocalStorage() {
  try {
    const savedRecipes = localStorage.getItem('yummyTummyRecipes');
    const savedLeftovers = localStorage.getItem('yummyTummyLeftovers');

    if (savedRecipes) {
      const parsedRecipes = JSON.parse(savedRecipes);
      recipes = [...parsedRecipes];
      filteredRecipes = [...recipes];
    }

    if (savedLeftovers) {
      leftoverItems = JSON.parse(savedLeftovers);
    }
  } catch (error) {
    console.warn('Could not load from localStorage:', error);
  }
}

// Scroll animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });
}

// Performance optimizations
const performanceOptimizations = {
  // Lazy loading for images
  lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  },

  // Virtual scrolling for large lists
  virtualizeRecipeList() {
    if (recipes.length > 50) {
      // Implement virtual scrolling for better performance
      console.log('Virtual scrolling enabled for large recipe list');
    }
  },

  // Preload critical resources
  preloadCriticalResources() {
    // Preload commonly used emojis and icons
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }
};

// Initialize with saved data
document.addEventListener('DOMContentLoaded', function() {
  // Performance monitoring
  const startTime = performance.now();

  loadFromLocalStorage();
  initializeApp();
  initializeInteractiveComponents();
  performanceOptimizations.lazyLoadImages();
  performanceOptimizations.virtualizeRecipeList();
  performanceOptimizations.preloadCriticalResources();

  // Log performance metrics
  const endTime = performance.now();
  console.log(`App initialized in ${(endTime - startTime).toFixed(2)}ms`);

  // Report to analytics (if available)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'timing_complete', {
      name: 'app_initialization',
      value: Math.round(endTime - startTime)
    });
  }
});

// Interactive components
function initializeInteractiveComponents() {
  addSearchSuggestions();
  addQuickFilters();
  addRecipeOfTheDay();
  addStatsCounter();
}

// Search suggestions
function addSearchSuggestions() {
  const searchInput = document.getElementById('ingredientSearch');
  const suggestionsContainer = document.createElement('div');
  suggestionsContainer.className = 'search-suggestions';
  suggestionsContainer.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--background-tertiary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    box-shadow: 0 8px 25px var(--shadow-medium);
    z-index: 1000;
    display: none;
    max-height: 200px;
    overflow-y: auto;
  `;

  searchInput.parentNode.appendChild(suggestionsContainer);

  const commonIngredients = [
    'rice', 'bread', 'vegetables', 'eggs', 'tomatoes', 'onions',
    'potatoes', 'chicken', 'pasta', 'cheese', 'milk', 'bananas'
  ];

  searchInput.addEventListener('input', function() {
    const value = this.value.toLowerCase().trim();
    if (value.length < 2) {
      suggestionsContainer.style.display = 'none';
      return;
    }

    const matches = commonIngredients.filter(ingredient =>
      ingredient.includes(value) && ingredient !== value
    );

    if (matches.length > 0) {
      suggestionsContainer.innerHTML = matches.slice(0, 5).map(ingredient => `
        <div class="suggestion-item" style="
          padding: var(--spacing-sm) var(--spacing-md);
          cursor: pointer;
          transition: var(--transition-fast);
          border-bottom: 1px solid var(--border-color);
        " onclick="selectSuggestion('${ingredient}')">
          🔍 ${ingredient}
        </div>
      `).join('');
      suggestionsContainer.style.display = 'block';
    } else {
      suggestionsContainer.style.display = 'none';
    }
  });

  // Hide suggestions when clicking outside
  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
      suggestionsContainer.style.display = 'none';
    }
  });
}

function selectSuggestion(ingredient) {
  document.getElementById('ingredientSearch').value = ingredient;
  document.querySelector('.search-suggestions').style.display = 'none';
  handleSearch();
}

// Quick filters
function addQuickFilters() {
  const filtersSection = document.querySelector('#search-filter .search-container');
  const quickFilters = document.createElement('div');
  quickFilters.className = 'quick-filters';
  quickFilters.style.cssText = `
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
    justify-content: center;
    margin-top: var(--spacing-lg);
  `;

  const popularFilters = [
    { label: '🍚 Rice Dishes', search: 'rice' },
    { label: '🍞 Bread Recipes', search: 'bread' },
    { label: '🥬 Vegetable', search: 'vegetables' },
    { label: '🥚 Egg Dishes', search: 'eggs' },
    { label: '🍌 Fruit Recipes', search: 'banana' }
  ];

  quickFilters.innerHTML = `
    <div style="width: 100%; text-align: center; margin-bottom: var(--spacing-sm); color: var(--text-secondary); font-size: var(--font-size-sm);">
      Popular searches:
    </div>
    ${popularFilters.map(filter => `
      <button class="btn btn-ghost btn-sm" onclick="quickSearch('${filter.search}')">
        ${filter.label}
      </button>
    `).join('')}
  `;

  filtersSection.appendChild(quickFilters);
}

function quickSearch(term) {
  document.getElementById('ingredientSearch').value = term;
  handleSearch();
}

// Recipe of the day
function addRecipeOfTheDay() {
  const heroSection = document.getElementById('hero');
  const todayRecipe = recipes[Math.floor(Math.random() * recipes.length)];

  const recipeOfDay = document.createElement('div');
  recipeOfDay.className = 'recipe-of-day';
  recipeOfDay.style.cssText = `
    background: linear-gradient(135deg, rgba(0, 122, 255, 0.1), rgba(52, 199, 89, 0.1));
    border-radius: var(--radius-2xl);
    padding: var(--spacing-xl);
    margin-top: var(--spacing-2xl);
    text-align: center;
    border: 1px solid var(--border-color);
  `;

  recipeOfDay.innerHTML = `
    <h3 style="color: var(--text-primary); margin-bottom: var(--spacing-md);">
      ⭐ Recipe of the Day
    </h3>
    <div class="card" style="max-width: 400px; margin: 0 auto;">
      <h4 style="color: var(--text-primary);">${todayRecipe.title}</h4>
      <p style="color: var(--text-secondary); margin: var(--spacing-sm) 0;">
        ${todayRecipe.ingredients.slice(0, 3).join(', ')}...
      </p>
      <button class="btn btn-primary btn-sm" onclick="viewRecipe(${todayRecipe.id})">
        Try This Recipe
      </button>
    </div>
  `;

  heroSection.appendChild(recipeOfDay);
}

// Stats counter
function addStatsCounter() {
  const heroSection = document.getElementById('hero');
  const stats = document.createElement('div');
  stats.className = 'stats-counter';
  stats.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-2xl);
    text-align: center;
  `;

  const statsData = [
    { icon: '🍽️', number: recipes.length, label: 'Recipes Shared' },
    { icon: '👥', number: '1.2K+', label: 'Community Members' },
    { icon: '🌱', number: '500+', label: 'Meals Saved' },
    { icon: '♻️', number: '2.5T', label: 'Waste Reduced' }
  ];

  stats.innerHTML = statsData.map(stat => `
    <div class="stat-item" style="
      background: var(--background-tertiary);
      padding: var(--spacing-lg);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      transition: var(--transition-normal);
    ">
      <div style="font-size: var(--font-size-2xl); margin-bottom: var(--spacing-sm);">
        ${stat.icon}
      </div>
      <div style="font-size: var(--font-size-xl); font-weight: 600; color: var(--text-primary); margin-bottom: var(--spacing-xs);">
        ${stat.number}
      </div>
      <div style="font-size: var(--font-size-sm); color: var(--text-secondary);">
        ${stat.label}
      </div>
    </div>
  `).join('');

  heroSection.appendChild(stats);

  // Add hover effects
  stats.querySelectorAll('.stat-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-4px)';
      item.style.boxShadow = '0 8px 25px var(--shadow-medium)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.boxShadow = '';
    });
  });
}

// Fix the unused formData variable
function handleRecipeSubmission(event) {
  event.preventDefault();

  const title = document.getElementById('title').value.trim();
  const ingredients = document.getElementById('ingredients').value.trim();
  const steps = document.getElementById('steps').value.trim();
  const type = document.getElementById('foodType').value;
  const state = document.getElementById('foodState').value;
  const course = document.getElementById('foodCourse').value;

  if (!title || !ingredients || !steps) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  const newRecipe = {
    id: Date.now(),
    title,
    ingredients: ingredients.split(',').map(i => i.trim()),
    steps,
    type: type || 'Other',
    state: state || 'Other',
    course: course || 'Other',
    votes: 0,
    author: 'You',
    timeAgo: 'Just now',
    cookTime: 'TBD',
    difficulty: 'Easy'
  };

  recipes.unshift(newRecipe);
  filteredRecipes = [...recipes];
  renderRecipes(filteredRecipes);

  // Reset form
  event.target.reset();

  // Show success message
  showNotification('Recipe shared successfully! 🎉', 'success');

  // Save to localStorage
  saveToLocalStorage();

  // Scroll to recipes section
  document.getElementById('recipes').scrollIntoView({ behavior: 'smooth' });
}

// Error handling and monitoring
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
  showNotification('Something went wrong. Please refresh the page.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
  showNotification('Something went wrong. Please try again.', 'error');
});

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful');
      })
      .catch(function(err) {
        console.log('ServiceWorker registration failed');
      });
  });
}

// Analytics and user behavior tracking
const analytics = {
  trackEvent(eventName, properties = {}) {
    // Track user interactions for improving UX
    console.log('Analytics event:', eventName, properties);

    // Send to analytics service (if available)
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, properties);
    }
  },

  trackRecipeView(recipeId) {
    this.trackEvent('recipe_view', { recipe_id: recipeId });
  },

  trackSearch(searchTerm) {
    this.trackEvent('search', { search_term: searchTerm });
  },

  trackRecipeSubmission() {
    this.trackEvent('recipe_submission');
  }
};

// Enhanced search with analytics
const originalHandleSearch = handleSearch;
handleSearch = function() {
  const searchTerm = ingredientSearch.value.toLowerCase().trim();
  if (searchTerm) {
    analytics.trackSearch(searchTerm);
  }
  originalHandleSearch();
};

// Enhanced recipe viewing with analytics
const originalViewRecipe = viewRecipe;
viewRecipe = function(recipeId) {
  analytics.trackRecipeView(recipeId);
  originalViewRecipe(recipeId);
};

// Performance monitoring
const performanceMonitor = {
  measureRenderTime(componentName, renderFunction) {
    const startTime = performance.now();
    const result = renderFunction();
    const endTime = performance.now();

    console.log(`${componentName} rendered in ${(endTime - startTime).toFixed(2)}ms`);
    return result;
  },

  measureMemoryUsage() {
    if (performance.memory) {
      console.log('Memory usage:', {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB',
        total: Math.round(performance.memory.totalJSHeapSize / 1048576) + ' MB',
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + ' MB'
      });
    }
  }
};

// Monitor memory usage periodically
setInterval(() => {
  performanceMonitor.measureMemoryUsage();
}, 30000); // Every 30 seconds

// Cleanup function for better memory management
function cleanup() {
  // Remove event listeners and clear intervals when page unloads
  window.removeEventListener('error', arguments.callee);
  window.removeEventListener('unhandledrejection', arguments.callee);
}

window.addEventListener('beforeunload', cleanup);

