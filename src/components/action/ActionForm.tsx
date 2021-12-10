import { useState, useEffect } from "react";
import styled from "styled-components";
import request from "axios";
import { Popconfirm } from 'antd';
import { MainApi } from "../../ApiService";
import { useActionDispatch, useActionState } from "../../contexts";
import { Action as IAction } from "../../models";
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

interface ActionFormProps {
    data: IAction,
    onFinish: () => void
}

const ActionForm: React.FC<ActionFormProps> = ({ data, onFinish }) => {
    const [value, setValue] = useState<string>(data?.name || "");
    const [errMsg, setErrMsg] = useState<string>("");
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

    const actionState = useActionState();
    const actionDispatch = useActionDispatch();

    const handleAddAction = async (name: string) => {
        const api = MainApi.getInstance()
        try {
            const response = await api.addAction(createQueryParams({ name }))
            if (response.status === 201) {
                actionDispatch({ type: 'ADD', payload: { id: response.data.result, name: value } })
                return true
            }
        } catch (e) {
            if (request.isAxiosError(e) && e.response) {
                setErrMsg(e.response.data.message)
                return false
            }
        }
    }

    const handleUpdateAction = async (id: number, name: string) => {
        const api = MainApi.getInstance()
        try {
            const response = await api.updateAction(id, createQueryParams({ name }))
            if (response.status === 204) {
                actionDispatch({ type: 'UPDATE', payload: { id, name: value } })
                return true
            }
        } catch (e) {
            if (request.isAxiosError(e) && e.response) {
                setErrMsg(e.response.data.message)
                return false
            }
        }
    }

    const handleDeleteAction = async (id: number) => {
        try {
            const api = MainApi.getInstance()
            const response = await api.deleteAction(data.id)
            if (response.status === 204) {
                actionDispatch({ type: 'DELETE', payload: { id } })
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
            result = await handleUpdateAction(data.id, value)
        } else {
            result = await handleAddAction(value);
        }
        if (result) {
            onFinish()
        }
    }

    const handleCancel = () => {
        onFinish()
    }

    const handleDelete = async () => {
        const result = await handleDeleteAction(data.id)
        if (result) {
            onFinish()
        }
    }

    const checkDuplicates = (newName: string) => {
        if (data.name === newName) {
            return;
        }

        if (actionState.items.find(item => item.name === newName)) {
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

export default ActionForm;
