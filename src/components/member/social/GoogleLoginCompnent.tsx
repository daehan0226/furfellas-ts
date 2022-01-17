import * as React from 'react';
import GoogleLogin from 'react-google-login';
import { useActions } from '../../../hooks/useActions';

const GoogleLoginCompnent = (props: any) => {
  
  const { googleAuthenticate } = useActions();

  //클라이언트 ID (환경변수)
  let googleClientId:string="478378904599-hsv46g4ebvq10u19jfh1unjs7irghniq.apps.googleusercontent.com";
  const [userObj, setUserObj]=React.useState({
    email:"",
    name:""
  })
  //로그인 성공시 res처리
  const onLoginSuccess=(res:any)=>{
      googleAuthenticate(res.accessToken)
    setUserObj({...userObj,
      email:res.profileObj.email,
      name:res.profileObj.name
    })
    
  }
  
  return (
    <div>
      <GoogleLogin
        clientId = {googleClientId}
        buttonText={"Continue with Google"}
        onSuccess={result=>onLoginSuccess(result)}
        onFailure={result => console.log(result)}
        redirectUri={"http://localhost:3000/"}
      />
    </div>
  );
};

export default GoogleLoginCompnent;