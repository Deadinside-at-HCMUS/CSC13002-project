import React, { useContext, useState, ChangeEvent, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../contexts/authContext";
import { UserLoginForm } from "../contexts/authContext";

const defaultValues: UserLoginForm = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const LoginPage: React.FC = () => {
  let navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormData>({ mode: "onChange" })

  const onSubmit = handleSubmit(({ email, password, select, remember }) => {
    console.log(email, password, select, remember)
  })


  if (loginData.success) {
    // if user logged in
    navigate("/home");
  } else {
    // handle wrong password
    (() => {
      alert("Invalid email or password!");
      setTimeout(() => {
        const alertElement = document.querySelector(
          ".alert"
        ) as HTMLElement;
        if (alertElement) {
          alertElement.style.display = "none";
        }
      }, 5000);
    })();
  }
} catch (error) {
  console.log(error);
}
  };

const {
  register,
  // handleSubmit,
  formState: { errors },
} = useForm<UserLoginForm>({
  defaultValues,
  resolver: yupResolver<UserLoginForm>(validationSchema),
  mode: "onTouched",
});

// const onSubmit = handleSubmit(({ email, password, remember }) => {
//   console.log(email, password, remember);
// });

const handleRegisterClick = () => {
  navigate("/signup");
};

const handleHomeClick = () => {
  navigate('/home')
}

return (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
    <div className="max-w-md w-full mx-auto">
      <img
        className="mx-auto cursor-pointer"
        onClick={handleHomeClick}
        src="https://file.rendit.io/n/BMguV6XTfgasPlBI7Wr2.svg"
      />
      <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
        Login Page
      </div>
    </div>
    <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
      <form action="" className="space-y-6" onSubmit={login}>
        <div>
          <label htmlFor="" className="text-sm font-bold text-gray-600 block">
            Email
          </label>
          <input
            {...register("email")}
            name="email"
            type="email"
            className="w-full p-2 border-gray-300 rounded mt-1"
            required
            value={email}
            onChange={handleChangeLoginForm}
          />
          {errors.email && (
            <p className="error-message text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="" className="text-sm font-bold text-gray-600 block">
            Password
          </label>
          <input
            {...register("password")}
            name="password"
            type="password"
            className="w-full p-2 border-gray-300 rounded mt-1"
            required
            value={password}
            onChange={handleChangeLoginForm}
          />
          {errors.password && (
            <p className="error-message text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <a href="" className="font-medium text-sm text-blue-500">
            Forgot Password
          </a>
        </div>
        <div>
          <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
            Submit
          </button>
        </div>
        <div className="flex items-center">
          <div className="text-sm text-gray-500 text-center pr-1">
            You don't have an account?
          </div>
          <div
            className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer"
            onClick={handleRegisterClick}
          >
            Signup here
          </div>
        </div>
      </form>
    </div>
  </div>
);
};

export default LoginPage;
