import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';


const Form = ({currentId, setCurrentId, setToggle, toggle, user}) => {
    
    const {posts} = useSelector((state) => state.posts);
    const foundId = currentId ? posts.find((p) => p._id === currentId) : null;
    const classes = useStyles();
    const history = useNavigate();
    const dispatch = useDispatch();
         

    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });

    useEffect(() => {
        if(foundId) {
            setPostData(foundId);
        }
    }, [user, foundId]);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId) {
            dispatch(updatePost(currentId, {...postData, name: user.name}));
        } else if (postData.title === "" || postData.message === "" || postData.tags === "" || postData.selectedFile === "") {
            return null;
        } else {
            const formData = new FormData();
            formData.append("title", postData.title);
            formData.append("message", postData.message);
            formData.append("tags", postData.tags);
            formData.append("upload_image", postData.selectedFile);
            formData.set("name", user.name);
            dispatch(createPost(formData, history));
            setToggle(!toggle);
        }
        clear();
    };


    const clear = () => {
        setCurrentId(null);
        setPostData({
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
        });
        
    };
    

        return (

            <Paper elevation={6} className={classes.paper}>
                <form  encType="multipart/form-data" autoComplete='off' noValidate className={classes.form} onSubmit={handleSubmit}>
                    <Typography variant='h6' className={classes.type1}>{currentId ? "Editing a Memory" : "Creating a Memory"}</Typography>
                    
                    <TextField 
                    name='title' 
                    variant='outlined' 
                    label="Title" 
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                    className={classes.textField1}
                    required>
                    </TextField>
    
                    <TextField 
                    name='message' 
                    variant='outlined' 
                    label="Message" 
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({...postData, message: e.target.value})}
                    className={classes.textField1}
                    required>
    
                    </TextField>
                    <TextField 
                    name='tags' 
                    variant='outlined' 
                    label="Tags" 
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => {
                        setPostData({...postData, tags: e.target.value.split(",")})}}
                        required>
    
                    </TextField>
                    <div className={classes.fileInput}>
                        <input type="file" multiple={false} name="upload_image" onChange={(e) => setPostData({...postData, selectedFile: e.target.files[0]})} required>
                       </input>
                    <Button variant="contained" color="primary" size="medium" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="medium" onClick={clear} fullWidth>Clear</Button>
                    </div>
                </form>
            </Paper>
        );
    };



export default Form;