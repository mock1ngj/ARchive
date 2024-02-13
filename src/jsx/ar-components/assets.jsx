import { request, removeExtension, url } from "../../js/main.js";
const assets = await request.asset();

export default () => {
    return (
        assets.map((asset, i) => (
            <img id={removeExtension(asset)} src={`${url}/api/archive/asset/${asset}`} crossOrigin="anonymous" key={i}></img>
        ))
    )
}