import React from 'react'
import { Input as AntInput, InputProps as AntdInputProps } from 'antd';



interface InputProps extends AntdInputProps {
}

const Input: React.FC<InputProps> = ({ onChange = () => { }, placeholder = "", value = "", disabled = false }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e)
    }


    return (
        <AntInput placeholder={placeholder} value={value} disabled={disabled} allowClear onChange={handleChange} />
    );
};

export default Input;

