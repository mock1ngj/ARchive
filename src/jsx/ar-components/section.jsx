import { useContext} from "react";
import { ArtifactContext } from "../../js/main";
import Artifacts from "./artifacts";

export default () => {
    const sections = useContext(ArtifactContext);

    return (
        sections.map((section, i) => (
            <a-entity mindar-image-target={`targetIndex:${i}`} key={i}>
                <Artifacts artifacts={section.artifacts} section={i}></Artifacts>
            </a-entity>
        ))
    )
}