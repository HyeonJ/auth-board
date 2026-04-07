import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../hooks/useAuth';
import './PostListPage.css';

function PenIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
    );
}

function DocIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
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

export default function PostListPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isLoggedIn } = useAuth();

    const fetchPosts = () => {
        setLoading(true);
        setError('');
        client.get('/api/posts')
            .then(res => setPosts(res.data.data))
            .catch(() => setError('게시글을 불러오는데 실패했습니다'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="page">
            <div className="post-list-header">
                <div className="post-list-header-text">
                    <h1 className="page-title">게시판</h1>
                    {!loading && !error && <p className="page-subtitle">{posts.length}개의 글</p>}
                </div>
                {isLoggedIn && (
                    <Link to="/posts/new" className="btn-primary-sm">
                        <PenIcon />
                        글 작성
                    </Link>
                )}
            </div>

            {loading ? (
                <div className="spinner-container">
                    <div className="spinner" />
                </div>
            ) : error ? (
                <div className="error-state">
                    <div className="error-state-icon"><AlertIcon /></div>
                    <p>{error}</p>
                    <button className="btn-secondary" onClick={fetchPosts}>다시 시도</button>
                </div>
            ) : (
                <div className="post-list">
                    {posts.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                <DocIcon />
                            </div>
                            아직 작성된 글이 없습니다
                        </div>
                    ) : (
                        posts.map(post => (
                            <Link to={`/posts/${post.id}`} key={post.id} className="post-item">
                                <span className="post-item-title">{post.title}</span>
                                <div className="post-item-meta">
                                    <span>{post.nickname}</span>
                                    <span className="meta-dot"></span>
                                    <span>{formatDate(post.createdAt)}</span>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
