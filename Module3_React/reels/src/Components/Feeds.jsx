import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import {Button} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { firebaseDB, firebaseStorage } from "../config/firebase";
import { v4 as uuidv4 } from 'uuid';

const Feeds = (props) => {
    const {currUser} = useContext(AuthContext);
    const [videoFile, setVideoFile] = useState(null);
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

    const handleInputFile = (e) => {
        let file = e.target.files[0];
        setVideoFile(file);
    }

    const handleUploadFile = async () => {
        try{
            let uid = currUser.uid;
            let uploadVideoObject = firebaseStorage.ref(`/profile/${uid}/${Date.now()}.mp4`).put(videoFile);

            uploadVideoObject.on("state_changed", fun1,fun2,fun3);
            function fun1(snapshot){
                let progress = (snapshot.bytesTransferred/ snapshot.totalBytes ) * 100;
                console.log(progress);
            }   

            function fun2(error){
                console.log(error);
            }

            async function fun3(){
                let videoFileUrl = await uploadVideoObject.snapshot.ref.getDownloadURL();
                console.log(videoFileUrl);
                let pid = uuidv4();

                firebaseDB.collection("posts").doc(pid).set({
                    pid:pid,
                    uid:uid,
                    comments:[],
                    likes:[],
                    videoLink:videoFileUrl,
                });

                let doc = await firebaseDB.collection("users").doc(uid).get();
                let document = doc.data();

                document.postsCreated.push(pid);
                await firebaseDB.collection("users").doc(uid).set(document);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return ( 
        <div>
            <h1>Feeds</h1>
            <button onClick={handleLogOut}>Logout</button>

            <div className="uploadVideo">
                <div>
                    <input type="file" onChange={handleInputFile} />
                    <label>
                        <Button
                            onClick={handleUploadFile}
                            variant="contained"
                            color="secondary"
                            startIcon={<PhotoCamera></PhotoCamera>}
                        >
                            Upload Video
                        </Button>
                        </label>
                </div>
            </div>
        </div>
     );
}
 
export default Feeds;