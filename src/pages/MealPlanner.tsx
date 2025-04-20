
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser, FitnessGoal } from "@/context/UserContext";
import { meals, Meal } from "@/data/mealData";
import { 
  Search, 
  Filter, 
  Clock,
} from "lucide-react";

export default function MealPlanner() {
  const { userProfile, isProfileComplete } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMealType, setSelectedMealType] = useState<string>('all');

  if (!isProfileComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>
          <p className="mb-6">To create your personalized meal plan, we need to know more about you and your goals.</p>
          <Button asChild className="bg-primary">
            <a href="/profile">Set Up Profile</a>
          </Button>
        </div>
      </div>
    );
  }

  const filteredMeals = meals.filter(meal => {
    // Filter by search term
    const matchesSearch = 
      meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by meal type
    const matchesMealType = selectedMealType === 'all' || meal.type === selectedMealType;
    
    // Filter by fitness goal if one is set
    const matchesGoal = !userProfile.fitnessGoal || 
      meal.suitable_for.includes(userProfile.fitnessGoal as any);
    
    return matchesSearch && matchesMealType && matchesGoal;
  });

  // Group meals by type for the daily plan
  const breakfasts = meals.filter(meal => meal.type === 'breakfast' && 
    (!userProfile.fitnessGoal || meal.suitable_for.includes(userProfile.fitnessGoal as any)));
  const lunches = meals.filter(meal => meal.type === 'lunch' && 
    (!userProfile.fitnessGoal || meal.suitable_for.includes(userProfile.fitnessGoal as any)));
  const dinners = meals.filter(meal => meal.type === 'dinner' && 
    (!userProfile.fitnessGoal || meal.suitable_for.includes(userProfile.fitnessGoal as any)));
  const snacks = meals.filter(meal => meal.type === 'snack' && 
    (!userProfile.fitnessGoal || meal.suitable_for.includes(userProfile.fitnessGoal as any)));

  // Select one meal of each type for the daily plan
  const dailyPlan = {
    breakfast: breakfasts.length > 0 ? breakfasts[0] : null,
    lunch: lunches.length > 0 ? lunches[0] : null,
    dinner: dinners.length > 0 ? dinners[0] : null,
    snack: snacks.length > 0 ? snacks[0] : null,
  };

  // Calculate daily nutritional totals
  const dailyTotals = Object.values(dailyPlan).reduce((acc, meal) => {
    if (meal) {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
    }
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const renderMealCard = (meal: Meal) => (
    <Card key={meal.id} className="nourishfit-card hover:border-primary">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium mb-1">{meal.name}</h3>
            <div className="text-sm text-muted-foreground capitalize mb-2">{meal.type}</div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{meal.prep_time} min</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 my-3">
          {meal.tags.map(tag => (
            <span 
              key={tag} 
              className="bg-secondary text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-4 gap-2 my-4">
          <div className="text-center">
            <div className="text-sm font-medium">{meal.calories}</div>
            <div className="text-xs text-muted-foreground">kcal</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">{meal.protein}g</div>
            <div className="text-xs text-muted-foreground">protein</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">{meal.carbs}g</div>
            <div className="text-xs text-muted-foreground">carbs</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">{meal.fat}g</div>
            <div className="text-xs text-muted-foreground">fat</div>
          </div>
        </div>
        
        <div className="mt-3">
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h1>Meal Planner</h1>
        <p className="text-muted-foreground">
          Personalized meals based on your daily target of {userProfile.dailyCalories} calories and {userProfile.dailyProtein}g protein.
        </p>
      </div>

      <Tabs defaultValue="daily-plan">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily-plan">Your Daily Plan</TabsTrigger>
          <TabsTrigger value="all-meals">All Meals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily-plan" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Today's Meal Plan</h2>
                  <p className="text-sm text-muted-foreground">
                    Optimized for {userProfile.fitnessGoal?.replace('_', ' ')}
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center bg-secondary/50 rounded-lg p-2 text-sm">
                  <div>
                    <div className="font-medium">{dailyTotals.calories}</div>
                    <div className="text-xs text-muted-foreground">calories</div>
                  </div>
                  <div>
                    <div className="font-medium">{dailyTotals.protein}g</div>
                    <div className="text-xs text-muted-foreground">protein</div>
                  </div>
                  <div>
                    <div className="font-medium">{dailyTotals.carbs}g</div>
                    <div className="text-xs text-muted-foreground">carbs</div>
                  </div>
                  <div>
                    <div className="font-medium">{dailyTotals.fat}g</div>
                    <div className="text-xs text-muted-foreground">fat</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {dailyPlan.breakfast && (
              <div>
                <h3 className="text-lg font-medium mb-3">Breakfast</h3>
                {renderMealCard(dailyPlan.breakfast)}
              </div>
            )}
            
            {dailyPlan.lunch && (
              <div>
                <h3 className="text-lg font-medium mb-3">Lunch</h3>
                {renderMealCard(dailyPlan.lunch)}
              </div>
            )}
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {dailyPlan.dinner && (
              <div>
                <h3 className="text-lg font-medium mb-3">Dinner</h3>
                {renderMealCard(dailyPlan.dinner)}
              </div>
            )}
            
            {dailyPlan.snack && (
              <div>
                <h3 className="text-lg font-medium mb-3">Snack</h3>
                {renderMealCard(dailyPlan.snack)}
              </div>
            )}
          </div>
          
          <div className="flex justify-center">
            <Button>Generate New Plan</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="all-meals" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
            <div className="flex-1 flex flex-col">
              <label htmlFor="search" className="text-sm font-medium mb-2">
                Search meals
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or ingredient..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Filter by type</label>
              <div className="flex flex-wrap gap-2">
                {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map(type => (
                  <Button
                    key={type}
                    size="sm"
                    variant={selectedMealType === type ? "default" : "outline"}
                    onClick={() => setSelectedMealType(type)}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {filteredMeals.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMeals.map(meal => renderMealCard(meal))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No meals found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
