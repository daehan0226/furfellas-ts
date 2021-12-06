import axios, { AxiosInstance, AxiosResponse, HeadersDefaults, AxiosError } from 'axios';
import Cookies from "universal-cookie";

interface CommonHeaderProperties extends HeadersDefaults {
    Authorization?: string;
}


declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> { }
    interface AxiosError<T = any> extends Promise<T> { }
}

abstract class HttpClient {
    protected readonly instance: AxiosInstance;

    public constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
        });

        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
        this.instance.defaults.headers = {
            Authorization: this._getSession()
        } as CommonHeaderProperties;
    };

    private _getSession = () => {
        const cookies = new Cookies();
        return cookies.get("EID_SES");
    }

    private _handleResponse = ({ data, status }: AxiosResponse) => { return { data, status } };

    protected _handleError = (err: AxiosError) => Promise.reject(err);
}

export default HttpClient