import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage.js';
import Navbar from './components/Navbar/Navbar.js';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="nav-bar">
          <Navbar />
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
