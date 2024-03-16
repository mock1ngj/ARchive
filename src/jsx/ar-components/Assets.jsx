import { useContext } from "react";
import { removeExtension, url, ArtifactContext } from "../../js/main.js";



export default () => {
    const artifactAssets = [];
    const sectionAssets = [];
    const sections = useContext(ArtifactContext);

    //get the images inside the response
    sections.forEach(section => {
        const artifacts = section.artifacts;
        sectionAssets.push(section.image);
        artifacts.forEach(artifact => {
            artifactAssets.push(artifact.image);
        });
    });

    return (
        <>
            <img id="next" src="/ar-ui/next.png" />
            <img id="prev" src="/ar-ui/prev.png" />
            <img id="play" src="/ar-ui/play.png"></img>
            {artifactAssets.map((asset, i) => (
                <img id={removeExtension(asset)} src={`${url}/api/archive/asset/artifacts/${asset}`} crossOrigin="anonymous" key={i}></img>
            ))}
            {sectionAssets.map((asset, i) => (
                <img id={removeExtension(asset)} src={`${url}/api/archive/asset/sections/${asset}`} crossOrigin="anonymous" key={i}></img>
            ))}
        </>
    )
}