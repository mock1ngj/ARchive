import { useContext } from "react";
import { removeExtension, url, ArtifactContext } from "../../js/main.js";



export default () => {
    const assets = []
    const sections = useContext(ArtifactContext);
    
    //get the images inside the response
    sections.forEach(section => {
        const artifacts = section.artifacts;
        artifacts.forEach(artifact => {
            assets.push(artifact.image);
        });
    });

    console.log(assets);
    return (
        assets.map((asset, i) => (
            <img id={removeExtension(asset)} src={`${url}/api/archive/asset/${asset}`} crossOrigin="anonymous" key={i}></img>
        ))
    )
}