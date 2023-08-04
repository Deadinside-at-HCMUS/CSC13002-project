import { createContext, useReducer, ReactNode } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export enum RoleEnum {
  user,
  collaborator,
}

export interface UserLoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export interface UserRegisterForm {
  username: string;
  email: string;
  password: string;
  passwordconfirm: string;
  gender: string;
  phonenumber: string;
  role: RoleEnum;
  remember: boolean;
}

interface AuthContextType {
  loginUser: (userForm: UserLoginForm) => Promise<any>;
  registerUser: (userForm: UserRegisterForm) => Promise<any>;
  logoutUser: () => void;
  authState: any;
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

  // useEffect(() => loadUser(), []);

  // login
  const loginUser = async (userForm: UserLoginForm) => {
    try {
      const { remember, ...submitForm } = userForm;
      const response = await axios.post(`${apiUrl}/auth/login`, submitForm);
      if (response.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.content);
      else console.log(response.data);

      // await loadUser();

      return response.data;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Register
  const registerUser = async (userForm: UserRegisterForm) => {
    try {
      const { passwordconfirm, remember, ...submitForm } = userForm;
      const response = await axios.post(`${apiUrl}/auth/register`, submitForm);
      if (response.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.content);

      // await loadUser();

      return response.data;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
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
