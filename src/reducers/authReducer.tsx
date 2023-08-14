type AuthState = {
    authLoading: boolean;
    isAuthenticated: boolean;
    user: User | null;
    users: User[] | null;
};

export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    fullName: string;
    dateOfBirth: Date;
    location: string;
    gender: string;
    phonenumber: string;
    role: string;
};

type AuthAction = {
    type: string;
    payload: {
        isAuthenticated: boolean;
        user: User | null;
        users: User[] | null;
    };
};

export const authReducer = (
    state: AuthState,
    action: AuthAction
): AuthState => {
    const {
        type,
        payload: { isAuthenticated, user, users },
    } = action;

    switch (type) {
        case "SET_AUTH":
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,
                users,
            };

        default:
            return state;
    }
};
