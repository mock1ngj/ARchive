import { useContext, useState } from "react";
import { ArtifactContext, text2speech, removeExtension } from "../../js/main";
import Artifacts from "./Artifacts";
import { useEffect } from "react";

export default () => {
    const synth = window.speechSynthesis;
    const sections = useContext(ArtifactContext);
    const temp = [];
    sections.forEach(element => {
        temp.push([true, false]);
    });
    const [view, setView] = useState(temp);

    const viewHandler = (index) => {
        let newViews = [...view];
        let newView = [...view[index]];
        newView = [false, true];
        newViews[index] = newView;
        text2speech.stop();
        setView(newViews);
    }

    useEffect(() => {
        const targets = document.querySelector("a-entity[mindar-image-target]");
        const description = targets.getAttribute('data-description');
        const index = targets.getAttribute('data-index');
        targets.addEventListener("targetFound", event => {
            text2speech.playOnce(description, index);
        });
        targets.addEventListener("targetLost", event => {
            text2speech.pause();
        });
    });

    return (
        sections.map((section, i) => (
            <a-entity data-description={section.description} data-index={i} mindar-image-target={`targetIndex: ${i}`} key={i}>
                <a-entity position="0 0 0"
                    visible={view[i][0]}>
                    <a-image src={`#${removeExtension(section.image)}`} 
                        height="0.5"
                        width="0.5">
                    </a-image>
                    <a-entity class="clickable"
                        position="0 -0.3 0.3"
                        geometry="primitive:plane; width:0.3; height:0"
                        material="color:#4e9f3d"
                        text="value: View Artifacts; align:center; width:1"
                        onClick={() => viewHandler(i)}>
                    </a-entity>
                </a-entity>
                {
                    <Artifacts artifacts={section.artifacts} section={i} view={view[i][1]} />
                }
            </a-entity>
        ))
    )
}