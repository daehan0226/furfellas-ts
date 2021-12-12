import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from "styled-components";

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
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary.text};
  margin-bottom: 0px;
`;

const Header: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const { reauthenticate } = useActions();

  useEffect(() => {
    reauthenticate()
  }, [])

  return (
    <>
      <Container>
        <Title>
          test
        </Title>

        <div>
          {auth.loading ? (
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          ) : (
            auth.loggedIn && auth.data ? (
              <p>{auth.data.user}</p>
            ) : (
              <p>Sign In</p>
            )
          )}

        </div>
      </Container>
      <Spacer />
    </>
  );
};

export default Header;
