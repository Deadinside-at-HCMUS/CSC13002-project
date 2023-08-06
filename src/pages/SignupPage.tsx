import React, { useContext, useState, ChangeEvent, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../contexts/authContext";
import { UserRegisterForm, RoleEnum } from "../contexts/authContext";

const defaultValues: UserRegisterForm = {
    username: "",
    email: "",
    password: "",
    passwordconfirm: "",
    gender: "non-binary",
    phonenumber: "",
    role: RoleEnum.user,
};

const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/;

const validationSchema = yup.object({
    username: yup.string().required("Username is required!"),
    email: yup
        .string()
        .required("Email is required!")
        .email("Email is not valid!"),
    password: yup
        .string()
        .required("Password is required!")
        .min(8, "Password has minimun 8 characters!")
        .max(26, "Password has maximum 26 characters!")
        .matches(
            passwordRegExp,
            "Password has at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character!"
        ),
    passwordconfirm: yup
        .string()
        .required("Confirm password is required!")
        .oneOf([yup.ref("password"), ""], "Passwords does not match!"),
    gender: yup.string().required().oneOf(["male", "female", "non-binary"]),
    phonenumber: yup
        .string()
        .required("Phone number is required!")
        .max(10, "Phone number is not valid!")
        .min(10, "Phone number is not valid!")
        .matches(phoneRegExp, "Phone number is not valid!"),
    role: yup.mixed<RoleEnum>().required("Select role is required!"),
    remember: yup.boolean().required(),
});

const SignupPage: React.FC = () => {
    const { registerUser } = useContext(AuthContext);

    const [registerForm, setRegisterForm] = useState({
        username: "",
        email: "",
        password: "",
        passwordconfirm: "",
        gender: "non-binary",
        phonenumber: "",
        role: RoleEnum.user,
    });

    const {
        username,
        email,
        password,
        passwordconfirm,
        gender,
        phonenumber,
        role,
    } = registerForm;

    const handleChangeRegisterForm = (event: ChangeEvent<HTMLInputElement>) =>
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });

    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) =>
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });

    const navigate = useNavigate();

    const registering = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== passwordconfirm) {
            console.log("Password does not match!");
            return;
        }

        try {
            const registerData = await registerUser(registerForm);
            console.log(registerData);

            if (registerData.success) {
                // return to login again
                navigate("/login");
            } else {
                // none
            }
        } catch (error) {
            console.log(error);
        }
    };

    const {
        register,
        // handleSubmit,
        formState: { errors },
    } = useForm<UserRegisterForm>({
        defaultValues,
        resolver: yupResolver<UserRegisterForm>(validationSchema),
        mode: "onTouched",
    });

    // const onSubmit = handleSubmit(({ email, password, select, remember }) => {
    //   console.log(email, password, select, remember);
    // });

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleHomeClick = () => {
        navigate("/home");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <img
                    className="mx-auto cursor-pointer"
                    onClick={handleHomeClick}
                    src="https://file.rendit.io/n/BMguV6XTfgasPlBI7Wr2.svg"
                />
                <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
                    Signup Page
                </div>
            </div>
            <div className="max-w-md w-full mx-auto mt-4 bg-[#f7f8f9] p-8 border border-white rounded-[1rem]">
                <form action="" className="space-y-6" onSubmit={registering}>
                    <div>
                        <label
                            htmlFor=""
                            className="text-sm font-bold text-gray-600 block"
                        >
                            Username
                        </label>
                        <input
                            {...register("username")}
                            name="username"
                            type="username"
                            className="w-full p-2 border-gray-300 rounded mt-1"
                            required
                            value={username}
                            onChange={handleChangeRegisterForm}
                        />
                        {errors.username && (
                            <p className="error-message text-red-500">
                                {errors.username.message}
                            </p>
                        )}
                    </div>
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
                            onChange={handleChangeRegisterForm}
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
                            onChange={handleChangeRegisterForm}
                        />
                        {errors.password && (
                            <p className="error-message text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor=""
                            className="text-sm font-bold text-gray-600 block"
                        >
                            Confirm Password
                        </label>
                        <input
                            {...register("passwordconfirm")}
                            name="passwordconfirm"
                            type="password"
                            className="w-full p-2 border-gray-300 rounded mt-1"
                            required
                            value={passwordconfirm}
                            onChange={handleChangeRegisterForm}
                        />
                        {errors.passwordconfirm && (
                            <p className="error-message text-red-500">
                                {errors.passwordconfirm.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor=""
                            className="text-sm font-bold text-gray-600 block"
                        >
                            Phone Number
                        </label>
                        <input
                            {...register("phonenumber")}
                            name="phonenumber"
                            type="phonenumber"
                            className="w-full p-2 border-gray-300 rounded mt-1"
                            value={phonenumber}
                            onChange={handleChangeRegisterForm}
                        />
                        {errors.phonenumber && (
                            <p className="error-message text-red-500">
                                {errors.phonenumber.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor=""
                            className="text-sm font-bold text-gray-600 block"
                        >
                            Gender
                        </label>
                        <select
                            {...register("gender")}
                            name="gender"
                            id="1"
                            className="w-full p-2 border border-gray-330 rounded mt-1"
                            value={gender}
                            onChange={handleChangeSelect}
                        >
                            <option value="non-binary">
                                --Select a option--
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor=""
                            className="text-sm font-bold text-gray-600 block"
                        >
                            I want to be
                        </label>
                        <select
                            {...register("role")}
                            name="role"
                            id="2"
                            className="w-full p-2 border border-gray-330 rounded mt-1"
                            value={role}
                            onChange={handleChangeSelect}
                        >
                            <option value="">--Select a option--</option>
                            <option value="user">Normal user</option>
                            <option value="collaborator">Collaborator</option>
                        </select>
                    </div>
                    <div>
                        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
                            Submit
                        </button>
                    </div>
                    <div className="flex items-center">
                        <div className="text-sm text-gray-500 text-center pr-1">
                            You already have an account?
                        </div>
                        <div
                            className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer"
                            onClick={handleLoginClick}
                        >
                            Login here
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
