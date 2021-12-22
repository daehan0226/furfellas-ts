import { Link } from 'react-router-dom';
import styled from "styled-components";
import { capitalizeFirstLetter } from '../../../utils';
import { SettingOutlined } from '@ant-design/icons';


const Container = styled.article`
    width: 300px;
    margin: 10px;
    border: 1px solid #f0f0f0;
`;

interface AdminCardProps {
    title: string;
    data: any[];
    link: string;
}

const CardTitle = styled.h2`
    margin-bottom: 10px;
`;

const CardBody = styled.div`
    padding: 10px;
    border-bottom: 1px solid #f0f0f0;
`;

const CardAction = styled.div`
    margin: 10px;
`;

const AdminCard: React.FC<AdminCardProps> = ({ title, data, link }) => {

    return (
        <Container>
            <CardTitle>{capitalizeFirstLetter(title)}</CardTitle>
            <CardBody>
                {title} count : {data.length}
            </CardBody>
            <CardAction>
                <Link to={link}><SettingOutlined key="setting" /></Link>

            </CardAction>
        </Container>
    )
}

export default AdminCard;
