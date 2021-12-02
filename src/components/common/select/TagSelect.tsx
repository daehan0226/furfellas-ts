import React, { FC } from 'react'
import { Select } from 'antd';

const { Option } = Select;


interface TagSelectProps {
    placeholder: string,
    options: any[],
    selectKey: string,
    onChange: (key: string, value: number[]) => void,
}


const TagSelect: FC<TagSelectProps> = ({ placeholder, onChange, options, selectKey }) => {

    const handleChange = (value: any) => {
        onChange(selectKey, value)
    }


    return (
        <Select mode="tags" style={{ width: '100%' }} placeholder={placeholder} onChange={handleChange}
        >
            {options.map(({ id, name, color }) => (
                <Option key={`${id}-${name}`} value={id.toString()} style={{ color: `#${color}` }} >{name}</Option>
            ))}
        </Select>
    );
};

export default TagSelect;
