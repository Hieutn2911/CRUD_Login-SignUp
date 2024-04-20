import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Product from "./pages/Product";
import EditProduct from "./pages/EditProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { ProductProps } from "./interface/Product";
import instance from "./service";

function App() {
  const navigate = useNavigate();
  const userName = window.sessionStorage.getItem("user");

  const [products, setProducts] = useState<ProductProps[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      setProducts(data);
    })();
  }, []);

  const HandleDeleteProduct = (id: number) => {
    (async () => {
      const isConfirm = confirm("Are you sure you want to delete");
      if (isConfirm) {
        await instance.delete(`/products/${id}`);
        setProducts(products.filter((product) => product.id !== id && product));
      }
    })();
  };
  const handleAddProduct = (product: ProductProps) => {
    (async () => {
      const { data } = await instance.post("/products", product);
      setProducts([...products, data]);
    })();
    navigate("/home");
  };
  const handleEditProduct = (product: ProductProps) => {
    (async () => {
      const { data } = await instance.put(`/products/${product.id}`, product);
      setProducts(products.map((item) => (item.id === data.id ? data : item)));
    })();
    navigate("/home");
  };
  const handleLogOut = () => {
    const isConfirm = confirm("Do you want to log out?");
    if (isConfirm) {
      window.sessionStorage.clear();
      navigate("/");
    }
  };
  return (
    <div className="bg">
      <header>
        <div
          className="mb-3 p-2 mx-auto d-flex flex-row justify-content-between align-items-center "
          style={{ width: "90%" }}
        >
          <h4 className="text-light">
            <i className="fas fa-warehouse mx-2"></i>Product Page
          </h4>
          {/*  */}
          {userName && (
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-light dropdown-toggle"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                Hi, {userName}
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" onClick={handleLogOut}>
                  Log out
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
      <Routes>
        <Route index path="/" element={<Login />}></Route>
        <Route
          path="/home"
          element={<Home products={products} onDelete={HandleDeleteProduct} />}
        ></Route>
        <Route
          path="/add"
          element={<Product onSubmit={handleAddProduct} />}
        ></Route>
        <Route
          path="/edit/:id"
          element={<EditProduct onSubmit={handleEditProduct} />}
        ></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
