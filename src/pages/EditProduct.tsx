import { ProductProps } from "@/interface/Product";
import instance from "@/service";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useParams } from "react-router-dom";

type Props = {
  onSubmit: (product: ProductProps) => void;
};
const productSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  price: Joi.number().required().min(0),
  description: Joi.string().required().min(3).max(1000),
});

const EditProduct = ({ onSubmit }: Props) => {
  const [product, setProduct] = useState<ProductProps | null>();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/products/${id}`);
      setProduct(data);
    })();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductProps>({ resolver: joiResolver(productSchema) });
  const onEdit = (product: ProductProps) => {
    onSubmit({ ...product, id });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onEdit)} className="bg-light">
        <h1>Edit Products</h1>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            className="form-control"
            type="text"
            {...register("title", {
              required: true,
              minLength: 3,
              maxLength: 100,
            })}
            defaultValue={product?.title}
          />
          {errors.title && (
            <div className="text-danger">{errors.title.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="">Price</label>
          <input
            className="form-control"
            type="number"
            {...register("price", {
              required: true,
              min: 10,
            })}
            defaultValue={product?.price}
          />
          {errors.price && (
            <div className="text-danger">{errors.price.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="">Description</label>
          <input
            className="form-control"
            type="text"
            {...register("description", {
              required: true,
            })}
            defaultValue={product?.description}
          />
          {errors.description && (
            <div className="text-danger">{errors.description.message}</div>
          )}
        </div>
        <button className="btn btn-primary">Add</button>
        <div className="p-2 mx-2  text-center my-4 border rounded btn btn-danger ">
          <NavLink to="/home">Back to home</NavLink>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
