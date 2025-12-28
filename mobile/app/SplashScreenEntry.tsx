import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import SplashScreen from './SplashScreen';

export default function SplashScreenEntry() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/Login');
    }, 2000); // Show splash for 2 seconds
    return () => clearTimeout(timeout);
  }, [router]);

  return <SplashScreen />;
}
