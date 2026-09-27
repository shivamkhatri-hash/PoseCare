/**
 * Session-Scoped Authentication Storage Utility
 * 
 * Ensures authentication state is tied to the current browser session (sessionStorage),
 * so that closing the tab/browser automatically logs out the user.
 */

export const authStorage = {
  getToken: () => {
    try {
      return sessionStorage.getItem('token') || localStorage.getItem('token') || null;
    } catch {
      return null;
    }
  },

  getUser: () => {
    try {
      const raw = sessionStorage.getItem('user') || localStorage.getItem('user');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setAuth: (token, user) => {
    try {
      const userStr = typeof user === 'string' ? user : JSON.stringify(user);
      // Store in sessionStorage so closing the site automatically logs out
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', userStr);

      // Clean up legacy localStorage keys to avoid perpetual persistence
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Dispatch custom event for immediate multi-component re-renders (Navbar, etc.)
      window.dispatchEvent(new Event('auth-change'));
    } catch (e) {
      console.error('Error saving session auth:', e);
    }
  },

  clearAuth: () => {
    try {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('auth-change'));
    } catch (e) {
      console.error('Error clearing auth:', e);
    }
  },

  isAuthenticated: () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const user = sessionStorage.getItem('user') || localStorage.getItem('user');
      return Boolean(token && user);
    } catch {
      return false;
    }
  },

  getRolePath: (role) => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'doctor':
        return '/doctor';
      case 'physiotherapist':
        return '/physio';
      default:
        return '/patient';
    }
  }
};
