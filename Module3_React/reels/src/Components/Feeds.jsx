import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const Feeds = (props) => {
    const {signOut} = useContext(AuthContext);


    const handleLogOut = async () => {
        try{
            await signOut();
            props.history.push("/login");
        }
        catch(err){
            console.log(err);
        }
    }

    return ( 
        <>

            <h1>Feeds</h1>

            <button onClick={handleLogOut}>Logout</button>
        </>
     );
}
 
export default Feeds;