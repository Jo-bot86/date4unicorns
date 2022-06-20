import React, { ReactElement, useContext, useReducer } from "react";
import { Dispatch } from "react";

export interface AuthStore {
  isLoggedIn: boolean;
}

export const initialAuthStore: AuthStore = {
  isLoggedIn: false,
};

export interface SetLoggedIn {
  type: "LOGGED_IN";
}

export interface SetLoggedOut {
  type: "LOGGED_OUT";
}

export type AuthAction = SetLoggedIn | SetLoggedOut;

export function authReducer(store: AuthStore, action: AuthAction): AuthStore {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...store,
        isLoggedIn: true,
      };
    case "LOGGED_OUT":
      return {
        ...store,
        isLoggedIn: false,
      };
  }
}

interface AuthStoreContextProps {
  authStore: AuthStore;
  dispatch: Dispatch<AuthAction>;
}

const AuthStoreContext = React.createContext({} as AuthStoreContextProps);
AuthStoreContext.displayName = "AuthStoreContext";

export const useAuthStoreContext = () => useContext(AuthStoreContext);

interface Props {
  children: ReactElement;
}

export function AuthStoreContextProvider(props: Props) {
  const [authStore, dispatch] = useReducer(authReducer, initialAuthStore);

  return (
    <AuthStoreContext.Provider value={{ authStore, dispatch }}>
      {props.children}
    </AuthStoreContext.Provider>
  );
}
