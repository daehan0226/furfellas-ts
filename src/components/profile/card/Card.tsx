import React from 'react';
import styled from "styled-components";
import CardBody from "./CardBody";
import CardHead from "./CardHead";
import { Pet } from "../../../models"

const Container = styled.div`
  width: 320px;
  min-height: 300px;
  background-color: ${({ theme }) => theme.colors.primary.white};
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
`;


interface CardProps {
  data: Pet;
}


const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <Container>
      {data && data.name && (
        <>
          <CardHead title={data.name} />
          <CardBody data={data} />
        </>
      )}
    </Container>
  );
};

export default Card;
