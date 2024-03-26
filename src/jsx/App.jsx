import React, {useState } from "react";
import Home from "./components/Home";
import AR from "./components/Ar";
import { url } from "../js/main";
import AgreementModal from "./components/Modal";
import Faq from "./components/Faq";



export default () => {
    const [page, setPage] = useState('home');

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
        <>
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
            <AgreementModal/>
        </>
    )
}

