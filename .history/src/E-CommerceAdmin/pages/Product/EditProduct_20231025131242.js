/** @format */
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link, useParams } from "react-router-dom";
import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl } from "../../../Baseurl";

const EditProduct = () => {
  const { product } = useParams();
  const [data, setData] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [discountPercentage, setDiscountInPercentage] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [minDiscount, setMinDiscount] = useState("");
  const [isDealOfTheDay, setIsDealOfTheDay] = useState("");
  const [per, setPer] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [stock, setStock] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState([]);
  const [ratings, setRatings] = useState("");
  const [numOfReviews, setNumofReviews] = useState("");
  const [categoryArr, setCategoryArr] = useState([]);
  const [multipleArr, setMultipleArr] = useState([]);

  const multipleObj = {
    price,
    weight,
    stock,
  };

  const multiple_adder = () => {
    setMultipleArr((prev) => [...prev, multipleObj]);
    setPrice("");
    setWeight("");
    setStock("");
  };

  const multiple_remover = (index) => {
    setMultipleArr((prev) => prev.filter((_, i) => i !== index));
  };

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fd = new FormData();
  fd.append("name", name);
  fd.append("description", description);
  fd.append("category", category);
  fd.append("discountPercentage", discountPercentage);
  fd.append("discountPrice", discountPrice);
  fd.append("minDiscount", minDiscount);
  fd.append("isDealOfTheDay", isDealOfTheDay);
  fd.append("per", per);
  fd.append("type", type);
  fd.append("ratings", ratings);
  fd.append("numOfReviews", numOfReviews);
  Array.from(image).forEach((i) => {
    fd.append("image", i);
  });
  Array.from(multipleArr).forEach((i) => {
    fd.append("sizePrice", i.price);
    fd.append("sizeWeight", i.weight);
    fd.append("sizesStock", i.stock);
  });

  const createProduct = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const res = await axios.put(
        `https://cross-friend.vercel.app/api/v1/admin/product/update/${product}`,
        fd,
        Auth
      );
      toast.success(res.data.message);
      setSubmitLoading(false);
    } catch (e) {
      console.log(e);
      const msg = e.response.data.message;
      toast.error(msg);
      setSubmitLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://cross-friend.vercel.app/api/v1/catogory/getAllCategory"
      );
      setCategoryArr(data?.categories);
    } catch {}
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/Product/${product}`,
        Auth
      );
      setData(response.data.product);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, []);


  useEffect(() => {
    if(data){
      setName(data?.name)
    }
  },[])

  console.log(data)

  return (
    <section>
      <section className="sectionCont">
        <p className="headP">Dashboard / Update Exiting</p>

        <Form onSubmit={createProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select onChange={(e) => setCategory(e.target.value)}>
              <option>Select Your Prefrence</option>
              {categoryArr?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i.name}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setImage(e.target.files)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={desc}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Discount In Percentage</Form.Label>
            <Form.Control
              type="number"
              min={0}
              onChange={(e) => setDiscountInPercentage(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Min. Discount </Form.Label>
            <Form.Control
              type="number"
              min={0}
              onChange={(e) => setMinDiscount(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> Sizes Detail</Form.Label>
            <Form.Control
              type="number"
              value={price}
              placeholder="Price"
              min={0}
              onChange={(e) => setPrice(e.target.value)}
              className="mb-3"
            />

            <Form.Control
              type="text"
              value={weight}
              placeholder="Weight"
              onChange={(e) => setWeight(e.target.value)}
              className="mb-3"
            />

            <Form.Control
              type="number"
              value={stock}
              placeholder="Stock"
              min={0}
              onChange={(e) => setStock(e.target.value)}
              className="mb-3"
            />

            <Button variant="dark" onClick={() => multiple_adder()}>
              Add
            </Button>
          </Form.Group>

          {multipleArr?.map((i, index) => (
            <ul
              className="mt-2"
              style={{
                border: "1px solid #000",
                paddingTop: "10px",
                paddingBottom: "20px",
              }}
            >
              <li style={{ listStyle: "disc" }} className="mt-1">
                Price : {i.price}
              </li>
              <li style={{ listStyle: "disc" }} className="mt-1">
                Weight : {i.weight}
              </li>
              <li style={{ listStyle: "disc" }} className="mt-1">
                Stock : {i.stock}
              </li>
              <li className="mt-3">
                <Button onClick={() => multiple_remover(index)}>
                  Remove This One
                </Button>
              </li>
            </ul>
          ))}

          <Form.Group className="mb-3">
            <Form.Label>Per</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setPer(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Discount Price</Form.Label>
            <Form.Control
              type="number"
              min={0}
              onChange={(e) => setDiscountPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number of Reviews</Form.Label>
            <Form.Control
              type="number"
              min={0}
              onChange={(e) => setNumofReviews(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>

            <Form.Select onChange={(e) => setType(e.target.value)}>
              <option>Select Your Prefrence</option>
              <option value="cake">Cake</option>
              <option value="Bakery">Bakery</option>
              <option value="Party">Party</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="text"
              min={0}
              onChange={(e) => setRatings(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deal of the day</Form.Label>
            <Form.Select onChange={(e) => setIsDealOfTheDay(e.target.value)}>
              <option>Select Your Prefrence</option>
              <option value={true}> Yes </option>
              <option value={false}> No </option>
            </Form.Select>
          </Form.Group>

          <div className="w-100 d-flex justify-content-between">
            <Button variant="success" type="submit">
              {submitLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Submit"
              )}
            </Button>

            <Link to="/Orders">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default HOC(EditProduct);
