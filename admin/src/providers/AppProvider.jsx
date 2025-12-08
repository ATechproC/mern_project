import React, { createContext, useContext, useState} from 'react';

const AppContext = createContext({});

const AppProvider = ({ children }) => {

    const [loginState, setLoginState] = useState("Admin");

    const value = {
        loginState, setLoginState
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppProvider

export const useApp = () => useContext(AppContext);