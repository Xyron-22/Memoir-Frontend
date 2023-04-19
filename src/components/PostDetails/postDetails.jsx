import React, {useEffect} from "react";
import {Paper, Typography, CircularProgress, Divider} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { Buffer } from 'buffer';
import {getPost, getPostsBySearch} from "../../actions/posts";
import CommentSection from "./commentSec";

import useStyles from "./styles";



const PostDetails = () => {
    const {post, posts, isLoading} = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useNavigate();
    const {id} = useParams();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);

    useEffect(() => {
      dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",")}));
    }, [post, dispatch]);
    
                    
    if(!post) return null;
                
    const base64String = Buffer.from(post.selectedFile.data.data).toString("base64");
    
    if(isLoading) {
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em"></CircularProgress>
        </Paper>
    };

    const recommendedPost = posts.filter(({_id}) => _id !== post._id);
    
    function openPost(_id) {
      history(`/posts/${_id}`);
    };

    return (
        <Paper className={classes.postDetailsPaper} elevation={6}>
            <div className={classes.card}>
            <div className={classes.section}>
              <Typography variant="h3" component="h2">{post.title}</Typography>
              <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
              <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
              <Typography variant="h6">Created by: {post.name}</Typography>
              <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
              <Divider className={classes.divider} />
              <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
              <Divider className={classes.divider} />
              <CommentSection post={post} id={id}></CommentSection>
              <Divider className={classes.divider} />
            </div>
            <div className={classes.imageSection}>
              <img className={classes.media} src={`data:image/png;base64, ${base64String}`} alt={post.title} />
            </div>
          </div>
          {recommendedPost.length ? (
              <div className={classes.section}>
              <Typography gutterBottom variant="h5">You Might Also Like</Typography>
              <Divider></Divider>
              <div className={classes.recommendedPosts}>
                {recommendedPost.map(({title, likes, name, selectedFile, _id, message}) => {
                  const otherPost = Buffer.from(selectedFile.data.data).toString("base64")
                  return (
                  <div className={classes.recommendPostDiv} onClick={() => openPost(_id)} key={id}>
                    <Typography gutterBottom variant="h6">{title}</Typography>
                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                    <Typography gutterBottom variant="subtitle1">{likes.length}</Typography>
                    <img className={classes.recommendPostImage} src={`data:img/png;base64, ${otherPost}`} alt="this is an alternative"></img>
                  </div>
                  )
                })}
              </div>
            </div>
          ) : null}
        </Paper>
    );   
}

export default PostDetails;