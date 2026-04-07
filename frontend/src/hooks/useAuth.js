import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import client from '../api/client';

const AuthContext = createContext();

function parseToken(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = useCallback((tokenData) => {
        setAccessToken(tokenData.accessToken);
        const payload = parseToken(tokenData.accessToken);
        setUser({
            memberId: Number(payload?.sub),
            nickname: tokenData.nickname,
            role: tokenData.role,
        });
    }, []);

    const logout = useCallback(async () => {
        try {
            await client.post('/api/auth/logout');
        } catch (e) {
            // 이미 만료된 토큰이어도 로그아웃 처리
        }
        setAccessToken(null);
        setUser(null);
    }, []);

    // 앱 시작 시 refresh 시도 (새로고침 대응)
    useEffect(() => {
        const tryRefresh = async () => {
            try {
                const res = await client.post('/api/auth/refresh');
                setAccessToken(res.data.data.accessToken);
                // refresh 성공 시 user 정보는 토큰에서 디코딩
                const payload = parseToken(res.data.data.accessToken);
                setUser({
                    memberId: Number(payload?.sub),
                    nickname: payload?.email?.split('@')[0],
                    role: payload?.role,
                });
            } catch (e) {
                // refresh 실패 → 비로그인 상태
            } finally {
                setLoading(false);
            }
        };
        tryRefresh();
    }, []);

    // Axios 인터셉터 설정
    useEffect(() => {
        const requestInterceptor = client.interceptors.request.use(config => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        const responseInterceptor = client.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const res = await client.post('/api/auth/refresh');
                        const newToken = res.data.data.accessToken;
                        setAccessToken(newToken);
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return client(originalRequest);
                    } catch (refreshError) {
                        setAccessToken(null);
                        setUser(null);
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            client.interceptors.request.eject(requestInterceptor);
            client.interceptors.response.eject(responseInterceptor);
        };
    }, [accessToken]);

    const value = useMemo(() => ({
        accessToken, user, loading, login, logout,
        isLoggedIn: !!accessToken,
        isAdmin: user?.role === 'ADMIN',
    }), [accessToken, user, loading, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
