import { Button as AntdButton } from 'antd';
import { ButtonProps as AntdButtonProps } from 'antd/lib/button'


interface ButtonProps extends AntdButtonProps {
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick = () => { }, name = "", type = "primary", disabled = false, danger = false }) => {
    return (
        <AntdButton type={type} name={name} onClick={() => onClick()} disabled={disabled} danger={danger}>
            {text}
        </AntdButton>
    );
};

export default Button;
