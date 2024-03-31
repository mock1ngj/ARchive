import React, { createContext, useCallback, useEffect, useState } from "react";
import Home from "./components/Home";
import AR from "./components/Ar";
import { url } from "../js/main";
import AgreementModal from "./components/Modal";
import Faq from "./components/Faq";
import { useSessionStorage } from "./Hooks/useStorage";
import { ViewedArtifact, ViewedSection } from "./Context/ViewedContext";

export default () => {
    //initialize session
    const [viewedArtifact, setViewedArtifact] = useSessionStorage("sessionArtifact", []);
    const [viewedSection, setViewedSection] = useSessionStorage("sessionSection", []);

    const [page, setPage] = useState('home');

    //visibility checker
    document.addEventListener('visibilitychange', useCallback(() => {
        if (document.visibilityState === "hidden") {
            navigator.sendBeacon(`${url}/api/views`, JSON.stringify({sections:viewedSection, artifacts:viewedArtifact}))
        }
    }, [document.visibilityState]));

    return (
        <ViewedSection.Provider value={{setViewedSection:setViewedSection, section:viewedSection}}>
            <ViewedArtifact.Provider value={setViewedArtifact}>
                {page == "home" && (<Home page={setPage} />)}
                {page == "AR" && (
                    <div style={{ position: "relative", height: "100vh", width: "100vw", overflow: "hidden", }} >
                        <AR page={setPage} />
                        <video></video>
                    </div>

                )}
                {page == "faq" && (
                    <Faq page={setPage} />
                )}
                <AgreementModal />
            </ViewedArtifact.Provider>
        </ViewedSection.Provider>
    )
}

