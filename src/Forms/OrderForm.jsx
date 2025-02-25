import axios from "axios";
import React, {useState} from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import FileDisplay from "../Components/FileDisplay";
import { useParams } from "react-router-dom";

function OrderForm({closeModal, refreshAction})
{
    const today = new Date();
    const todaysDate = new Date().toLocaleDateString();
    const nextDayDate = new Date(today);
    nextDayDate.setDate(today.getDate() + 1);

    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [clientEmail, setClientEmail] = useState("");

    const [orderNumber, setOrderNumber] = useState("");
    const [employee, setEmployee] = useState("");
    const [orderDetails, setDetails] = useState("");
    const [dateEntered, setDateEntered] = useState(todaysDate + " @ " + new Date().toLocaleTimeString());
    const [dateDue, setDateDue] = useState(nextDayDate.toLocaleDateString() + " @ 5:00:00 PM");

    const {id} = useParams();

    const [orderFiles, setFiles] = useState([]);

    function handleFiles(e)
    {
        const filesUploaded = e.target.files;
        
        for(let i = 0; i < filesUploaded.length; i++)
        {
            const f = filesUploaded[i];
            toBase64(f)
                .then((res) => {
                    setFiles(prev => [...prev, res])
                })
                .catch(() => {
                    alert("An error has occured. Store files on computer.")
                    setFiles([]);
                })
        }
    }

    function handleSubmission(e)
    {
        e.preventDefault();

        const data = {
            storeNumber: id,
            clientName,
            clientPhone,
            clientEmail,
            orderNumber,
            employee,
            orderDetails,
            dateEntered,
            dateDue,
            orderFiles
        }


        axios.post(import.meta.env.VITE_SERVER_API + "/queue/CreateNewOrder", data, {headers: {
                'Content-Type': 'multipart/form-data'
            }})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
            .finally(() => {
                closeModal();
                refreshAction();
            });
    }

    function removeFile(e, name)
    {
        let res = [];
        let isRemoved = false;

        for(let i = 0; i < orderFiles.length; i++)
        {
            if(orderFiles[i] === name && !isRemoved)
            {
                isRemoved = true;
                continue;
            }

            res.push(orderFiles[i])
        }

        setFiles(res);
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    return(
        <>
            <Form onSubmit={(e) => handleSubmission(e)} encType="multipart/form-data">
                <h4>Client Info:</h4>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={clientName} onChange={(e) => setClientName(e.target.value)} type="text" required placeholder="Enter Customer Name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formPhone">
                    <Form.Label>Telephone</Form.Label>
                    <Form.Control value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} type="text" required placeholder="123-456-7890" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} type="email" required placeholder="Enter Customer Email" />
                </Form.Group>

                <hr />
                <h4>Order Details</h4>
                <Row className="mb-3">
                    <Form.Group className="mb-3" as={Col} controlId="formOrderNumber">
                        <Form.Label>Order Number</Form.Label>
                        <Form.Control value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} type="text" placeholder="(If any)" />
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} controlId="formOrderNumber">
                        <Form.Label>Employee Name</Form.Label>
                        <Form.Control value={employee} onChange={(e) => setEmployee(e.target.value)} type="text" placeholder="(Ex. Kaylyn, Fatima...)" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formDateEnter">
                    <Form.Label>Date Entered</Form.Label>
                    <Form.Control type="text" onChange={(e) => setDateEntered(e.target.value)} value={dateEntered} required />
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

                <Form.Group className="mb-3" controlId="formOrderFiles">
                    <Form.Label>Order Files</Form.Label>
                    <Form.Control name="files" accept="image/*,.pdf" onChange={(e) => handleFiles(e)} type="file" multiple />
                </Form.Group>

                <div className="d-flex col flex-wrap">
                    {
                        orderFiles.map((f, i) => {
                            return <FileDisplay btnAction={(e) => removeFile(e, f)} editingMode={true} url={f} key={f+i}/>
                        })
                    }
                    
                </div>

                <Button className="col-12 my-3" variant="success" type="submit">Submit</Button>
            </Form>

        </>
    );
}

export default OrderForm;