import { url } from "../../js/main.js";

export default ({assets}) => {
    return (
        <>
            <img id="next" src="/ar-ui/next.png" />
            <img id="prev" src="/ar-ui/prev.png" />
            <img id="play" src="/ar-ui/play.png"/>
            <img id="mic" src="/ar-ui/texttospeechicon.png" />
            {assets.map((asset, i) => (
                <img id={asset.id} src={`${url}/api/archive/asset/${asset.image}`} crossOrigin="anonymous" key={i}></img>
            ))}
        </>
    )
}