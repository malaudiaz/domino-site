import { createContext, useContext, useEffect, useState } from "react";
import languagesObject from "./languagesObject";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getCookie } from 'cookies-next';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used within a TasksProvider");
    return context;
};

export const AppContextProvider = ({ children }) => {

    const [profile, setProfile] = useLocalStorage("profile", {});
    const [lang, setLang] = useState("es");
    const i18n = languagesObject[lang];
    const token = getCookie('SmartDomino-Token');

    const createProfile = (id, name, photo, type) => setProfile({...profile, id, name, photo, type });

    return (
        <AppContext.Provider
          value={{
            profile,
            createProfile,
            lang, 
            setLang,
            i18n,
            token
          }}
        >
          {children}
        </AppContext.Provider>
    );    
};
