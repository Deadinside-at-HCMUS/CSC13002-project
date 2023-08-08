import React, { useContext, useState, ChangeEvent, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../contexts/authContext";
import { UserLoginForm } from "../contexts/authContext";
import { Spinner } from "react-bootstrap";

const defaultValues: UserLoginForm = {
    email: "",
    password: "",
};

const validationSchema = yup.object({
    email: yup.string().required("Email is required!"),
    password: yup.string().required("Password is required!"),
});

const LoginPage: React.FC = () => {
    const { loginUser } = useContext(AuthContext);

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const { email, password } = loginForm;

    const handleChangeLoginForm = (event: ChangeEvent<HTMLInputElement>) =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    const navigate = useNavigate();

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);

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
        formState: { errors },
    } = useForm<UserLoginForm>({
        defaultValues,
        resolver: yupResolver<UserLoginForm>(validationSchema),
        mode: "onTouched",
    });

    const handleRegisterClick = () => {
        navigate("/signup");
    };

    const handleHomeClick = () => {
        navigate("/home");
    };

    // const handleForgotPassword = () => {
    //   // do something here to modify password
    // };

    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    let body: JSX.Element | null = null;

    if (authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (isAuthenticated) {
        navigate("/home");
    } else {
        body = (
            <div className="max-w-md w-full mx-auto mt-4 bg-[#f7f8f9] p-8 border border-white rounded-[1rem]">
                <form action="" className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label
                            htmlFor=""
                            className="text-sm font-bold text-gray-600 block"
                        >
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
                        <label
                            htmlFor=""
                            className="text-sm font-bold text-gray-600 block"
                        >
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
                        <a
                            href=""
                            className="font-medium text-sm text-blue-500"
                        >
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
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center">
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
            {body}
        </div>
    );
};

export default LoginPage;
