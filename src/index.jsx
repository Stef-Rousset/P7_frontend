import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Posts from './pages/Posts';
import HandleErrorNavigation from './pages/HandleErrorNavigation';
import Footer from './components/Footer';



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/my_posts" element={<Posts />} />
        {/*<Route path="/posts/:id" element={<Post />} />
        <Route path="/new_post" element={<NewPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/moderation" element={<Moderation />} />*/}
        <Route path="*" element={<HandleErrorNavigation />} />
      </Routes>
    </Router>
    < Footer />
  </React.StrictMode>,
  document.getElementById('root')
);


