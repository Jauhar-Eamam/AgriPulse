import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Simple hash function for demo purposes (in production, use bcrypt on server)
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
};

// Mock database using localStorage
const getUsers = () => {
  const users = localStorage.getItem('agritech_users');
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem('agritech_users', JSON.stringify(users));
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('agritech_current_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const signup = async (name, email, password) => {
    setError(null);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const users = getUsers();
      
      // Check if user already exists
      if (users.find(u => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        passwordHash: simpleHash(password),
        createdAt: new Date().toISOString()
      };
      
      // Save to "database"
      users.push(newUser);
      saveUsers(users);
      
      // Set current user (without password)
      const userWithoutPassword = { id: newUser.id, name: newUser.name, email: newUser.email };
      localStorage.setItem('agritech_current_user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const login = async (email, password) => {
    setError(null);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const users = getUsers();
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('No user found with this email');
      }
      
      if (user.passwordHash !== simpleHash(password)) {
        throw new Error('Invalid password');
      }
      
      // Set current user (without password)
      const userWithoutPassword = { id: user.id, name: user.name, email: user.email };
      localStorage.setItem('agritech_current_user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('agritech_current_user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
