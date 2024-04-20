import instance from "@/service";
import { User } from "../interface/user";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required().email({ tlds: false }),
  password: Joi.string().required().min(8).max(12),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: joiResolver(userSchema) });
  const onSubmit = (user: User) => {
    console.log(user);
    (async () => {
      const { data } = await instance.post(`/register`, user);
      if (data.user) {
        const isConfirm = confirm("Register successfully switch login page ?");
        if (isConfirm) {
          navigate("/");
        }
      }
      console.log(data);
    })();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-light">
        <h1>Form Register</h1>
        <div className="form-group">
          <label htmlFor="">Username</label>
          <input
            className="form-control"
            type="username"
            {...register("username", {
              required: true,
            })}
          />
          {errors.username && (
            <div className="text-danger">{errors.username.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            className="form-control"
            type="email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && (
            <div className="text-danger">{errors.email.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            className="form-control"
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 12,
            })}
          />
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="">Confirm Password</label>
          <input
            className="form-control"
            type="password"
            {...register("confirmPassword", {
              required: true,
              minLength: 8,
              maxLength: 12,
            })}
          />
          {errors.confirmPassword && (
            <div className="text-danger">{errors.confirmPassword.message}</div>
          )}
        </div>
        <p>
          You have an account? <NavLink to="/">Login</NavLink>
        </p>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
