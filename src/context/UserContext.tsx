
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type FitnessGoal = 'lose_weight' | 'build_muscle' | 'maintain' | 'improve_endurance' | '';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' | '';
export type Gender = 'male' | 'female' | 'other' | '';

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  targetWeight: number; // in kg
  activityLevel: ActivityLevel;
  fitnessGoal: FitnessGoal;
  dailyCalories: number;
  dailyProtein: number; // in grams
  dailyCarbs: number; // in grams
  dailyFat: number; // in grams
}

export interface ProgressEntry {
  date: string; // ISO date string
  weight: number;
  calories: number;
  workoutCompleted: boolean;
  workoutDuration: number; // in minutes
  notes: string;
}

interface UserContextType {
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  isProfileComplete: boolean;
  progressHistory: ProgressEntry[];
  addProgressEntry: (entry: ProgressEntry) => void;
  calculateDailyNeeds: () => void;
}

const defaultUserProfile: UserProfile = {
  name: '',
  age: 30,
  gender: '',
  height: 170,
  weight: 70,
  targetWeight: 70,
  activityLevel: '',
  fitnessGoal: '',
  dailyCalories: 2000,
  dailyProtein: 140,
  dailyCarbs: 250,
  dailyFat: 55
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : defaultUserProfile;
  });

  const [progressHistory, setProgressHistory] = useState<ProgressEntry[]>(() => {
    const savedProgress = localStorage.getItem('progressHistory');
    return savedProgress ? JSON.parse(savedProgress) : [];
  });

  const isProfileComplete = Boolean(
    userProfile.name && 
    userProfile.gender && 
    userProfile.age > 0 && 
    userProfile.height > 0 && 
    userProfile.weight > 0 && 
    userProfile.activityLevel && 
    userProfile.fitnessGoal
  );

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('progressHistory', JSON.stringify(progressHistory));
  }, [progressHistory]);

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };

  const addProgressEntry = (entry: ProgressEntry) => {
    setProgressHistory(prev => [entry, ...prev]);
  };

  // Calculate daily calorie and macronutrient needs
  const calculateDailyNeeds = () => {
    const { gender, weight, height, age, activityLevel, fitnessGoal } = userProfile;

    // Calculate Basal Metabolic Rate (BMR)
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      // For non-binary, use average of male and female formulas
      bmr = 10 * weight + 6.25 * height - 5 * age - 78;
    }

    // Apply activity multiplier
    let activityMultiplier = 1.2; // Default to sedentary
    switch (activityLevel) {
      case 'sedentary': activityMultiplier = 1.2; break;
      case 'light': activityMultiplier = 1.375; break;
      case 'moderate': activityMultiplier = 1.55; break;
      case 'active': activityMultiplier = 1.725; break;
      case 'very_active': activityMultiplier = 1.9; break;
    }

    // Calculate Total Daily Energy Expenditure (TDEE)
    let tdee = bmr * activityMultiplier;

    // Adjust based on fitness goal
    let dailyCalories = tdee;
    switch (fitnessGoal) {
      case 'lose_weight': dailyCalories = tdee * 0.8; break; // 20% deficit
      case 'build_muscle': dailyCalories = tdee * 1.1; break; // 10% surplus
      case 'maintain': dailyCalories = tdee; break;
      case 'improve_endurance': dailyCalories = tdee * 1.05; break; // 5% surplus
    }

    // Calculate macronutrients
    let dailyProtein = 0;
    let dailyFat = 0;
    let dailyCarbs = 0;

    switch (fitnessGoal) {
      case 'lose_weight':
        dailyProtein = weight * 2.0; // Higher protein for muscle preservation
        dailyFat = (dailyCalories * 0.25) / 9;
        break;
      case 'build_muscle':
        dailyProtein = weight * 2.2; // High protein for muscle building
        dailyFat = (dailyCalories * 0.25) / 9;
        break;
      case 'maintain':
        dailyProtein = weight * 1.6;
        dailyFat = (dailyCalories * 0.30) / 9;
        break;
      case 'improve_endurance':
        dailyProtein = weight * 1.4; // Moderate protein
        dailyFat = (dailyCalories * 0.25) / 9;
        break;
      default:
        dailyProtein = weight * 1.6;
        dailyFat = (dailyCalories * 0.30) / 9;
    }

    // Calculate carbs based on remaining calories
    const proteinCalories = dailyProtein * 4;
    const fatCalories = dailyFat * 9;
    dailyCarbs = (dailyCalories - proteinCalories - fatCalories) / 4;

    // Update user profile with calculated values (rounded)
    updateUserProfile({
      dailyCalories: Math.round(dailyCalories),
      dailyProtein: Math.round(dailyProtein),
      dailyCarbs: Math.round(dailyCarbs),
      dailyFat: Math.round(dailyFat)
    });
  };

  return (
    <UserContext.Provider value={{ 
      userProfile, 
      updateUserProfile,
      isProfileComplete,
      progressHistory,
      addProgressEntry,
      calculateDailyNeeds
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
