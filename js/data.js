// Sample data for Yummy Tummy application

// Sample recipes data
const sampleRecipes = [
  {
    id: 1,
    title: "Leftover Rice Fried Rice",
    ingredients: ["leftover rice", "vegetables", "soy sauce", "eggs", "garlic", "onions"],
    steps: "1. Heat oil in a pan\n2. Add garlic and onions, sauté until fragrant\n3. Add vegetables and cook for 3-4 minutes\n4. Add leftover rice and mix well\n5. Push rice to one side, scramble eggs on the other\n6. Mix everything together, add soy sauce\n7. Serve hot with green onions",
    type: "Asian",
    state: "International",
    course: "Main Course",
    votes: 24,
    author: "Chef Priya",
    timeAgo: "2 hours ago",
    cookTime: "15 mins",
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "Bread Upma",
    ingredients: ["stale bread", "onions", "tomatoes", "mustard seeds", "curry leaves", "green chilies"],
    steps: "1. Cut bread into small cubes\n2. Heat oil, add mustard seeds and curry leaves\n3. Add onions and green chilies, sauté\n4. Add tomatoes and cook until soft\n5. Add bread cubes and mix gently\n6. Season with salt and turmeric\n7. Garnish with coriander leaves",
    type: "Regional",
    state: "Karnataka",
    course: "Starter",
    votes: 18,
    author: "Ravi Kumar",
    timeAgo: "5 hours ago",
    cookTime: "20 mins",
    difficulty: "Easy"
  },
  {
    id: 3,
    title: "Vegetable Pulao from Leftover Curry",
    ingredients: ["leftover vegetable curry", "basmati rice", "whole spices", "ghee", "mint leaves"],
    steps: "1. Wash and soak basmati rice for 30 minutes\n2. Heat ghee in a heavy-bottomed pot\n3. Add whole spices and let them splutter\n4. Add rice and sauté for 2 minutes\n5. Add leftover curry and water as needed\n6. Bring to boil, then simmer covered for 15 minutes\n7. Garnish with mint and serve with raita",
    type: "Regional",
    state: "Punjab",
    course: "Main Course",
    votes: 31,
    author: "Simran Singh",
    timeAgo: "1 day ago",
    cookTime: "45 mins",
    difficulty: "Medium"
  },
  {
    id: 4,
    title: "Banana Bread from Overripe Bananas",
    ingredients: ["overripe bananas", "flour", "sugar", "butter", "eggs", "baking soda", "vanilla"],
    steps: "1. Preheat oven to 350°F (175°C)\n2. Mash bananas in a large bowl\n3. Mix in melted butter, sugar, egg, and vanilla\n4. Combine flour and baking soda in separate bowl\n5. Fold dry ingredients into banana mixture\n6. Pour into greased loaf pan\n7. Bake for 60-65 minutes until golden brown",
    type: "International",
    state: "International",
    course: "Dessert",
    votes: 42,
    author: "Maria Rodriguez",
    timeAgo: "3 days ago",
    cookTime: "1 hour 15 mins",
    difficulty: "Easy"
  },
  {
    id: 5,
    title: "Samosa Chaat from Leftover Samosas",
    ingredients: ["leftover samosas", "yogurt", "tamarind chutney", "mint chutney", "onions", "tomatoes", "sev"],
    steps: "1. Break samosas into bite-sized pieces\n2. Arrange on a plate\n3. Top with chopped onions and tomatoes\n4. Drizzle yogurt, tamarind and mint chutneys\n5. Sprinkle sev and chaat masala\n6. Garnish with coriander leaves\n7. Serve immediately",
    type: "Regional",
    state: "Maharashtra",
    course: "Snack",
    votes: 27,
    author: "Amit Sharma",
    timeAgo: "6 hours ago",
    cookTime: "10 mins",
    difficulty: "Easy"
  },
  {
    id: 6,
    title: "Coconut Rice from Leftover Rice",
    ingredients: ["leftover rice", "coconut", "mustard seeds", "urad dal", "chana dal", "curry leaves", "green chilies"],
    steps: "1. Grate fresh coconut or use desiccated coconut\n2. Heat oil in a pan, add mustard seeds\n3. Add urad dal, chana dal, and curry leaves\n4. Add green chilies and grated coconut\n5. Sauté for 2-3 minutes\n6. Add leftover rice and mix gently\n7. Season with salt and serve warm",
    type: "Regional",
    state: "Tamil Nadu",
    course: "Main Course",
    votes: 35,
    author: "Lakshmi Iyer",
    timeAgo: "12 hours ago",
    cookTime: "15 mins",
    difficulty: "Easy"
  }
];

// Sample tips and facts
const sustainabilityTips = [
  {
    icon: "🌱",
    title: "Plan Your Meals",
    text: "Planning meals for the week helps reduce food waste by 30%. Make a shopping list based on your meal plan and stick to it."
  },
  {
    icon: "❄️",
    title: "Store Food Properly",
    text: "Proper storage can extend food life significantly. Keep fruits and vegetables in the right humidity levels and temperatures."
  },
  {
    icon: "🍌",
    title: "Use Overripe Fruits",
    text: "Overripe bananas are perfect for smoothies, bread, and pancakes. Don't throw them away - they're sweeter and more nutritious!"
  },
  {
    icon: "🥬",
    title: "Regrow Vegetables",
    text: "Many vegetables like green onions, lettuce, and celery can be regrown from scraps. Place them in water and watch them grow!"
  },
  {
    icon: "🍲",
    title: "Batch Cook",
    text: "Cook large portions and freeze leftovers in meal-sized containers. This saves time and reduces food waste."
  },
  {
    icon: "🥕",
    title: "Use Vegetable Scraps",
    text: "Carrot tops, broccoli stems, and herb stems can be used to make flavorful vegetable stock. Nothing goes to waste!"
  },
  {
    icon: "📅",
    title: "First In, First Out",
    text: "Use older ingredients first. Organize your fridge and pantry so older items are in front and get used before they expire."
  },
  {
    icon: "🌍",
    title: "Global Impact",
    text: "Food waste accounts for 8-10% of global greenhouse gas emissions. Every meal saved makes a difference for our planet!"
  }
];

// Sample leftover exchange items
const sampleLeftovers = [
  {
    id: 1,
    itemName: "Fresh Vegetables",
    location: "Koramangala, Bangalore",
    details: "Mixed vegetables from yesterday's grocery shopping. Includes tomatoes, onions, and bell peppers. Best before tomorrow.",
    timePosted: "2 hours ago",
    status: "available"
  },
  {
    id: 2,
    itemName: "Homemade Bread",
    location: "Indiranagar, Bangalore",
    details: "Freshly baked whole wheat bread. Made too much for the family. 2 loaves available.",
    timePosted: "5 hours ago",
    status: "available"
  },
  {
    id: 3,
    itemName: "Cooked Rice",
    location: "Whitefield, Bangalore",
    details: "Leftover basmati rice from dinner. About 4 servings. Perfect for fried rice or pulao.",
    timePosted: "1 day ago",
    status: "taken"
  }
];

// Fridge scanning suggestions (mock AI responses)
const fridgeSuggestions = [
  {
    ingredients: ["tomatoes", "onions", "bread"],
    suggestions: [
      "Tomato Onion Sandwich",
      "Bread Upma",
      "Bruschetta Toast"
    ]
  },
  {
    ingredients: ["rice", "vegetables", "eggs"],
    suggestions: [
      "Vegetable Fried Rice",
      "Rice Bowl with Scrambled Eggs",
      "Vegetable Rice Pilaf"
    ]
  },
  {
    ingredients: ["bananas", "milk", "oats"],
    suggestions: [
      "Banana Oat Smoothie",
      "Overnight Banana Oats",
      "Banana Pancakes"
    ]
  }
];