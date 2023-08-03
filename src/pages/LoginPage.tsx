import React from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

enum SelectEnum { receiver, donor }

interface FormData {
    email: string
    password: string
    select: SelectEnum
    remember: boolean
}

const LoginPage: React.FC = () => {
    let navigate = useNavigate();

    const { register, handleSubmit } = useForm<FormData>({ mode: "onChange" })

    const onSubmit = handleSubmit(({ email, password, select, remember }) => {
        console.log(email, password, select, remember)
    })


    const handleRegisterClick = () => {
        navigate('/signup')
    }

    const handleHomeClick = () => {
        navigate('/home')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <img className="mx-auto cursor-pointer" onClick={handleHomeClick} src="https://file.rendit.io/n/BMguV6XTfgasPlBI7Wr2.svg" />
                <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Login Page</div>
            </div>
            <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                <form action="" className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Email</label>
                        <input
                            {...register("email", {
                                required: true,
                                minLength: 4,
                                pattern: /^\S+@\S+\.\S+$/
                            })}
                            name="email" type="text" className="w-full p-2 border-gray-300 rounded mt-1" />
                    </div>
                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Password</label>
                        <input {...register("password")} name="password" type="password" className="w-full p-2 border-gray-300 rounded mt-1" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input {...register("remember")} name="checkbox" type="checkbox" className="h-4 w-4 text-blue-300 rounded" />
                            <label htmlFor="" className="ml-2 text-sm text-gray-600">Remember me</label>
                        </div>
                        <a href="" className="font-medium text-sm text-blue-500">Forgot Password</a>
                    </div>
                    <div>
                        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Submit</button>
                    </div>
                    <div className="flex items-center">
                        <div className="text-sm text-gray-500 text-center pr-1">You don't have an account?</div>
                        <div className="text-sm text-blue-400 hover:text-blue-500 cursor-pointer" onClick={handleRegisterClick} >Signup here</div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default LoginPage;
