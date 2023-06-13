import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = ()=>{
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password)=>{
        setIsLoading(true);
        setError(null);
        try{

            const response = await axios.post('/api/auth/login', {email:email, password:password})
            console.log(response.data);
            setIsLoading(false);
            localStorage.setItem('user', JSON.stringify(response.data))
            dispatch({type:'LOGIN', payload:response.data})
            navigate('/')
        }catch(err)
        {
            console.log(err.response.data)
            setError(err.response.data)
            setIsLoading(false)
        }
    }

    return {login, error, isLoading}
}