import '../../css/app.css';
import { useUrlContext } from '../Context/UrlContext';

export default ({ page }) => {
    const url = useUrlContext();
    return (
        <>
            <div style={{margin:"4vi", marginTop:"10vh"}}>
                <img src={`${url}/api/archive/file/logo.png`} className="logo"/>
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
