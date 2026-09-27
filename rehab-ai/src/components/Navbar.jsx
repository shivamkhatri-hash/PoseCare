import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PoseCareLogo from './PoseCareLogo';
import { useLanguage } from '../context/LanguageContext';
import { authStorage } from '../utils/authStorage';

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(authStorage.getToken());
  const [user, setUser] = useState(authStorage.getUser());
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const syncAuth = () => {
      setToken(authStorage.getToken());
      setUser(authStorage.getUser());
    };

    window.addEventListener('auth-change', syncAuth);
    window.addEventListener('storage', syncAuth);
    syncAuth();

    return () => {
      window.removeEventListener('auth-change', syncAuth);
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  const handleLogout = () => {
    authStorage.clearAuth();
    setToken(null);
    setUser(null);
    navigate('/auth');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Brand */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer py-1" 
            onClick={() => {
              if (token && user) {
                navigate(authStorage.getRolePath(user.role));
              } else {
                navigate('/');
              }
            }}
          >
            <PoseCareLogo size="md" variant="full" />
          </div>

          {/* Center Links - Contextual based on auth state */}
          <div className="hidden md:flex space-x-8 items-center">
            {/* Show Home and For Doctors only for public unauthenticated visitors */}
            {(!token || !user) && (
              <>
                <Link to="/" className="text-gray-600 hover:text-teal-600 font-medium">{t('home')}</Link>
                <Link to="/for-doctors" className="text-gray-600 hover:text-teal-600 font-medium">{t('forDoctors')}</Link>
              </>
            )}
            <Link to="/library" className="text-gray-600 hover:text-teal-600 font-medium">{t('exerciseLibrary')}</Link>
            <Link to="/accuracy-bench" className="text-cyan-700 hover:text-cyan-600 font-bold bg-cyan-50 px-2.5 py-1 rounded-lg border border-cyan-200 text-xs">{t('accuracyBench')}</Link>
          </div>

          {/* Right Side Auth / Language / Profile */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle Pill */}
            <button
              onClick={toggleLanguage}
              title={language === 'en' ? 'Switch to Hindi (हिन्दी)' : 'Switch to English'}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:border-teal-300 border border-slate-200 rounded-full text-xs font-bold text-slate-700 hover:text-teal-700 transition-all shadow-sm"
            >
              <span className="text-sm">{language === 'en' ? '🇮🇳' : '🇬🇧'}</span>
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {token && user ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">{t('hello')}, <span className="font-semibold text-gray-800">{user.name}</span></span>
                  <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded border ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-700 border-purple-200' 
                      : user.role === 'doctor'
                      ? 'bg-teal-100 text-teal-700 border-teal-200'
                      : user.role === 'physiotherapist'
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                      : 'bg-blue-100 text-blue-700 border-blue-200'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    const path = authStorage.getRolePath(user.role);
                    navigate(path);
                  }}
                  className="bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 px-3 py-1.5 rounded-lg text-sm font-bold transition-all shadow-sm"
                >
                  {user.role === 'admin' ? `⚡ ${t('adminPortal')}` : user.role === 'doctor' ? `🩺 ${t('doctorPortal')}` : user.role === 'physiotherapist' ? `🏋️‍♂️ ${t('physioPortal')}` : `🏃 ${t('patientPortal')}`}
                </button>
                <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500 font-medium cursor-pointer">{t('logout')}</button>
              </>
            ) : (
              <Link to="/auth" className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md font-medium transition-colors">
                {t('login')} / {t('register')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}