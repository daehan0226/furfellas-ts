import React, { FC } from 'react'
import styled from "styled-components";
import { DatePicker } from 'antd';
import moment from "moment";

const DateContainer = styled.div`
    margin-right: 10px;
`;

interface DateSelectProps {
    title: string,
    date: string,
    setDate: (date: string) => void
}


const DateSelect: FC<DateSelectProps> = ({ title, date, setDate }) => {

    const onDatetimeChange = (_: any, dateString: string) => {
        setDate(dateString)
    }
    const dateFormat = 'YYYY-MM-DD';

    return (
        <DateContainer>
            <DatePicker
                placeholder={title} onChange={onDatetimeChange} defaultValue={moment(date, dateFormat)}
            />
        </DateContainer>
    );
};

export default DateSelect;
