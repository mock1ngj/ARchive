import React, { useEffect, useRef, useState, createContext, useReducer, forwardRef } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import { FaQuestionCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { url } from '../../js/main';

import Assets from '../ar-components/Assets';
import Section from '../ar-components/Section';
import useAxios from 'axios-hooks';
import { useSessionStorage } from '../Hooks/useStorage';
import { useSectionContext } from '../Context/ViewedContext';

const reducer = (state, action) => {
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
            window.open(`${url}/survey`, "_blank", "noreferrer");
            return { ...state, reviewDisplay: 'none' }
        default:
            break;
    }
}

export default () => {
    const sectionContext = useSectionContext();
    const section = sectionContext.section;
    const [review, setReview] = useSessionStorage('review', false)
    const sceneRef = useRef(null);
    const faqRef = useRef(null);
    const reviewRef = useRef(null);
    const [popupToggle, dispatch] = useReducer(reducer, { faqDisplay: 'none', reviewDisplay: 'none' });

    const [{ data: assetData, loading: assetLoading, error: assetError }] = useAxios({ url: `${url}/api/asset`, method: "POST" });
    const [{ data: sectionData, loading: sectionLoading, error: sectionError }] = useAxios({ url: `${url}/api/archive/section`, method: "POST" });

    const faqPopupHandler = () => {
        dispatch({ type: 'faq' });
        faqRef.current.style.display = popupToggle.faqDisplay;
    }

    const reviewPopupHandler = (type) => {
        dispatch({ type: type });
        if (type.match("reviewRedirect")) {
            console.log('fire');

        }
        reviewRef.current.style.display = popupToggle.reviewDisplay;
    }

    //show review popup every 5 minutes if user
    //hasnt reviewed this session yet
    setTimeout(() => {
        if (!review) {
            reviewRef.current.style.display = 'block';
        }
    }, 300000);

    //ask for review if user has seen 3 sections
    useEffect(() => {
        if (section.length > 1) {
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
                <p>Loading...</p>
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

const Faq = forwardRef((props, ref) => {
    const { faqPopupHandler } = props;

    return (
        <div ref={ref} className="faq">
            <div className="header">
                <button type="button"
                    style={{ justifyContent: "center", alignItems: "center", border: "none", background: "none", cursor: "pointer" }}
                    onClick={() => faqPopupHandler()}>
                    <svg className="flex-shrink:0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>
            <hr />
            <div style={{ display: 'block', padding: '1vw 3vh', color: 'white', textAlign:"left" }}>
                <section style={{display:"block"}}>
                    <p style={{fontWeight:"bold", display:"inline-block"}}>1.</p> Find an ARchive image and point the camera to the image
                </section>
                <section style={{ display: "block" }}>
                    Press
                    <img style={{ display: "inline-block", width:"2vw", margin:"0 3px 0 3px" }} src="/ar-ui/texttospeechicon.png"/>
                    to initiate the text-to-speech
                </section>
                <section style={{ display: "block" }}>
                    Press
                    <p style={{display:"inline-block", fontWeight:"bold"}}>View Artifacts to view the available artifacts in the section</p>
                </section>
            </div>
        </div>
    )
});

const Review = forwardRef((props, ref) => {
    const { reviewPopupHandler } = props;
    return (
        <div ref={ref} className="review">
            <div className="header">
                <button type="button"
                    style={{ justifyContent: "center", alignItems: "center", border: "none", background: "none", cursor: "pointer" }}
                    onClick={() => reviewPopupHandler('closeReview')}>
                    <svg className="flex-shrink:0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>
            <hr />
            <div style={{ display: 'block', padding: '1vw 3vh', textAlign: 'center' }}>
                <section>
                    Your visit to our museum includes an exciting augmented reality experience that we've carefully curated for our visitors. We're eager to hear about your impressions of this innovative feature. Could you spare a moment to share a brief review of your overall museum experience, including your thoughts on the augmented reality component? Your feedback is instrumental in shaping future enhancements.
                    <p style={{ display: 'block', fontWeight: 'bold' }}>Thank you for your valuable input!</p>
                </section>
            </div>
            <hr />
            <div className='footer'>
                <button type="button" className="review-button"
                    onClick={() => reviewPopupHandler("reviewRedirect")}>
                    Review
                </button>
            </div>
        </div>
    )
})