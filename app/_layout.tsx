import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Stack } from 'expo-router'
import * as Sentry from '@sentry/react-native';

const NavigationLayout = () => {
  const { isSignedIn = false } = useAuth()
  
  Sentry.init({
  dsn: "https://88470f0839102d2d90719b4c46236279@o4510333821714432.ingest.de.sentry.io/4510333868245072",
  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,
});

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)/sign-in" />
        <Stack.Screen name="(auth)/sign-up" />
      </Stack.Protected>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(home)/index" />
      </Stack.Protected>
    </Stack>
  )
}

export default Sentry.wrap(function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <NavigationLayout/>
    </ClerkProvider>
  )
});