import { Route, Redirect, RouteProps } from 'react-router';

type ProtectedRouteProps = {
    isAuthenticated: boolean;
    authenticationPath: string;
} & RouteProps;

const ProtectedRoute = ({ isAuthenticated, authenticationPath, ...routeProps }: ProtectedRouteProps) => {
    if (isAuthenticated) {
        return <Route {...routeProps} />;
    } else {
        return <Redirect to={{ pathname: authenticationPath }} />;
    }
};


export default ProtectedRoute;