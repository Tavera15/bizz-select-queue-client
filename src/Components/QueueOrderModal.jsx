import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap";
import OrderForm from "../Forms/OrderForm";

function QueueOrderModal(props)
{
    const [modalShow, setModalShow] = useState(false);

    const openModal = () => setModalShow(true);
    const closeModal = () => setModalShow(false);

    return(
        <div>
            <Button onClick={openModal} className="mb-2">Create Order</Button>  
            <Modal
                {...props}
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
                    Create Order
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderForm closeModal={closeModal} refreshAction={props.refreshAction}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default QueueOrderModal;