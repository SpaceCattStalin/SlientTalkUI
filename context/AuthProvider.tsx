import { AuthAction, AuthContextType, AuthState } from "@/types/AuthTypes";
import React, { createContext, ReactNode, useMemo, useReducer } from "react";

const initialState: AuthState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "RESTORE_TOKEN":
            return {
                ...state,
                userToken: action.token,
                isLoading: false,
            };
        case "SIGN_IN":
            return {
                ...state,
                userToken: action.token,
                isSignout: false,
            };
        case "SIGN_OUT":
            return {
                ...state,
                userToken: null,
                isSignout: true,
            };
        default:
            return state;
    }
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode; }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const authContext: AuthContextType = useMemo(() => (
        {
            signIn: async (data: any) => {
                dispatch({ type: "SIGN_IN", token: "dummy_token" });
            },
            signOut: async () => {
                dispatch({ type: "SIGN_OUT" });
            },
            signUp: async (data: any) => {
                dispatch({ type: "SIGN_UP" });
            },
            restoreToken: () => {
                return state.userToken;
            },
            authState: state
        }
    ), [state]);

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};
