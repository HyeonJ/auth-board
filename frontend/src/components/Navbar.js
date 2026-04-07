import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import './Navbar.css';

function SunIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
}

export default function Navbar() {
    const { isLoggedIn, isAdmin, user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo">Auth Board</Link>
                <div className="navbar-actions">
                    <button className="btn-icon" onClick={toggleTheme} title="테마 전환">
                        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                    </button>
                    {isLoggedIn ? (
                        <>
                            {isAdmin && (
                                <Link to="/admin" className={`navbar-link${pathname === '/admin' ? ' navbar-link--active' : ''}`}>관리자</Link>
                            )}
                            <span className="navbar-divider" />
                            <div className="navbar-user">
                                <span className="navbar-avatar">{user.nickname[0]}</span>
                                <span className="navbar-nickname">{user.nickname}</span>
                            </div>
                            <button className="btn-ghost" onClick={handleLogout}>로그아웃</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={`navbar-link${pathname === '/login' ? ' navbar-link--active' : ''}`}>로그인</Link>
                            <Link to="/signup" className="btn-primary-sm">회원가입</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
