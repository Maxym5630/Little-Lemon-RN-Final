import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import theme from '@/components/theme';

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
    <PaperProvider theme={theme}>
      <Stack initialRouteName="profile">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
