import { useEffect, useState } from "react";
import styled from "styled-components";
import request from "axios";
import { Popconfirm } from 'antd';
import { MainApi } from "../../ApiService";
import { useLocationDispatch, useLocationState } from "../../contexts";
import { Location as ILocation } from "../../models";
import { createQueryParams } from "../../utils/utils";
import { Button, Input } from "../common"

const Container = styled.div`
    margin: 10px auto;
    width: 320px;
`;


const ErrorMsg = styled.span`
    color: ${({ theme }) => theme.colors.common.error};
`

const Buttons = styled.div`
    display: flex;
    margin-top: 10px;
    justify-content: space-around;
`

interface LocationFormProps {
    data: ILocation,
    onFinish: () => void
}

const LocationForm: React.FC<LocationFormProps> = ({ data, onFinish }) => {
    const [value, setValue] = useState<string>(data?.name || "");
    const [errMsg, setErrMsg] = useState<string>("");
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

    const locationState = useLocationState();
    const locationDispatch = useLocationDispatch();

    const handleAddLocation = async (name: string) => {
        const api = MainApi.getInstance()
        try {
            const response = await api.addLocation(createQueryParams({ name }))
            if (response.status === 201) {
                locationDispatch({ type: 'ADD', payload: { id: response.data.result, name: value } })
                return true
            }
        } catch (e) {
            if (request.isAxiosError(e) && e.response) {
                setErrMsg(e.response.data.message)
                return false
            }
        }
    }

    const handleUpdateLocation = async (id: number, name: string) => {
        const api = MainApi.getInstance()
        try {
            const response = await api.updateLocation(id, createQueryParams({ name }))
            if (response.status === 204) {
                locationDispatch({ type: 'UPDATE', payload: { id, name: value } })
                return true
            }
        } catch (e) {
            if (request.isAxiosError(e) && e.response) {
                setErrMsg(e.response.data.message)
                return false
            }
        }
    }

    const handleDeleteLocation = async (id: number) => {
        try {
            const api = MainApi.getInstance()
            const response = await api.deleteLocation(data.id)
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

    const handleSubmit = async () => {
        let result;
        if (data && data.id) {
            result = await handleUpdateLocation(data.id, value)
        } else {
            result = await handleAddLocation(value);
        }
        if (result) {
            onFinish()
        }
    }

    const handleCancel = () => {
        onFinish()
    }

    const handleDelete = async () => {
        const result = await handleDeleteLocation(data.id)
        if (result) {
            onFinish()
        }
    }

    const checkDuplicates = (newName: string) => {
        if (data.name === newName) {
            return;
        }

        if (locationState.items.find(item => item.name === newName)) {
            setErrMsg(`Duplicate - ${newName}`)
        } else {
            setErrMsg("")
        }
    }

    useEffect(() => {
        checkDuplicates(value)
    }, [value])

    useEffect(() => {
        setSubmitDisabled(true)
        if (value === "" || errMsg !== "") {
            return;
        }
        if (data.id !== 0 && value === data.name) {
            return;
        }
        setSubmitDisabled(false)

    }, [value, errMsg])

    const DeleteButton = () => {
        return (
            <Popconfirm title={`Are you sure to delete ${data.name}？`} okText="Yes" onConfirm={handleDelete} cancelText="No">
                <Button text={"Delete"} danger={true} />
            </Popconfirm>
        )
    }

    return (
        <Container>
            <Input value={value} onChange={e => setValue(e.target.value)} placeholder={data.name || "New location"} />
            {errMsg && <ErrorMsg>{errMsg}</ErrorMsg>}
            <Buttons>
                {data.id === 0 ? (
                    <Button text={"Add"} onClick={handleSubmit} disabled={submitDisabled} />
                ) : (
                    <>
                        <Button text={"Update"} onClick={handleSubmit} disabled={submitDisabled} />
                        <DeleteButton />
                    </>
                )}
                <Button text={"Cancel"} type={"default"} onClick={handleCancel} />
            </Buttons>
        </Container>
    );
};

export default LocationForm;