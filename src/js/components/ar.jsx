import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import { FaQuestionCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';

export default ({page}) => {
    const sceneRef = useRef(null);

    useEffect(() => {
        const sceneEl = sceneRef.current;
        const arSystem = sceneEl.systems["mindar-image-system"];
        sceneEl.addEventListener('renderstart', () => {
            arSystem.start(); // start AR 
        });
    }, []);

    return (
        <>
            <IconContext.Provider value={{ color:"#4e9f3d" , className: "faq-button"}}>
                <div style={{position: 'absolute', top: '2vh', right: '5vw', zIndex:1000}}>
                    <FaQuestionCircle onClick={()=>{page('home')}}></FaQuestionCircle>
                </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "#4e9f3d", className: "play-button" }}>
                <div style={{position:'absolute', bottom:'20vh', width: '100%', zIndex:1000}}>
                    <FaPlayCircle onClick={()=>{page('home')}}></FaPlayCircle>
                </div>
            </IconContext.Provider>
            <a-scene ref={sceneRef} mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;" color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
                <a-assets>
                    <img id="card" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.png" />
                    <a-asset-item id="avatarModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"></a-asset-item>
                </a-assets>

                <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

                <a-entity mindar-image-target="targetIndex: 0">
                    <a-plane src="#card" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane>
                    <a-gltf-model rotation="0 0 0 " position="0 0 0.1" scale="0.005 0.005 0.005" src="#avatarModel" animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"></a-gltf-model>
                </a-entity>
            </a-scene>
        </>
    )
}