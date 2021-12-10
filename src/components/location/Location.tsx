import styled from "styled-components";
import { LocationFormList } from "./";


const Container = styled.div`
`;
const Title = styled.h2`
`;


const Location: React.FC = () => {

    return (
        <Container>
            <Title>Location</Title>
            <LocationFormList />
        </Container>
    );
};

export default Location;
