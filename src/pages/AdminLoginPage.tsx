import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';

export default function AdminLoginPage() {
  const { session, loading, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setError(null);
  }, [mode]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-700">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  if (session) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const fn = mode === 'signin' ? signIn : signUp;
    const { error: err } = await fn(email.trim(), password);
    setBusy(false);
    if (err) {
      setError(err);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-700 px-4 py-12">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-sunshine-500/15 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto inline-flex rounded-2xl bg-white px-5 py-3 shadow-card">
            <Logo />
          </div>
          <h1 className="mt-5 font-heading text-2xl font-bold text-white">
            {mode === 'signin' ? 'Admin Sign In' : 'Create Admin Account'}
          </h1>
          <p className="mt-1 text-sm text-navy-400">
            {mode === 'signin'
              ? 'Manage your store catalog, prices, and stock.'
              : 'Set up your store admin account to get started.'}
          </p>
        </div>

        <div className="rounded-4xl border border-navy-600 bg-navy-700/60 p-6 shadow-card backdrop-blur sm:p-8">
          {error && (
            <div className="mb-5 rounded-xl border border-pink-500/40 bg-pink-500/10 px-4 py-3 text-sm font-semibold text-pink-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@toystore.com"
                  className="w-full rounded-xl border border-navy-600 bg-navy-800 py-3 pl-11 pr-4 text-sm text-white placeholder:text-navy-400 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-navy-600 bg-navy-800 py-3 pl-11 pr-11 text-sm text-white placeholder:text-navy-400 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400 transition hover:text-white"
                >
                  {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 font-heading text-sm font-bold text-white transition hover:bg-sky-400 disabled:opacity-50"
            >
              {busy ? 'Please wait…' : (
                <>
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-navy-400">
            {mode === 'signin' ? (
              <>
                Don&apos;t have an account?{' '}
                <button onClick={() => setMode('signup')} className="font-bold text-sky-400 transition hover:text-sky-500">
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={() => setMode('signin')} className="font-bold text-sky-400 transition hover:text-sky-500">
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-navy-400 transition hover:text-sky-400">
            ← Back to store
          </Link>
        </div>
      </div>
    </div>
  );
}
