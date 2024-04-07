import { forwardRef } from "react";
export default forwardRef((props, ref) => {
    const { reviewPopupHandler } = props;
    return (
        <div ref={ref} className="review">
            <div className="header">
                <button type="button"
                    style={{ justifyContent: "center", alignItems: "center", border: "none", background: "none", cursor: "pointer" }}
                    onClick={() => reviewPopupHandler('closeReview')}>
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
            <div style={{ display: 'block', padding: '1vw 3vh', textAlign: 'center' }}>
                <section>
                    Your visit to our museum includes an exciting augmented reality experience that we've carefully curated for our visitors. We're eager to hear about your impressions of this innovative feature. Could you spare a moment to share a brief review of your overall museum experience, including your thoughts on the augmented reality component? Your feedback is instrumental in shaping future enhancements.
                    <p style={{ display: 'block', fontWeight: 'bold' }}>Thank you for your valuable input!</p>
                </section>
            </div>
            <hr />
            <div className='footer'>
                <button type="button" className="button"
                    onClick={() => reviewPopupHandler("reviewRedirect")}>
                    Review
                </button>
            </div>
        </div>
    )
});