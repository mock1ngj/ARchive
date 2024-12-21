import { forwardRef } from "react";
export default forwardRef((props, ref) => {
    const { faqPopupHandler } = props;
    const sectionStyle = { display: "block", marginTop:"2vh" };
    return (
        <div ref={ref} className="faq">
            <div className="header">
                <button type="button"
                    style={{ justifyContent: "center", alignItems: "center", border: "none", background: "none", cursor: "pointer" }}
                    onClick={() => faqPopupHandler()}>
                    <svg className="flex-shrink:0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>
            <hr />
            <div style={{ display: 'block', padding: '1dvw 3dvh', color: 'white', textAlign: "left", overflowY: "scroll" }}>
                <section style={sectionStyle}>
                    Find an <p style={{ fontWeight: "bold", display: "inline-block" }}> ARchive image </p> and point the camera to the image
                </section>
                <section style={sectionStyle}>
                    Press
                    <img style={{ display: "inline-block", width: "2vmin", margin: "0 3px 0 3px" }} src="/ar-ui/texttospeechicon.png" />
                    to initiate the text-to-speech
                </section>
                <section style={sectionStyle}>
                    Press <p style={{ display: "inline-block", fontWeight: "bold" }}> View </p> to view the available artifacts in the section
                </section>
                <section style={sectionStyle}>
                    Press <p style={{ display: "inline-block", fontWeight: "bold" }}> Play Introduction</p> to hear the section introduction
                </section>
                <section style={sectionStyle}>
                    If the image is <p style={{ display: "inline-block", fontWeight: "bold"}}>too large</p> move the device away from the ARchive image
                </section>
            </div>
        </div >
    )
});
