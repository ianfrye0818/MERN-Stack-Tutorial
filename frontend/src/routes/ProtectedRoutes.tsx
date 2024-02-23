import { PropsWithChildren, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useRefresh from '../hooks/useRefresh';

export default function ProtectedRoutes({ children }: PropsWithChildren) {
  const { user } = useUser();
  const navigate = useNavigate();

  const refresh = useRefresh();

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);
  return <div>{children}</div>;
}
