import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import './styles/styles.css';
import { Header } from "./components/common"
import { Home, Admin } from "./pages"

import { LocationContextProvider, ActionContextProvider, PetContextProvider } from './contexts';
import { Action } from './components/action';
import { Location } from './components/location';
import { Pet } from './components/pet';


const withContext = <T,>(Component: React.ComponentType<T>) => {
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
    <Router>
      <div className="App">
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/action" component={Action} />
          <Route exact path="/admin/location" component={Location} />
          <Route exact path="/admin/pet" component={Pet} />

          <Redirect path="*" to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default withContext(App);