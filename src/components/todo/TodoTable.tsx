
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Table } from 'antd';
import { Todo } from '../../models';
import { MainApi } from '../../ApiService';
import { addMonthToCurrentDate, getCurrentStringDate, sortObjectsByStringKey, strfDatetime } from '../../utils';
import { DateSelect } from '../common/select';

const Container = styled.div`
  
`;

const DateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0px;
  align-items: center;
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
    const [datetiemBegin, setDatetiemBegin] = useState<string>(getCurrentStringDate());
    const [datetimeEnd, setDatetimeEnd] = useState<string>(strfDatetime(addMonthToCurrentDate(1)));

    useEffect(() => {
        fetchTodos()
    }, [])

    useEffect(() => {
        fetchTodos()
    }, [datetiemBegin, datetimeEnd])

    const fetchTodos = async () => {
        const api = new MainApi()
        const todoData = await api.getTodos(`datetime_from=${datetiemBegin}&datetime_to=${datetimeEnd}`)
        setTodos([...todoData.result])
    }

    const handleChange = (pagination: any, filters: any, sorter: any) => {
        sortObjectsByStringKey(todos, "datetime", sorter.order)
    }

    return (
        <Container>
            <DateContainer>
                <DateSelect title="Start Date" date={datetiemBegin} setDate={setDatetiemBegin} />
                <DateSelect title="End Date" date={datetimeEnd} setDate={setDatetimeEnd} />
            </DateContainer>
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
