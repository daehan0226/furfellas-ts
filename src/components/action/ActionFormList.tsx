import { useState } from "react";
import styled from "styled-components";
import { ActionForm } from ".";
import { useActionState } from "../../contexts";


const Container = styled.div`
`;

type IEditKey = null | number;

const initialActionValue = {
    id: 0,
    name: ''
}

const ActionFormList: React.FC = () => {
    const [editKey, setEditKey] = useState<IEditKey>(null);

    const actionState = useActionState();

    const finishForm = () => {
        setEditKey(null)
    }

    return (
        <Container>
            <button onClick={() => { setEditKey(0) }} >New Action</button>
            {editKey === 0 && <ActionForm data={initialActionValue} onFinish={finishForm} />}
            {actionState.items && actionState.items.map((action) => (
                <div>
                    {editKey === action.id ? (
                        <ActionForm data={action} onFinish={finishForm} />
                    ) : (
                        <>
                            <p key={action.id}>{action.name}</p>
                            <button onClick={() => { setEditKey(action.id) }}>Edit</button>
                        </>
                    )}
                </div>
            ))}
        </Container>
    );
};

export default ActionFormList;
