import React, { useEffect, useState } from "react";
import { firebaseDB } from "../config/firebase";
import { Card, CardHeader, CardActions, CardContent, CardMedia, Button, makeStyles, Typography, TextField, Avatar, Container } from "@material-ui/core";

const VideoPosts = (props) => {
    const [userObjOfThisPostObj, setUser] = useState(null);
    const [commentList, setCommentList] = useState([]);

    useEffect(async () => {
        console.log(props);
        let uid = props.postObj.uid;
        let doc = await firebaseDB.collection("users").doc(uid).get();
        let user = doc.data();
        let commentList = props.postObj.comments;//[{uid, comment}, {uid, comment}]

        let updatedCommentsList = [];//[{profileImageUrl, comment}, {profileImageUrl, comment} ]

        for (let i = 0; i < commentList.length; i++) {
            let objOfCurrComment = commentList[i];
            let doc = await firebaseDB.collection("users").doc(uid).get();
            let commentUserPic = doc.data().profileImageUrl;
            updatedCommentsList.push({ commentUserPic: commentUserPic, comment: objOfCurrComment.comment });
        }

        setUser(user);
        setCommentList(updatedCommentsList);
    }, []);

    return (
        <Container>
            <Card style={{ height: "600px", width: "600px" }}>
                <Avatar src={userObjOfThisPostObj ? userObjOfThisPostObj.profileImageUrl : ""}></Avatar>
                <Typography variant="span">{userObjOfThisPostObj ? userObjOfThisPostObj.username : ""}</Typography>
                <div className="video-container">
                    <Video src={props.postObj.videoLink}></Video>
                </div>
                <Typography variant="p">Comments</Typography>
                <TextField variant="outlined" label="Add a comment" size="small"></TextField>
                <Button variant="contained" color="secondary">Post</Button>

                {
                    commentList.map((currCommentObj)=>{
                        return (<>
                            <Avatar src={currCommentObj.commentUserPic}></Avatar>
                            <Typography variant="p">{currCommentObj.comment}</Typography>
                            </>
                        )
                    })
                }

            </Card>
        </Container>
    );
}

function Video(props) {
    return (
        <video
            style={{
                height: "30vh",
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

