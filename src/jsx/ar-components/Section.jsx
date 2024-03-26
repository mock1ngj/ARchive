import { useContext, useRef, useState } from "react";
import Artifacts from "./Artifacts";
import { useEffect } from "react";
import useSpeech from "../Hooks/useSpeech";
import { useSessionStorage } from "../Hooks/useStorage";

export default ({ sections }) => {
    const { playOnce, stop } = useSpeech();
    const [viewedSection, setViewedSection] = useSessionStorage("viewedSection", []);
    const sectionRef = useRef([]);
    const entityRef = useRef([]);
    const artifactRef = useRef([]);
    const [visible, setVisible] = useState(null);
    
    //target found
    useEffect(() => {
        sections.forEach(section => {
            sectionRef.current[section.id].addEventListener("targetFound", element => {
                playOnce(section.id, section.description);
                
                //push to sessionStorage the viewed section
                if (typeof (viewedSection) == "undefined") {
                    setViewedSection([section.id]);
                } 
                if (!viewedSection.includes(section.id)) {
                    setViewedSection([...viewedSection, section.id]);
                }
    
            });
            sectionRef.current[section.id].addEventListener("targetLost", element => {
                stop();
            });
        });
    });

    //section and artifact card visibility
    useEffect(() => {
        if (visible != null) {
            const sectionCard = visible.ref;
            const id = visible.id;
            const artifactCard = artifactRef.current[id];

            sectionCard.object3D.visible = false;
            artifactCard.object3D.visible = true;
        };
    }, [visible]);

    return (
        <>
            {sections.map((section, i) => (
                <a-entity
                    ref={ref => sectionRef.current[section.id] = ref}
                    mindar-image-target={`targetIndex: ${i}`}
                    key={i}>
                    <a-entity position="0 0 0"
                        ref={ref => entityRef.current[section.id] = ref}>
                        <a-image src={`#${section.id}`}
                            height="0.5"
                            width="0.5">
                        </a-image>
                        <a-entity class="clickable"
                            position="0 -0.3 0.3"
                            geometry="primitive:plane; width:0.3; height:0"
                            material="color:#4e9f3d"
                            text="value: View Artifacts; align:center; width:1"
                            onClick={() => {
                                setVisible({ref:entityRef.current[section.id], id:section.id});
                                stop();
                            }}>
                        </a-entity>
                    </a-entity>
                    <Artifacts sectionID={section.id} artifactList={section.artifact} index={i} ref={artifactRef}/>
                </a-entity>
            ))}
        </>
    )
}