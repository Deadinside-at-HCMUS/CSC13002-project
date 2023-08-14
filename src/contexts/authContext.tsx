import { createContext, useReducer, ReactNode, useEffect } from "react";
import { authReducer, User } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_USER } from "./constants";
import axios, { AxiosError } from "axios";
import setAuthToken from "../utils/setAuthToken";

export interface UserLoginForm {
    email: string;
    password: string;
}

export interface UserRegisterForm {
    username: string;
    email: string;
    password: string;
    passwordconfirm: string;
    fullName: string;
    dateOfBirth: string;
    location: string;
    gender: string;
    phonenumber: string;
    role: string;
}

interface AuthStateType {
    authLoading: boolean;
    isAuthenticated: boolean;
    user: User | null;
    users: User[] | null;
}

interface LoginResponse {
    success: boolean;
    content: string;
}

interface RegisterResponse {
    success: boolean;
    message: string;
}

interface AuthContextType {
    loginUser: (userForm: UserLoginForm) => Promise<LoginResponse>;
    registerUser: (userForm: UserRegisterForm) => Promise<RegisterResponse>;
    logoutUser: () => void;
    authState: AuthStateType;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
        users: null,
    });

    // authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_USER]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_USER]);
        }

        try {
            const respone = await axios.get(`${apiUrl}/auth`);
            if (respone.data.success) {
                dispatch({
                    type: "SET_AUTH",
                    payload: {
                        isAuthenticated: true,
                        user: respone.data.user,
                        users: respone.data.users,
                    },
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 401) {
                    localStorage.removeItem(LOCAL_STORAGE_TOKEN_USER);
                    setAuthToken(null);
                    dispatch({
                        type: "SET_AUTH",
                        payload: {
                            isAuthenticated: false,
                            user: null,
                            users: null,
                        },
                    });
                } else {
                    console.log(error.config);
                }
            } else {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            await loadUser();
        };
        fetchUserData();
    }, []);

    // login
    const loginUser = async (userForm: UserLoginForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm);
            if (response.data.success)
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_USER,
                    response.data.content
                );
            else console.log(response.data);

            await loadUser();

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                return (
                    axiosError.response?.data || {
                        success: false,
                        message: "Server error",
                    }
                );
            } else {
                console.log(error);
                return { success: false, message: "Unknown error" };
            }
        }
    };

    // Register
    const registerUser = async ({ ...userForm }: UserRegisterForm) => {
        try {
            const submitForm = {
                username: userForm.username,
                email: userForm.email,
                password: userForm.password,
                fullName: userForm.fullName,
                dateOfBirth: userForm.dateOfBirth,
                location: userForm.location,
                gender: userForm.gender,
                phonenumber: userForm.phonenumber,
                role: userForm.role,
            };

            const response = await axios.post(
                `${apiUrl}/auth/register`,
                submitForm
            );
            if (response.data.success)
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_USER,
                    response.data.content
                );

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                return (
                    axiosError.response?.data || {
                        success: false,
                        message: "Server error",
                    }
                );
            } else {
                console.log(error);
                return { success: false, message: "Unknown error" };
            }
        }
    };

    // Logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_USER);
        dispatch({
            type: "SET_AUTH",
            payload: { isAuthenticated: false, user: null, users: null },
        });
    };

    // Context data
    const authContextData = { loginUser, registerUser, logoutUser, authState };

    // return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
