import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import moment from 'moment';
import {Buffer} from "buffer";
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';

const Post = (props) => {
    const {post, setCurrentId, user, toggle, setToggle} = props;
    const base64String = Buffer.from(post.selectedFile.data.data).toString("base64");
    const dispatch = useDispatch();
    const history = useNavigate();
    const [likes, setLikes] = useState([post.likes]);

    const postLike = () => {
        dispatch(likePost(post._id));
        if (post.likes.find((like) => like === (user?.sub || user?._id))) {
            setLikes(post.likes.filter((like) => like !== (user?.sub || user?._id)));
        } else {
            setLikes([...post.likes, (user?.sub || user?._id)]);
        }
    };
       
    
    const Likes = () => {
          if(likes.length > 0) {
              
              return likes.find((like) => like === (user?.sub || user?._id))
              ? (
                  <>
                <ThumbUpAltIcon fontSize='small'></ThumbUpAltIcon> &nbsp;
                {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
                </>
            ) : (
                <>
                <ThumbUpAltOutlinedIcon fontSize='small'></ThumbUpAltOutlinedIcon> &nbsp;
                {likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            )
        }
        return <><ThumbUpAltOutlinedIcon fontSize='small'></ThumbUpAltOutlinedIcon>&nbsp;Like</>
    };
    
    const openPost = () => {
        history(`/posts/${post._id}`);
    };

    return (
        <Card raised elevation={6} style={{ 
        display: "flex", 
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative'}}>
            <ButtonBase onClick={openPost} style={{display: "block"}}>
            <CardMedia style={{height: "200px", objectFit: "cover"}} component="img" src={`data:image/png;base64, ${base64String}`} title={post.title}></CardMedia>
            
            <div style={{  position: 'absolute',top: '20px',left: '20px',color: 'white',}}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            </ButtonBase>
            {(user?._id === post?.creator || user?.sub === post?.creator) && (
                <div style={{position: 'absolute',top: '20px',right: '5px',color: 'white',}}>
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="medium"></MoreHorizIcon>
                </Button>
            </div>
            )}
            <ButtonBase onClick={openPost} style={{display: "block"}}>
            <div style={{display: 'flex',justifyContent: 'space-between',margin: '5px 10px', overflow: "hidden"}}>
                <Typography variant="body2" color='textSecondary'>{post.tags.map((tag) => `#${tag}`)}</Typography>
            </div>
            <CardContent style={{height: "7vh", overflow: "hidden"}}>
            <Typography style={{display: "flex"}} variant="h4">{post.title}</Typography>
            <Typography style={{display: "flex", whiteSpace: "pre-line"}} variant="body2" gutterBottom>{post.message.length >= 76 ? `${post.message.slice(0, 75)} ...see more` : post.message}</Typography>
            </CardContent>
            </ButtonBase>
            <CardActions style={{  padding: '0 16px 8px 16px',display: 'flex',justifyContent: 'space-between',}}>
                <Button size="small" color="primary" disabled={!user} onClick={postLike}>
                    <Likes></Likes>
                </Button>
                {(user?._id === post?.creator || user?.sub === post?.creator) && (
                    <Button size="small" color='primary' onClick={() => {
                        dispatch(deletePost(post._id))
                        setToggle(!toggle);}}>
                            
                    <DeleteIcon fontSize="small"></DeleteIcon>
                    &nbsp; Delete &nbsp;
                </Button>
                )}
                
            </CardActions>
        </Card>
        
    );
};

export default Post;