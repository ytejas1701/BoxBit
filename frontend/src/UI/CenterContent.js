import Appbar from './Appbar';
import Modal from './Modal';

import styles from './CenterContent.module.css';
import { Fragment, useState } from 'react';
import NewBit from '../components/NewBit';

const CenterContent= ({ children })=>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modal, setModal] = useState({title:"",content:<Fragment/>});
    return(
        <div className={styles.centerContent}>
            <Appbar
                showModal={(modal)=>{
                    setIsModalVisible(true);
                    setModal(modal);
                    }}/>
            <Modal 
                isVisible={isModalVisible}
                title={modal.title}
                hideModal={()=>{
                    setIsModalVisible(false);
                    setModal({title:"",content:<Fragment/>});
                    }}>
                {modal.content}
            </Modal>
            {children}
        </div>
    );
}

export default CenterContent;