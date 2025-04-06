import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    MarkaziText: require('../assets/fonts/MarkaziText-Regular.ttf'),
    Karla: require('../assets/fonts/Karla-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // скрыть splash, когда шрифты готовы
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // или SplashScreen
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
    </Stack>
  );
}
