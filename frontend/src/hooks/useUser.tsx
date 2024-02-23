import { useContext } from 'react';
import { AuthContext } from '../context/AuthProviderContext';

//create useUser hook
export function useUser() {
  const { user, setUser } = useContext(AuthContext);
  const loading = user === undefined;
  const isSignedIn = user !== null;
  return { loading, isSignedIn, user, setUser };
}
