import { auth, db } from "@services/firebase/baseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface IAuthContext {
    user: User | null;
    createUser: (email: string, password: string) => void;
    signIn: (email: string, password: string) => void;
    signOut: () => void
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [])

    const createUser = async(email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // Send verification email to the user
            await sendEmailVerification(user);
            console.log("Correo de verificación enviado a:", email);

            // Save user in firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
            });
            console.log("Usuario registrado y guardado en Firestore:", user);

            // The user has successfully registered
            setUser(user)
        } catch (error) {
            console.error("Error creating user:", error)
        }
    }

    const signIn = async(email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            setUser(user)
        } catch (error) {
            console.error("Error logging in as user:", error)
        }
    }

    const signOut = async (auth?: unknown) => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error("Logout error:", error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, createUser, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

