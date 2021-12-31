import React from 'react';
import { Card } from "./card";
import styled from "styled-components";
import useFetch from '../../hooks/useFetch';
import { MainApi } from '../../ApiService';
import { Pet } from '../../models';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`


const Profile: React.FC = () => {
    const api = MainApi.getInstance()
    const {data, loading} = useFetch<Pet>([], api.getPets)

    return (
        <Container>
            {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
            {data.map(pet => (
                <Card key={pet.id} data={pet} />
            ))}
        </Container>
    );
};

export default Profile;
