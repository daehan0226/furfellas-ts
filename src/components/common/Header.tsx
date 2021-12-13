import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { Link } from "react-router-dom"
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useTypedSelector';

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

const TitleBox = styled.div`
`;

const LinkBox = styled.div`
`;

const LinkList = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 5px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary.text};
  margin: 0px;
`;

const LinkText = styled.p`
  color: ${({ theme }) => theme.colors.primary.text};
  margin: 5px;
  cursor: pointer;
`;

const Header: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const { deauthenticate } = useActions();

  return (
    <>
      <Container>
        <TitleBox>
          <Title>
            Furfellas
          </Title>
        </TitleBox>

        <LinkBox>
          {auth.loading ? (
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          ) : (
            auth.loggedIn && auth.data ? (
              <LinkList>
                <LinkText>{auth.data.user}</LinkText>
                <LinkText onClick={() => { deauthenticate() }}>Log out</LinkText>
              </LinkList>
            ) : (
              <Link to="/signin">
                <LinkText>Sign In</LinkText>
              </Link>
            )
          )}

        </LinkBox>
      </Container>
      <Spacer />
    </>
  );
};

export default Header;
