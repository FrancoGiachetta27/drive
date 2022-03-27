import React from 'react';
import './App.css';
import FilesList from './components/FilesList/FilesList';
import NavBar from './components/NavBar/Navbar';

function App() {

  return (
    <div className="App">
        <NavBar />
        <FilesList />
    </div>
  );
}

export default App;
