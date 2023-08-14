import React, { useContext, useState, ChangeEvent, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../contexts/authContext";
import { UserRegisterForm } from "../contexts/authContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const defaultValues: UserRegisterForm = {
    username: "",
    email: "",
    password: "",
    passwordconfirm: "",
    fullName: "",
    dateOfBirth: "",
    location: "",
    gender: "non-binary",
    phonenumber: "",
    role: "user",
};

const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
const passwordRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
    fullName: yup
        .string()
        .required("Full name is required!")
        .min(3, "Full name has minimum 3 characters!")
        .max(30, "Full name has maximum 30 characters!"),
    dateOfBirth: yup.string().required("Date of birth is required!"),
    location: yup.string().required("Location is required!"),
    gender: yup.string().required().oneOf(["male", "female", "non-binary"]),
    phonenumber: yup
        .string()
        .required("Phone number is required!")
        .max(10, "Phone number is not valid!")
        .min(10, "Phone number is not valid!")
        .matches(phoneRegExp, "Phone number is not valid!"),
    role: yup.string().required("Select role is required!"),
    remember: yup.boolean().required(),
});

const SignupPage: React.FC = () => {
    const { registerUser } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const [registerForm, setRegisterForm] = useState(defaultValues);

    const {
        username,
        email,
        password,
        passwordconfirm,
        fullName,
        dateOfBirth,
        location,
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

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== passwordconfirm) {
            console.log("Password does not match!");
            return;
        }

        try {
            const registerData = await registerUser(registerForm);

            if (registerData.success) {
                navigate("/login");
            } else {
                //none
            }
        } catch (error) {
            console.log(error);
        }
    };

    const {
        register,
        formState: { errors },
    } = useForm<UserRegisterForm>({
        defaultValues,
        resolver: yupResolver<UserRegisterForm>(validationSchema),
        mode: "onTouched",
    });

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleHomeClick = () => {
        navigate("/home");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center mt-7 mb-14">
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
                <form action="" className="space-y-6" onSubmit={handleRegister}>
                    <div>
                        <label
                            htmlFor=""
                            className="text-sm font-bold text-gray-600 block"
                        >
                            Username{" "}
                            <span className="text-red-500 font-normal">*</span>
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
                            Email{" "}
                            <span className="text-red-500 font-normal">*</span>
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
                            Password{" "}
                            <span className="text-red-500 font-normal">*</span>
                        </label>
                        <div className="relative">
                            <input
                                {...register("password")}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="w-full p-2 border-gray-300 rounded mt-1"
                                required
                                value={password}
                                onChange={handleChangeRegisterForm}
                            />
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible />
                                ) : (
                                    <AiOutlineEye />
                                )}
                            </button>
                        </div>
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
                            Confirm Password{" "}
                            <span className="text-red-500 font-normal">*</span>
                        </label>
                        <div className="relative">
                            <input
                                {...register("passwordconfirm")}
                                name="passwordconfirm"
                                type={showPasswordConfirm ? "text" : "password"}
                                className="w-full p-2 border-gray-300 rounded mt-1"
                                required
                                value={passwordconfirm}
                                onChange={handleChangeRegisterForm}
                            />
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                                onClick={() =>
                                    setShowPasswordConfirm(!showPasswordConfirm)
                                }
                            >
                                {showPasswordConfirm ? (
                                    <AiOutlineEyeInvisible />
                                ) : (
                                    <AiOutlineEye />
                                )}
                            </button>
                        </div>
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
                            Full name{" "}
                            <span className="text-red-500 font-normal">*</span>
                        </label>
                        <input
                            {...register("fullName")}
                            name="fullName"
                            type="fullName"
                            className="w-full p-2 border-gray-300 rounded mt-1"
                            required
                            value={fullName}
                            onChange={handleChangeRegisterForm}
                        />
                        {errors.fullName && (
                            <p className="error-message text-red-500">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor=""
                            className="text-sm font-bold text-gray-600 block"
                        >
                            Date of birth{" "}
                            <span className="text-red-500 font-normal">*</span>
                        </label>
                        <input
                            {...register("dateOfBirth")}
                            name="dateOfBirth"
                            type="date"
                            className="w-full p-2 border-gray-300 rounded mt-1"
                            required
                            value={dateOfBirth}
                            onChange={handleChangeRegisterForm}
                        />
                        {errors.dateOfBirth && (
                            <p className="error-message text-red-500">
                                {errors.dateOfBirth.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor=""
                            className="text-sm font-bold text-gray-600 block"
                        >
                            Location{" "}
                            <span className="text-red-500 font-normal">*</span>
                        </label>
                        <input
                            {...register("location")}
                            name="location"
                            type="location"
                            className="w-full p-2 border-gray-300 rounded mt-1"
                            required
                            value={location}
                            onChange={handleChangeRegisterForm}
                        />
                        {errors.location && (
                            <p className="error-message text-red-500">
                                {errors.location.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor=""
                            className="text-sm font-bold text-gray-600 block"
                        >
                            Phone Number{" "}
                            <span className="text-red-500 font-normal">*</span>
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
                            Gender{" "}
                            <span className="text-red-500 font-normal">*</span>
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
                            I want to be{" "}
                            <span className="text-red-500 font-normal">*</span>
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
                        <button
                            className={`w-full py-2 px-4 rounded-md text-white text-sm ${
                                !username ||
                                !email ||
                                !password ||
                                !passwordconfirm ||
                                !fullName ||
                                !dateOfBirth ||
                                !location ||
                                !phonenumber ||
                                gender === "non-binary" ||
                                role === "user"
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
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
