import { ProductProps } from "@/interface/Product";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

type Props = {
  onSubmit: (product: ProductProps) => void;
};
const productSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  price: Joi.number().required().min(0),
  description: Joi.string().required().min(3).max(1000),
});

const Product = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductProps>({ resolver: joiResolver(productSchema) });
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-light">
        <h1>Add Products</h1>
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
          />
          {errors.description && (
            <div className="text-danger">{errors.description.message}</div>
          )}
        </div>
        <button className="btn btn-primary">Add</button>
        <div className="mx-2 p-2  text-center my-4 border rounded btn btn-danger ">
          <NavLink to="/home">Back to home</NavLink>
        </div>
      </form>
    </div>
  );
};

export default Product;
