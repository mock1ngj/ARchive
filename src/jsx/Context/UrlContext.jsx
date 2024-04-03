import { createContext, useContext } from "react";

export const URLContext = createContext();

export const useUrlContext = () => {
    return useContext(URLContext);
}