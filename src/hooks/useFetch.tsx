import { useState, useEffect } from "react";
import { message } from 'antd';
import request from "axios";

type initialValueType = []
type apiCallType =  () => Promise<any>

const useFetch = <R extends any = any>(initialValue: initialValueType, apiCall:apiCallType) => {
  const [data, setData] = useState<initialValueType | R[]>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(()=>{
    getData()
  },[])
  
    const info = (text: string) => {
        message.info(text);
    };

    useEffect(()=>{
        if (error !== "") {
            info(error)
        }
    },[error])

    const getData = async () => {
        setLoading(true)
        try {
            const res = await apiCall()
            setData(res.data.result)
        } catch (e) {
            setData(initialValue)
            if (request.isAxiosError(e) && e.response) {
                setError(e.response.data.message)
            } else {
                setError("Oops, something went wrong. Try later again!")
            }
        } finally {
            setLoading(false)
        }
    }

  return { data, loading, error };
};

export default useFetch;
