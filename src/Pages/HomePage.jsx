import React from "react";
import bs_logo from "../assets/bizzSel.png"
import { Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function HomePage({store, changeStore})
{
    const navigate = useNavigate();
    const cookieExpiration = 86400;       // One day
    
    function handleClick(e)
    {
        e.preventDefault();
        submitForm()
    }

    function submitForm()
    {
        document.cookie = `store=${store}; Max-Age=${cookieExpiration}; path=/`;
        navigate("/Queue/" + store);
    }

    return(
        <div className="work-area-base d-flex align-items-center justify-content-center" >
            <div className="p-4 rounded" style={{"color": "black", "backgroundColor": "lavender"}}>
                <img alt="bs-logo" src={bs_logo}/>
                <h1 className="display-2"><strong>CPD Queue</strong></h1>
                <h2>Keep Track of your CPD Business Select Orders not on the OPC Queue</h2>
                <hr />
                <Form onSubmit={(e) => handleClick(e)}>
                    <Form.Group className="" controlId="storeNumber">
                        <Form.Control value={store} required onChange={(e) => changeStore(e.target.value)} className="my-2" type="text" placeholder="Enter Store Number" />
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>

    );
}

export default HomePage;