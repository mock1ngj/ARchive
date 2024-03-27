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

    document.addEventListener('visibilitychange', useCallback(() => {
        if (document.visibilityState === "hidden") {
            navigator.sendBeacon(`${url}/api/views`, JSON.stringify({sections:viewedSection, artifacts:viewedArtifact}))
        }
    }, [document.visibilityState]))
    /* 
        useCallback(() => {
            //send number of views to api if tab/window gets unfocused
            //more reliable than beforeunload event according to mdn
            document.addEventListener('visibilitychange', (e) => {
                if (document.visibilityState == "hidden" && !stat.sent) {
                    //navigator.sendBeacon(`${url}/api/views`, JSON.stringify(stat));
                    setStat(prev => ({
                        ...stat,
                        sent: !prev.sent
                    }))
                }
            });
        }, [stat.sent]) */

    return (
        <ViewedSection.Provider value={setViewedSection}>
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

