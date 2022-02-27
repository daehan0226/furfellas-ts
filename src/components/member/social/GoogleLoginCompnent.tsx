import * as React from "react";
import GoogleLogin from "react-google-login";
import { useActions } from "../../../hooks/useActions";

const GoogleLoginCompnent = (props: any) => {
  const { googleAuthenticate } = useActions();

  let googleClientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [userObj, setUserObj] = React.useState({
    email: "",
    name: "",
  });
  const onLoginSuccess = (res: any) => {
    console.log(res);
    googleAuthenticate(res.accessToken);
    setUserObj({
      ...userObj,
      email: res.profileObj.email,
      name: res.profileObj.name,
    });
  };

  return (
    <div>
      <GoogleLogin
        clientId={googleClientId}
        buttonText={"Continue with Google"}
        onSuccess={(result) => onLoginSuccess(result)}
        onFailure={(result) => console.log(result)}
        redirectUri={"http://localhost:3000/"}
      />
    </div>
  );
};

export default GoogleLoginCompnent;
