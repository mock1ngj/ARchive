import React, { useEffect, useRef, useState } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import { FaQuestionCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { showArtifact } from '../../js/showArtifact';
import { url } from '../../js/main';
import Assets from '../ar-components/assets';
import Section from '../ar-components/section';
export default ({ page }) => {
    const sceneRef = useRef(null);

    const showArt = new showArtifact(); 
    const [artifact, setArtifact] = useState({});
    const [ctr, setCtr] = useState(0);

    const [artifactSection, setArtifactSection] = useState(null);



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
{/*             <IconContext.Provider value={{ color: "#4e9f3d", className: "play-button" }}>
                <div style={{ position: 'absolute', bottom: '20vh', width: '100%', zIndex: 1000 }}>
                    <FaPlayCircle onClick={() => speech()}></FaPlayCircle>
                </div>
            </IconContext.Provider> */}
            <a-scene ref={sceneRef} mindar-image={`filterMinCF:5; filterBeta:2000; imageTargetSrc: ${url}/api/archive/file/targets.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`} color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
                <a-assets>
                    <img id="next" src="/ar-ui/next.png" />
                    <img id="prev" src="/ar-ui/prev.png" />
                    <Assets></Assets>
                </a-assets>
                <a-camera position="0 0 0" look-controls="enabled: false" cursor="fuse: false; rayOrigin: mouse;" raycaster="far: ${customFields.libVersion}; objects: .clickable"></a-camera>
                <Section></Section>
            </a-scene>
        </>
    )
}