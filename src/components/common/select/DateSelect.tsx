import React, { FC } from 'react'
import styled from "styled-components";
import { DatePicker } from 'antd';
import moment from "moment";


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
        <DatePicker
            placeholder={title} onChange={onDatetimeChange} defaultValue={moment(date, dateFormat)}
        />
    );
};

export default DateSelect;
