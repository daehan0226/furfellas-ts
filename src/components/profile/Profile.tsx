import React from 'react';
import { Card } from "./card";
import { usePetState } from '../../contexts';


const Profile: React.FC = () => {

    const petState = usePetState();
    return (
        <>
            {petState.items.map(pet => (
                <Card key={pet.id} data={pet} />
            ))}
        </>
    );
};

export default Profile;
