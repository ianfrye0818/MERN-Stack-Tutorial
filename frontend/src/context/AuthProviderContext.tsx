import {
  PropsWithChildren,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

export const AuthContext = createContext<AuthContextType>({ user: null, setUser: () => null });

export type AuthContextType = {
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export type User = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  workouts?: string[];
  isAdmin: boolean;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  token: string;
  refreshToken: string;
};

export default function AuthProviderContext({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('workoutUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('workoutUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('workoutUser');
    }
  }, [user]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
