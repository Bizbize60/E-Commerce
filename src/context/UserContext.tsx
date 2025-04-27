import React, { createContext, useState, useContext, useEffect } from 'react';

interface UserContextType {
  user: { email: string; token: string } | null;
  setUser: (user: { email: string; token: string } | null) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; token: string } | null>(null);

  useEffect(() => {
    // Tarayıcıdaki bilgileri yükle
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setUser({ email, token }); // Kullanıcı durumunu yükle
    }
  }, []);

  useEffect(() => {
    // Kullanıcı değiştiğinde bilgileri depola
    if (user) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
