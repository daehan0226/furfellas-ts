
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
  flex-direction: column;
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.text};
  margin-top: auto;
`;


const Footer: React.FC = () => {

    return (
        <Container>
            <Link to={"/admin"}>Admin</Link>
        </Container>
    );
};

export default Footer;
