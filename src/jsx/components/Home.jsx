import { url } from '../../js/main';
import '../../css/app.css';

export default ({ page }) => {
    return (
        <>
            <div style={{margin:"4vi", marginTop:"10vh"}}>
                <img src={`${url}/api/archive/asset/logo.png`} className="logo"/>
            </div>
            <div >
                <div >
                    <p style={{fontSize:"3vh"}}>Presents<b /></p>
                    <p style={{fontWeight:"bold", fontSize:"5vh"}}>ARchive</p>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"center", marginTop:"5vh"}}>
                <button className="start"
                    onClick={() => { page('AR') }}>
                    Start
                </button>
            </div>
        </>
    )
}
