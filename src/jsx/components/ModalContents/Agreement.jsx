export default ({setModal}) => {
    return (
        <>
            <hr />
            <div className="modal-body">
                <div>Welcome to <div style={{ fontWeight: "bold", display: "inline-block" }}>ARchive </div> to fully 
                    utilize our website, we require access to your camera. This allows us to provide our augmented reality experience. 
                    Rest assured, your privacy is our priority, and your camera will only be used for the intended purposes.
                </div>
            </div>
            <hr />
            <div className="modal-footer">
                <button type="button" style={{ margin: "1vmin", outline: "none", cursor: "pointer" }}>
                    Don't Agree
                </button>
                <button type="button" style={{ margin: "1vmin", outline: "none", cursor: "pointer" }}
                    onClick={() => setModal('none')}>
                    Agree
                </button>
            </div>
        </>
    )
}