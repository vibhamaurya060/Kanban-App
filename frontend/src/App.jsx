import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Board from './components/KanbanBoard/Board';

const App = () => {
  return (
    <Router>
      <div className="App" style={{marginLeft:"100px",marginTop:"-250px"}}>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/board" element={<Board />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
