import React, {useState} from "react";
import { Button, Modal } from "react-bootstrap";

function ConfirmCompletionModal({completionAction})
{
    const [modalShow, setModalShow] = useState(false);

    const openModal = () => setModalShow(true);
    const closeModal = () => setModalShow(false);

    return(
        <>
            <Button onClick={openModal} variant="success" className="col-12">Complete</Button>  
            <Modal
                backdrop="static"
                keyboard={false}
                onHide={closeModal}
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Complete Order
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to complete this order?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal} variant="secondary">Close</Button>
                    <Button onClick={(e) => completionAction(e)} variant="success">Complete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmCompletionModal;