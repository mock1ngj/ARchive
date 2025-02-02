import React, { useCallback, useEffect, useState } from "react";
import Home from "./components/Home";
import AR from "./components/Ar";
import AgreementModal from "./components/Agreement";
import { useSessionStorage } from "./Hooks/useStorage";
import { ViewedArtifact, ViewedSection } from "./Context/ViewedContext";
import { URLContext } from "./Context/UrlContext";

export default () => {
    const url = 'https://cfc2d22e184f.ngrok.app';
    //initialize session
    const [viewedArtifact, setViewedArtifact] = useSessionStorage("sessionArtifact", []);
    const [viewedSection, setViewedSection] = useSessionStorage("sessionSection", []);

    const [page, setPage] = useState('home');

    //visibility checker
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === "hidden") {
            //send views
            navigator.sendBeacon(`${url}/api/views`, JSON.stringify({ sections: viewedSection, artifacts: viewedArtifact }))
        }
    });

    return (
        <URLContext.Provider value={url}>
            <ViewedSection.Provider value={{ setViewedSection: setViewedSection, section: viewedSection }}>
                <ViewedArtifact.Provider value={setViewedArtifact}>
                    {page == "home" && (<Home page={setPage} />)}
                    {page == "AR" && (
                        <div style={{ position: "relative", height: "100vh", width: "100vw", overflow: "hidden", }} >
                            <AR page={setPage} />
                            <video></video>
                        </div>

                    )}
                    <AgreementModal />
                </ViewedArtifact.Provider>
            </ViewedSection.Provider>
        </URLContext.Provider>

    )
}

