import React, {useState} from "react";
import bs_logo from "../assets/bizzSel.png"
import { Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function HomePage({storeNumber, storeChange})
{
    const navigate = useNavigate();
    
    function handleClick(e)
    {
        e.preventDefault();
        navigate("/Queue/" + storeNumber);
    }

    return(
        <div className="work-area-base d-flex align-items-center justify-content-center" >
            <div className="p-4 rounded" style={{"color": "black", "backgroundColor": "lavender"}}>
                <img alt="bs-logo" src={bs_logo}/>
                <h1 className="display-2"><strong>CPD Queue</strong></h1>
                <h2>Keep Track of your CPD Business Select Orders not on the OPC Queue</h2>
                <hr />
                <Form>
                    <Form.Group className="" controlId="storeNumber">
                        <Form.Control value={storeNumber} required onChange={(e) => storeChange(e.target.value)} className="my-2" type="text" placeholder="Enter Store Number" />
                        <Button className="btn btn-primary" onClick={(e) => handleClick(e)}>Submit</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>

    );
}

export default HomePage;