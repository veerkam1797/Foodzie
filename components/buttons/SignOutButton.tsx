import {useClerk} from '@clerk/clerk-expo';
import {useRouter} from 'expo-router';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const {signOut} = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/(auth)');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleAccountDeletion = async () => {
    // try {
    //   await 
    //     router.replace('/(auth)');
    // } catch (err) {
    //   console.error(JSON.stringify(err, null, 2));
    // }
  };

  return (
    <View style={{gap: 16}}>
      <Button mode="contained" onPress={handleSignOut}>
        Sign out
      </Button>
      <Button mode="outlined" onPress={handleAccountDeletion}>
        Delete Account
      </Button>
    </View>
  );
};
