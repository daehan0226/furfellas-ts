import React, { useEffect, useState } from 'react'
import { Input as AntInput, InputProps as AntdInputProps } from 'antd';
import styled from "styled-components";
import { ErrMsgBox } from "../../styles/common"

const CustomAntInput = styled(AntInput)`
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    ${({ theme }) => theme.media.phone`
        width: 220px;
    `}
`

interface InputProps extends AntdInputProps {
    rules?: [{
        required: boolean,
        message: string
    }]
}

const Input: React.FC<InputProps> = ({ onChange = () => {}, placeholder = "", value = "", disabled = false, type = "text", rules = [], size = "middle" }) => {
    const [err, setErr] = useState<string>("");
    const [didMount, setDidMount] = useState<boolean>(false)

    const validate = () => {
        for (const rule of rules) {
            if (rule.required) {
                value === "" ? setErr(rule.message) : setErr("")
            }
        }
    }

    useEffect(() => {
        setDidMount(true)
    }, [])

    useEffect(() => {
        if (didMount) {
            validate()
        }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e)
    }

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        validate()
    }

    return (
        <Container>
            <CustomAntInput
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                allowClear
                onChange={handleChange}
                onBlur={handleBlur}
                type={type}
                size={size}
            />
            <ErrMsgBox>{err}</ErrMsgBox>
        </Container>
    );
};

export default Input;

