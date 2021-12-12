import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HandleErrorNavigation from './pages/HandleErrorNavigation';
import Footer from './components/Footer';




ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/*<Route path="/profile/:id" element={<Profile />} />*/}
{/*        <Route path="/moderation" element={<Moderation />} />*/}
{/*        <Route path="/posts" element={<Posts />} >*/}
{/*          <Route path=":id" element={<Post />} />*/}
{/*        </Route>*/}
{/*        <Route path="/new_post" element={<NewPost />} />*/}
{/*        <Route path="/myposts/:id" element={<MyPosts />} />*/}
        <Route path="*" element={<HandleErrorNavigation />} />
      </Routes>
    </Router>
    < Footer />
  </React.StrictMode>,
  document.getElementById('root')
);


