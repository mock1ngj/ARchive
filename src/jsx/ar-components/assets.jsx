import { request, removeExtension } from "../../js/main.js";
const assets = await request.asset();

export default () => {
    const test = ['1.png', '2.png', '3.jpg']
    return (
        assets.map((test, i) => (
            <img id={removeExtension(test)} src={`http://192.168.1.152:8000/api/archive/asset/${test}`} crossOrigin="anonymous" key={i}></img>
        ))
    )
}