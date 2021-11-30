import React from 'react';
import './App.css';
import Header from "./components/common/Header"
import { Profile } from './components/profile';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Profile />
    </div>
  );
}

export default App;
