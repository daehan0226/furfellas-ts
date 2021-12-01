import React from 'react';
import './App.css';
import './styles/styles.css';
import { Header } from "./components/common"
import { Profile } from './components/profile';
import { TodoTable } from './components/todo';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Profile />
      <TodoTable />
    </div>
  );
}

export default App;
