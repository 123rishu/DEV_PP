import React, { useEffect, useState } from "react";
import { firebaseDB } from "../config/firebase";
import { Card, CardHeader, CardActions, CardContent, CardMedia, Button, makeStyles, Typography, TextField, Avatar, Container } from "@material-ui/core";

const VideoPosts = (props) => {
    const [userObjOfThisPostObj, setUser] = useState(null);

    useEffect(() => {
        console.log(props);
        let uid = props.postObj.uid;
        firebaseDB.collection("users").doc(uid).get().then((doc) => {
            setUser(doc.data());
        });
    }, []);

    return (
        <Container>
            <Card style={{ height: "600px", width: "300px" }}>
                <Avatar src={userObjOfThisPostObj ? userObjOfThisPostObj.profileImageUrl : ""}></Avatar>
                <Typography variant="span">{userObjOfThisPostObj ? userObjOfThisPostObj.username : ""}</Typography>
                <div className="video-container">
                    <Video src={props.postObj.videoLink}></Video>
                </div>
            </Card>
        </Container>
    );
}

function Video(props) {
    return (
        <video
            style={{
                height: "80vh",
                margin: "5rem",
                border: "1px solid black"
            }}
            muted={true}
            loop={true}
            controls
        >
            <source src={props.src} type="video/mp4"></source>
        </video>
    )
}

export default VideoPosts;

