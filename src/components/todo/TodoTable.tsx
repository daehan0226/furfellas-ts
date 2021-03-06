import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table } from "antd";
import { Todo } from "../../models";
import { MainApi } from "../../ApiService";
import {
  addMonthToCurrentDate,
  getCurrentStringDate,
  sortObjectsByStringKey,
  strfDatetime,
} from "../../utils";
import { DateSelect } from "../common/select";

const Container = styled.div``;

const DateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0px;
  align-items: center;
  justify-content: flex-start;

  ${({ theme }) => theme.media.phone`
  justify-content: center;
  `}
`;

const columns: any = [
  {
    title: "Task",
    dataIndex: "task",
    width: "60%",
  },
  {
    title: "Date",
    dataIndex: "datetime",
    width: "40%",
    sorter: true,
  },
];

const TodoTable: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [datetimeBegin, setDatetimeBegin] = useState<string>(
    getCurrentStringDate()
  );
  const [datetimeEnd, setDatetimeEnd] = useState<string>(
    strfDatetime(addMonthToCurrentDate(1))
  );

  useEffect(() => {
    fetchTodos(datetimeBegin, datetimeEnd);
  }, [datetimeBegin, datetimeEnd]);

  const fetchTodos = async (datetimeBegin = "", datetimeEnd = "") => {
    const api = MainApi.getInstance();
    const todoData = await api.getTodos(
      `datetime_from=${datetimeBegin}&datetime_to=${datetimeEnd}`
    );
    setTodos([
      ...todoData.data.result.map((todo) => {
        todo.datetime = todo.datetime.split("T")[0];
        return todo;
      }),
    ]);
  };

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setTodos([
      ...sortObjectsByStringKey<Todo>(todos, "datetime", sorter.order),
    ]);
  };

  return (
    <Container>
      <DateContainer>
        <DateSelect
          title="Start Date"
          date={datetimeBegin}
          setDate={setDatetimeBegin}
        />
        <DateSelect
          title="End Date"
          date={datetimeEnd}
          setDate={setDatetimeEnd}
        />
      </DateContainer>
      <Table
        key={"id"}
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
