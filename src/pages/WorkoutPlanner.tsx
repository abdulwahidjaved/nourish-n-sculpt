
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/UserContext";
import { workouts, exercises } from "@/data/workoutData";
import { Search, Clock, Dumbbell, CheckCircle } from "lucide-react";

export default function WorkoutPlanner() {
  const { userProfile, isProfileComplete } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null);
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null);

  if (!isProfileComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>
          <p className="mb-6">
            To create your personalized workout plan, we need to know more about
            you and your goals.
          </p>
          <Button asChild className="bg-primary">
            <a href="/profile">Set Up Profile</a>
          </Button>
        </div>
      </div>
    );
  }

  const filteredWorkouts = workouts.filter((workout) => {
    // Filter by search term
    const matchesSearch = workout.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filter by difficulty
    const matchesDifficulty =
      difficultyFilter === null || workout.difficulty === difficultyFilter;

    // Filter by fitness goal if one is set
    const matchesGoal =
      !userProfile.fitnessGoal ||
      workout.suitable_for.includes(userProfile.fitnessGoal as any);

    return matchesSearch && matchesDifficulty && matchesGoal;
  });

  // Find recommended workout based on user's fitness goal
  const recommendedWorkout = workouts.find(
    (workout) =>
      workout.suitable_for.includes(userProfile.fitnessGoal as any) &&
      workout.difficulty <= 2
  );

  // Get exercise details for a workout
  const getExerciseDetails = (exerciseId: string) => {
    return exercises.find((exercise) => exercise.id === exerciseId);
  };

  const renderWorkoutCard = (workout: typeof workouts[0], recommended = false) => {
    const isActive = activeWorkout === workout.id;
    
    return (
      <Card 
        key={workout.id} 
        className={`nourishfit-card ${isActive ? 'border-primary' : ''} ${recommended ? 'border-nourishfit-green' : ''}`}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{workout.name}</h3>
                {recommended && (
                  <Badge variant="outline" className="bg-nourishfit-green/10 text-nourishfit-green border-nourishfit-green/20">
                    Recommended
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                {workout.description}
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{workout.duration} min</span>
            </div>
          </div>

          <div className="my-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Difficulty</span>
              <span className="font-medium">
                {workout.difficulty === 1
                  ? "Beginner"
                  : workout.difficulty === 2
                  ? "Intermediate"
                  : "Advanced"}
              </span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  workout.difficulty === 1
                    ? "bg-green-500 w-1/3"
                    : workout.difficulty === 2
                    ? "bg-amber-500 w-2/3"
                    : "bg-red-500 w-full"
                }`}
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Exercises</div>
            <ul className="space-y-2 max-h-32 overflow-y-auto">
              {workout.exercises.map((item, index) => {
                const exercise = getExerciseDetails(item.exercise);
                return (
                  <li key={index} className="text-sm flex justify-between">
                    <span>{exercise?.name}</span>
                    <span className="text-muted-foreground">
                      {item.sets && item.reps
                        ? `${item.sets} × ${item.reps}`
                        : item.duration
                        ? `${item.sets || 1} × ${item.duration}s`
                        : ""}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-4">
            <Button 
              variant={isActive ? "default" : "outline"} 
              size="sm" 
              className="w-full"
              onClick={() => setActiveWorkout(isActive ? null : workout.id)}
            >
              {isActive ? (
                <CheckCircle className="h-4 w-4 mr-2" />
              ) : (
                <Dumbbell className="h-4 w-4 mr-2" />
              )}
              {isActive ? "Selected" : "Select Workout"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Workout Planner</h1>
        <p className="text-muted-foreground">
          Find the perfect workout for your {userProfile.fitnessGoal?.replace("_", " ")} goal.
        </p>
      </div>

      <Tabs defaultValue="recommended">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="all-workouts">All Workouts</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="space-y-6">
          {recommendedWorkout ? (
            <div>
              <div className="bg-nourishfit-green/10 text-nourishfit-green p-4 rounded-lg mb-6">
                <h3 className="font-medium">Based on your profile</h3>
                <p className="text-sm">
                  This workout is recommended for your {userProfile.fitnessGoal?.replace("_", " ")} goal
                  and current fitness level.
                </p>
              </div>
              {renderWorkoutCard(recommendedWorkout, true)}
            </div>
          ) : (
            <div className="text-center py-12">
              <Dumbbell className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No recommendation yet</h3>
              <p className="text-muted-foreground">
                Complete your profile to get personalized workout recommendations
              </p>
              <Button asChild className="mt-4">
                <a href="/profile">Update Profile</a>
              </Button>
            </div>
          )}

          {activeWorkout && (
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Ready to start your workout?</h3>
                <Button className="w-full sm:w-auto">Start Workout Session</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="all-workouts" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="text-sm font-medium mb-2 block">
                Search workouts
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Difficulty
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={difficultyFilter === null ? "default" : "outline"}
                  onClick={() => setDifficultyFilter(null)}
                >
                  All
                </Button>
                <Button
                  size="sm"
                  variant={difficultyFilter === 1 ? "default" : "outline"}
                  onClick={() => setDifficultyFilter(1)}
                >
                  Beginner
                </Button>
                <Button
                  size="sm"
                  variant={difficultyFilter === 2 ? "default" : "outline"}
                  onClick={() => setDifficultyFilter(2)}
                >
                  Intermediate
                </Button>
                <Button
                  size="sm"
                  variant={difficultyFilter === 3 ? "default" : "outline"}
                  onClick={() => setDifficultyFilter(3)}
                >
                  Advanced
                </Button>
              </div>
            </div>
          </div>

          {filteredWorkouts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredWorkouts.map((workout) => renderWorkoutCard(workout))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No workouts found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}

          {activeWorkout && (
            <div className="sticky bottom-4">
              <Card className="border-primary bg-background/80 backdrop-blur">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Workout selected</h3>
                    <p className="text-sm text-muted-foreground">
                      Ready to begin your session?
                    </p>
                  </div>
                  <Button>Start Workout</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
