import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


export const useAuthContext = ()=>{
    const context = useContext(AuthContext);

    if(!context){
        throw Error('useAuthcontext must be used inside an authcontextprovider')

    }
    // console.log(context);
    return context;
}