import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';

interface ButtonProps extends AntdButtonProps {
    text: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick = () => { }, name = "", type = "primary", disabled = false, danger = false, loading = false, size = 'middle' }) => {
    return (
        <AntdButton type={type} name={name} onClick={() => onClick()} disabled={disabled} danger={danger} loading={loading} size={size} >
            {text}
        </AntdButton>
    );
};

export default Button;
