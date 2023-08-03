import React from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

enum SelectEnum { none, receiver, donor }

interface FormData {
    email: string
    password: string
    passwordconfirm: string
    phonenumber: string
    select: SelectEnum
    remember: boolean
}

const defaultValues: FormData = {
    email: "",
    password: "",
    passwordconfirm: "",
    phonenumber: "",
    select: SelectEnum.none,
    remember: true,
};

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/

const validationSchema = yup.object({
    email: yup
        .string()
        .required("Email is required!")
        .email("Email is not valid!"),
    password: yup
        .string()
        .required("Password is required!")
        .matches(passwordRegExp, "Password has minimum 8 characters, at least 1 letter and 1 number!"),
    passwordconfirm: yup
        .string()
        .required("Confirm password is required!")
        .oneOf([yup.ref("password"), ""], "Passwords must match!"),
    phonenumber: yup
        .string()
        .required("Phone number is required!")
        .max(10, "Phone number is not valid!")
        .min(10, "Phone number is not valid!")
        .matches(phoneRegExp, "Phone number is not valid!"),
    select: yup
        .mixed<SelectEnum>()
        .required("Select role is required!"),
    remember: yup.boolean().required(),
})

const SignupPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues,
        resolver: yupResolver<FormData>(validationSchema),
        mode: "onTouched",
    })

    const onSubmit = handleSubmit(({ email, password, select, remember }) => {
        console.log(email, password, select, remember)
    })

    let navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleHomeClick = () => {
        navigate('/home')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <img className="mx-auto cursor-pointer" onClick={handleHomeClick} src="https://file.rendit.io/n/BMguV6XTfgasPlBI7Wr2.svg" />
                <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Signup Page</div>
            </div>
            <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                <form action="" className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Email</label>
                        <input {...register("email")} name="email" type="email" className="w-full p-2 border-gray-300 rounded mt-1" />
                        {errors.email && (<p className="error-message text-red-500">{errors.email.message}</p>)}
                    </div>
                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Password</label>
                        <input {...register("password")} name="password" type="password" className="w-full p-2 border-gray-300 rounded mt-1" />
                        {errors.password && (<p className="error-message text-red-500">{errors.password.message}</p>)}
                    </div>
                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Confirm Password</label>
                        <input {...register("passwordconfirm")} name="passwordconfirm" type="password" className="w-full p-2 border-gray-300 rounded mt-1" />
                        {errors.passwordconfirm && (<p className="error-message text-red-500">{errors.passwordconfirm.message}</p>)}
                    </div>
                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Phone Number</label>
                        <input {...register("phonenumber")} name="phonenumber" type="phonenumber" className="w-full p-2 border-gray-300 rounded mt-1" />
                        {errors.phonenumber && (<p className="error-message text-red-500">{errors.phonenumber.message}</p>)}
                    </div>
                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">I want to be</label>
                        <select {...register("select")} name="select" id="" className="w-full p-2 border border-gray-330 rounded mt-1">
                            <option value='none'>--Select a option--</option>
                            <option value="donor">Donor</option>
                            <option value="receiver">Receiver</option>
                        </select>
                    </div>
                    <div>
                        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Submit</button>
                    </div>
                    <div className="flex items-center">
                        <div className="text-sm text-gray-500 text-center pr-1">You already have an account?</div>
                        <div className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer" onClick={handleLoginClick} >Login here</div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SignupPage;
