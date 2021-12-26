import React, { FC } from 'react'
import { Select } from 'antd';

const { Option } = Select;


interface TagSelectProps {
    placeholder: string,
    options: any[],
    onChange: (value: number[]) => void,
    defaultValue?: number[],
    multipleSelect?: boolean,
}


const TagSelect: FC<TagSelectProps> = ({ placeholder, onChange, options, defaultValue = [], multipleSelect = true }) => {

    const handleChange = (value: any) => {
        onChange(value)
    }
    return (
        <Select
            mode={multipleSelect ? "tags" : undefined}
            style={{ width: '100%', maxWidth: 300 }}
            placeholder={placeholder}
            onChange={handleChange}
            defaultValue={defaultValue}

        >
            {options.map(({ id, name, color }) => (
                <Option key={`${id}-${name}`} value={id.toString()} style={{ color: `#${color}` }} >{name}</Option>
            ))}
        </Select>
    );
};

export default TagSelect;
