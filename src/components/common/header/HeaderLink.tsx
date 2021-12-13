import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { Link } from "react-router-dom"
import { useActions } from '../../../hooks/useActions';
import { useAppSelector } from '../../../hooks/useTypedSelector';

const LinkBox = styled.div`
`;

const LinkList = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 5px;
`;

const LinkText = styled.p`
  color: ${({ theme }) => theme.colors.primary.text};
  margin: 5px;
  cursor: pointer;
`;

const HeaderLink = () => {

    const auth = useAppSelector((state) => state.auth);
    const { deauthenticate } = useActions();

    return (
        <LinkBox>
            {auth.loading ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            ) : (
                auth.loggedIn && auth.data ? (
                    <LinkList>
                        {auth.data.is_admin && <Link to="/admin"><LinkText>Admin</LinkText></Link>}
                        <LinkText onClick={() => { deauthenticate() }}>Log out</LinkText>
                    </LinkList>
                ) : (
                    <Link to="/signin">
                        <LinkText>Sign In</LinkText>
                    </Link>
                )
            )}
        </LinkBox>
    )
}


export default HeaderLink;
