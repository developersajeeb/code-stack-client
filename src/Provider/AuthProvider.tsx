import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const createUser = (email: string | number, password: string | number) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singIn = (email: string | number, password: string | number) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    const googleSingIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    const githubSingIn = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider)
    }

    const ResetPassword = (email: string) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email)
    }

    const updateUserProfile = (name: string, photo: string) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
            console.log('now user', currentUser);
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        createUser,
        singIn,
        loading,
        logOut,
        googleSingIn,
        githubSingIn,
        ResetPassword,
        updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;