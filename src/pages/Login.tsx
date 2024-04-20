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
  password: Joi.string().required().min(8),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: joiResolver(userSchema) });
  const onSubmit = (user: User) => {
    (async () => {
      try {
        const { data } = await instance.post(`/login`, user);
        if (data.user) {
          sessionStorage.setItem("accessToken", data.accessToken);
          sessionStorage.setItem("user", data.user.username);
          const isConfirm = confirm("Login successfully switch home page ?");
          if (isConfirm) {
            navigate("/home");
          }
        }
      } catch (error) {
        alert("Please enter correct email, username and password.");
      }
    })();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-light">
        <h1>Form Login</h1>
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
              minLength: 6,
            })}
          />
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
        </div>
        <p>
          Don't have an account?{" "}
          <NavLink to="/register" className="text-primary">
            Register
          </NavLink>
        </p>

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
