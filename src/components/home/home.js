import {Container , Grow, Grid, Paper, AppBar, TextField, Button, Typography} from '@material-ui/core'
import Form from '../form/form';
import Posts from "../posts/posts";
import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MuiChipsInput } from 'mui-chips-input'
import { getPosts } from '../../actions/posts';
import Pagination from "../pagination";
import {getPostsBySearch} from "../../actions/posts";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Home = ({user, setUser, toggle, setToggle})  => {
    const [currentId, setCurrentId] = useState(null);
    const {currentPage} = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useNavigate();
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const query = useQuery();

    const handleChange = (newValue) => {
      setTags(newValue);
      history(currentPage ? `/posts?page=${currentPage}` : "/posts?page=1")
    };
    
    const page = query.get("page");
    const searchQuery = query.get("searchQuery");

    useEffect(() => {
      if(!currentPage || currentPage === 1) {
        dispatch(getPosts());
      };
    }, [toggle, dispatch, currentPage]);
        
      
    const handleKeyDown = (e) => {
      if(e.keyCode === 13) {
        searchPost(); 
      };
    };

    const searchPost = () => {
        if(search.trim() || tags) {
        dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
        history(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
      } else {
        history("/");
      };
      
    };
    

    return (
        <Grow in>
           {user? ( <>
              <Container maxWidth="xl">
              <Grid container className={classes.container} justifyContent="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={8} md={9}>
              <Posts setToggle={setToggle} toggle={toggle} user={user} setUser={setUser} setCurrentId={setCurrentId} ></Posts>
            </Grid>

            <Grid item xs={12} sm={4} md={3}> 
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField name="search" variant='outlined' label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown}></TextField>
                <MuiChipsInput helperText={tags.length > 0 ? "Double click to edit a chip" : ""} clearInputOnBlur value={tags} onChange={handleChange} className={classes.chipInput} label="Search Tags" variant="outlined"/>
                <Button onClick={searchPost} className={classes.searchButton} color="primary" variant='contained'>Search Post</Button>
              </AppBar>

              <Form user={user} setUser={setUser} setCurrentId={setCurrentId} currentId={currentId} setToggle={setToggle} toggle={toggle}></Form>
              
              {(!searchQuery && !tags.length) && (
                <Paper elevation={6}>
                <Pagination elevation={6} page={page} currentId={currentId} toggle={toggle}></Pagination>
              </Paper>
              )}
              
              </Grid>
              </Grid>
              </Container>
              </>) : <div className={classes.signInDiv}>
              <Paper elevation={6} className={classes.paper}>
                <Typography variant='h6' align="center">
                    Please Sign in to Create Post
                </Typography>
              </Paper>
                    </div>}
       </Grow>
    )
}

export default Home;
