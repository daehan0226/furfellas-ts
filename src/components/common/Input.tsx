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
        margin: 0 auto;
    `}
`

interface InputProps extends AntdInputProps {
    rules?: [{
        required: boolean,
        message: string
    }],
    enterKeyCallback?: () => void
}

const Input: React.FC<InputProps> = ({ 
    onChange = () => {}, 
    placeholder = "", 
    value = "", 
    disabled = false, 
    type = "text", 
    rules = [], 
    size = "middle",
    enterKeyCallback = () => {},
    autoFocus=false
}) => {
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

    const handlePress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            enterKeyCallback()
        }
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
                onPressEnter={handlePress}
                autoFocus={autoFocus}
            />
            <ErrMsgBox>{err}</ErrMsgBox>
        </Container>
    );
};

export default Input;

