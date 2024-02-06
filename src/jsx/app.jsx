import React, { useEffect, useState } from "react";

import Home from "./components/home";
import AR from "./components/ar";

export default () => {
    const [page, setPage] = useState('home');
    useEffect(() => {
        console.log(page);
    }, [page])
    return (
        <>
            {page == "home" ? (<Home page={setPage} />) :
                (<div style={{ position: "relative", height: "100vh", width: "100vw", overflow: "hidden", }} >
                    <AR page={setPage} />
                    <video></video>
                </div>)
            }
        </>
    )
}

