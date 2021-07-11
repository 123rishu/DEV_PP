import React, { useState, useEffect } from 'react';
import { firebaseAuth } from '../config/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currUser, setCurrUser] = useState(null);

    function login(email, password){
        return firebaseAuth.signInWithEmailAndPassword(email, password);
    }

    function signOut(){
        return firebaseAuth.signOut();
    }

    function signUp(email, password){
        //
    }

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            console.log("Inside auth state changed !!", user);
            setCurrUser(user);
        });
    }, []);

    let value = {
        currUser: currUser,
        signOut: signOut,
        login: login,
        signUp: signUp,
    }

    return ( 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

     );
}
 
