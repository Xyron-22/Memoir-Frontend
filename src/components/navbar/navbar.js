import React, { useEffect } from "react";
import {AppBar, Avatar, Button, Typography} from "@material-ui/core";
import images from '../../images/images.jfif';
import useStyles from "./styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({user, setUser, toggle, setToggle}) => {
    const classes = useStyles();
    const location = useLocation();
    const {currentPage} = useSelector((state) => state.posts);
    const history = useNavigate();
    const dispatch = useDispatch();
    const authUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_USER));
           
   
    const handleLogout = () => {
        dispatch({ type: "LOGOUT"});
        history("/");
        setUser(null);
        setToggle(!toggle);
    };

    useEffect(() => {
      if (authUser) {
        if(authUser.credential) {
            const decoded = jwt_decode(authUser.credential);
            setUser(decoded);
            if(decoded.exp * 1000 < parseInt(new Date().getTime())) {
                handleLogout();
            };
        } else if (authUser.result) {
            const decoded = jwt_decode(authUser.token)
            setUser(authUser.result);
                
            if (decoded.exp * 1000 < parseInt(new Date().getTime())) {
                handleLogout();
            };
        };
        };
    }, [location]);
    
        
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} variant="h2" align='center' component={Link} to={currentPage? `/posts?page=${currentPage}` : "/posts?page=1"}>Memoir</Typography>
                <img className={classes.image} src={images} alt="memories" height="auto"></img>
            </div>
             
            {user ? (
                <div className={classes.details}>                                
                    <Avatar className={classes.purple} alt={user.name} src={user.picture}></Avatar>
                    <Typography className={classes.userName} variant="h6">{user.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>logout</Button>
                </div>  
                    ) : (   
                        <Button className={classes.signIn} component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}                               
        </AppBar>
    );
};

export default Navbar; 