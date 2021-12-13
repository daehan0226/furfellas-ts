import { Route, Redirect, RouteProps } from 'react-router';
import { useAppSelector } from '../hooks/useTypedSelector';

type ProtectedRouteProps = {
    authenticationPath?: string;
} & RouteProps;

const ProtectedRoute = ({ authenticationPath = "/signin", ...routeProps }: ProtectedRouteProps) => {
    const auth = useAppSelector((state) => state.auth);

    if (auth.loggedIn) {
        return <Route {...routeProps} />;
    }
    if (auth.loading) {
        return <p>loading...</p>
    }
    else {
        return <Redirect to={{ pathname: authenticationPath, state: { nextPage: routeProps.location?.pathname } }} />;
    }
};


export default ProtectedRoute;