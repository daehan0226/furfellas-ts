import styled from "styled-components";
import { PetList } from '.';

const Container = styled.div`
    width: 90%;
    margin: 10px auto;
    
    ${({ theme }) => theme.media.phone`
        width: 100%;
    `}
`;

const AdminPet = () => {
    return (
        <Container>
            <PetList />
        </Container>
    );
};

export default AdminPet;