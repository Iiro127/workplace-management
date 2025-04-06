import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Projects from './pages/Projects.tsx';
import Schedule from './pages/Schedule.tsx'
import SecuredRoute from './SecuredRoute.tsx';

function App() {
  return (
    <Router>
      <SecuredRoute>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </SecuredRoute>
    </Router>
  );
}


export default App;
