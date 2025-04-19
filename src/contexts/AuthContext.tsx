
import React, { createContext, useState, useContext, useEffect } from "react";

type VerificationStatus = "basic" | "verified" | "none";

interface User {
  id: string;
  name: string;
  email: string;
  verificationStatus: VerificationStatus;
  avatar?: string;
  completionPercentage: number;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  uploadVerification: (file: File) => void;
}

const defaultUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  verificationStatus: "basic",
  avatar: undefined,
  completionPercentage: 60,
  isLoggedIn: false
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for saved user data
    const savedUser = localStorage.getItem("trusted-share-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    // Mock login functionality
    console.log("Login attempt with:", email, password);
    
    // For demo, we'll always log in with the default user
    const loggedInUser = { ...defaultUser, isLoggedIn: true };
    setUser(loggedInUser);
    localStorage.setItem("trusted-share-user", JSON.stringify(loggedInUser));
  };

  const signup = (name: string, email: string, password: string) => {
    // Mock signup functionality
    console.log("Signup attempt with:", name, email, password);
    
    // Create a new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      verificationStatus: "basic", // Start with basic verification
      completionPercentage: 40,
      isLoggedIn: true
    };
    
    setUser(newUser);
    localStorage.setItem("trusted-share-user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("trusted-share-user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("trusted-share-user", JSON.stringify(updatedUser));
    }
  };

  const uploadVerification = (file: File) => {
    // Mock verification upload
    console.log("Verification document uploaded:", file.name);
    
    // In a real app, this would send the file to a secure server
    // For now, we'll simulate the verification process
    if (user) {
      // Update user status to "pending" or directly to "verified" for demo
      setTimeout(() => {
        const updatedUser = { 
          ...user, 
          verificationStatus: "verified",
          completionPercentage: Math.min(user.completionPercentage + 20, 100)
        };
        setUser(updatedUser);
        localStorage.setItem("trusted-share-user", JSON.stringify(updatedUser));
      }, 2000);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, uploadVerification }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
