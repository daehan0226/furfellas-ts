import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 60px;
    background-color: ${({ theme }) => theme.colors.primary.dark};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary.text};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Text = styled.p`
    margin-bottom: 0px;
`;

const Footer: React.FC = () => {

    return (
        <Container>
            <Text>{`©${new Date().getFullYear()} Copyright : furfellas.foxlee.kr`}</Text>
        </Container>
    );
};

export default Footer;
