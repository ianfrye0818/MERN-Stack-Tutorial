import axios from 'axios';
import { useUser } from './useUser';
import { useEffect } from 'react';

export default function useRefresh() {
  const { user } = useUser();
  console.log(user);

  const refresh = async () => {
    if (!user?.refreshToken) return;
    try {
      const response = await axios.get('http://localhost:3000/api/auth/refresh-token', {
        data: {
          refreshToken: user.refreshToken,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log('useRefresh error:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Refresh token periodically (e.g., every 15 minutes)
      refresh();
    }, 15 * 60 * 1000); // 15 minutes in milliseconds

    return () => clearInterval(interval);
  }, []);

  return refresh;
}
