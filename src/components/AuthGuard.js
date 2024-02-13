// components/AuthGuard.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthGuard = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('api_token');

    if (!token) {
      return;
      // router.push('/signin');
    } 
    router.push('/');
  }, [router]);

  return children;
};

export default AuthGuard;
