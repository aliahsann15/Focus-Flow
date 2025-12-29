import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import SplashScreen from './SplashScreen';
import { useAuth } from '@/context/AuthContext';

export default function SplashScreenEntry() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const timeout = setTimeout(() => {
        router.replace('/(tabs)');
      }, 2000); // Show splash for 2 seconds
      return () => clearTimeout(timeout);
    }
    else {
      const timeout = setTimeout(() => {
        router.replace('/Login');
      }, 2000); // Show splash for 2 seconds
      return () => clearTimeout(timeout);
    }
  }, [router, user]);

  return <SplashScreen />;
}
