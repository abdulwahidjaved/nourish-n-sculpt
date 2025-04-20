
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.coerce.number().int().positive().min(13, "Must be at least 13 years old"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender option",
  }),
  height: z.coerce.number().positive().min(100, "Height must be at least 100 cm"),
  weight: z.coerce.number().positive().min(30, "Weight must be at least 30 kg"),
  targetWeight: z.coerce.number().positive().min(30, "Target weight must be at least 30 kg"),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"], {
    required_error: "Please select an activity level",
  }),
  fitnessGoal: z.enum(["lose_weight", "build_muscle", "maintain", "improve_endurance"], {
    required_error: "Please select a fitness goal",
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Profile() {
  const { userProfile, updateUserProfile, calculateDailyNeeds } = useUser();
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userProfile.name || "",
      age: userProfile.age || 30,
      gender: userProfile.gender || undefined,
      height: userProfile.height || 170,
      weight: userProfile.weight || 70,
      targetWeight: userProfile.targetWeight || 70,
      activityLevel: userProfile.activityLevel || undefined,
      fitnessGoal: userProfile.fitnessGoal || undefined,
    },
  });

  // Update form if userProfile changes externally
  useEffect(() => {
    form.reset({
      name: userProfile.name || "",
      age: userProfile.age || 30,
      gender: userProfile.gender || undefined,
      height: userProfile.height || 170,
      weight: userProfile.weight || 70,
      targetWeight: userProfile.targetWeight || 70,
      activityLevel: userProfile.activityLevel || undefined,
      fitnessGoal: userProfile.fitnessGoal || undefined,
    });
  }, [userProfile, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    setSaving(true);
    try {
      // Update user profile data
      updateUserProfile(data);
      
      // Calculate daily nutritional needs
      setTimeout(() => {
        calculateDailyNeeds();
        setSaving(false);
        toast({
          title: "Profile updated",
          description: "Your profile has been saved and your nutritional needs updated.",
        });
      }, 1000);
    } catch (error) {
      setSaving(false);
      toast({
        title: "Error",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1>Your Profile</h1>
      <p className="text-muted-foreground mb-6">
        Complete your profile to get personalized meal and workout plans.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            We use this information to calculate your daily calorie and macronutrient targets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="170" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="70" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="targetWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="65" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your activity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sedentary">
                          Sedentary (little or no exercise)
                        </SelectItem>
                        <SelectItem value="light">
                          Light (exercise 1-3 times/week)
                        </SelectItem>
                        <SelectItem value="moderate">
                          Moderate (exercise 3-5 times/week)
                        </SelectItem>
                        <SelectItem value="active">
                          Active (exercise 6-7 times/week)
                        </SelectItem>
                        <SelectItem value="very_active">
                          Very Active (exercise & physical job)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fitnessGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Goal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="lose_weight">Lose Weight</SelectItem>
                        <SelectItem value="build_muscle">Build Muscle</SelectItem>
                        <SelectItem value="maintain">Maintain Weight</SelectItem>
                        <SelectItem value="improve_endurance">
                          Improve Endurance
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-between px-0">
                <Button variant="outline" type="button" onClick={() => form.reset()}>
                  Reset
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Profile"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>

      {userProfile.dailyCalories > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Daily Targets</CardTitle>
            <CardDescription>
              Calculated based on your profile and fitness goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <div className="nourishfit-stats-card">
                <div className="text-sm text-muted-foreground">Calories</div>
                <div className="text-3xl font-bold">{userProfile.dailyCalories}</div>
                <div className="text-xs text-muted-foreground">kcal/day</div>
              </div>
              
              <div className="nourishfit-stats-card">
                <div className="text-sm text-muted-foreground">Protein</div>
                <div className="text-3xl font-bold">{userProfile.dailyProtein}</div>
                <div className="text-xs text-muted-foreground">grams/day</div>
              </div>
              
              <div className="nourishfit-stats-card">
                <div className="text-sm text-muted-foreground">Carbs</div>
                <div className="text-3xl font-bold">{userProfile.dailyCarbs}</div>
                <div className="text-xs text-muted-foreground">grams/day</div>
              </div>
              
              <div className="nourishfit-stats-card">
                <div className="text-sm text-muted-foreground">Fat</div>
                <div className="text-3xl font-bold">{userProfile.dailyFat}</div>
                <div className="text-xs text-muted-foreground">grams/day</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
