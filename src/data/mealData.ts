
export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  image?: string;
  tags: string[];
  prep_time: number; // in minutes
  suitable_for: ('lose_weight' | 'build_muscle' | 'maintain' | 'improve_endurance')[];
}

export const meals: Meal[] = [
  {
    id: "meal-001",
    name: "Greek Yogurt with Berries and Honey",
    type: "breakfast",
    calories: 320,
    protein: 22,
    carbs: 40,
    fat: 8,
    ingredients: [
      "1 cup Greek yogurt",
      "1/2 cup mixed berries",
      "1 tbsp honey",
      "1 tbsp chia seeds"
    ],
    instructions: [
      "Place the Greek yogurt in a bowl",
      "Top with mixed berries",
      "Drizzle honey over the top",
      "Sprinkle with chia seeds"
    ],
    tags: ["high-protein", "quick", "vegetarian"],
    prep_time: 5,
    suitable_for: ["lose_weight", "maintain", "build_muscle"]
  },
  {
    id: "meal-002",
    name: "Chicken Breast with Sweet Potato and Broccoli",
    type: "lunch",
    calories: 450,
    protein: 40,
    carbs: 30,
    fat: 12,
    ingredients: [
      "6 oz grilled chicken breast",
      "1 medium sweet potato",
      "1 cup steamed broccoli",
      "1 tbsp olive oil",
      "Herbs and spices"
    ],
    instructions: [
      "Season chicken breast with herbs and spices",
      "Grill chicken until fully cooked",
      "Bake or microwave sweet potato until soft",
      "Steam broccoli until tender-crisp",
      "Drizzle olive oil over vegetables"
    ],
    tags: ["high-protein", "balanced", "meal-prep"],
    prep_time: 25,
    suitable_for: ["build_muscle", "lose_weight", "improve_endurance"]
  },
  {
    id: "meal-003",
    name: "Salmon with Quinoa and Asparagus",
    type: "dinner",
    calories: 520,
    protein: 35,
    carbs: 35,
    fat: 22,
    ingredients: [
      "5 oz salmon fillet",
      "1/2 cup cooked quinoa",
      "8 asparagus spears",
      "1 tbsp olive oil",
      "1 lemon",
      "Herbs and spices"
    ],
    instructions: [
      "Preheat oven to 400°F",
      "Season salmon with herbs, spices, and lemon",
      "Bake salmon for 12-15 minutes",
      "Cook quinoa according to package instructions",
      "Roast or steam asparagus"
    ],
    tags: ["omega-3", "high-protein", "gluten-free"],
    prep_time: 30,
    suitable_for: ["build_muscle", "maintain", "improve_endurance"]
  },
  {
    id: "meal-004",
    name: "Protein Smoothie",
    type: "snack",
    calories: 250,
    protein: 25,
    carbs: 20,
    fat: 5,
    ingredients: [
      "1 scoop protein powder",
      "1 banana",
      "1 cup almond milk",
      "1/2 cup spinach",
      "1/2 cup ice"
    ],
    instructions: [
      "Add all ingredients to a blender",
      "Blend until smooth",
      "Serve immediately"
    ],
    tags: ["high-protein", "quick", "vegetarian"],
    prep_time: 5,
    suitable_for: ["build_muscle", "lose_weight", "improve_endurance"]
  },
  {
    id: "meal-005",
    name: "Overnight Oats with Peanut Butter",
    type: "breakfast",
    calories: 380,
    protein: 18,
    carbs: 45,
    fat: 15,
    ingredients: [
      "1/2 cup rolled oats",
      "1 tbsp chia seeds",
      "1 cup almond milk",
      "1 tbsp peanut butter",
      "1 tsp honey",
      "1/2 banana, sliced"
    ],
    instructions: [
      "Mix oats, chia seeds, and milk in a jar",
      "Refrigerate overnight",
      "In the morning, stir in peanut butter and honey",
      "Top with sliced banana"
    ],
    tags: ["meal-prep", "vegetarian", "high-fiber"],
    prep_time: 5,
    suitable_for: ["maintain", "improve_endurance", "build_muscle"]
  },
  {
    id: "meal-006",
    name: "Turkey and Vegetable Stir Fry",
    type: "lunch",
    calories: 410,
    protein: 35,
    carbs: 30,
    fat: 15,
    ingredients: [
      "5 oz ground turkey",
      "2 cups mixed vegetables (bell peppers, broccoli, carrots)",
      "1 tbsp soy sauce",
      "1 tsp sesame oil",
      "1/2 cup brown rice",
      "1 clove garlic, minced",
      "1 tsp ginger, grated"
    ],
    instructions: [
      "Cook brown rice according to package instructions",
      "Heat sesame oil in a wok or large pan",
      "Add garlic and ginger, sauté until fragrant",
      "Add ground turkey, cook until browned",
      "Add vegetables and stir fry until tender-crisp",
      "Add soy sauce and stir to combine",
      "Serve over brown rice"
    ],
    tags: ["high-protein", "meal-prep", "balanced"],
    prep_time: 20,
    suitable_for: ["lose_weight", "build_muscle", "maintain"]
  },
  {
    id: "meal-007",
    name: "Vegetable Omelette with Avocado Toast",
    type: "breakfast",
    calories: 420,
    protein: 25,
    carbs: 30,
    fat: 22,
    ingredients: [
      "3 eggs",
      "1/4 cup diced bell peppers",
      "1/4 cup diced onions",
      "1/4 cup spinach",
      "1 slice whole grain bread",
      "1/2 avocado",
      "1 tsp olive oil",
      "Salt and pepper"
    ],
    instructions: [
      "Whisk eggs in a bowl with salt and pepper",
      "Heat olive oil in a pan over medium heat",
      "Add vegetables and sauté until soft",
      "Pour eggs over vegetables and cook until set",
      "Toast bread and top with mashed avocado",
      "Season avocado toast with salt and pepper"
    ],
    tags: ["high-protein", "vegetarian", "balanced"],
    prep_time: 15,
    suitable_for: ["maintain", "build_muscle", "lose_weight"]
  },
  {
    id: "meal-008",
    name: "Grilled Steak with Roasted Vegetables",
    type: "dinner",
    calories: 580,
    protein: 45,
    carbs: 25,
    fat: 30,
    ingredients: [
      "6 oz lean steak",
      "1 cup mixed root vegetables (sweet potatoes, carrots)",
      "1 cup brussels sprouts",
      "2 tbsp olive oil",
      "2 cloves garlic",
      "Fresh herbs (rosemary, thyme)",
      "Salt and pepper"
    ],
    instructions: [
      "Preheat oven to 425°F",
      "Season steak with salt and pepper",
      "Chop vegetables and toss with olive oil, garlic, and herbs",
      "Roast vegetables for 25-30 minutes",
      "Grill steak to desired doneness",
      "Let steak rest for 5 minutes before slicing",
      "Serve steak with roasted vegetables"
    ],
    tags: ["high-protein", "paleo", "gluten-free"],
    prep_time: 40,
    suitable_for: ["build_muscle", "maintain"]
  },
  {
    id: "meal-009",
    name: "Cottage Cheese with Fruit and Nuts",
    type: "snack",
    calories: 280,
    protein: 24,
    carbs: 15,
    fat: 12,
    ingredients: [
      "1 cup cottage cheese",
      "1/2 cup mixed berries",
      "1 tbsp sliced almonds",
      "1 tsp honey"
    ],
    instructions: [
      "Place cottage cheese in a bowl",
      "Top with mixed berries",
      "Sprinkle with sliced almonds",
      "Drizzle with honey"
    ],
    tags: ["high-protein", "quick", "vegetarian"],
    prep_time: 5,
    suitable_for: ["lose_weight", "build_muscle", "maintain"]
  },
  {
    id: "meal-010",
    name: "Lentil Soup with Whole Grain Bread",
    type: "lunch",
    calories: 390,
    protein: 20,
    carbs: 60,
    fat: 8,
    ingredients: [
      "1 cup cooked lentils",
      "2 cups vegetable broth",
      "1/2 cup diced carrots",
      "1/2 cup diced celery",
      "1/4 cup diced onion",
      "2 cloves garlic, minced",
      "1 slice whole grain bread",
      "1 tbsp olive oil",
      "Herbs and spices"
    ],
    instructions: [
      "Sauté onion, carrots, and celery in olive oil",
      "Add garlic and sauté until fragrant",
      "Add lentils and vegetable broth",
      "Simmer for 20-25 minutes",
      "Season with herbs and spices",
      "Serve with a slice of whole grain bread"
    ],
    tags: ["vegetarian", "high-fiber", "meal-prep"],
    prep_time: 35,
    suitable_for: ["lose_weight", "improve_endurance", "maintain"]
  }
];
