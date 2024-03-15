import { useContext, useRef, useState } from "react";
import { ArtifactContext } from "../../js/main";
import Artifacts from "./Artifacts";
import { useEffect } from "react";

export default () => {

    useEffect(() => {
        const targets = document.querySelector("a-entity[mindar-image-target]");
        targets.addEventListener("targetFound", event => {
            console.log(targets.getAttribute('data-test'));
        });
        targets.addEventListener("targetLost", event => {

        });
    });

    const sections = useContext(ArtifactContext);
    return (
        sections.map((section, i) => (
            <a-entity data-description={section.description} mindar-image-target={`targetIndex: ${i}`} key={i}>
                {
                    <Artifacts artifacts={section.artifacts} section={i} />
                }
            </a-entity>
        ))
    )
}