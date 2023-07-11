import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";


export const useSignup = ()=>{
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading]= useState(null)
    const  {dispatch} = useAuthContext()

    const signup = async(email, password, username)=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://login-backend-tejc.onrender.com/api/auth/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email, password, username})
        })
        const json = await response.json()

        
        if(!response.ok)
        {
            setIsLoading(false)
            setError(json)
        }
        if(response.ok)
        {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type:'LOGIN', payload:json})
            setIsLoading(false)
            navigate('/')
        }
        // console.log(response)    

    }

    return {signup, isLoading, error}
}