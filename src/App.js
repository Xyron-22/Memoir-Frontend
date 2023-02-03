import React, { useState } from 'react';
import {Container} from '@material-ui/core'
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import Auth from './components/auth/auth';
import PostDetails from './components/PostDetails/postDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';





const App = () => {
  const [user, setUser] = useState(null);
  const [toggle, setToggle] = useState(false);
  
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar toggle={toggle} setToggle={setToggle} user={user} setUser={setUser}></Navbar>
        <Routes>
          <Route path="/" element={<Home setToggle={setToggle} toggle={toggle} user={user} setUser={setUser}/>}></Route>
          <Route path="/posts" element={<Home setToggle={setToggle} toggle={toggle} user={user} setUser={setUser}/>}></Route>
          <Route path="/posts/search" element={<Home setToggle={setToggle} toggle={toggle} user={user} setUser={setUser}/>}></Route>
          <Route path="/posts/:id" element={<PostDetails></PostDetails>}></Route>
          <Route path="/auth" element={user? <Home setToggle={setToggle} toggle={toggle} user={user} setUser={setUser}/> : <Auth/>}></Route>
        </Routes>
      </Container>  
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

 
export default App;
