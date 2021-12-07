import { useState } from "react";
import styled from "styled-components";
import request from "axios";
import { Popconfirm } from 'antd';
import { MainApi } from "../../ApiService";
import { useActionDispatch } from "../../contexts";
import { Action as IAction } from "../../models";
import { createQueryParams } from "../../utils/utils";
import { Button } from "../common"

const Container = styled.div`
    margin: 10px auto;
    width: 320px;
`;


const Input = styled.input`
  width: 200px;
`;
const Text = styled.p`
  width: 200px;
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


    return (
        <Container>
            <Input value={value} onChange={e => setValue(e.target.value)} />
            <Buttons>
                <Button text={data.id === 0 ? "Add" : "Update"} onClick={handleSubmit} />
                <Button text={"Cancel"} type={"default"} onClick={handleCancel} />
                {data && (
                    <Popconfirm title={`Are you sure to delete ${data.name}？`} okText="Yes" onConfirm={handleDelete} cancelText="No">
                        <Button text={"Delete"} onClick={() => { }} danger={true} />
                    </Popconfirm>
                )}
            </Buttons>
            {errMsg && <ErrorMsg>{errMsg}</ErrorMsg>}
        </Container>
    );
};

export default ActionForm;
