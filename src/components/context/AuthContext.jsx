// import React from "react";
// import useLocalStorage from "../localstorage/LocalStorage";

// const AuthContext = React.createContext([null, () => { }]);

// export const AuthProvider = (props) => {
//   const [auth, setAuth] = useLocalStorage("auth", null);
//   return <AuthContext.Provider value={[auth, setAuth]}>{props.children}</AuthContext.Provider>
// };

// export default AuthContext;

import { createContext, useContext } from "react";
    
    export const AuthContext = createContext({
      user: undefined,
      isLoading: false,
      setUser: () => {},
    });
    
    export const useAuthContext = () => useContext(AuthContext);