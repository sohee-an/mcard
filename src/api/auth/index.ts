// firebaseAuthService.ts
import { auth } from '@remote/firebase';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

export const firebaseAuthService = {
  signin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  },
};
