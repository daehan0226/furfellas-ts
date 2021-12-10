import { useState } from "react";
import styled from "styled-components";
import { ActionForm } from ".";
import { Button } from "../common"
import { useActionState } from "../../contexts";
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
            <Header>
                {editKey === 0 ? (
                    <ActionForm data={initialActionValue} onFinish={finishForm} />
                ) : (
                    <Button text={"New Action"} onClick={() => { setEditKey(0) }} />
                )}
            </Header>
            <Divider />
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
                        <Divider style={{ margin: '6px 0' }} />
                    </>
                ))}
            </ListBox>
        </Container>
    );
};

export default ActionFormList;
