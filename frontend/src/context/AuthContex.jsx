import { createContext } from "react";
export const AuthContext = createContext()
    const value={

    }
export const AuthContextProvider=(props)=>{
    return(
    <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>
    )
}