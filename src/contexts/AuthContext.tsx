
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { readDb, writeDb, normalizeEmail, generateUserId, User as DbUser } from '@/lib/jsonbin';

// User interface matching what the app expects (with email and created_at)
export interface User {
  id: string;
  email: string;
  created_at: string;
}

interface Session {
  email: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_STORAGE_KEY = 'session';

function getSessionFromStorage(): Session | null {
  try {
    const sessionStr = localStorage.getItem(SESSION_STORAGE_KEY);
    if (sessionStr) {
      return JSON.parse(sessionStr);
    }
  } catch (error) {
    // Invalid session data, clear it
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
  return null;
}

function saveSessionToStorage(session: Session | null) {
  if (session) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

function convertDbUserToUser(dbUser: DbUser): User {
  return {
    id: dbUser.id,
    email: dbUser.email,
    created_at: dbUser.createdAt,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedSession = getSessionFromStorage();
    if (storedSession) {
      setSession(storedSession);
      // Create user object from session
      // For demo purposes, we'll fetch the user data from the DB to get created_at
      // But we can also store minimal info and reconstruct the user
      const userFromSession: User = {
        id: storedSession.userId,
        email: storedSession.email,
        created_at: new Date().toISOString(), // Fallback, will be replaced if we fetch
      };
      setUser(userFromSession);
      
      // Optionally fetch user details from DB to get actual created_at
      readDb()
        .then((db) => {
          const dbUser = db.users.find((u) => u.id === storedSession.userId);
          if (dbUser) {
            setUser(convertDbUserToUser(dbUser));
          }
        })
        .catch(() => {
          // If fetch fails, keep the fallback user
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const normalizedEmail = normalizeEmail(email);
      
      const db = await readDb();
      const user = db.users.find(
        (u) => u.email === normalizedEmail && u.password === password
      );
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      const sessionData: Session = {
        email: user.email,
        userId: user.id,
      };
      
      saveSessionToStorage(sessionData);
      setSession(sessionData);
      setUser(convertDbUserToUser(user));
      
      toast.success('Signed in successfully');
    } catch (error: any) {
      toast.error(`Error signing in: ${error.message || 'Invalid credentials'}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const normalizedEmail = normalizeEmail(email);
      
      const db = await readDb();
      
      // Check if email already exists
      if (db.users.some((u) => u.email === normalizedEmail)) {
        throw new Error('Email already exists');
      }
      
      // Create new user
      const newUser: DbUser = {
        id: generateUserId(),
        email: normalizedEmail,
        password: password, // Plain text for demo
        createdAt: new Date().toISOString(),
      };
      
      db.users.push(newUser);
      await writeDb(db);
      
      // Create session and log in
      const sessionData: Session = {
        email: newUser.email,
        userId: newUser.id,
      };
      
      saveSessionToStorage(sessionData);
      setSession(sessionData);
      setUser(convertDbUserToUser(newUser));
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(`Error signing up: ${error.message || 'Failed to create account'}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      saveSessionToStorage(null);
      setSession(null);
      setUser(null);
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(`Error signing out: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
