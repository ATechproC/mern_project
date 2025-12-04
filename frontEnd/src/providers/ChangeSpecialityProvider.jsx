import React, { createContext, useContext, useState } from "react";

const ChangeSpecialityContext = createContext({});

const ChangeSpecialityProvider = ({children}) => {

    const [speciality, setSpeciality ] = useState("");

    return <ChangeSpecialityContext.Provider value={{speciality, setSpeciality}}>
        { children }
    </ChangeSpecialityContext.Provider>
}

export default ChangeSpecialityProvider;

export const useChangeSpeciality = () => useContext(ChangeSpecialityContext);