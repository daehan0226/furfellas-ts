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
import { ProtectedRoute } from './hoc';

import { Provider } from 'react-redux'
import { store } from './redux'
import SingIn from './pages/SingIn';

const withProviders = <T,>(Component: React.ComponentType<T>) => {
  return (props: T) => (
    <Provider store={store}>
      <LocationContextProvider>
        <ActionContextProvider>
          <PetContextProvider>
            <Component {...props} />
          </PetContextProvider>
        </ActionContextProvider>
      </LocationContextProvider>
    </Provider>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SingIn} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/action" component={Action} />
          <Route exact path="/admin/location" component={Location} />
          <Route exact path="/admin/pet" component={Pet} />
          <ProtectedRoute
            path='/private'
            isAuthenticated={false}
            component={Pet}
            authenticationPath={'/'}
          />
          <Redirect path="*" to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default withProviders(App);

