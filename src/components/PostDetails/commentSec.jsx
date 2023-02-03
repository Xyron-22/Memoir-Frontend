import React, {useState, useRef} from "react";
import {Typography, TextField, Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import jwt_decode from "jwt-decode";
import {commentPost} from "../../actions/posts";

import useStyles from "./styles";

const CommentSection = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState([post?.comments]);
    const [comment, setComment] = useState("");
    const commentsRef = useRef();

    
    const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_USER));
    
    
    const handleClick = async () => {
        let finalComment;
        
        if(user.result) {
            finalComment = `${user.result.name}: ${comment}`;
        } else {
            const decoded = jwt_decode(user.credential);
            finalComment = `${decoded.name}: ${comment}`;
        }
        const newComment = await dispatch(commentPost(finalComment, post._id));
        setComments([newComment]);
        setComment("");
        // commentsRef.current.scrollIntoView({behavior: "smooth"});
    };
    

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments[0].map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            {c}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {user && (<div style={{width: "70%"}}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)}></TextField>
                    <Button style={{marginTop: "10px"}} fullWidth disabled={!comment} variant="contained" onClick={handleClick} color="primary">Comment</Button>
                </div>)}
            </div>
        </div>
    );
};

export default CommentSection;