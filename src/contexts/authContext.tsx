import { createContext, useReducer, ReactNode, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios, { AxiosError } from "axios";
import setAuthToken from "../utils/setAuthToken";

export enum RoleEnum {
  user,
  collaborator,
}

export interface UserLoginForm {
  email: string;
  password: string;
}

export interface UserRegisterForm {
  username: string;
  email: string;
  password: string;
  passwordconfirm: string;
  gender: string;
  phonenumber: string;
  role: RoleEnum;
}

interface AuthStateType {
  authLoading: true;
  isAuthenticated: false;
  user: null;
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
  });

  // authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const respone = await axios.get(`${apiUrl}/auth`);
      if (respone.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: respone.data.user,
          },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     await loadUser();
  //   };
  //   fetchUserData();
  // }, []);

  // login
  const loginUser = async (userForm: UserLoginForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.content);
      else console.log(response.data);

      // await loadUser();

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
  const registerUser = async ({
    passwordconfirm,
    ...userForm
  }: UserRegisterForm) => {
    try {
      console.log(passwordconfirm);
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.content);

      // await loadUser();

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
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
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
