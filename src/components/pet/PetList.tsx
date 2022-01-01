import React, { useState, useEffect } from 'react';
import { Modal, Button, List, Avatar } from 'antd';
import moment from 'moment';
import { PetForm } from "./";
import styled from "styled-components";
import { usePetDispatch, usePetState } from '../../contexts';
import { Pet as IPet } from "../../models"
import { MainApi } from '../../ApiService';
import { PopUpDeleteButton } from '../common';
import request from "axios"

const Container = styled.div`
    width: 90%;
    margin: 10px auto;
    
    ${({ theme }) => theme.media.phone`
        width: 100%;
    `}
`;


const BtnBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    > * {
        margin: 5px;
    }
    
    ${({ theme }) => theme.media.phone`
        flex-direction: column;
    `}
`;

const initialValues = {
    id: 0,
    birthday: "",
    name: "",
    intro: "",
    weight: 0,
    sex: "m",
    photo: {
        id: 0,
        url: ''
    },
    color: "000000",
}

const PetList = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [editKey, setEditKey] = useState<number>(-1);
    const [pet, setPet] = useState<IPet>(initialValues);
    const petState = usePetState();
    const petDispatch = usePetDispatch();

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const setPetDataForm = (pet: IPet) => {
        if (typeof pet["birthday"] === 'string') {
            pet["birthday"] = moment(pet.birthday.slice(0, 10), 'YYYY-MM-DD')
        }
        return pet
    }

    useEffect(() => {
        setPet({ ...initialValues })
        if (isModalVisible) {
            const editPet = petState.items.find(item => item.id === editKey)
            if (editPet && editPet.id) {
                setPet({ ...setPetDataForm(editPet) })
            }
        } else {
            setEditKey(-1)
        }
    }, [isModalVisible])

    const handleEdit = (id: number) => {
        setEditKey(id)
        setIsModalVisible(true);
    };

    const handleDelete = async (id:number) => {
        try {
            const api = MainApi.getInstance()
            const response = await api.deletePet(id)
            if (response.status === 204) {
                petDispatch({ type: 'DELETE', payload: { id } })
            }
        } catch (e) {
            if (request.isAxiosError(e) && e.response) {
                console.log(e.response.data.message)
            }
        }
    };

    return (
        <Container>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Add a new pet
            </Button>
            <List
                itemLayout="horizontal"
                dataSource={petState.items}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.photo.url} size={64} />}
                            title={<p>{item.name}</p>}
                            description={item.intro}
                        />
                        <BtnBox>
                            <Button onClick={() => handleEdit(item.id)}>Edit </Button>
                            <PopUpDeleteButton id={item.id} name={item.name} confirmAction={()=>handleDelete(item.id)} />
                        </BtnBox>
                    </List.Item>
                )}
            />
            <Modal title="Pet" visible={isModalVisible} onCancel={handleCancel} onOk={handleOk} >
                <PetForm data={pet} setFormValues={setPet} />
            </Modal>
        </Container>
    );
};

export default PetList;