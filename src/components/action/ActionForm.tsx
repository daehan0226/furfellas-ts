import { useEffect, useState } from "react";
import styled from "styled-components";
import request from "axios";
import { MainApi } from "../../ApiService";
import { useActionDispatch } from "../../contexts";
import { Action as IAction } from "../../models";
import { createQueryParams } from "../../utils/utils";

const Container = styled.div`
`;


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

    const handleDelete = () => {
        const confirmAction = async () => {
            if (data && window.confirm(`Do you really want to delete '${data.name}'?`)) {
                const api = MainApi.getInstance()
                const result = await api.deleteAction(data.id)
                console.log(result);
                onFinish()
            }
        };
        confirmAction();
    }

    return (
        <Container>
            <input value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={handleSubmit} >{data.id === 0 ? "Add" : "Update"}</button>
            <button onClick={handleCancel} >Cancel</button>
            {data && <button onClick={handleDelete} >Delete</button>}
            {errMsg && <p>{errMsg}</p>}
        </Container>
    );
};

export default ActionForm;
