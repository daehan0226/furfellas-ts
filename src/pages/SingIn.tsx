import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useAppSelector } from '../hooks/useTypedSelector';
import { Input, Button } from "../components/common";

type LocationState = {
    nextPage?: string;
}

type Mock = {
    [key: string]: string | undefined;
}

type WithLocatonState = RouteComponentProps<Mock, Mock, LocationState>;

const SingIn: React.FC<WithLocatonState> = (props) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

    const auth = useAppSelector((state) => state.auth);
    const { authenticate } = useActions();

    const handleSubmit = () => {
        authenticate({ username, password })
    }

    useEffect(() => {
        if (auth.loggedIn) {
            if (props.location.state && props.location.state.nextPage) {
                props.history.push(props.location.state.nextPage)
            } else {
                props.history.push('/')
            }
        }
    }, [auth])

    const validateInputs = () => {
        setSubmitDisabled(true);

        if (username === "" || username.length < 2) {
            return;
        }

        if (password === "" || password.length < 2) {
            return;
        }
        setSubmitDisabled(false)
    }

    useEffect(() => {
        validateInputs()
    }, [username, password])

    return (
        <>
            <h1>Sign in</h1>
            <Input placeholder="username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            <Input placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" />
            <Button text={"Login"} onClick={handleSubmit} disabled={submitDisabled} />
        </>
    )
}

export default SingIn;