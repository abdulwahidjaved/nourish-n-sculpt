
export interface Exercise {
  id: string;
  name: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'balance';
  muscles: string[];
  difficulty: 1 | 2 | 3; // 1 = beginner, 2 = intermediate, 3 = advanced
  description: string;
  instructions: string[];
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  exercises: Array<{
    exercise: string; // Exercise ID
    sets?: number;
    reps?: number;
    duration?: number; // in seconds
    rest?: number; // in seconds
  }>;
  suitable_for: ('lose_weight' | 'build_muscle' | 'maintain' | 'improve_endurance')[];
  difficulty: 1 | 2 | 3; // 1 = beginner, 2 = intermediate, 3 = advanced
}

export const exercises: Exercise[] = [
  {
    id: "ex-001",
    name: "Push-up",
    type: "strength",
    muscles: ["chest", "shoulders", "triceps", "core"],
    difficulty: 2,
    description: "A classic bodyweight exercise that targets the chest, shoulders, and triceps.",
    instructions: [
      "Start in a plank position with hands slightly wider than shoulder-width apart",
      "Keep your body in a straight line from head to heels",
      "Lower your body until your chest nearly touches the floor",
      "Push yourself back up to the starting position",
      "Repeat for the prescribed number of repetitions"
    ]
  },
  {
    id: "ex-002",
    name: "Squat",
    type: "strength",
    muscles: ["quadriceps", "hamstrings", "glutes", "core"],
    difficulty: 1,
    description: "A fundamental lower body exercise that targets multiple muscle groups.",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Keep your chest up and back straight",
      "Bend your knees and lower your body as if sitting in a chair",
      "Lower until thighs are parallel to the ground (or as low as comfortable)",
      "Push through your heels to return to starting position",
      "Repeat for the prescribed number of repetitions"
    ]
  },
  {
    id: "ex-003",
    name: "Running",
    type: "cardio",
    muscles: ["quadriceps", "hamstrings", "calves", "core"],
    difficulty: 2,
    description: "A cardiovascular exercise that improves endurance and burns calories.",
    instructions: [
      "Start with a 5-minute warm-up walk",
      "Gradually increase your pace to a comfortable running speed",
      "Maintain good posture with a slight forward lean",
      "Land midfoot with each step",
      "Breathe rhythmically",
      "Cool down with a 5-minute walk at the end"
    ]
  },
  {
    id: "ex-004",
    name: "Plank",
    type: "strength",
    muscles: ["core", "shoulders", "back"],
    difficulty: 1,
    description: "An isometric core exercise that improves stability and posture.",
    instructions: [
      "Start in a forearm position with elbows directly beneath shoulders",
      "Extend legs behind you with toes tucked under",
      "Create a straight line from head to heels",
      "Engage your core and glutes",
      "Hold for the prescribed duration",
      "Avoid sagging hips or raised buttocks"
    ]
  },
  {
    id: "ex-005",
    name: "Dumbbell Row",
    type: "strength",
    muscles: ["back", "biceps", "shoulders"],
    difficulty: 2,
    description: "A unilateral back exercise that targets the lats and mid-back muscles.",
    instructions: [
      "Place one knee and hand on a bench for support",
      "Hold a dumbbell in your free hand with arm extended",
      "Keep your back flat and parallel to the ground",
      "Pull the dumbbell up to your side, keeping elbow close to body",
      "Lower the weight with control",
      "Complete all reps on one side before switching"
    ]
  },
  {
    id: "ex-006",
    name: "Cycling",
    type: "cardio",
    muscles: ["quadriceps", "hamstrings", "calves", "glutes"],
    difficulty: 1,
    description: "A low-impact cardiovascular exercise that improves leg strength and endurance.",
    instructions: [
      "Adjust seat height so your leg is slightly bent at the bottom of the pedal stroke",
      "Start with 5 minutes at an easy pace to warm up",
      "Increase resistance or speed to desired intensity",
      "Maintain a cadence of 70-90 rpm for optimal efficiency",
      "Keep shoulders relaxed and elbows slightly bent",
      "Cool down with 5 minutes of easy pedaling"
    ]
  },
  {
    id: "ex-007",
    name: "Lunges",
    type: "strength",
    muscles: ["quadriceps", "hamstrings", "glutes", "calves"],
    difficulty: 1,
    description: "A unilateral lower body exercise that improves balance and leg strength.",
    instructions: [
      "Stand with feet hip-width apart",
      "Step forward with one leg",
      "Lower your body until both knees form 90-degree angles",
      "Keep front knee aligned with ankle",
      "Push through the front heel to return to starting position",
      "Alternate legs and repeat"
    ]
  },
  {
    id: "ex-008",
    name: "Shoulder Press",
    type: "strength",
    muscles: ["shoulders", "triceps", "upper back"],
    difficulty: 2,
    description: "An overhead pressing movement that targets the shoulders and triceps.",
    instructions: [
      "Sit or stand with dumbbells at shoulder height, palms facing forward",
      "Keep core engaged and maintain good posture",
      "Press weights overhead until arms are fully extended",
      "Lower weights with control back to shoulder height",
      "Avoid arching your lower back"
    ]
  },
  {
    id: "ex-009",
    name: "Jumping Jacks",
    type: "cardio",
    muscles: ["full body"],
    difficulty: 1,
    description: "A simple full-body cardio exercise that raises heart rate quickly.",
    instructions: [
      "Start with feet together and arms at sides",
      "Jump while spreading feet and raising arms overhead",
      "Return to starting position with another jump",
      "Maintain a steady rhythm",
      "Land softly with knees slightly bent"
    ]
  },
  {
    id: "ex-010",
    name: "Deadlift",
    type: "strength",
    muscles: ["hamstrings", "glutes", "back", "core"],
    difficulty: 3,
    description: "A fundamental compound exercise that targets multiple muscle groups.",
    instructions: [
      "Stand with feet hip-width apart, toes under the bar",
      "Hinge at the hips and grab the bar with hands shoulder-width apart",
      "Lower hips, lift chest, and flatten back",
      "Push through feet to stand up, keeping bar close to body",
      "Lock out at the top by squeezing glutes",
      "Lower the bar with control by hinging at the hips"
    ]
  }
];

export const workouts: Workout[] = [
  {
    id: "workout-001",
    name: "Beginner Full Body Strength",
    description: "A simple full body workout for beginners focusing on major muscle groups.",
    duration: 30,
    exercises: [
      { exercise: "ex-002", sets: 3, reps: 10, rest: 60 },
      { exercise: "ex-001", sets: 3, reps: 8, rest: 60 },
      { exercise: "ex-004", sets: 3, duration: 30, rest: 45 },
      { exercise: "ex-007", sets: 2, reps: 10, rest: 60 }
    ],
    suitable_for: ["build_muscle", "maintain"],
    difficulty: 1
  },
  {
    id: "workout-002",
    name: "Fat Burning Cardio",
    description: "A high-intensity cardio workout designed to maximize calorie burn.",
    duration: 25,
    exercises: [
      { exercise: "ex-009", duration: 60, sets: 3, rest: 30 },
      { exercise: "ex-003", duration: 300, sets: 1 },
      { exercise: "ex-007", sets: 3, reps: 15, rest: 30 },
      { exercise: "ex-009", duration: 60, sets: 3, rest: 30 }
    ],
    suitable_for: ["lose_weight", "improve_endurance"],
    difficulty: 2
  },
  {
    id: "workout-003",
    name: "Upper Body Strength",
    description: "Focus on building strength in the chest, shoulders, and back.",
    duration: 40,
    exercises: [
      { exercise: "ex-001", sets: 4, reps: 12, rest: 60 },
      { exercise: "ex-005", sets: 3, reps: 10, rest: 60 },
      { exercise: "ex-008", sets: 3, reps: 10, rest: 60 }
    ],
    suitable_for: ["build_muscle"],
    difficulty: 2
  },
  {
    id: "workout-004",
    name: "Lower Body Power",
    description: "Strengthen your legs and improve power with these key exercises.",
    duration: 35,
    exercises: [
      { exercise: "ex-002", sets: 4, reps: 12, rest: 60 },
      { exercise: "ex-007", sets: 3, reps: 10, rest: 60 },
      { exercise: "ex-010", sets: 3, reps: 8, rest: 90 }
    ],
    suitable_for: ["build_muscle", "improve_endurance"],
    difficulty: 3
  },
  {
    id: "workout-005",
    name: "Quick Morning Energizer",
    description: "A short workout to boost your energy and kickstart your day.",
    duration: 15,
    exercises: [
      { exercise: "ex-009", duration: 60, sets: 2, rest: 30 },
      { exercise: "ex-002", sets: 2, reps: 12, rest: 30 },
      { exercise: "ex-001", sets: 2, reps: 10, rest: 30 },
      { exercise: "ex-004", sets: 2, duration: 30, rest: 30 }
    ],
    suitable_for: ["maintain", "improve_endurance"],
    difficulty: 1
  }
];
