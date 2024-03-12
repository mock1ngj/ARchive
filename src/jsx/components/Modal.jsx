import { useEffect, useState } from "react"

export default ({state}) => {
    const [display, setDisplay] = useState();

    useEffect(()=>{
        setDisplay(state);
    }, [state])

    return (
        <div className="modal" style={{display: display}}>
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button"
                        style={{justifyContent:"center", alignItems:"center", border:"none", background:"none", cursor:"pointer"}}
                        onClick={() => setDisplay('none')}>
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
                <div className="modal-body">

                </div>
                <div className="modal-footer">
                    <button type="button">
                        Don't Agree
                    </button>
                    <button type="button">
                        Agree
                    </button>
                </div>
            </div>
        </div>
    )
}