import React, { useEffect, useRef, useState, createContext } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import { FaQuestionCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { url } from '../../js/main';

import Assets from '../ar-components/Assets';
import Section from '../ar-components/Section';
import useAxios from 'axios-hooks';

export default ({ page }) => {
    const sceneRef = useRef(null);
    const [{ data: assetData, loading: assetLoading, error: assetError }] = useAxios({ url: `${url}/api/asset`, method: "POST" });
    const [{ data: sectionData, loading: sectionLoading, error: sectionError }] = useAxios({ url: `${url}/api/archive/section`, method: "POST" });
    //wait for loading before starting AR
    useEffect(() => {
        if (sceneRef != null) {
            const sceneEl = sceneRef.current;
            if (sceneEl != null) {
                const arSystem = sceneEl.systems["mindar-image-system"];
                sceneEl.addEventListener('renderstart', () => {
                    arSystem.start(); // start AR 
                });
            }
        }
    }, [assetLoading, sectionLoading]);

    if (assetLoading || sectionLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <IconContext.Provider value={{ color: "#4e9f3d", className: "faq-button" }}>
                <div style={{ position: 'absolute', top: '2vh', right: '5vw', zIndex: 1000, cursor: "pointer" }}>
                    <FaQuestionCircle onClick={() => { page('faq') }}></FaQuestionCircle>
                </div>
            </IconContext.Provider>
            <a-scene ref={sceneRef} mindar-image={`filterMinCF:5; filterBeta:2000; imageTargetSrc: ${url}/api/archive/file/targets.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`} color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
                <a-assets>
                    <Assets assets={assetData}></Assets>
                </a-assets>
                <a-camera position="0 0 0" look-controls="enabled: false" cursor="fuse: false; rayOrigin: mouse;" raycaster="far: ${customFields.libVersion}; objects: .clickable"></a-camera>
                <Section sections={sectionData}></Section>
            </a-scene>
        </>
    )
}