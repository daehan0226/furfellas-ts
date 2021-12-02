import React from "react";
import { Profile } from '../components/profile';
import { Gallery } from '../components/gallery';
import { TodoTable } from '../components/todo';
import { RouteComponentProps } from 'react-router-dom';


const Home: React.FC<RouteComponentProps> = ({ match }) => {
    return (
        <>
            <Profile />
            <TodoTable />
            <Gallery />
        </>
    )
}

export default Home;