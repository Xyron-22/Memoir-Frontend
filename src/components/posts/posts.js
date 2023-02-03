import React from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import Post from './post/post';
import useStyles from './styles';
import { useSelector } from 'react-redux';


const Posts = ({setCurrentId, user, setUser, toggle, setToggle}) => {
    const {posts, isLoading} = useSelector((state) => state.posts);
    const classes = useStyles();

   
    if (!posts.length && !isLoading) {
        return (
            <Typography>
                NO POST MATCHED THE SEARCH
            </Typography>
        )
    }
       
        return ( 
            isLoading ? <CircularProgress></CircularProgress> : (
                <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                    {posts.map((post) => (
                        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
                            <Post setToggle={setToggle} toggle={toggle} user={user} setUser={setUser} post={post} setCurrentId={setCurrentId}></Post>
                        </Grid>
                    ))}
                </Grid>
            )
        );
    
};

export default Posts;