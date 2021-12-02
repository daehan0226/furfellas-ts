import React from 'react';
import './App.css';
import './styles/styles.css';
import { Header } from "./components/common"
import { Profile } from './components/profile';
import { Gallery } from './components/gallery';
import { TodoTable } from './components/todo';

import { LocationContextProvider, ActionContextProvider, PetContextProvider } from './contexts';


function withContext<T>(Component: React.ComponentType<T>) {
  return (props: T) => (
    <LocationContextProvider>
      <ActionContextProvider>
        <PetContextProvider>
          <Component {...props} />
        </PetContextProvider>
      </ActionContextProvider>
    </LocationContextProvider>
  );
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Header></Header>
      <Profile />
      <TodoTable />
      <Gallery />
    </div>
  );
}

export default withContext(App);
