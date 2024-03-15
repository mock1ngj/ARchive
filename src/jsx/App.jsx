import React, { useState } from "react";
import Home from "./components/Home";
import AR from "./components/Ar";
import { request, ArtifactContext } from "../js/main";
import Modal from "./components/Modal";
import Faq from "./components/Faq";

//request the necessary data
const data = await request.section();

export default () => {
    const [page, setPage] = useState('home');
    const [modal, setModal] = useState('block');
    const [content, setContent] = useState('agreement');

    return (
        <ArtifactContext.Provider value={data}>
            {page == "home" &&(<Home page={setPage} />)}
            {page == "AR" && (
                <div style={{ position: "relative", height: "100vh", width: "100vw", overflow: "hidden", }} >
                    <AR page={setPage} />
                    <video></video>
                </div>
            )}
            {page == "faq" && (
                <Faq page={setPage}/>
            )}
            <Modal state={modal} setModal={setModal} content={content}/>
        </ArtifactContext.Provider>
    )
}

