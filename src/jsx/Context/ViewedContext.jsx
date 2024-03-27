import { createContext, useContext } from "react";
export const ViewedSection = createContext();
export const ViewedArtifact = createContext();

export const useSectionContext = () => { 
    return useContext(ViewedSection);
}

export const useArtifactContext = () => {
    return useContext(ViewedArtifact);
}