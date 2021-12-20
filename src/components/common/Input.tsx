import React, { useState } from 'react'
import { Input as AntInput, InputProps as AntdInputProps } from 'antd';



interface InputProps extends AntdInputProps {
    rules?: [{
        required: boolean,
        message: string
    }]
}

const Input: React.FC<InputProps> = ({ onChange = () => { }, placeholder = "", value = "", disabled = false, type = "text", rules = [] }) => {
    const [err, setErr] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e)
    }

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        for (const rule of rules) {
            if (rule.required) {
                value === "" ? setErr(rule.message) : setErr("")
            }
        }
    }

    return (
        <>
            <AntInput placeholder={placeholder} value={value} disabled={disabled} allowClear onChange={handleChange} onBlur={handleBlur} type={type} />
            {err && <p>{err}</p>}
        </>
    );
};

export default Input;

