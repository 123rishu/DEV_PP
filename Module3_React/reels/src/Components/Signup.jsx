import React, { useState, useEffect, useContext } from 'react';
import { firebaseDB, firebaseStorage } from '../config/firebase';
import { AuthContext } from '../context/AuthProvider';

const Signup = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const {signUp} = useContext(AuthContext);


    const handleFileSubmit = (e) => {
        let fileObject = e.target.files[0];
        setProfileImage(fileObject);
    }

    const handleSignUp = async () => {
        try{
            let response = await signUp(email, password);
            console.log(response);
            let uid = response.user.uid;
            //you are signed up
             
            //storing profile image inside firestore
            const uploadPhotoObject = firebaseStorage.ref(`/profile/${uid}/image.jpg`).put(profileImage);
            //console.log(uploadPhotoObject);

            //special event on uploadPhotoObj to track the progress of the upload and to perform operations accordingly
            uploadPhotoObject.on("state_changed", fun1, fun2, fun3);
            //to track progress of the upload
            function fun1(snapshot){
                //bytes transferred
                //total bytes
                let progress = (snapshot.bytesTransferred/ snapshot.totalBytes ) * 100;
                console.log(progress);
            }
            //indicates ans error if any
            function fun2(error){
                console.log(error);
            }
            //it indicates success of the upload
            async function fun3(){
                let profileImageUrl = await uploadPhotoObject.snapshot.ref.getDownloadURL();
                //db me collection => document => {username, email, userId, profileImageUrl}

                //creating a collection in firebase Db
                firebaseDB.collection("users").doc(uid).set({
                    email:email,
                    userId:uid,
                    username: username,
                    profileImageUrl: profileImageUrl
                });

                //after signing up, go to feeds page
                props.history.push("/");
            }
        }
        catch(err){
            setMessage(err.message);            
        }
    }

    return ( 
        <>
            <h1>SignUp Page</h1>

            <div>
                Username
                <input 
                value={username}
                onChange={(e)=>{setUsername(e.target.value);}}
                 />
            </div>

            <div>
                Email
                <input 
                value={email}
                onChange={(e)=>{setEmail(e.target.value);}}
                 />
            </div>

            <div>
                Password             
                <input 
                value={password}
                onChange={(e)=>{setPassword(e.target.value);}}
                 />
            </div>

            <div>
                Profile Image            
                <input 
                type="file"
                accept="image/*"
                onChange={(e) => {
                    handleFileSubmit(e);
                }}
                 />
            </div>

            <button onClick={handleSignUp}>SignUp</button>
            <h2 style={{color:"red"}}>{message}</h2>

        </>
     );
}
 
export default Signup; 