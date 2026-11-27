import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

// Only this email may use the admin panel. Sign-up is disabled in the
// admin login page, and any other signed-in user is signed out here —
// Supabase RLS still grants writes to any authenticated user, so do not
// create accounts for anyone else.
export const ADMIN_EMAIL = 'toyandjoy007@gmail.com';

export function isAdminUser(user: User | null | undefined): boolean {
  return !!user?.email && user.email.toLowerCase() === ADMIN_EMAIL;
}

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setSession(null);
      setLoading(false);
      return;
    }

    let isMounted = true;

    // Always stop showing the spinner if session loading takes too long.
    const loadingTimeout = window.setTimeout(() => {
      if (isMounted) {
        setLoading(false);
      }
    }, 8000);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!isMounted) return;
      // Only the store admin may stay signed in.
      if (newSession?.user && !isAdminUser(newSession.user)) {
        void supabase.auth.signOut();
        setSession(null);
        setLoading(false);
        return;
      }
      setSession(newSession);
      setLoading(false);
    });

    void supabase.auth
      .getSession()
      .then(({ data }) => {
        if (isMounted) {
          if (data.session?.user && !isAdminUser(data.session.user)) {
            void supabase.auth.signOut();
            setSession(null);
          } else {
            setSession(data.session);
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setSession(null);
        }
      })
      .finally(() => {
        window.clearTimeout(loadingTimeout);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      window.clearTimeout(loadingTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: 'Customer accounts are not configured yet.' };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return;

    await supabase.auth.signOut();
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
