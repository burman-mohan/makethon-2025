"use client";
import { createContext, useState } from "react";

// export const authContext = createContext<AuthContextType>({
//   auth: false,
//   setAuth: () => { },
// });

// import { ReactNode } from "react";

// type AuthContextType = {
//   auth: boolean;
//   setAuth: (auth: boolean) => void;
//   email: string;
//   setEmail: (email: string) => void;
// }

// type AuthProviderProps = {
//   children: ReactNode;
// };

// export const AuthProvider = (props: AuthProviderProps) => {
//   const [auth, setAuth] = useState<boolean>(false);
//   const [email, setEmail] = useState<string>("");
//   return (
//     <authContext.Provider value={{ auth, setAuth, email, setEmail: () => { } }}>
//       {props.children}
//     </authContext.Provider>
//   );
// };

export const authContext = createContext<AuthContextType>({
  email: '',
  setEmail: () => { },
});

import { ReactNode } from "react";

type AuthContextType = {
  email: string;
  setEmail: (email: string) => void;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = (props: AuthProviderProps) => {
  const [email, setEmail] = useState<string>("");
  return (
    <authContext.Provider value={{ email, setEmail }}>
      {props.children}
    </authContext.Provider>
  );
};
