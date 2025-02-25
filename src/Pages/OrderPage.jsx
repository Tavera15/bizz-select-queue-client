import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Button, Form, Row, Col } from "react-bootstrap";
import FileDisplay from "../Components/FileDisplay";
import ConfirmCompletionModal from "../Components/ConfirmCompletionModal";

function OrderPage()
{
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [clientEmail, setClientEmail] = useState("");

    const [orderNumber, setOrderNumber] = useState("");
    const [employee, setEmployee] = useState("");
    const [orderDetails, setDetails] = useState("");
    const [dateEntered, setDateEntered] = useState("");
    const [dateDue, setDateDue] = useState("");

    const [orderData, setOrder] = useState({});
    const [orderFiles, setFiles] = useState([]);

    const {id, order} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() => {
        if(isLoading)
        {
            axios.get(import.meta.env.VITE_SERVER_API + `/queue/GetOrder/${id}/${order}`)
                .then((res) => {
                    setOrder(res.data)
                    setIsLoading(false)
                });
        }
    },[isLoading])
    
    useEffect(() => {
        if(!orderData || isLoading) {return;}

        setClientName(orderData.clientName);
        setClientPhone(orderData.clientPhone);
        setClientEmail(orderData.clientEmail);
        setOrderNumber(orderData.orderNumber);
        setEmployee(orderData.employee);
        setDetails(orderData.orderDetails);
        setDateEntered(orderData.dateEntered);
        setDateDue(orderData.dateDue);
        setFiles(orderData.orderFiles);
    },[isLoading])

    function UpdateForm(e)
    {
        e.preventDefault();

        const data = {
            clientName,
            clientPhone,
            clientEmail,
            orderNumber,
            orderDetails,
            dateDue,
        }

        axios.put(import.meta.env.VITE_SERVER_API + `/queue/UpdateOrder/${id}/${order}`, data)
            .then(() => {
                setIsLoading(true)
                alert("Updated Successfully!")
            })
            .catch((err) => alert("Unable to do function"));
    }

    function CompleteOrder(e)
    {
        e.preventDefault();

        axios.put(import.meta.env.VITE_SERVER_API + `/queue/CompleteOrder/${id}/${order}`)
            .then((res) => setIsLoading(true))
            .catch((err) => alert("Unable to do function"));
    }

    return(
        <div className="p-4 min-vh-100 justify-content-center" style={{"backgroundColor": "rgba(255,255,255,.24)"}}>
            <h1 className="display-1"><strong>Order</strong></h1>
            <hr />
            <Form className="d-flex col flex-wrap justify-content-center" onSubmit={(e) => handleSubmission(e)} encType="multipart/form-data">
                <div className="col-12 col-md-5">
                    <h4>Client Info:</h4>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={clientName} onChange={(e) => setClientName(e.target.value)} type="text" required placeholder="Enter Customer Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" as={Col} controlId="formPhone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} type="text" required placeholder="123-456-7890" />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} type="email" required placeholder="Enter Customer Email" />
                    </Form.Group>

                    {
                        orderData.isComplete
                            ? ""
                            : <ConfirmCompletionModal completionAction={(e) => CompleteOrder(e)} />
                    }

                </div>

                <div className="col-0 col-md-1"></div>

                <div className="col-12 col-md-5">

                    <h4>Order Details</h4>
                    <Row className="mb-3">
                        <Form.Group className="mb-3" as={Col} controlId="formOrderNumber">
                            <Form.Label>Order Number</Form.Label>
                            <Form.Control value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} type="text" placeholder="(If any)" />
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} controlId="formOrderName">
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control disabled value={employee} onChange={(e) => setEmployee(e.target.value)} type="text" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formDateEnter">
                        <Form.Label>Date Entered</Form.Label>
                        <Form.Control disabled type="text" onChange={(e) => setDateEntered(e.target.value)} value={dateEntered} required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formDateDue">
                        <Form.Label>Date Due</Form.Label>
                        <Form.Control type="text" value={dateDue} onChange={(e) => setDateDue(e.target.value)} required />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formOrderDetails">
                        <Form.Label>Order Details</Form.Label>
                        <Form.Control value={orderDetails} onChange={(e) => setDetails(e.target.value)} as="textarea" rows={4} required placeholder="(Ex. 50 Color Copies - 65lb Cardstock)" />
                    </Form.Group>
                    
                    <Button onClick={(e) => UpdateForm(e)} className="col-12" variant="primary" type="submit">Update Form</Button>

                    <Form.Group className="my-3 d-flex col flex-wrap">
                        {
                            orderFiles.map((f, i) => {
                                return <FileDisplay editingMode={false} url={f} key={i}/>
                            })
                        }
                    </Form.Group>
                </div>
            </Form>
        </div>
    );
}

export default OrderPage;