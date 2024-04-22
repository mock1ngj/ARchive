import { useRef, useState } from "react";
import Artifacts from "./Artifacts";
import { useEffect } from "react";
import useSpeech from "../Hooks/useSpeech";
import { useArtifactContext, useSectionContext } from "../Context/ViewedContext";
import { has } from "lodash";

export default ({ sections }) => {
    const { play } = useSpeech();

    const sectionContext = useSectionContext();
    const setViewedSection = sectionContext.setViewedSection;

    const artifactContext = useArtifactContext();
    const setViewedArtifact = artifactContext;

    const sectionRef = useRef([]);
    const entityRef = useRef([]);
    const artifactRef = useRef([]);
    const [visible, setVisible] = useState(null);


    useEffect(() => {
        sections.forEach(section => {
            //target found
            sectionRef.current[section.id].addEventListener("targetFound", event => {
                //push to viewed section if unique
                setViewedSection((old) => {
                    if (!old.includes(section.id)) {
                        play(section.description);
                        return [...old, section.id]
                    }
                    return old
                })
            });
            //lost event
            sectionRef.current[section.id].addEventListener("targetLost", event => {
            });
        });
    }, []);

    //section and artifact card visibility
    useEffect(() => {
        if (visible != null) {
            const artifactId = visible.artifact;
            const sectionCard = visible.ref;
            const id = visible.id;
            const artifactCard = artifactRef.current[id];

            //push to viewed artifact if unique
            setViewedArtifact((old) => {
                if (!old.includes(artifactId) && has(artifactId, 'id')) {
                    return [...old, artifactId.id]
                }
                return old
            });

            //push to sessionStorage the viewed artifact
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
                    data-id={section.id}
                    key={i}>
                    <a-entity position="0 0 0"
                        ref={ref => entityRef.current[section.id] = ref}>
                        <a-image src={`#${section.id}`}
                            height="1"
                            width="1">
                        </a-image>
                        <a-entity class="clickable"
                            position="0 -0.7 0"
                            geometry="primitive:plane; width:1; height:0"
                            material="color:#4e9f3d"
                            text={`value:View ${section.as}; align:center; width:3`}
                            onClick={() => {
                                setVisible({ ref: entityRef.current[section.id], id: section.id, artifact: section.artifact[0] });
                            }}>
                        </a-entity>
                        <a-image class="clickable"
                            text="value:Play Introduction; align:center; width:3"
                            geometry="primitive:plane; width:1; height:0"
                            material="color:#4e9f3d"
                            position="0 -1 0"
                            height="1"
                            width="1"
                            onClick={() => {
                                play(section.description);
                            }}>
                        </a-image>
                    </a-entity>
                    <Artifacts sectionID={section.id} artifactList={section.artifact} index={i} ref={artifactRef} />
                </a-entity>
            ))}
        </>
    )
}