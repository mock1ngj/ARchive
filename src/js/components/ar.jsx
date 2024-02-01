import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import { FaQuestionCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';

export default ({ page }) => {
    const sceneRef = useRef(null);
    const clickable = useRef(null);

    useEffect(() => {
        const sceneEl = sceneRef.current;
        const arSystem = sceneEl.systems["mindar-image-system"];
        sceneEl.addEventListener('renderstart', () => {
            arSystem.start(); // start AR 
        });
    }, []);

    return (
        <>
            <IconContext.Provider value={{ color: "#4e9f3d", className: "faq-button" }}>
                <div style={{ position: 'absolute', top: '2vh', right: '5vw', zIndex: 1000 }}>
                    <FaQuestionCircle onClick={() => { page('home') }}></FaQuestionCircle>
                </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "#4e9f3d", className: "play-button" }}>
                <div style={{ position: 'absolute', bottom: '20vh', width: '100%', zIndex: 1000 }}>
                    <FaPlayCircle onClick={() => { page('home') }}></FaPlayCircle>
                </div>
            </IconContext.Provider>
            <a-scene ref={sceneRef} mindar-image="filterMinCF:1; filterBeta:500; imageTargetSrc: /targets.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;" color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
                <a-assets>
                    <img id="card" src="/ar-ui/card.png" />
                    <img id="next" src="/ar-ui/next.png" />
                    <img id="prev" src="/ar-ui/prev.png" />
                </a-assets>

                <a-camera position="0 0 0" look-controls="enabled: false" cursor="fuse: false; rayOrigin: mouse;" raycaster="far: ${customFields.libVersion}; objects: .clickable"></a-camera>

                <a-entity mindar-image-target="targetIndex: 0">
                    <a-image ref={clickable} class="clickable" src="#card" position="0 0 0" height="0.552" width="1" rotation="0 0 0" onClick={() => { page('home'); }}></a-image>
                    <a-entity position="0 0 0">
                        <a-image src="#next" position="0.6 0" height="0.125" width="0.125" rotation="0 0 0"></a-image>
                        <a-image src="#prev" position="-0.6 0 0" height="0.125" width="0.125" rotation="0 0 0"></a-image>
                    </a-entity>
                </a-entity>
            </a-scene>
        </>
    )
}