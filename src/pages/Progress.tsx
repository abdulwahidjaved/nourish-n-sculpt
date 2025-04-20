
import { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const progressSchema = z.object({
  date: z.string().nonempty("Date is required"),
  weight: z.coerce.number().positive("Weight must be greater than 0"),
  calories: z.coerce.number().nonnegative("Calories cannot be negative"),
  workoutCompleted: z.boolean().default(false),
  workoutDuration: z.coerce.number().nonnegative("Duration cannot be negative"),
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
});

type ProgressFormValues = z.infer<typeof progressSchema>;

export default function Progress() {
  const { userProfile, progressHistory, addProgressEntry, isProfileComplete } = useUser();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  // Initialize form with today's date
  const form = useForm<ProgressFormValues>({
    resolver: zodResolver(progressSchema),
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd"),
      weight: userProfile.weight || 0,
      calories: 0,
      workoutCompleted: false,
      workoutDuration: 0,
      notes: "",
    },
  });

  // Watch if workout is completed to conditionally show duration field
  const workoutCompleted = form.watch("workoutCompleted");

  const onSubmit = (data: ProgressFormValues) => {
    setSubmitting(true);
    try {
      addProgressEntry({
        date: data.date,
        weight: data.weight,
        calories: data.calories,
        workoutCompleted: data.workoutCompleted,
        workoutDuration: data.workoutDuration,
        notes: data.notes || "",
      });

      toast({
        title: "Progress Logged",
        description: "Your progress entry has been saved successfully.",
      });

      // Reset form except for date and weight
      form.reset({
        date: data.date,
        weight: data.weight,
        calories: 0,
        workoutCompleted: false,
        workoutDuration: 0,
        notes: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving your progress.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Prepare data for charts
  const weightChartData = [...progressHistory]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((entry) => ({
      date: format(new Date(entry.date), "MMM dd"),
      weight: entry.weight,
    }));

  const caloriesChartData = [...progressHistory]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((entry) => ({
      date: format(new Date(entry.date), "MMM dd"),
      calories: entry.calories,
    }));

  if (!isProfileComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>
          <p className="mb-6">
            To track your progress, we need to know more about your goals first.
          </p>
          <Button asChild className="bg-primary">
            <a href="/profile">Set Up Profile</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1>Track Your Progress</h1>
        <p className="text-muted-foreground">
          Record your daily progress and visualize your journey.
        </p>
      </div>

      <Tabs defaultValue="log" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="log">Log Progress</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="log">
          <Card>
            <CardHeader>
              <CardTitle>Log Today's Progress</CardTitle>
              <CardDescription>
                Record your weight, calorie intake, and workouts to track your fitness journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
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
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="calories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calories Consumed</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="workoutCompleted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Completed a workout today</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {workoutCompleted && (
                      <FormField
                        control={form.control}
                        name="workoutDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Workout Duration (minutes)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="How did you feel today? Any challenges or achievements?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <CardFooter className="px-0">
                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting ? "Saving..." : "Save Progress"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          {progressHistory.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No entries yet</h3>
              <p className="text-muted-foreground mb-6">
                Start logging your daily progress to see your history here.
              </p>
              <Button
                onClick={() => document.querySelector('[value="log"]')?.dispatchEvent(new Event('click'))}
              >
                Log Your Progress
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {[...progressHistory]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((entry, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {format(new Date(entry.date), "MMMM d, yyyy")}
                        </CardTitle>
                        <div className="text-sm bg-secondary py-1 px-3 rounded-full">
                          {entry.weight} kg
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Calories
                          </div>
                          <div className="font-medium">{entry.calories}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Workout
                          </div>
                          <div className="font-medium">
                            {entry.workoutCompleted
                              ? `${entry.workoutDuration} minutes`
                              : "Not completed"}
                          </div>
                        </div>
                        
                        {entry.notes && (
                          <div className="sm:col-span-2 md:col-span-1">
                            <div className="text-sm text-muted-foreground">
                              Notes
                            </div>
                            <div className="text-sm">{entry.notes}</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="charts">
          {progressHistory.length < 2 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Not enough data</h3>
              <p className="text-muted-foreground mb-6">
                You need at least 2 progress entries to view charts.
              </p>
              <Button
                onClick={() => document.querySelector('[value="log"]')?.dispatchEvent(new Event('click'))}
              >
                Log Your Progress
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Progress</CardTitle>
                  <CardDescription>
                    Track your weight changes over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weightChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis
                          domain={[
                            (dataMin) => Math.floor(dataMin - 2),
                            (dataMax) => Math.ceil(dataMax + 2),
                          ]}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="weight"
                          name="Weight (kg)"
                          stroke="#4CAF50"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calorie Intake</CardTitle>
                  <CardDescription>
                    Monitor your daily calorie consumption
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={caloriesChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="calories"
                          name="Calories"
                          stroke="#2196F3"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
