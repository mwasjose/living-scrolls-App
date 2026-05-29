import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createUserProfile } from '@/services/userService';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signInWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
export const registerWithEmail = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
export const registerWithEmailAndProfile = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const displayName = email.split('@')[0];
  await Promise.all([
    createUserProfile(userCredential.user.uid, displayName, email),
    updateProfile(userCredential.user, { displayName }),
  ]);
  return userCredential;
};
export const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);
export const signOutUser = () => auth.signOut();
