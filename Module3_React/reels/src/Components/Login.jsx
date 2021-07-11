import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const {login} = useContext(AuthContext);

    async function handleLogin(e){
        //email, password
        try{
            await login(email, password);
            props.history.push("/");
        }
        catch(err){
            setMessage(err.message);
            setEmail("");
            setPassword("");
        }
    }

    return ( <>
        <h1>Login Page</h1>
        
        <div>
            Email
            <input 
            type="text"
            value={email}
            onChange={(e)=>{setEmail(e.target.value);}}
             />
        </div>

        <div>
            Password
            <input 
            type="text"
            value={password}
            onChange={(e)=>{setPassword(e.target.value);}} 
            />
        </div>

        <button onClick={handleLogin}>Login</button>

        <h2 style={{color:"red"}}>{message}</h2>

        </>
     );
}
 
export default Login;