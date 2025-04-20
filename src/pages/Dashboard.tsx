
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Dumbbell, Utensils, User, LineChart as LineChartIcon } from "lucide-react";

export default function Dashboard() {
  const { userProfile, isProfileComplete, progressHistory } = useUser();

  // Calculate daily targets and progress
  const caloriesConsumed = progressHistory[0]?.calories || 0;
  const caloriesProgress = Math.min(
    Math.round((caloriesConsumed / userProfile.dailyCalories) * 100),
    100
  );

  // Get last 7 days of weight data for chart
  const weightData = [...progressHistory]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7)
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weight: entry.weight
    }));

  if (!isProfileComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-6">Welcome to NourishFit!</h1>
          <p className="text-lg mb-8">
            Your personalized nutrition and workout planner for achieving your fitness goals.
          </p>
          <Button asChild size="lg" className="nourishfit-gradient-green text-white">
            <Link to="/profile">Complete Your Profile</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Dashboard</h1>
        <Button asChild variant="outline">
          <Link to="/progress">View Full Progress</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="nourishfit-stats-card">
          <CardContent className="p-6">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{userProfile.weight} kg</div>
            <p className="text-sm text-muted-foreground">Current Weight</p>
          </CardContent>
        </Card>
        
        <Card className="nourishfit-stats-card">
          <CardContent className="p-6">
            <div className="rounded-full bg-nourishfit-blue/10 p-3 mb-3">
              <Utensils className="h-6 w-6 text-nourishfit-blue" />
            </div>
            <div className="text-2xl font-bold">{userProfile.dailyCalories}</div>
            <p className="text-sm text-muted-foreground">Daily Calories</p>
          </CardContent>
        </Card>
        
        <Card className="nourishfit-stats-card">
          <CardContent className="p-6">
            <div className="rounded-full bg-nourishfit-orange/10 p-3 mb-3">
              <Dumbbell className="h-6 w-6 text-nourishfit-orange" />
            </div>
            <div className="text-2xl font-bold">{userProfile.dailyProtein}g</div>
            <p className="text-sm text-muted-foreground">Daily Protein</p>
          </CardContent>
        </Card>
        
        <Card className="nourishfit-stats-card">
          <CardContent className="p-6">
            <div className="rounded-full bg-nourishfit-purple/10 p-3 mb-3">
              <LineChartIcon className="h-6 w-6 text-nourishfit-purple" />
            </div>
            <div className="text-2xl font-bold">{progressHistory.length || 0}</div>
            <p className="text-sm text-muted-foreground">Progress Entries</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Today's Progress</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Calories</span>
                  <span className="text-sm font-medium">{caloriesConsumed} / {userProfile.dailyCalories}</span>
                </div>
                <Progress value={caloriesProgress} className="h-2" />
              </div>
              
              {/* Add workout completion indicator if data available */}
              {progressHistory[0]?.workoutCompleted && (
                <div className="flex items-center text-sm">
                  <div className="rounded-full bg-green-100 p-1 mr-2">
                    <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Workout completed ({progressHistory[0].workoutDuration} mins)</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/meals">
                  <Utensils className="h-4 w-4 mr-2" />
                  Add Meal
                </Link>
              </Button>
              <Button asChild className="flex-1 bg-primary">
                <Link to="/workouts">
                  <Dumbbell className="h-4 w-4 mr-2" />
                  Start Workout
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Weight Tracking</h3>
            {weightData.length > 0 ? (
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#4CAF50" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-center">
                <p className="text-muted-foreground mb-4">Start tracking your weight to see progress</p>
                <Button asChild variant="outline">
                  <Link to="/progress">Add Weight Entry</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Today's Meal Plan</h3>
            <p className="text-sm text-muted-foreground mb-4">Suggested meals based on your daily targets</p>
            
            {isProfileComplete ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 border-b pb-3">
                  <div className="rounded-md bg-primary/10 p-2">
                    <span className="text-xs font-medium">B</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Greek Yogurt with Berries</h4>
                    <p className="text-sm text-muted-foreground">320 cals, 22g protein</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 border-b pb-3">
                  <div className="rounded-md bg-primary/10 p-2">
                    <span className="text-xs font-medium">L</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Chicken Breast with Sweet Potato</h4>
                    <p className="text-sm text-muted-foreground">450 cals, 40g protein</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-primary/10 p-2">
                    <span className="text-xs font-medium">D</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Salmon with Quinoa</h4>
                    <p className="text-sm text-muted-foreground">520 cals, 35g protein</p>
                  </div>
                </div>
                
                <Button asChild className="w-full mt-2">
                  <Link to="/meals">View Full Meal Plan</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="mb-4 text-muted-foreground">Complete your profile to get personalized meal plans</p>
                <Button asChild>
                  <Link to="/profile">Complete Profile</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Recommended Workout</h3>
            <p className="text-sm text-muted-foreground mb-4">Based on your fitness goals</p>
            
            {isProfileComplete ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-secondary p-4">
                  <h4 className="font-medium mb-1">Full Body Strength</h4>
                  <div className="flex justify-between text-sm">
                    <span>30 minutes</span>
                    <span className="font-medium text-primary">Beginner</span>
                  </div>
                  
                  <ul className="mt-3 space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Squats</span>
                      <span>3 × 10</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Push-ups</span>
                      <span>3 × 8</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Planks</span>
                      <span>3 × 30s</span>
                    </li>
                  </ul>
                </div>
                
                <Button asChild className="w-full">
                  <Link to="/workouts">View All Workouts</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="mb-4 text-muted-foreground">Complete your profile to get workout recommendations</p>
                <Button asChild>
                  <Link to="/profile">Complete Profile</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
