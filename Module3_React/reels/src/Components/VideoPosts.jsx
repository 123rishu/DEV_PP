import React, { useContext, useEffect, useState } from "react";
import { firebaseDB } from "../config/firebase";
import { Card, CardHeader, CardActions, CardContent, CardMedia, Button, makeStyles, Typography, TextField, Avatar, Container } from "@material-ui/core";
import { AuthContext } from "../context/AuthProvider";

const VideoPosts = (props) => {
    const [userObjOfThisPostObj, setUser] = useState(null);
    const [commentList, setCommentList] = useState([]);
    const [currComment, setComment] = useState("");
    const { currUser } = useContext(AuthContext);

    async function handlePostAComment(){
        let uidOfCurrLiveUser = currUser.uid;
        let doc = await firebaseDB.collection("users").doc(uidOfCurrLiveUser).get();
        let dataObjOfCurrLiveUser = doc.data();
        let profilePicUrlOfLiveUser = dataObjOfCurrLiveUser.profileImageUrl;

        //updated comment list for db 
        let lastestCommentObj = {
            uid: uidOfCurrLiveUser,
            comment: currComment,
        }

        let pidOfCurrPostObj = props.postObj.pid;
        let doc2 = await firebaseDB.collection("posts").doc(pidOfCurrPostObj).get();
        let document = doc2.data();

        document.comments.push(lastestCommentObj);

        await firebaseDB.collection("posts").doc(pidOfCurrPostObj).set(document);

        //updated comment list for this component [{profilePic, Comment}]
        let updatedCommentsList = commentList;
        updatedCommentsList.push({ commentUserPic: profilePicUrlOfLiveUser, comment: currComment });
        setComment("");
        setCommentList(updatedCommentsList);
    }

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
                <TextField
                    label="Add a comment"
                    type="text"
                    variant="outlined"
                    value={currComment}
                    size="small"
                    onChange={(e) => setComment(e.target.value)}
                ></TextField>
                <Button variant="contained" color="secondary" onClick={handlePostAComment}>Post</Button>

                {
                    commentList.map((currCommentObj) => {
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
                height: "3vh",
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

