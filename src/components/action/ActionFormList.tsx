import { useState } from "react";
import styled from "styled-components";
import { ActionForm } from ".";
import { Button, PopUpDeleteButton } from "../common"
import { useActionDispatch, useActionState } from "../../contexts";
import { Divider } from 'antd';
import { MainApi } from "../../ApiService";
import request from "axios";
import { Buttons, ErrMsgBox } from "../../styles/common"
import {themeProps} from "../../styles/theme"

const CustomDivider = styled(Divider)`
    ${({ theme }: themeProps) => theme.media.phone`
        margin: 320px;
    `}
`

const Container = styled.section`
    margin: 10px auto;
    ${({ theme }: themeProps) => theme.media.phone`
        width: 100%;
    `}
`;

const ListBox = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    ${({ theme }: themeProps) => theme.media.phone`
        width: 100%;
        flex-direction: column;
    `}
`;

const List = styled.li`
    width: 320px;
    margin: 10px;
    ${({ theme }: themeProps) => theme.media.phone`
        width: 100%;
        margin: 5px;
    `}
`;

const DetailBox = styled.div`
    display: flex;
    margin: 10px;
    justify-content: space-between;
    ${({ theme }: themeProps) => theme.media.phone`
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

const initialActionValue = {
    id: 0,
    name: ''
}

const ActionFormList: React.FC = () => {
    const [editKey, setEditKey] = useState<IEditKey>(null);
    const [errMsg, setErrMsg] = useState<string>("");

    const actionState = useActionState();
    const actionDispatch = useActionDispatch();

    const finishForm = () => {
        setEditKey(null)
    }

    const handleDelete = async (id: number) => {
        const result = await handleDeleteAction(id)
        if (result) {
            finishForm()
        }
    }

    const handleDeleteAction = async (id: number) => {
        try {
            const api = MainApi.getInstance()
            const response = await api.deleteAction(id)
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

    return (
        <Container>
            <Divider />
            <SubContainer>
                {editKey === 0 ? (
                    <ActionForm data={initialActionValue} onFinish={finishForm} />
                ) : (
                    <Button text={"New Action"} onClick={() => { setEditKey(0) }} />
                )}
            </SubContainer>
            <ListBox>
                {actionState.items.map((action) => (
                    <>
                        {editKey === action.id ? (
                            <ActionForm data={action} onFinish={finishForm} />
                        ) : (
                            <List>
                                <DetailBox>
                                    <p key={action.id}>{action.name}</p>
                                    <Buttons>
                                        <Button text={"Edit"} onClick={() => { setEditKey(action.id) }} />
                                        <PopUpDeleteButton id={action.id} name={action.name} confirmAction={handleDelete} />
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

export default ActionFormList;
