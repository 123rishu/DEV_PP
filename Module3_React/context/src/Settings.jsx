import React, { useContext } from 'react';
import {ThemeContext} from "./App";

const Settings = () => {

    const theme = useContext(ThemeContext);// vo value yha se access ho jayegi

    const styles = {
        backgroundColor: theme ? "lightgray" : "black",
        color: theme ? "black" : "white",
        padding: "2rem",
        margin: "2rem",
    };

    return ( 
        <div style={styles}>
            Settings Component
        </div>
     );
}
 
export default Settings;