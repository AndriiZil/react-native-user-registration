import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import { createUser } from '../util/auth';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);

    try {
      const token = await createUser(email, password);

      authCtx.authenticate(token);
    } catch (err) {
      Alert.alert(
        'Authentication Failed',
        'Could not create user, please try again later'
      )
    }

    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user...' />;
  }
  
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
