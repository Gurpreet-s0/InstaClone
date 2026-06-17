import { createContext, useState } from "react";
import { login, register } from "../Services/auth.api";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerHandler = async function (username, email, password) {
    try {
      setLoading(true);
      const res = await register(username, email, password);
      setUser(res.user);
      return res.user;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loginHandler = async function (username, password) {
    try {
      setLoading(true);
      const res = await login(username, password);
      setUser(res.user);
      return res.user;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, registerHandler, loginHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
