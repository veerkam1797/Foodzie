import {ClerkProvider, useAuth} from '@clerk/clerk-expo';
import {tokenCache} from '@clerk/clerk-expo/token-cache';
import {Stack} from 'expo-router';
import * as Sentry from '@sentry/react-native';
import {useFonts} from 'expo-font';
import {StatusBar} from 'expo-status-bar';
import {useColorScheme} from 'react-native';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import {Colors} from '../constant/Colors';
import merge from 'deepmerge';

const CustomLightColours = {...MD3LightTheme, colors: Colors.light};
const CustomDarkColours = {...MD3DarkTheme, colors: Colors.dark};

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, CustomLightColours);
const CombinedDarkTheme = merge(DarkTheme, CustomDarkColours);

const NavigationLayout = () => {
  const colorScheme = useColorScheme();
  const {isSignedIn = false} = useAuth();

  const paperTheme =
    colorScheme === 'dark' ? {...CombinedDarkTheme} : {...CombinedLightTheme};

  const [loaded] = useFonts({
    PoppinsBlack: require('../assets/fonts/Poppins-Black.ttf'),
    PoppinsExtrabold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    PoppinsThin: require('../assets/fonts/Poppins-Thin.ttf'),
    PoppinsExtraLight: require('../assets/fonts/Poppins-ExtraLight.ttf'),
    PoppinsItalic: require('../assets/fonts/Poppins-Italic.ttf'),
  });

  Sentry.init({
    dsn: 'https://88470f0839102d2d90719b4c46236279@o4510333821714432.ingest.de.sentry.io/4510333868245072',
    // Adds more context data to events (IP address, cookies, user, etc.)
    // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
    sendDefaultPii: true,
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Protected guard={!isSignedIn}>
            <Stack.Screen name="(auth)/sign-in" />
            <Stack.Screen name="(auth)/sign-up" />
          </Stack.Protected>
          <Stack.Protected guard={isSignedIn}>
            <Stack.Screen name="(home)/index" />
          </Stack.Protected>
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
};

export default Sentry.wrap(function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <NavigationLayout />
      {/* <StatusBar style="auto" /> */}
    </ClerkProvider>
  );
});
