import { forwardRef } from "react";
export default forwardRef((props, ref) => {
    const { faqPopupHandler } = props;

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
            <div style={{ display: 'block', padding: '1vw 3vh', color: 'white', textAlign: "left" }}>
                <section style={{ display: "block" }}>
                    <p style={{ fontWeight: "bold", display: "inline-block" }}>1.</p> Find an ARchive image and point the camera to the image
                </section>
                <section style={{ display: "block" }}>
                    Press
                    <img style={{ display: "inline-block", width: "2vw", margin: "0 3px 0 3px" }} src="/ar-ui/texttospeechicon.png" />
                    to initiate the text-to-speech
                </section>
                <section style={{ display: "block" }}>
                    Press
                    <p style={{ display: "inline-block", fontWeight: "bold" }}>View Artifacts to view the available artifacts in the section</p>
                </section>
            </div>
        </div>
    )
});
