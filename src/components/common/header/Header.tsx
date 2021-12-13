import React from 'react';
import styled from "styled-components";
import { HeaderTitle, HeaderLink } from './';

const Spacer = styled.div`
  height: 80px;
  ${({ theme }) => theme.media.desktop`
    height: 80px;
  `}
  ${({ theme }) => theme.media.tablet`
    height: 70px;
  `}
  ${({ theme }) => theme.media.phone`
    height: 60px;
  `}
`;

const Container = styled(Spacer)`
  width: 100%;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  ${({ theme }) => theme.media.desktop`
    padding: 20px;
  `}
  ${({ theme }) => theme.media.tablet`
    padding: 15px;
  `}
  ${({ theme }) => theme.media.phone`
    padding: 10px;
  `}
`;

const Header: React.FC = () => {

    return (
        <>
            <Container>
                <HeaderTitle />
                <HeaderLink />
            </Container>
            <Spacer />
        </>
    );
};

export default Header;
