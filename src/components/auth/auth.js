import React, {useState} from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from "./styles";
import Input from "./input";
import {useNavigate} from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import {useDispatch} from "react-redux";
import { useSelector } from 'react-redux';
import { signUp, signIn} from "../../actions/auth";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: ""}

const Auth = () => {
    const classes = useStyles();
    const history = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authReducer);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signUp(formData, history));
        } else {
            dispatch(signIn(formData, history));
        };
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignUp(!isSignUp);
    };

    
    const onSuccess = (tokenResponse) => {
         try {
            dispatch({type: "AUTH", data: tokenResponse});
            history("/")
        } catch (error) {
            console.log(error)
        };
    };

    const onError = (error) => {
        console.log(error)
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon></LockOutlinedIcon>
                </Avatar>
                <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"></Input>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}></Input>
                        { isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"></Input>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignUp ? "Sign up" : "Sign in"}
                    </Button>
                    {isSignUp ? null : 
                        (<GoogleLogin onSuccess={onSuccess} onError={onError}></GoogleLogin>)
                    }
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? "Already have an Account? Sign in" : "Don't have an Account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
};

export default Auth;