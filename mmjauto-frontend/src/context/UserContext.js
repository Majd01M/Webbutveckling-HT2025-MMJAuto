import { createContext, useState } from "react";

// Create context
export const UserContext = createContext();

// Create provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = no user logged in

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
