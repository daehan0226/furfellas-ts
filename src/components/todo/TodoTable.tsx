
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Table } from 'antd';
import { Todo } from '../../models';
import { MainApi } from '../../ApiService';
import { sortObjectsByStringKey } from '../../utils';

const Container = styled.div`
  
`;


const columns: any = [
    {
        title: 'Task',
        dataIndex: 'task',
        width: '60%',
    },
    {
        title: 'Date',
        dataIndex: 'datetime',
        width: '40%',
        sorter: true,
    }
];


const TodoTable: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        const api = new MainApi()
        const todoData = await api.getTodos()
        setTodos([...todoData.result])
    }

    // const sortTodos = (order: string) => {
    //     let sorted = [];
    //     if (order === "descend") {
    //         sorted = todos.sort((a: any, b: any) => (a.datetime < b.datetime ? 1 : -1));
    //     } else {
    //         sorted = todos.sort((a: any, b: any) => (a.datetime > b.datetime ? 1 : -1));
    //     }
    //     setTodos([...sorted]);
    // }

    const handleChange = (pagination: any, filters: any, sorter: any) => {
        sortObjectsByStringKey(todos, "datetime", sorter.order)
    }

    return (
        <Container>
            <Table
                bordered
                dataSource={todos}
                columns={columns}
                rowClassName="editable-row"
                onChange={handleChange}
            />
        </Container>
    );
};

export default TodoTable;
