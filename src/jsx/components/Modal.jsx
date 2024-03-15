import Agreement from "./ModalContents/Agreement";
import Survey from "./ModalContents/FormAgreement";

export default ({state, setModal, content}) => {

    return (
        <div className="modal" style={{display: state}}>
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button"
                        style={{justifyContent:"center", alignItems:"center", border:"none", background:"none", cursor:"pointer"}}
                        onClick={() => setModal('none')}>
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
                {content == 'agreement' && (
                    <Agreement setModal={setModal}/>
                )}
                {content == 'survey' && (
                    <Survey setModal={setModal}/>
                )}
            </div>
        </div>
    )
}