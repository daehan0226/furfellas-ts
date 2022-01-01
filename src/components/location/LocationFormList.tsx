import { useState } from "react";
import styled from "styled-components";
import { LocationForm } from ".";
import { Button, PopUpDeleteButton } from "../common"
import { useLocationDispatch, useLocationState } from "../../contexts";
import { Divider } from 'antd';
import { MainApi } from "../../ApiService";
import request from "axios";
import { Buttons, ErrMsgBox } from "../../styles/common"


const CustomDivider = styled(Divider)`
    ${({ theme }) => theme.media.phone`
        margin: 320px;
    `}
`

const Container = styled.section`
    margin: 10px auto;
    ${({ theme }) => theme.media.phone`
        width: 100%;
    `}
`;

const ListBox = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    ${({ theme }) => theme.media.phone`
        width: 100%;
        flex-direction: column;
    `}
`;

const List = styled.li`
    width: 320px;
    margin: 10px;
    ${({ theme }) => theme.media.phone`
        width: 100%;
        margin: 5px;
    `}
`;

const DetailBox = styled.div`
    display: flex;
    margin: 10px;
    justify-content: space-between;
    ${({ theme }) => theme.media.phone`
        width: 100%;
        margin: 0px;
    `}
    
`;

const SubContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
`;

type IEditKey = null | number;

const initialLocationValue = {
    id: 0,
    name: ''
}

const LocationFormList: React.FC = () => {
    const [editKey, setEditKey] = useState<IEditKey>(null);
    const [errMsg, setErrMsg] = useState<string>("");

    const locationState = useLocationState();
    const locationDispatch = useLocationDispatch();

    const finishForm = () => {
        setEditKey(null)
    }

    const handleDelete = async (id: number) => {
        const result = await handleDeleteLocation(id)
        if (result) {
            finishForm()
        }
    }

    const handleDeleteLocation = async (id: number) => {
        try {
            const api = MainApi.getInstance()
            const response = await api.deleteLocation(id)
            if (response.status === 204) {
                locationDispatch({ type: 'DELETE', payload: { id } })
                return true
            }

        } catch (e) {
            if (request.isAxiosError(e) && e.response) {
                setErrMsg(e.response.data.message)
                return false
            }
        }
    }


    return (
        <Container>
            <Divider />
            <SubContainer>
                {editKey === 0 ? (
                    <LocationForm data={initialLocationValue} onFinish={finishForm} />
                ) : (
                    <Button text={"New Location"} onClick={() => { setEditKey(0) }} />
                )}
            </SubContainer>
            <Divider />
            <ListBox>
                {locationState.items.map((location) => (
                    <>
                        {editKey === location.id ? (
                            <LocationForm data={location} onFinish={finishForm} key={location.id} />
                        ) : (
                            <List key={location.id}>
                                <DetailBox>
                                    <p>{location.name}</p>
                                    <Buttons>
                                        <Button text={"Edit"} onClick={() => { setEditKey(location.id) }} />
                                        <PopUpDeleteButton id={location.id} name={location.name} confirmAction={handleDelete} />
                                    </Buttons>
                                </DetailBox>
                                {errMsg && <ErrMsgBox>{errMsg}</ErrMsgBox>}
                                <CustomDivider style={{ margin: '6px 0' }} />
                            </List>
                        )}
                    </>
                ))}
            </ListBox>
        </Container>
    );
};

export default LocationFormList;
