import {IoMdClose} from "react-icons/io";


type HeaderProps = {
    handleClose: () => void
}

const Header = (props: HeaderProps) => {
    return (
        <div className={`chatbot-box-header`}>
            <div className={`chatbot-box-header-logo`}></div>
            <div className={`chatbot-box-header-title`}>
                <strong>AIDialogPro</strong><br/>
                <span>W czym ci pomóc?</span>
            </div>
            <div className={`chatbot-box-close-btn`}>
                <button
                    onClick={props.handleClose}
                >
                    <IoMdClose/>
                </button>
            </div>
        </div>
    )
}

export default Header