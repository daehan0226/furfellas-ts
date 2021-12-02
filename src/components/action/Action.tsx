import styled from "styled-components";
import { ActionForm, ActionFormList } from "./";


const Container = styled.div`
`;


const Action: React.FC = () => {



    return (
        <Container>
            <h2>Action</h2>
            <ActionForm />
            <ActionFormList />
        </Container>
    );
};

export default Action;
