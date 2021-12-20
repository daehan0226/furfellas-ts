import React from "react";
import { Route } from 'react-router-dom'
import styled from "styled-components";
import { SignIn, SignUp } from "../components/member";

const Main = styled.main`
  width: 320px;
  margin: 30px auto;
  min-height: 800px;
`;


function MemberLayout() {
    return (
        <Main>
            <Route path="/member/signup" exact component={SignUp} />
            <Route path="/member/signin" exact component={SignIn} />
        </Main>
    );
}

export default MemberLayout;