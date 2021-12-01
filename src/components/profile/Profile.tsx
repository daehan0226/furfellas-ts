import React, { useEffect, useState } from 'react';
import { Card } from "./card";
import { Pet } from "../../models"
import { MainApi } from '../../ApiService';


const Profile: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);

    const fetchPets = async () => {
        const api = new MainApi()
        const petData = await api.getPets()
        setPets([...petData.result])
    }

    useEffect(() => {
        fetchPets()
    }, [])

    return (
        <>
            {pets.map(pet => (
                <Card key={pet.id} data={pet} />
            ))}
        </>
    );
};

export default Profile;
