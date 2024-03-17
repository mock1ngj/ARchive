import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import AR from "./components/Ar";
import { request, ArtifactContext, session } from "../js/main";
import Modal from "./components/Modal";
import Faq from "./components/Faq";


export default () => {
    const [data, setData] = useState()
    const [page, setPage] = useState('home');
    const [modal, setModal] = useState('block');
    const [content, setContent] = useState('agreement');

    //request the necessary data and store inside session storage to prevent multiple request
    useEffect(() => {
        const fetch = async () => {
            const response = await request.section();
            setData(response);
            session.set('data', response);
        }
        session.get('data') == null ? fetch() : setData(session.get('data'));
    }, []);

    return (
        <ArtifactContext.Provider value={data}>
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

