import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostFormPage from './pages/PostFormPage';
import AdminPage from './pages/AdminPage';

function ProtectedRoute({ children }) {
    const { isLoggedIn, loading } = useAuth();
    if (loading) return null;
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    return children;
}

function App() {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="app-loading">
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<PostListPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/posts/new" element={
                    <ProtectedRoute><PostFormPage /></ProtectedRoute>
                } />
                <Route path="/posts/:id" element={<PostDetailPage />} />
                <Route path="/posts/:id/edit" element={
                    <ProtectedRoute><PostFormPage /></ProtectedRoute>
                } />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </div>
    );
}

export default App;
