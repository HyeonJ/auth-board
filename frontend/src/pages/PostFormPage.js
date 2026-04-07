import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import client from '../api/client';
import './PostFormPage.css';

function ChevronLeft() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
        </svg>
    );
}

export default function PostFormPage() {
    const { id } = useParams();
    const isEdit = !!id;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(isEdit);
    const navigate = useNavigate();

    useEffect(() => {
        if (isEdit) {
            client.get(`/api/posts/${id}`)
                .then(res => {
                    setTitle(res.data.data.title);
                    setContent(res.data.data.content);
                })
                .catch(() => navigate('/'))
                .finally(() => setLoading(false));
        }
    }, [id, isEdit, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            if (isEdit) {
                await client.put(`/api/posts/${id}`, { title, content });
                navigate(`/posts/${id}`, { state: { message: '글이 수정되었습니다' } });
            } else {
                const res = await client.post('/api/posts', { title, content });
                navigate(`/posts/${res.data.data}`, { state: { message: '글이 작성되었습니다' } });
            }
        } catch (err) {
            setError(err.response?.data?.message || '저장에 실패했습니다');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="page">
            <Link to={isEdit ? `/posts/${id}` : '/'} className="back-link">
                <ChevronLeft />
                {isEdit ? '글 상세' : '게시판'}
            </Link>

            {loading ? (
                <div className="spinner-container">
                    <div className="spinner" />
                </div>
            ) : (
                <div className="post-form card">
                    <h1 className="page-title">{isEdit ? '글 수정' : '글 작성'}</h1>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit} className="post-form-body">
                        <div className="form-group">
                            <label className="form-label">제목</label>
                            <input
                                className="form-input"
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="제목을 입력하세요"
                                maxLength={100}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">내용</label>
                            <textarea
                                className="form-textarea"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                placeholder="내용을 입력하세요"
                                required
                            />
                        </div>
                        <div className="btn-row post-form-actions">
                            <button className="btn-primary" type="submit" disabled={submitting}>
                                {submitting ? '저장 중...' : (isEdit ? '수정' : '작성')}
                            </button>
                            <button className="btn-secondary" type="button" onClick={() => navigate(-1)}>
                                취소
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
