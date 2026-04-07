import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../hooks/useAuth';
import './AuthPage.css';

function UserPlusIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
    );
}

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    if (isLoggedIn) return <Navigate to="/" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await client.post('/api/auth/signup', { email, password, nickname });
            navigate('/login', { state: { message: '회원가입이 완료되었습니다. 로그인해주세요.' } });
        } catch (err) {
            setError(err.response?.data?.message || '회원가입에 실패했습니다');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card card">
                <div className="auth-header">
                    <div className="auth-icon">
                        <UserPlusIcon />
                    </div>
                    <h1 className="auth-title">회원가입</h1>
                    <p className="auth-subtitle">Auth Board에 참여하세요</p>
                </div>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">이메일</label>
                        <input
                            className="form-input"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">비밀번호</label>
                        <input
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="영문 + 숫자, 8자 이상"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">닉네임</label>
                        <input
                            className="form-input"
                            type="text"
                            value={nickname}
                            onChange={e => setNickname(e.target.value)}
                            placeholder="닉네임"
                            required
                        />
                    </div>
                    <button className="btn-primary" type="submit" disabled={submitting}>
                        {submitting ? '가입 중...' : '회원가입'}
                    </button>
                </form>
                <div className="link-row">
                    이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                </div>
            </div>
        </div>
    );
}
