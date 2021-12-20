import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Action } from '../components/action';
import { Location } from '../components/location';
import { Pet } from '../components/pet';
import { ProtectedRoute } from '../hoc';

const Admin: React.FC<RouteComponentProps> = ({ match }) => {

    return (
        <>
            <h1>admin</h1>
        </>
    )
}


function AdminLayout() {
    return (
        <>
            <ProtectedRoute path="/admin" exact component={Admin} />
            <ProtectedRoute exact path="/admin/action" component={Action} />
            <ProtectedRoute exact path="/admin/location" component={Location} />
            <ProtectedRoute exact path="/admin/pet" component={Pet} />
            <Redirect from="/admin" to="/admin" exact />
        </>
    );
}

export default AdminLayout;