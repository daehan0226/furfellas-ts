import { useState } from "react";
import styled from "styled-components";
import { MainApi } from "../../ApiService";
import { useActionDispatch } from "../../contexts";
import { Action as IAction } from "../../models";
import { createQueryParams } from "../../utils/utils";

const Container = styled.div`
`;


interface ActionFormProps {
    data?: IAction
}

const ActionForm: React.FC<ActionFormProps> = ({ data }) => {
    const [value, setValue] = useState<string>(data?.name || "");

    const actionDispatch = useActionDispatch();

    const handleAddAction = async (name: string) => {
        const api = new MainApi()
        const response = await api.addAction(createQueryParams({ name }))
        actionDispatch({ type: 'ADD', payload: { id: response.result, name: value } })
    }

    const handleUpdateAction = async (id: number, name: string) => {
        const api = new MainApi()
        const result = await api.addAction(createQueryParams({ name }))
        console.log(result)
        // actionDispatch({ type: 'UPDATE', payload: { id: data.id, name: value } })
    }


    const handleSubmit = () => {
        if (data && data.id) {
            handleUpdateAction(data.id, value)
        } else {
            handleAddAction(value);
        }
    }

    const handleCancel = () => {
        console.log("handleCancel", data?.id, value)

    }

    return (
        <Container>
            <input value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={handleSubmit} >{data ? "Update" : "Add"}</button>
            {data && <button onClick={handleCancel} >Delete</button>}
        </Container>
    );
};

export default ActionForm;
