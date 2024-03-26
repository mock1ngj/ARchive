import { useSessionStorage } from "../Hooks/useStorage";

export default () => {
    const [visible, setVisible] = useSessionStorage("agreement", "block");

    return (
        <div className="modal" style={{ display: visible }}>
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button"
                        style={{ justifyContent: "center", alignItems: "center", border: "none", background: "none", cursor: "pointer" }}
                        onClick={() => setVisible('none')}>
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
                <div className="modal-body">
                    <div>Welcome to <div style={{ fontWeight: "bold", display: "inline-block" }}>ARchive </div> to fully
                        utilize our website, we require access to your camera. This allows us to provide our augmented reality experience.
                        Rest assured, your privacy is our priority, and your camera will only be used for the intended purposes.
                    </div>
                </div>
                <hr />
                <div className="modal-footer">
                    <button type="button" style={{ margin: "1vmin", outline: "none", cursor: "pointer" }}
                        onClick={() => {
                            setVisible('none');
                        }}>
                        Agree
                    </button>
                </div>
            </div>
        </div>
    )
}