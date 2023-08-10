import { RoleEnum } from "../contexts/authContext";

type AuthState = {
    authLoading: boolean;
    isAuthenticated: boolean;
    user: User | null;
};

export type User = {
    username: string;
    email: string;
    password: string;
    fullName: string;
    dateOfBirth: Date;
    location: string;
    gender: string;
    phonenumber: string;
    role: RoleEnum;
};

type AuthAction = {
    type: "SET_AUTH";
    payload: {
        isAuthenticated: boolean;
        user: User | null;
    };
};

export const authReducer = (
    state: AuthState,
    action: AuthAction
): AuthState => {
    const {
        type,
        payload: { isAuthenticated, user },
    } = action;

    switch (type) {
        case "SET_AUTH":
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,
            };

        default:
            return state;
    }
};
