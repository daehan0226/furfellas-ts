import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import './styles/styles.css';
import { Header } from "./components/common/header"
import { Footer } from "./components/common"
import { Home, Admin } from "./pages"

import { LocationContextProvider, ActionContextProvider, PetContextProvider } from './contexts';
import { Action } from './components/action';
import { Location } from './components/location';
import { Pet } from './components/pet';
import { ProtectedRoute } from './hoc';

import { Provider } from 'react-redux'
import { store } from './redux'
import SingIn from './pages/SingIn';
import { useActions } from './hooks/useActions';

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
  const { reauthenticate } = useActions();

  useEffect(() => {
    reauthenticate()
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SingIn} />

          <ProtectedRoute path="/admin" component={Admin} />
          <ProtectedRoute exact path="/admin/action" component={Action} />
          <ProtectedRoute exact path="/admin/location" component={Location} />
          <ProtectedRoute exact path="/admin/pet" component={Pet} />

          <Redirect path="*" to="/" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default withProviders(App);

