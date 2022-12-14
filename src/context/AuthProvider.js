import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    //sending auth to the RightSideNav
    const providerLogin = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    //to get current login user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('inside auth state change', currentUser);
            if (currentUser === null || currentUser.emailVerified) {
                setUser(currentUser);
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    //Register
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //Login
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //update profile info(get name and photoURL)
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }

    //verify email
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }

    //Logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        user, loading,
        setLoading, providerLogin, logOut, createUser, signIn, updateUserProfile, verifyEmail
    };
    return (

        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;