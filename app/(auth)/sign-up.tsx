import {useSignUp} from '@clerk/clerk-expo';
import {Link, useRouter} from 'expo-router';
import {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextBody from '../../components/texts/TextBody';
import TextButton from '../../components/buttons/TextButton';
import CommonButton from '../../components/buttons/CommonButton';
import CommonTextInput from '../../components/CommonTextInput';
import {Drawable} from '../../utilities/Drawables';
import React from 'react';
import TextTitle from '../../components/texts/TextTitle';

export default function SignUpScreen() {
  const {isLoaded, signUp, setActive} = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({strategy: 'email_code'});

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({session: signUpAttempt.createdSessionId});
        router.replace('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <>
        <TextTitle
          variant="Large"
          text="Verify your email address"
          extraTextStyle={{textAlign: 'center'}}
          lines={1}
        />
        <CommonTextInput
          label="Enter verification code"
          placeholder="123456"
          value={code}
          autoCapitalize="none"
          secureText={false}
          onPress={() => {}}
          extraStyle={{}}
          outlineStyle={{}}
          dense={false}
          onChangeText={input => setCode(input)}
        />
        <CommonButton
          mode="contained"
          label="Verify"
          onPress={onVerifyPress}
          extraStyle={{}}
          extraLabelStyle={{}}
        />
      </>
    );
  }

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
          source={Drawable.SignUp}
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
                  router.replace('/forgot-password');
                }}
                extraStyle={{marginRight: 0}}
              />
            </View>
          </View>
          {/* Sign Up Button */}
          <CommonButton
            mode="contained"
            label="Sign Up"
            onPress={onSignUpPress}
            extraStyle={{}}
            extraLabelStyle={{}}
          />
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
              text="Already have an account ?"
              extraTextStyle={{textAlign: 'center'}}
              lines={1}
            />
            <TextButton
              label="Sign In"
              onPress={() => {
                router.push('/sign-in');
              }}
              extraStyle={{marginRight: 0}}
            />
          </View>
          <TextBody
            variant="Small"
            text="By signing up, you agree to our Terms of Service and Privacy Policy."
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
