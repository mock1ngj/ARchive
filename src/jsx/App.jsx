import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import AR from "./components/Ar";
import { request, ArtifactContext, session, url } from "../js/main";
import Modal from "./components/Modal";
import Faq from "./components/Faq";
import axios from "axios";

export default () => {

    const [stat, setStat] = useState({ sections: [], artifacts: [], sent:false});
    const [data, setData] = useState();
    const [page, setPage] = useState('home');
    const [modal, setModal] = useState(session.get('agreement'));
    const [content, setContent] = useState('agreement');

    useEffect(()=>{
        //send number of views to api if tab/window gets unfocused
        //more reliable than beforeunload event according to mdn
        document.addEventListener('visibilitychange', (e) => {
            if (document.visibilityState == "hidden" && !stat.sent) {
                //navigator.sendBeacon(`${url}/api/views`, JSON.stringify(stat));
                setStat(prev=>({
                    ...stat,
                    sent:!prev.sent
                }))
            }
        });
        console.log(stat);
    })

    useEffect(() => {
        //request the necessary data and store inside session storage to prevent multiple request
        const fetch = async () => {
            const response = await request.section();
            setData(response);
            session.set('data', response);
        }
        session.get('data') == null ? fetch() : setData(session.get('data'));
    }, []);

    return (
        <ArtifactContext.Provider value={[data, stat, setStat]}>
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
            <Modal state={modal} setModal={setModal} content={content} />
        </ArtifactContext.Provider>
    )
}

