/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";
import HOC from "../../layout/HOC";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getOrder = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/Product/${id}`, Auth);
      setData(response.data.product);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  function ValueChecker(holder, string) {
    return holder ? (
      <div className="Desc-Container">
        <p className="title"> {string} </p>
        <p className="desc"> {holder} </p>
      </div>
    ) : (
      ""
    );
  }

  return (
    <>
      <section>
        <p className="headP">Dashboard / {data?.name}</p>
        <section className="sectionCont">
          <Form>
            {data?.imageUrls && (
              <div className="Desc-Container">
                <p className="title"> Images </p>
                <div className="img-cont">
                  {data?.imageUrls?.map((i) => (
                    <img
                      src={i}
                      alt=""
                      className="centerImage"
                      key={`image ${i._id}`}
                    />
                  ))}
                </div>
              </div>
            )}
            {data?.images && (
              <div className="Desc-Container">
                <p className="title"> Images </p>
                <div className="img-cont">
                  {data?.images?.map((i) => (
                    <img
                      src={i}
                      alt=""
                      className="centerImage"
                      key={`image ${i._id}`}
                    />
                  ))}
                </div>
              </div>
            )}
            {ValueChecker(data?.name, "Product Name")}
            {ValueChecker(data?.description, "Description")}
            {ValueChecker(data?.price, "Price")}
            {ValueChecker(data?.per, "Per")}
            {ValueChecker(data?.stock, "In Stock")}
            {ValueChecker(data?.discountPrice, "Discount Price")}
            {ValueChecker(data?.discount, "Discount")}
            {ValueChecker(data?.numOfReviews, "Number of Reviews")}
            {ValueChecker(data?.minDiscount, "Min Discount")}
            {ValueChecker(data?.location?.coordinates?.[0], "Latitude")}
            {ValueChecker(data?.location?.coordinates?.[1], "Longitude")}

            {data?.sizePrice?.length > 0 && (
              <div className="Desc-Container">
                <p className="title"> Sizes </p>
                {data?.sizePrice?.map((i, index) => (
                  <>
                    <p className="desc" key={`price ${index}`}>
                      {" "}
                      Price : {i?.price}{" "}
                    </p>
                    <p className="desc" key={`size ${index}`}>
                      {" "}
                      Weigth : {i?.weight}{" "}
                    </p>
                    <p className="desc" key={`stock ${index}`}>
                      {" "}
                      stock : {i?.stock}{" "}
                    </p>
                  </>
                ))}
              </div>
            )}

            <div className="Desc-Container">
              <p className="title"> Deal of the Day </p>
              <p className="desc">
                {data?.isDealOfTheDay === true ? "Activated" : "Not Activated"}
              </p>
            </div>

            {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}

            <Link to="/Product">
              <Button variant="dark">Back</Button>
            </Link>
          </Form>
        </section>
      </section>
    </>
  );
};

export default HOC(SingleProduct);
