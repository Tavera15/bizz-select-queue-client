import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import QueueOrderModal from "../Components/QueueOrderModal";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

function QueuePage()
{
    const [orders, setOrders] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        axios.get(import.meta.env.VITE_SERVER_API + "/queue/GetStoreOrders/" + id)
            .then((res) => {
                setOrders(res.data.filter(o => !o.isComplete))
            })

            .catch((err) => console.log(err));
    },[])

    return(
        <div>
            <h1 className="display-1 my-4"><strong>Business Select CPD Orders</strong></h1>
            <hr />
            <QueueOrderModal />
            <div>
                {
                    orders.length < 1
                        ?  <h1>There's no Orders in this Queue... Go Sell Some Business Selects</h1>
                        :  <Table variant="light" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Details</th>
                                        <th>Order Number</th>
                                        <th>Customer Name</th>
                                        <th>Date Entered</th>
                                        <th>Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((o, i) => {
                                            return <tr key={i} className="align-middle">
                                                        <td><Link to={`/Queue/${id}/${o._id}`}>View</Link></td>
                                                        <td>{o.orderNumber ?? "<blank>"}</td>
                                                        <td>{o.clientName}</td>
                                                        <td>{o.dateEntered}</td>
                                                        <td>{o.dateDue}</td>
                                                    </tr>
                                        })
                                    }
                                    
                                </tbody>
                            </Table>
                }
            </div>
        </div>
    );
}

export default QueuePage;