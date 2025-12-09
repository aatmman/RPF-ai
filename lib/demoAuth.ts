export const DEMO_EMAIL = 'judge@rfp-ai.demo';
export const DEMO_PASSWORD = 'FMCG-demo-2025';

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('rfp-ai-auth') === 'logged-in';
}

export function login(email: string, password: string): boolean {
  const ok = email === DEMO_EMAIL && password === DEMO_PASSWORD;
  if (ok && typeof window !== 'undefined') {
    localStorage.setItem('rfp-ai-auth', 'logged-in');
  }
  return ok;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('rfp-ai-auth');
  }
}

