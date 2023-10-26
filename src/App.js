import React from 'react';
import "./App.css";
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import Main from './Pages/Main/Main';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import CreatePost from './Pages/CreatePost/CreatePost';

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/createPost" element={<CreatePost/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
