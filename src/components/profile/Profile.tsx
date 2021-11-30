import React, { useEffect, useState } from 'react';
import { Card } from "./card";
import { Pet } from "../../models"

const petdb = [{
    title: "1",
    birthday: "2021-12-01",
    weight: 15,
    name: "test",
    intro: 'zzz',
    photo: {
        id: 1,
        url: ''
    }
},
{
    title: "1",
    birthday: "2021-12-01",
    weight: 15,
    name: "test",
    intro: 'zzz',
    photo: {
        id: 1,
        url: ''
    }
}
]


const Profile: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);

    useEffect(() => {
        setPets([...petdb])
    }, [])

    return (
        <>
            {pets.map(pet => (
                <Card data={pet} />
            ))}
        </>
    );
};

export default Profile;
