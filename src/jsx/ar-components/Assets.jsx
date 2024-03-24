import { useContext } from "react";
import { removeExtension, url, ArtifactContext } from "../../js/main.js";



export default () => {
    const assets = [];
    const context = useContext(ArtifactContext);
    const sections = context[0];
    //get the images inside the response
    sections.forEach(section => {
        const artifacts = section.artifacts;
        assets.push(section.image);
        artifacts.forEach(artifact => {
            assets.push(artifact.image);
        });
    });

    return (
        <>
            <img id="next" src="/ar-ui/next.png" />
            <img id="prev" src="/ar-ui/prev.png" />
            <img id="play" src="/ar-ui/play.png"></img>
            {assets.map((asset, i) => (
                <img id={removeExtension(asset)} src={`${url}/api/archive/asset/${asset}`} crossOrigin="anonymous" key={i}></img>
            ))}
        </>
    )
}