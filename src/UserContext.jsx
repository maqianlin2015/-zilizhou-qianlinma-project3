import React, { useState } from "react";

/**
 * Create User Context
 */
const UserContext = React.createContext({
  user: "",
  login: () => console.error("Please implement this function."),
  logout: () => console.error("Please implement this function."),
});

/**
 * Make component for manage business logic between children components and context
 * @param children
 * @returns {*}
 * @constructor
 */
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  /**
   * Callback when user login
   * @param user
   */
  const login = (user) => {
    setUser(user);
  };

  /**
   * Callback when user logout
   */
  const logout = () => {
    setUser();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserContextProvider };
