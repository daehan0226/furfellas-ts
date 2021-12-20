import React from 'react';
import { Card } from "./card";
import { usePetState } from '../../contexts';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const Profile: React.FC = () => {
    const petState = usePetState();
    return (
        <Container>
            {petState.items.map(pet => (
                <Card key={pet.id} data={pet} />
            ))}
        </Container>
    );
};

export default Profile;
