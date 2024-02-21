import { ArtifactContext, removeExtension, primer } from "../../js/main"
import { useContext, useRef, useState } from "react";

/*
*Dont use values greater than 1 for the height and width since it will
*overflow or even 1 but 1 might be doable depending on the distance of the user
*/

export default ({ artifacts, section }) => {
    const data = useContext(ArtifactContext);
    const clickable = useRef(null);
    const [visible, setVisible] = useState(primer(data));
    /*
    * Updates visibility depending on the section and saves the last visible artifact 
    */
    const next = (section) => {
        let newVisible = [...visible];
        let sectionVisible = { ...newVisible[section] };
        sectionVisible.counter == sectionVisible.artifacts.length - 1 ? sectionVisible.counter = 0 : sectionVisible.counter++;
        sectionVisible.artifacts.forEach((value, index) => {
            if (value)
                sectionVisible.artifacts[index] = false;
            if (index == sectionVisible.counter)
                sectionVisible.artifacts[index] = true;
        });
        newVisible[section] = sectionVisible;
        setVisible(newVisible);
    }

    const prev = (section) => {
        let newVisible = [...visible];
        let sectionVisible = { ...newVisible[section] };
        sectionVisible.counter == 0 ? sectionVisible.counter = sectionVisible.artifacts.length - 1 : sectionVisible.counter--;
        sectionVisible.artifacts.forEach((value, index) => {
            if (value)
                sectionVisible.artifacts[index] = false;
            if (index == sectionVisible.counter)
                sectionVisible.artifacts[index] = true;
        });
        newVisible[section] = sectionVisible;
        setVisible(newVisible);
    }

    return (
        <a-entity position="0 0 0">
            <a-plane color="#4E9F3D" height="0.552" width="1"></a-plane>
            {artifacts.length == 0 ?
                (
                    <></>
                ) :
                (
                    artifacts.map((artifact, i) => (
                        <a-entity data-test={visible[section].artifacts[i]} visible={visible[section].artifacts[i]} key={i}>
                            <a-image src={`#${removeExtension(artifact.image)}`}
                                height="0.4"
                                width="0.4"
                                position="-0.24 0 0.1">
                            </a-image>
                            <a-image class="clickable"
                                onClick={() => { console.log(`play${i}`); }}
                                src="#play"
                                height="0.4"
                                width="0.4"
                                position="-0.24 0 0.11"></a-image>
                            <a-entity geometry="primitive:plane; height: 0; width: 0.2;"
                                text={`value:${artifact.name}; align:center; color: black;`}
                                position="0.24 0 0.1"
                                material="color: white">
                            </a-entity>
                        </a-entity>
                    ))
                )
            }
            <a-image class="clickable"
                onClick={() => next(section)}
                src="#next"
                position="0.6 0 0"
                height="0.125"
                width="0.125">
            </a-image>
            <a-image
                class="clickable"
                onClick={() => prev(section)}
                src="#prev"
                position="-0.6 0 0"
                height="0.125"
                width="0.125">
            </a-image>
        </a-entity>
    )
}