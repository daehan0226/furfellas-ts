import { Tag as AntdTag, TagProps as AntdTagProps } from 'antd';

interface TagProps extends AntdTagProps {
    text: string;
    onClick?: () => void;
    showPointer?: boolean;
}

const Tag: React.FC<TagProps> = ({ text, onClick = () => { }, color = "success", showPointer = true }) => {
    return (
        <AntdTag
            onClick={() => onClick()}
            color={color}
            style={{ cursor: showPointer ? 'pointer' : 'default' }}
        >
            {text}
        </AntdTag>
    );
};

export default Tag;
