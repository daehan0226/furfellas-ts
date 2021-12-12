import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useAppSelector } from '../hooks/useTypedSelector';

const SingIn: React.FC<RouteComponentProps> = ({ match }) => {
    const auth = useAppSelector((state) => state.auth);
    const { authenticate } = useActions();

    const handleSubmit = () => {
        authenticate({ username: 'admin', password: '0716' })
    }

    useEffect(() => {
        console.log(auth)
    }, [auth])

    return (
        <>
            <h1>Sign in</h1>
            <button onClick={() => { handleSubmit() }} >ok</button>
        </>
    )
}

export default SingIn;