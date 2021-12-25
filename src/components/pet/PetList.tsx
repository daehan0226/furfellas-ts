import React, { useState, useEffect } from 'react';
import { Modal, Button, List, Avatar } from 'antd';
import moment from 'moment';
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

    const handleDelete = () => {
        setIsModalVisible(false);
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
                            <Button >Delete </Button>
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