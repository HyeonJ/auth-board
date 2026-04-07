import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../hooks/useAuth';
import './AdminPage.css';

function ChevronLeft() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
        </svg>
    );
}

function AlertIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    );
}

export default function AdminPage() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
            return;
        }
        fetchMembers();
    }, [isAdmin, navigate]);

    const fetchMembers = () => {
        setLoading(true);
        setError('');
        client.get('/api/admin/members')
            .then(res => setMembers(res.data.data))
            .catch(() => setError('회원 목록을 불러오는데 실패했습니다'))
            .finally(() => setLoading(false));
    };

    const handleDelete = async (id, nickname) => {
        if (!window.confirm(`"${nickname}" 회원을 강제 탈퇴시키겠습니까?\n해당 회원의 게시글도 함께 삭제됩니다.`)) return;
        try {
            await client.delete(`/api/admin/members/${id}`);
            fetchMembers();
        } catch (err) {
            alert(err.response?.data?.message || '탈퇴 처리에 실패했습니다');
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="page">
            <Link to="/" className="back-link">
                <ChevronLeft />
                홈
            </Link>

            <div className="page-header">
                <h1 className="page-title">회원 관리</h1>
                {!loading && !error && <p className="page-subtitle">{members.length}명의 회원</p>}
            </div>

            {loading ? (
                <div className="spinner-container">
                    <div className="spinner" />
                </div>
            ) : error ? (
                <div className="error-state">
                    <div className="error-state-icon"><AlertIcon /></div>
                    <p>{error}</p>
                    <button className="btn-secondary" onClick={fetchMembers}>다시 시도</button>
                </div>
            ) : (
                <div className="member-table card">
                    <table>
                        <thead>
                            <tr>
                                <th>이메일</th>
                                <th>닉네임</th>
                                <th>역할</th>
                                <th>가입일</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member.id}>
                                    <td>{member.email}</td>
                                    <td>{member.nickname}</td>
                                    <td>
                                        <span className={`role-badge ${member.role === 'ADMIN' ? 'role-admin' : 'role-user'}`}>
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="text-secondary">{formatDate(member.createdAt)}</td>
                                    <td>
                                        {member.role !== 'ADMIN' && (
                                            <button
                                                className="btn-danger-sm"
                                                onClick={() => handleDelete(member.id, member.nickname)}
                                            >
                                                탈퇴
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
