import {useSignIn} from '@clerk/clerk-expo';
import {useRouter} from 'expo-router';
import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import CommonTextInput from '../../components/CommonTextInput';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Drawable} from '../../utilities/Drawables';
import CommonButton from '../../components/buttons/CommonButton';
import TextButton from '../../components/buttons/TextButton';
import TextBody from '../../components/texts/TextBody';
import TextTitle from './../../components/texts/TextTitle';
import CommonIconButton from '../../components/buttons/CommonIconButton';

export default function Page() {
  const {signIn, setActive, isLoaded} = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureText, setSecureText] = useState(true);

  // Initialize LogRocket
  //  React.useEffect(() => {
  //   LogRocket.init('krxybv/foodzie');
  //  }, []);

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({session: signInAttempt.createdSessionId});
        router.replace('/');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flexGrow: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 16,
          height: '100%',
          padding: 16,
        }}>
        <Image
          source={Drawable.SignIn}
          resizeMode="contain"
          style={styles.imageContainer}
        />

        <View style={styles.contentContainer}>
          {/* Email Input */}
          <CommonTextInput
            label="Entrer your email"
            placeholder="example@samvaad.com"
            value={emailAddress}
            autoCapitalize="none"
            secureText={false}
            onPress={() => {}}
            extraStyle={{}}
            outlineStyle={{}}
            dense={false}
            onChangeText={input => setEmailAddress(input)}
          />
          {/* Password Input */}
          <View style={{gap: 4}}>
            <CommonTextInput
              label="Entrer your password"
              placeholder="Foodzie@123"
              value={password}
              autoCapitalize="none"
              secureText={secureText}
              rightIcon={secureText ? 'eye' : 'eye-off'}
              onPress={() => {
                setSecureText(!secureText);
              }}
              extraStyle={{}}
              outlineStyle={{}}
              dense={false}
              onChangeText={input => setPassword(input)}
            />
            {/* Forgot Password Button */}
            <View style={{alignItems: 'flex-end'}}>
              <TextButton
                label="Forgot Password?"
                onPress={() => {
                  router.push('/forgot-password');
                }}
                extraStyle={{marginRight: 0}}
              />
            </View>
          </View>
          {/* Sign In Button */}
          <CommonButton
            mode="contained"
            label="Sign In"
            onPress={onSignInPress}
            extraStyle={{}}
            extraLabelStyle={{}}
          />
        </View>
        {/* Social Sign In Button */}
        <View style={styles.contentContainer}>
          <TextTitle
            variant="Medium"
            text="Or sign in with social account"
            extraTextStyle={{textAlign: 'center'}}
            lines={2}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 8,
            }}>
            {/* Google Sign In Button */}
            <CommonIconButton
              mode=""
              icon={Drawable.Google}
              iconSize={24}
              iconColor=""
              onPress={() => {}}
              contentStyle={{}}
              extraStyle={{}}
            />
            {/* Facebook Sign In Button */}
            <CommonIconButton
              mode=""
              icon={Drawable.Facebook}
              iconSize={24}
              iconColor=""
              onPress={() => {}}
              contentStyle={{}}
              extraStyle={{}}
            />
            {/* Apple Sign In Button */}
            <CommonIconButton
              mode=""
              icon={Drawable.Apple}
              iconSize={24}
              iconColor=""
              onPress={() => {}}
              contentStyle={{}}
              extraStyle={{}}
            />
          </View>
        </View>
        {/* App Policy Section */}
        <View style={styles.contentContainer}>
          {/* Go to Sign Up Button */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}>
            <TextBody
              variant="Large"
              text="Do not have an account ?"
              extraTextStyle={{textAlign: 'center'}}
              lines={1}
            />
            <TextButton
              label="Sign Up"
              onPress={() => {
                router.replace('/sign-up');
              }}
              extraStyle={{marginRight: 0}}
            />
          </View>
          <TextBody
            variant="Small"
            text="By signing in, you agree to our Terms of Service and Privacy Policy."
            extraTextStyle={{textAlign: 'center'}}
            lines={2}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: '52%',
    width: 'auto',
    resizeMode: 'cover',
  },
  contentContainer: {
    gap: 16,
    justifyContent: 'center',
  },
});
