import React, { useState, useEffect } from 'react';

import { Modal, Button } from 'antd';

const CustomModal = ({children, seeModal = false, ...props}) => {

    const { jumpModal } = props;

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    // const [Component, setChildrenComponent] = useState(React.createElement());
  
    const showModal = () => {
      // setVisible(true);
      jumpModal()
    };
  
    const handleOk = () => {
      setModalText('The modal will be closed after two seconds');
      setConfirmLoading(true);
      setTimeout(() => {
        // setVisible(false);
        jumpModal();
        setConfirmLoading(false);
      }, 2000);
    };
  
    const handleCancel = () => {
      console.log('Clicked cancel button');
      // setVisible(false);
      jumpModal()
    };

    useEffect(() => {
        setVisible(seeModal);
        // setChildrenComponent(conponent);
    }, [seeModal]);

    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal with async logic
            </Button> */}
            <Modal
                title="Modal"
                visible={visible}
                onOk={handleOk}
                // confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                {children}
            </Modal>
        </>
    ); 
}

export default CustomModal; 