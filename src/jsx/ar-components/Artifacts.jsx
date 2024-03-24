import { ArtifactContext, removeExtension, primer, text2speech } from "../../js/main"
import { useContext, useState } from "react";
import bold from "/fonts/Roboto-Bold-msdf.json?url"
import light from "/fonts/Roboto-Regular-msdf.json?url"
/*
*Dont use values greater than 1 for the height and width since it will
*overflow or even 1 but 1 might be doable depending on the distance of the user
*/

export default ({ artifacts, section, view }) => {
    const context = useContext(ArtifactContext);
    const data = context[0];
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
        <a-entity position="0 0 0" visible={view}>
            {
                artifacts.map((artifact, i) => (
                    <a-entity visible={visible[section].artifacts[i]} key={i}>
                        <a-image src={`#${removeExtension(artifact.image)}`}
                            height="0.4"
                            width="0.4"
                            position="-0.14 0 0.1">
                        </a-image>
                        <a-image class="clickable"
                            onClick={() => { text2speech.play('testing class') }}
                            src="#play"
                            height="0.4"
                            width="0.4"
                            position="-0.14 0 0.11">
                        </a-image>
                        <a-text position="0.24 0.2 0.1" 
                            value={`${artifact.name}`}
                            align="center"
                            color="white"
                            width="0.8">
                        </a-text>
                        <a-text position="0.24 0 0.1"
                            value={`${artifact.description}`}
                            align="center"
                            color="white"
                            width="0.5">
                        </a-text>
                    </a-entity>
                ))
            }
            <a-image class="clickable"
                onClick={() => next(section)}
                src="#next"
                position="0.5 0 0"
                height="0.125"
                width="0.125">
            </a-image>
            <a-image
                class="clickable"
                onClick={() => prev(section)}
                src="#prev"
                position="-0.5 0 0"
                height="0.125"
                width="0.125">
            </a-image>
        </a-entity>
    )
}