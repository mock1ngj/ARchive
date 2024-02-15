import { useContext, useRef } from "react";
import { ArtifactContext } from "../../js/main";
import Artifacts from "./artifacts";

export default () => {
    const sections = useContext(ArtifactContext);
    const sectionRef = useRef(null);
    const clickable = useRef(null);
    
    return (
        sections.map((section, i) => (
            <a-entity ref={sectionRef} data-section={section.name} mindar-image-target={`targetIndex: ${i}`} key={i}>
                <Artifacts artifacts = {section.artifacts}></Artifacts>
                <a-image ref={clickable} class="clickable" onClick={() => { console.log('next'); }} src="#next" position="0.6 0 0" height="0.125" width="0.125" rotation="0 0 0"></a-image>
                <a-image ref={clickable} class="clickable" onClick={() => { console.log('prev'); }} src="#prev" position="-0.6 0 0" height="0.125" width="0.125" rotation="0 0 0"></a-image>
            </a-entity>
        ))
    )
}