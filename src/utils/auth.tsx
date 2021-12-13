import Cookies from "universal-cookie";


export const saveToken = (token: string) => {
    const cookies = new Cookies();
    cookies.set("EID_SES", token, {
        path: "/",
        maxAge: 60 * 60 * 24,
    });
}


export const deleteToken = () => {
    const cookies = new Cookies();
    cookies.remove("EID_SES", { path: "/" });
}