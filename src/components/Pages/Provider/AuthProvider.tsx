import { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../../firebase/firebase.config';
export const AuthContext = createContext(null)

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(true)
    const googleProviderSingIn = new GoogleAuthProvider()
    const gitProviderSingIn = new GithubAuthProvider()
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleProvider = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProviderSingIn)
    }
    const gitProvider = () => {
        setLoading(true)
        return signInWithPopup(auth, gitProviderSingIn)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    const updateUserData = (name, photo,email) => {
        return  updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photo,
            email:email

        })
     
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, loggedUser => {
            console.log('logged in user inside auth state observe', loggedUser);
            setUser(loggedUser)
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    }, [])


    const authInfo = {
        user,
        createUser,
        singIn,
        googleProvider,
        gitProvider,
        logOut,
        loading,
        updateUserData
        

    }


    return (
        <>

            <AuthContext.Provider value={authInfo}>

                {children}

            </AuthContext.Provider>

        </>
    );
};

export default AuthProvider;