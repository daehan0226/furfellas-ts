import React from 'react';
import { Card } from "./card";
import { usePet } from '../../contexts';


const Profile: React.FC = () => {
    const pets = usePet();
    return (
        <>
            {pets && pets.data.map(pet => (
                <Card key={pet.id} data={pet} />
            ))}
        </>
    );
};

export default Profile;
