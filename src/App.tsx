import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import './styles/styles.css';
import { Header } from "./components/common/header"
import { Footer } from "./components/common"
import { HomeLayout, AdminLayout, MemberLayout, AccountLayout } from "./layouts"

import { ProtectedRoute } from './hoc';

import { Provider } from 'react-redux'
import { store } from './redux'
import { useActions } from './hooks/useActions';
import ScrollToTop from './hooks/ScrollToTop';

const withProviders = <T,>(Component: React.ComponentType<T>) => {
  return (props: T) => (
    <Provider store={store}>
        <Component {...props} />
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
        <ScrollToTop />
        <Header />
        <Switch>
          <Route path="/member" component={MemberLayout} />
          <ProtectedRoute path="/admin" component={AdminLayout} />
          <ProtectedRoute path="/account" component={AccountLayout} />
          <Route path="/" component={HomeLayout} />
          <Redirect path="*" to="/" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default withProviders(App);