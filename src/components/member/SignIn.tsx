import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { Input, Button } from "../../components/common";
import { message, Divider } from 'antd';
import {GoogleLoginCompnent} from "./social";

type LocationState = {
    nextPage?: string;
}

type Mock = {
    [key: string]: string | undefined;
}

type WithLocatonState = RouteComponentProps<Mock, Mock, LocationState>;


const SignIn: React.FC<WithLocatonState> = (props) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [err, setErr] = useState<string>("");
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

    const auth = useAppSelector((state) => state.auth);
    const { authenticate } = useActions();

    const handleSubmit = () => {
        authenticate({ username, password })
    }

    const info = (name: string) => {
        message.info(`Hi, ${name}`);
    };

    useEffect(() => {
        if (auth.loggedIn && auth.data) {
            info(auth.data.user)
            if (props.location.state && props.location.state.nextPage) {
                props.history.push(props.location.state.nextPage)
            } else {
                props.history.push('/')
            }
        }
        if (auth.error) {
            setErr(auth.error)
        } else {
            setErr('')
        }
    }, [auth])

    const validateInputs = () => {
        setSubmitDisabled(true);

        if (username !== "" && password !== "") {
            setSubmitDisabled(false)
        }
    }

    useEffect(() => {
        setErr('')
        validateInputs()
    }, [username, password])

    const handlePressEnter = () => {
        if (!submitDisabled) {
            handleSubmit()   
        }
    }

    return (
        <>
            <h1>Sign in</h1>
            <Input
                placeholder="username"
                value={username}
                onChange={(e) => { setUsername(e.target.value) }}
                rules={[{ required: true, message: 'Please input your username!' }]}
                autoFocus={true}
            />
            <Input
                placeholder="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                rules={[{ required: true, message: 'Please input your password!' }]}
                type="password"
                enterKeyCallback={()=>handlePressEnter()}
            />
            {err && (<p>{err}</p>)}
            <Button text={"Login"} onClick={handleSubmit} disabled={submitDisabled} loading={auth.loading} />
            <Divider />
            <GoogleLoginCompnent clientId = {"478378904599-hsv46g4ebvq10u19jfh1unjs7irghniq.apps.googleusercontent.com"} />
        </>
    )
}

export default SignIn;