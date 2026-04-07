import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../hooks/useAuth';
import './PostDetailPage.css';

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

export default function PostDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, isLoggedIn, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [successMsg, setSuccessMsg] = useState(location.state?.message || '');

    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => setSuccessMsg(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    const fetchPost = () => {
        setLoading(true);
        setError('');
        client.get(`/api/posts/${id}`)
            .then(res => setPost(res.data.data))
            .catch(err => {
                if (err.response?.status === 404) {
                    setError('글을 찾을 수 없습니다');
                } else {
                    setError('글을 불러오는데 실패했습니다');
                }
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const isAuthor = isLoggedIn && user?.memberId === post?.memberId;
    const canDelete = isAuthor || isAdmin;

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await client.delete(`/api/posts/${id}`);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || '삭제에 실패했습니다');
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="page">
            <Link to="/" className="back-link">
                <ChevronLeft />
                게시판
            </Link>

            {loading ? (
                <div className="spinner-container">
                    <div className="spinner" />
                </div>
            ) : error ? (
                <div className="error-state">
                    <div className="error-state-icon"><AlertIcon /></div>
                    <p>{error}</p>
                    <button className="btn-secondary" onClick={() => navigate('/')}>목록으로</button>
                </div>
            ) : post && (
                <article className="post-detail card">
                    {successMsg && <div className="success-message">{successMsg}</div>}
                    <header className="post-detail-header">
                        <h1 className="post-detail-title">{post.title}</h1>
                        <div className="post-detail-meta">
                            <span className="post-detail-author">{post.nickname}</span>
                            <span className="meta-dot"></span>
                            <span>{formatDate(post.createdAt)}</span>
                            {post.updatedAt !== post.createdAt && (
                                <>
                                    <span className="meta-dot"></span>
                                    <span className="post-detail-badge">수정됨</span>
                                </>
                            )}
                        </div>
                    </header>
                    <div className="post-detail-content">{post.content}</div>
                    {canDelete && (
                        <footer className="post-detail-footer">
                            <div className="btn-row">
                                {isAuthor && (
                                    <button
                                        className="btn-secondary"
                                        onClick={() => navigate(`/posts/${id}/edit`)}
                                    >
                                        수정
                                    </button>
                                )}
                                <button className="btn-danger" onClick={handleDelete}>삭제</button>
                            </div>
                        </footer>
                    )}
                </article>
            )}
        </div>
    );
}
