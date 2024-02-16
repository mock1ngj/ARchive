import React, { useState } from "react";

import Home from "./components/home";
import AR from "./components/ar";
import { request, ArtifactContext } from "../js/main";

//request the necessary data
const data = await request.section();

export default () => {

    const [page, setPage] = useState('home');
    return (
        <ArtifactContext.Provider value={data}>
            {page == "home" ?
                (
                    <Home page={setPage} />
                ) : (
                    <div style={{ position: "relative", height: "100vh", width: "100vw", overflow: "hidden", }} >
                        <AR page={setPage} />
                        <video></video>
                    </div>
                )
            }
        </ArtifactContext.Provider>
    )
}

