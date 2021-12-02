import React, { useState } from 'react';
import styled from "styled-components";
import { TagSelect } from '../common/select';

const Container = styled.div`
`;

const actions = {
    data:
        [{
            id: 1,
            name: 'a'
        },
        {
            id: 2,
            name: 'b'
        }]
}

const locations = {
    data:
        [{
            id: 1,
            name: 'a'
        },
        {
            id: 2,
            name: 'b'
        }]
}

const pets = {
    data:
        [{
            id: 1,
            name: 'a'
        },
        {
            id: 2,
            name: 'b'
        }]
}


const Header: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState({
        actions: "",
        locations: "",
        pets: ""
    })

    const handleSelectedItemChange = (key: string, value: number[]) => {
        setSelectedItems({
            ...selectedItems,
            [key]: value
        })
    }
    return (
        <Container>
            <TagSelect placeholder="Choose actions" onChange={handleSelectedItemChange} selectKey={"actions"} options={actions.data} />
            <TagSelect placeholder="Choose locations" onChange={handleSelectedItemChange} selectKey={"locations"} options={locations.data} />
            <TagSelect placeholder="Choose pets" onChange={handleSelectedItemChange} selectKey={"pets"} options={pets.data} />
        </Container>
    );
};

export default Header;
