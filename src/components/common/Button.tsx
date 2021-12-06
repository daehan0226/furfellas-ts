import { Button as AntdButton } from 'antd';
import { ButtonType } from 'antd/lib/button'

interface ButtonProps {
    text: string | number;
    onClick: () => void;
    type?: ButtonType;
    name?: any;
    disabled?: boolean;
    danger?: boolean
}

const Button: React.FC<ButtonProps> = ({ text, onClick = () => { }, name = "", type = "primary", disabled = false, danger = false }) => {
    return (
        <AntdButton type={type} name={name} onClick={() => onClick()} disabled={disabled} danger={danger}>
            {text}
        </AntdButton>
    );
};

export default Button;
