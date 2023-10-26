/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";
import HOC from "../../layout/HOC";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const Order = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [ id , setId ] = useState("")

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getOrders = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/admin/orders`, Auth);
      setData(response?.data?.orders);
      setTotal(response?.data?.orders?.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Update Status

  function MyVerticallyCenteredModal(props) {
    
    const [ status , setStatus ] = useState("")

    const statusHandler = async (e) => {
      e.preventDefault()
      try{
        const response = await axios.put(`https://cross-friend.vercel.app/api/v1/admin/order/${id}`)
        toast.success("Updated")
        props.onHide()
        
      }catch{}
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Order Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select>
                <option> Select Your Prefrence </option>
                <option value="Confirmed">Confirmed </option>
                <option value="On The Way">On The Way </option>
                <option value="Dispatch">Dispatch </option>
                <option value="Out For Delivery">Out For Delivery </option>
                <option value="Cancelled">cancelled </option>
                <option value="Delivered"> Delivered </option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <section>
        <section className="sectionCont">
          <p className="headP">Dashboard / Order</p>

          <div className="pb-4  w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Order's (Total : {total})
            </span>
          </div>
          {/* <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input type="search" placeholder="Search by OrderId" />
          </div>

          <div className="searchByDate">
            <div>
              <label>Starting Date : </label>
              <input type="date" />
            </div>

            <div>
              <label>Ending Date : </label>
              <input type="date" />
            </div>
          </div> */}

          {data?.length === 0 || !data ? (
            <Alert>No Data Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>SNo.</th>
                      <th>Order Id</th>
                      <th>User</th>
                      <th>Amount to be paid</th>
                      <th>Shipping Price</th>
                      <th>Discount</th>
                      <th>Delivered</th>
                      <th>Order Status</th>
                      <th>Payment Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td>{i.orderId} </td>
                        <td>{i.user?.name} </td>
                        <td> {i?.amountToBePaid} </td>
                        <td> {i.shippingPrice} </td>
                        <td> {i.discount} </td>
                        <td> {i.delivered === true ? "Yes" : "No"} </td>
                        <td>
                          {" "}
                          <Badge>{i.orderStatus}</Badge>{" "}
                        </td>
                        <td>
                          {" "}
                          <Badge>{i.paymentStatus}</Badge>{" "}
                        </td>

                        <td>
                          <span className="flexCont">
                            <i className="fa-solid fa-pen-to-square" />
                            <span>
                              {i.orderId && (
                                <Link to={`/order/${i.orderId}`}>
                                  <i className="fa-solid fa-eye" />
                                </Link>
                              )}
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Order);
