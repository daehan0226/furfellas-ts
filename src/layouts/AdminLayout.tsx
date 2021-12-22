import { RouteComponentProps, Redirect, Link } from 'react-router-dom';
import { Action } from '../components/action';
import { AdminCard } from '../components/admin/card';
import { Location } from '../components/location';
import { Pet } from '../components/pet';
import styled from "styled-components";
import { ProtectedRoute } from '../hoc';
import { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../utils';


const Main = styled.main`
  width: 90%;
  margin: 10px auto;
  min-height: 800px;
`;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const LinkBox = styled.div`
  margin: 10px;
`;

const LinkText = styled.h2`
    text-align: left;
`;

const Admin: React.FC<RouteComponentProps> = ({ match }) => {

    const routes = [
        {
            title: 'action',
            data: 0,
            link: '/admin/action'
        },
        {
            title: 'location',
            data: 0,
            link: '/admin/location'
        },
        {
            title: 'pet',
            data: 0,
            link: '/admin/pet'
        },
        {
            title: 'photo',
            data: 0,
            link: '/admin/photo'
        },
    ]

    return (
        <CardContainer>
            {routes.map(({ title, data, link }) => (
                <AdminCard title={title} data={data} link={link} />
            ))}
        </CardContainer>
    )
}

const AdminLayout: React.FC<RouteComponentProps> = (props) => {
    const [curRoute, setCurRoute] = useState<string>("");

    useEffect(() => {
        setCurRoute("")
        if (props.location.pathname.includes('/admin/')) {
            setCurRoute(props.location.pathname.replace('/admin/', ''))
        }

    }, [props])

    return (
        <Main>
            <LinkBox>
                <LinkText>
                    <Link to="/admin" >
                        Admin Home
                    </Link>
                    {curRoute !== "" && (
                        <>
                            {" / "}
                            <Link to={`/admin/${curRoute}`} >{capitalizeFirstLetter(curRoute)}</Link>
                        </>
                    )}
                </LinkText>
            </LinkBox>
            <ProtectedRoute path="/admin" exact component={Admin} />
            <ProtectedRoute exact path="/admin/action" component={Action} />
            <ProtectedRoute exact path="/admin/location" component={Location} />
            <ProtectedRoute exact path="/admin/pet" component={Pet} />
            <ProtectedRoute exact path="/admin/photo" component={Pet} />
            <Redirect from="/admin" to="/admin" exact />
        </Main>
    );
}

export default AdminLayout;