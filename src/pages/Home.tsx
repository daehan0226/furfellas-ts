import React from "react";
import { Profile } from '../components/profile';
import { Gallery } from '../components/gallery';
import { TodoTable } from '../components/todo';
import { RouteComponentProps } from 'react-router-dom';
import styled from "styled-components";

const Main = styled.main`
  width: 90%;
  margin: 0px auto;
  min-height: 800px;
`;


const Containter = styled.div`
    width: 100%
`;

const Title = styled.h1`
    text-align: left;
`;

type ComponentProps = {
    Component: React.FC;
    title: string;
};

const ComponentWithTitle = ({ Component, title }: ComponentProps) => {
    return (
        <>
            <Title>
                {title}
            </Title>
            <Containter>
                <Component />
            </Containter>
        </>
    )
}


const Home: React.FC<RouteComponentProps> = () => {
    return (
        <Main>
            <ComponentWithTitle title={"Profile"} Component={Profile} />
            <ComponentWithTitle title={"Task"} Component={TodoTable} />
            <ComponentWithTitle title={"Gallery"} Component={Gallery} />
        </Main>
    )
}

export default Home;