import React from "react";
import { Route } from 'react-router-dom'
import styled from "styled-components";
import { AccountHome } from "../components/account";

const Main = styled.main`
  margin: 30px auto;
  min-height: 800px;
`;


function AccountLayout() {
    return (
        <Main>
            <Route path="/" exact component={AccountHome} />
        </Main>
    );
}

export default AccountLayout;