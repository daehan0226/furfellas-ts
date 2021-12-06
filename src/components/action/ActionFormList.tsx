import { useState } from "react";
import styled from "styled-components";
import { ActionForm } from ".";
import { Button } from "../common"
import { useActionState } from "../../contexts";


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
            <Button text={"New Action"} onClick={() => { setEditKey(0) }} />
            {editKey === 0 && <ActionForm data={initialActionValue} onFinish={finishForm} />}
            <ListBox>
                {actionState.items && actionState.items.map((action) => (
                    <>
                        {editKey === action.id ? (
                            <List>
                                <ActionForm data={action} onFinish={finishForm} />
                            </List>
                        ) : (
                            <List>
                                <p key={action.id}>{action.name}</p>
                                <Button text={"Edit"} onClick={() => { setEditKey(action.id) }} />
                            </List>
                        )}
                    </>
                ))}
            </ListBox>
        </Container>
    );
};

export default ActionFormList;
