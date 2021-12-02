import { useState } from "react";
import styled from "styled-components";


const Container = styled.div`
`;

interface IAction {
    id: number;
    name: string;
}

interface ActionFormProps {
    data?: IAction
}

const ActionForm: React.FC<ActionFormProps> = ({ data }) => {
    const [value, setValue] = useState<string>(data?.name || "");

    const handleSubmit = () => {
        console.log("handleSubmit", data?.id, value)
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
