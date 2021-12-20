import styled from "styled-components";
import { Link } from "react-router-dom"

const TitleBox = styled.div`
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary.text};
  margin: 0px;
`;

const HeaderTitle = () => {
    return (
        <TitleBox>
            <Link to="/">
                <Title>
                    Furfellas
                </Title>
            </Link>
        </TitleBox>
    )
}

export default HeaderTitle