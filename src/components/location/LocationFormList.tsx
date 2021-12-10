import { useState } from "react";
import styled from "styled-components";
import { LocationForm } from ".";
import { Button } from "../common"
import { useLocationState } from "../../contexts";
import { Divider } from 'antd';


const Container = styled.section`
    width: 320px;
    margin: 10px auto;
`;

const ListBox = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const List = styled.li`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const Header = styled.div`
    display: flex;
    justify-content: end;
    margin-bottom: 10px;
`;

type IEditKey = null | number;

const initialLocationValue = {
    id: 0,
    name: ''
}

const LocationFormList: React.FC = () => {
    const [editKey, setEditKey] = useState<IEditKey>(null);

    const locationState = useLocationState();

    const finishForm = () => {
        setEditKey(null)
    }

    return (
        <Container>
            <Header>
                {editKey === 0 ? (
                    <LocationForm data={initialLocationValue} onFinish={finishForm} />
                ) : (
                    <Button text={"New Location"} onClick={() => { setEditKey(0) }} />
                )}
            </Header>
            <Divider />
            <ListBox>
                {locationState.items.map((location) => (
                    <>
                        {editKey === location.id ? (
                            <List>
                                <LocationForm data={location} onFinish={finishForm} />
                            </List>
                        ) : (
                            <List>
                                <p key={location.id}>{location.name}</p>
                                <Button text={"Edit"} onClick={() => { setEditKey(location.id) }} />
                            </List>
                        )}
                        <Divider style={{ margin: '6px 0' }} />
                    </>
                ))}
            </ListBox>
        </Container>
    );
};

export default LocationFormList;
