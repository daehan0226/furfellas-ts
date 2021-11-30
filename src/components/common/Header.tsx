import React from 'react';
import styled from "styled-components";

// interface TodoListProps {
//   items: { id: string; text: string }[];
//   onDeleteTodo: (id: string) => void;
// }

const Spacer = styled.div`
  height: 80px;
  ${({ theme }) => theme.media.desktop`
    height: 80px;
  `}
  ${({ theme }) => theme.media.tablet`
    height: 70px;
  `}
  ${({ theme }) => theme.media.phone`
    height: 60px;
  `}
`;

const Container = styled(Spacer)`
  width: 100%;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  z-index: 100;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary.text};
  margin-bottom: 0px;
`;

const TodoList: React.FC<any> = props => {
    return (
        <>
            <Container>
                <Title>
                    test
                </Title>
            </Container>
            <Spacer />
        </>
    );
};

export default TodoList;
