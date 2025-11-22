import { createContext} from "preact";
import { useState, useContext } from "preact/hooks";


export const UserContext = createContext(null)

export const UserProvider = ({children})=>{
    const [user, setUser] = useState(null)
    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}

export const getData = () => useContext(UserContext)