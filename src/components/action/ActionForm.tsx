import { useState, useEffect } from "react";
import styled from "styled-components";
import request from "axios";
import { MainApi } from "../../ApiService";
import { useActionDispatch, useActionState } from "../../contexts";
import { Action as IAction } from "../../models";
import { createQueryParams } from "../../utils/utils";
import { Button, Input } from "../common"
import { ErrMsgBox, Buttons } from "../../styles/common"

const Container = styled.div`
    margin: 10px;
    display: flex;
    
    ${({ theme }) => theme.media.phone`    
        flex-direction: column;
    `}
`;

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

    return (
        <Container>
            <Input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={data.name || "New location"}
                size={"small"}
            />
            {errMsg && <ErrMsgBox>{errMsg}</ErrMsgBox>}
            <Buttons>
                <Button
                    text={data.id === 0 ? "Add" : "Update"}
                    onClick={handleSubmit}
                    disabled={submitDisabled}
                    size={"small"}
                />
                <Button
                    text={"Cancel"}
                    type={"default"}
                    onClick={handleCancel}
                    size={"small"}
                />
            </Buttons>
        </Container>
    );
};

export default ActionForm;
