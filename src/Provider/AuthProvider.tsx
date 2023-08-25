import { ReactNode, createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";

interface AuthContextType {
    user: User | null;
    signIn: () => void;
    logOut: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
const auth = getAuth(app);

const AuthProviders: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const createUser = (email: string, password: string) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singIn = (email: string, password: string) => {
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
        const currentUser = auth.currentUser;

        if (currentUser) {
            return updateProfile(currentUser, {
                displayName: name,
                photoURL: photo
            });
        } else {
            console.error("No user is currently logged in.");
            return null;
        }
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