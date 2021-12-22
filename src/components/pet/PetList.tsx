import React, { useState, useEffect } from 'react';
import { Modal, Button, List, Avatar } from 'antd';
import { PetForm } from "./";
import styled from "styled-components";
import { usePetState } from '../../contexts';
import { Pet as IPet } from "../../models"

const Container = styled.div`
    width: 90%;
    margin: 10px auto;
    
    ${({ theme }) => theme.media.phone`
        width: 100%;
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
    const [formValues, setFormValues] = useState<IPet>(initialValues);
    const [pet, setPet] = useState<IPet>(initialValues);
    const petState = usePetState();

    useEffect(() => {
        setEditKey(-1)
    }, [])

    const showModal = () => {
        setEditKey(0)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setEditKey(-1)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditKey(-1)
    };

    useEffect(() => {
        if (editKey) {
            const editPet = petState.items.find(item => item.id === editKey)
            if (editPet && editPet.id) {
                setPet({ ...editPet })
            }
        } else {
            setPet({ ...initialValues })
        }
    }, [editKey])

    const handleEdit = (id: number) => {
        setEditKey(id)
        setIsModalVisible(true);
    };

    const handleDelete = () => {
        setEditKey(-1)
    };

    return (
        <Container>
            <Button type="primary" onClick={showModal}>
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
                        <List.Item
                            actions={[
                                <a
                                    key="list-loadmore-edit"
                                    onClick={() => handleEdit(item.id)}>
                                    edit
                                </a>,
                                <a key="list-loadmore-delete">
                                    delete
                                </a>]}
                        ></List.Item>
                    </List.Item>
                )}
            />

            <Modal title="Pet" visible={isModalVisible} onCancel={handleCancel} onOk={handleOk} >
                <PetForm data={pet} setFormValues={setFormValues} />
            </Modal>
        </Container>
    );
};

export default PetList;