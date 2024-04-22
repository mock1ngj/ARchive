import React, { useEffect, useRef, useState, useReducer, forwardRef } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import { FaQuestionCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';
import useAxios from 'axios-hooks';
import { useSectionContext } from '../Context/ViewedContext';
import { useUrlContext } from '../Context/UrlContext';

import Assets from '../ar-components/Assets';
import Section from '../ar-components/Section';
import Faq from './Faq';
import Review from './Review';

const reducer = (state, action) => {
    const url = state.url;
    switch (action.type) {
        case 'faq':
            if (state.faqDisplay == 'block')
                return { ...state, faqDisplay: 'none' }
            return { ...state, faqDisplay: 'block' }
        case 'closeReview':
            if (state.reviewDisplay == 'block')
                return { ...state, reviewDisplay: 'none' }
            return { ...state, reviewDisplay: 'block' }
        case 'reviewRedirect':
            state.setReview(old=>!old);
            window.open(`${url}/survey`, "_blank", "noreferrer");
            return { ...state, reviewDisplay: 'none' }
        default:
            break;
    }
}

export default () => {
    const url = useUrlContext();
    const sectionContext = useSectionContext();
    const section = sectionContext.section;
    const [review, setReview] = useState(false)
    const sceneRef = useRef(null);
    const faqRef = useRef(null);
    const reviewRef = useRef(null);
    const [popupToggle, dispatch] = useReducer(reducer, { faqDisplay: 'none', reviewDisplay: 'none', setReview:setReview, url:url});

    const [{ data: assetData, loading: assetLoading, error: assetError }] = useAxios({ url: `${url}/api/asset`, method: "POST" });
    const [{ data: sectionData, loading: sectionLoading, error: sectionError }] = useAxios({ url: `${url}/api/archive/section`, method: "POST" });

    const faqPopupHandler = () => {
        dispatch({ type: 'faq' });
        faqRef.current.style.display = popupToggle.faqDisplay;
    }

    const reviewPopupHandler = (type) => {
        dispatch({ type: type });
        reviewRef.current.style.display = popupToggle.reviewDisplay;
    }

    //show review popup every 10 minutes if user
    //hasnt reviewed this session yet
    setTimeout(() => {
        if (!review) {
            reviewRef.current.style.display = 'block';
        }
    }, 600000);

    //ask for review if user has seen 2 sections
    useEffect(() => {
        if (section.length > 3) {
            reviewRef.current.style.display = 'block';
        }
    }, [section.length]);

    //wait for data before starting AR
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

    return (
        <>
            <Faq faqPopupHandler={faqPopupHandler} ref={faqRef} />
            <Review reviewPopupHandler={reviewPopupHandler} ref={reviewRef} />
            {(assetLoading || sectionLoading) && (
                <p style={{textAlign:"center"}}>Loading...</p>
            )}
            {!(assetLoading || sectionLoading) && (
                <>
                    <IconContext.Provider value={{ color: "#4e9f3d", className: "faq-button" }}>
                        <div style={{ position: 'absolute', top: '2vh', right: '5vw', zIndex: 1000, cursor: "pointer" }}>
                            <FaQuestionCircle onClick={() => faqPopupHandler()}></FaQuestionCircle>
                        </div>
                    </IconContext.Provider>

                    <a-scene ref={sceneRef} mindar-image={`filterMinCF:5; filterBeta:2000; imageTargetSrc: ${url}/api/archive/file/targets.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
                        color-space="sRGB"
                        embedded
                        renderer="colorManagement: true, physicallyCorrectLights"
                        vr-mode-ui="enabled: false"
                        device-orientation-permission-ui="enabled: false">
                        <a-assets>
                            <Assets assets={assetData}></Assets>
                        </a-assets>
                        <a-camera position="0 0 0" look-controls="enabled: false" cursor="fuse: false; rayOrigin: mouse;" raycaster="far: ${customFields.libVersion}; objects: .clickable"></a-camera>
                        <Section sections={sectionData}></Section>
                    </a-scene>
                </>
            )}
        </>
    )
}