export interface WorkoutInterface {
  title: string;
  description?: string;
  reps?: number;
  sets?: number;
  weight?: number;
  rest?: number;
  date: Date;
  user: string;
}

export interface WorkoutDB extends WorkoutInterface {
  _id: string;
}
