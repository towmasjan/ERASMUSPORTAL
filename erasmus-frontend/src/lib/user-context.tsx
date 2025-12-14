'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// User types
export type UserRole = 'participant' | 'organization' | 'admin' | null;

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  // Participant specific
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  country?: string;
  // Organization specific
  organizationName?: string;
  oidCode?: string;
  contactPerson?: string;
}

interface UserContextType {
  user: User | null;
  role: UserRole;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isParticipant: boolean;
  isOrganization: boolean;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Route protection configuration
const protectedRoutes: Record<UserRole, string[]> = {
  participant: ['/participant'],
  organization: ['/organization', '/dashboard'],
  admin: ['/admin'],
  null: [],
};

// Demo users for testing
const demoUsers: Record<string, User> = {
  'participant@demo.eu': {
    id: 1,
    email: 'participant@demo.eu',
    name: 'Jan Kowalski',
    role: 'participant',
    firstName: 'Jan',
    lastName: 'Kowalski',
    country: 'Poland',
  },
  'organization@demo.eu': {
    id: 2,
    email: 'organization@demo.eu',
    name: 'Youth Center Warsaw',
    role: 'organization',
    organizationName: 'Youth Center Warsaw',
    oidCode: 'E10123456',
    contactPerson: 'Anna Kowalska',
  },
  'admin@erasmus.eu': {
    id: 3,
    email: 'admin@erasmus.eu',
    name: 'Super Admin',
    role: 'admin',
  },
  'open_event_test_user@fossasia.org': {
    id: 4,
    email: 'open_event_test_user@fossasia.org',
    name: 'Admin User',
    role: 'admin',
  },
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('erasmus_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('erasmus_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Route protection
  useEffect(() => {
    if (isLoading) return;

    const isProtectedRoute = (path: string, role: UserRole): boolean => {
      if (!role) return false;
      return protectedRoutes[role]?.some(route => path.startsWith(route)) || false;
    };

    // Check if current path requires authentication
    const requiresAuth = 
      pathname.startsWith('/participant') ||
      pathname.startsWith('/organization') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/dashboard');

    if (requiresAuth && !user) {
      router.push('/login');
      return;
    }

    // Check role-based access
    if (user) {
      // Participants can't access organization/admin routes
      if (user.role === 'participant' && (pathname.startsWith('/organization') || pathname.startsWith('/admin'))) {
        router.push('/participant');
        return;
      }
      
      // Organizations can't access admin routes
      if (user.role === 'organization' && pathname.startsWith('/admin')) {
        router.push('/organization');
        return;
      }
    }
  }, [isLoading, user, pathname, router]);

  const login = useCallback(async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check demo users first
      const demoUser = demoUsers[email.toLowerCase()];
      if (demoUser) {
        setUser(demoUser);
        localStorage.setItem('erasmus_user', JSON.stringify(demoUser));
        
        // Redirect based on role
        switch (demoUser.role) {
          case 'participant':
            router.push('/participant');
            break;
          case 'organization':
            router.push('/organization');
            break;
          case 'admin':
            router.push('/admin');
            break;
          default:
            router.push('/dashboard');
        }
        return;
      }
      
      // For any other email, create a user based on selected role
      const newUser: User = {
        id: Date.now(),
        email,
        name: email.split('@')[0],
        role: role || 'participant',
      };
      
      setUser(newUser);
      localStorage.setItem('erasmus_user', JSON.stringify(newUser));
      
      // Redirect based on role
      switch (role) {
        case 'participant':
          router.push('/participant');
          break;
        case 'organization':
          router.push('/organization');
          break;
        case 'admin':
          router.push('/admin');
          break;
        default:
          router.push('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('erasmus_user');
    localStorage.removeItem('erasmus_token');
    router.push('/');
  }, [router]);

  return (
    <UserContext.Provider
      value={{
        user,
        role: user?.role || null,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        isParticipant: user?.role === 'participant',
        isOrganization: user?.role === 'organization',
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// HOC for protected routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles?: UserRole[]
) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading, role } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push('/login');
      }
      
      if (!isLoading && user && allowedRoles && !allowedRoles.includes(role)) {
        router.push('/');
      }
    }, [isLoading, user, role, router]);

    if (isLoading) {
      return <div>Ładowanie...</div>;
    }

    if (!user) {
      return null;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      return null;
    }

    return <Component {...props} />;
  };
}

