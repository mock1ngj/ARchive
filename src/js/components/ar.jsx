import React, { useEffect, useRef, useState } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import { FaQuestionCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { showArtifact } from '../main';

export default ({ page }) => {
    const sceneRef = useRef(null);
    const clickable = useRef(null);
    const section = useRef(null);
    const showArt = new showArtifact(); 
    const [artifact, setArtifact] = useState({});
    const [ctr, setCtr] = useState(0);
    const synth = window.speechSynthesis;
    const [artifactSection, setArtifactSection] = useState(null);

    const speech = () => {
        const utterance = new SpeechSynthesisUtterance('Testing API');
        synth.speak(utterance);
    }

    //Next Loop Mechanic
    const next = () => {
        const section = scene.current;
        section.addEventListener('targetFound', event => {
            //get current section
            temp = event.target.getAttribute('data-section');
            if (temp != artifactSection) {
                setCtr(0);
                showArt.reset(artifact.section);
            }
            setArtifactSection(temp);
        });

        //TODO: retrieve the number of artifacts per section
        setCtr((ctr) => ctr != 2 ? ctr + 1 : ctr = 0);
        const nextArtifact = showArt(artifact);

        setArtifact({ artifactSection: nextArtifact });
    }

    //Previous Loop Mechanic
    const prev = () => {
        console.log(`Before:${ctr}`);
        setCtr((ctr) => ctr != 0 ? ctr - 1 : ctr = 2);
        console.log(`After:${ctr}`);
        const prevArtifact = artifact.map((show, i) => {
            if (i == ctr) {
                return show = true;
            }
            return show = false;
        })
        setArtifact(prevArtifact);
    }

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
                    <FaPlayCircle onClick={() => speech()}></FaPlayCircle>
                </div>
            </IconContext.Provider>
            <a-scene ref={sceneRef} mindar-image="filterMinCF:5; filterBeta:2000; imageTargetSrc: /targets.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;" color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
                <a-assets>
                    <img id="next" src="/ar-ui/next.png" />
                    <img id="prev" src="/ar-ui/prev.png" />
                    <img id="petey" src="/ar-ui/petey.jpg" />
                    <img id="katniss" src="/ar-ui/katniss.jpg" />
                    <img id="logo" src="/ar-ui/logo.jpg" />
                </a-assets>

                <a-camera position="0 0 0" look-controls="enabled: false" cursor="fuse: false; rayOrigin: mouse;" raycaster="far: ${customFields.libVersion}; objects: .clickable"></a-camera>

                <a-entity ref={section} data-section="test" mindar-image-target="targetIndex: 0">
                    <a-entity position="0 0 0">
                        <a-plane color="#4E9F3D" height="0.552" width="1"></a-plane>
                        <a-entity visible={artifact[0]}>
                            <a-image src="#katniss"
                                height="0.4"
                                width="0.4"
                                position="-0.24 0 0.1">
                            </a-image>
                            <a-entity geometry="primitive:plane; height: 0; width: 0;"
                                text="value:Hunger Games; align:center; width: 0.4; color: black;"
                                position="0.24 0 0.1"
                                material="color: white">
                            </a-entity>
                        </a-entity>
                        <a-entity visible={artifact[1]}>
                            <a-image src="#petey"
                                height="0.4"
                                width="0.4"
                                position="-0.24 0 0.1">
                            </a-image>
                        </a-entity>
                        <a-entity visible={artifact[2]}>
                            <a-image src="#logo"
                                height="0.4"
                                width="0.4"
                                position="-0.24 0 0.1">
                            </a-image>
                        </a-entity>
                        <a-image ref={clickable} class="clickable" onClick={() => next()} src="#next" position="0.6 0 0" height="0.125" width="0.125" rotation="0 0 0"></a-image>
                        <a-image ref={clickable} class="clickable" onClick={() => prev()} src="#prev" position="-0.6 0 0" height="0.125" width="0.125" rotation="0 0 0"></a-image>
                    </a-entity>
                </a-entity>

                <a-entity ref={section} data-section="test2" mindar-image-target="targetIndex: 1">

                </a-entity>
            </a-scene>
        </>
    )
}