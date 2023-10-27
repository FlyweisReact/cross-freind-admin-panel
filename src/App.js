/** @format */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./E-CommerceAdmin/forms/Login";
import Dashboard from "./E-CommerceAdmin/pages/Dashboard";
import ECategory from "./E-CommerceAdmin/pages/ECategory";
import Order from "./E-CommerceAdmin/pages/Orders/Order";
import SingleOrder from "./E-CommerceAdmin/pages/Orders/SingleOrder";
import Product from "./E-CommerceAdmin/pages/Product/Product";
import CreateProduct from "./E-CommerceAdmin/pages/Product/CreateProduct";
import SingleProduct from "./E-CommerceAdmin/pages/Product/SingleProduct";
import EditProduct from "./E-CommerceAdmin/pages/Product/EditProduct";
import User from "./E-CommerceAdmin/pages/User/User";
import Blog from "./E-CommerceAdmin/pages/Blog/Blog";
import Privacy from "./E-CommerceAdmin/pages/PrivacyPolicy/Privacy";
import Terms from "./E-CommerceAdmin/pages/Terms/Terms";
import Brand from "./E-CommerceAdmin/pages/Brand";
import Acne from "./E-CommerceAdmin/pages/Acne/Acne";
import Gallery from "./E-CommerceAdmin/pages/Gallery/Gallery";

function App() {
  return (
    <>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/getblog" element={<Blog />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/Category" element={<ECategory />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:product" element={<EditProduct />} />
        <Route path="/acne" element={<Acne />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/user" element={<User />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/order/:id" element={<SingleOrder />} />
      </Routes>
    </>
  );
}

export default App;
