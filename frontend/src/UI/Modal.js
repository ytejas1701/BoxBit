import { cloneElement, useState } from 'react';
import './Modal.css';

const Modal = ({ children, isVisible, title, hideModal })=>{
    const [isLoading, setLoading] = useState(false);
    return (
        <div className={`${"modal"} ${isVisible && "show"}`}>
            <div className={`content ${isLoading?"loading":""}`}>
                <div className="header">
                    <span className="title">{title}</span>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 16 16"
                        onClick={hideModal}>
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </div>
                {cloneElement(children, {hideModal, changeLoadState:(value)=>{setLoading(value)}})}
            </div>
        </div>
    );
}

export default Modal;