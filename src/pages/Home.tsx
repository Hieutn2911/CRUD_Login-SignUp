import { ProductProps } from "@/interface/Product";
import React from "react";
import { Link, NavLink } from "react-router-dom";

type Props = {
  products: ProductProps[];
  onDelete: (id: number) => void;
};

const Home = ({ products, onDelete }: Props) => {
  // console.log(products);
  return (
    <div style={{ width: "80%" }} className="m-auto">
      <div className="p-2   text-center my-4 border rounded btn btn-success">
        <NavLink to="/add">
          <i className="fas fa-plus"></i> Add new product
        </NavLink>
      </div>

      <table className="table table-bordered table-striped  ">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <button
                  onClick={() => onDelete(Number(item.id))}
                  className="btn btn-danger mx-2"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <Link className="btn btn-primary" to={`/edit/${item.id}`}>
                  <i className="fas fa-edit"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
