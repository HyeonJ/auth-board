# Auth Board - 요구사항 정의서

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | Auth Board (회원 인증 게시판) |
| 목적 | Spring Security, JWT 인증/인가, Role 기반 권한 제어 학습 |
| 기술 스택 | React + Spring Boot + MyBatis + MySQL |
| 예상 기간 | 2~3주 |

## 2. 기술 스택 상세

### Backend
- Java 21
- Spring Boot 3.x
- Spring Security 6.x
- JWT (Access Token + Refresh Token)
- MyBatis
- MySQL 8.x

### Frontend
- React 18
- React Router
- Axios (JWT 인터셉터)

### Infra
- Docker Compose (MySQL 컨테이너)
- Testcontainers (테스트 환경)

## 3. 핵심 기능

### 3.1 회원 (Member)
- 회원가입 (이메일, 비밀번호, 닉네임)
- 로그인 → JWT 발급 (Access + Refresh)
- 토큰 갱신 (Refresh Token으로 Access Token 재발급)
- 로그아웃 (Refresh Token 삭제)

### 3.2 게시판 (Board)
- 글 목록 조회 (비로그인도 가능)
- 글 상세 조회 (비로그인도 가능)
- 글 작성 (로그인 필수)
- 글 수정/삭제 (본인만 가능)

### 3.3 관리자 (Admin)
- 모든 글 삭제 권한
- 회원 목록 조회
- 회원 강제 탈퇴

## 4. 권한 체계 (Role)

| Role | 글 조회 | 글 작성 | 본인 글 수정/삭제 | 모든 글 삭제 | 회원 관리 |
|------|---------|---------|-------------------|-------------|----------|
| 비로그인 | O | X | X | X | X |
| USER | O | O | O | X | X |
| ADMIN | O | O | O | O | O |

## 5. API 설계

### 인증 API
| Method | URI | 설명 | 권한 |
|--------|-----|------|------|
| POST | /api/auth/signup | 회원가입 | 없음 |
| POST | /api/auth/login | 로그인 | 없음 |
| POST | /api/auth/refresh | 토큰 갱신 | 없음 |
| POST | /api/auth/logout | 로그아웃 | USER 이상 |

### 게시판 API
| Method | URI | 설명 | 권한 |
|--------|-----|------|------|
| GET | /api/posts | 글 목록 조회 | 없음 |
| GET | /api/posts/{id} | 글 상세 조회 | 없음 |
| POST | /api/posts | 글 작성 | USER 이상 |
| PUT | /api/posts/{id} | 글 수정 | 본인만 |
| DELETE | /api/posts/{id} | 글 삭제 | 본인 또는 ADMIN |

### 관리자 API
| Method | URI | 설명 | 권한 |
|--------|-----|------|------|
| GET | /api/admin/members | 회원 목록 | ADMIN |
| DELETE | /api/admin/members/{id} | 회원 강제 탈퇴 | ADMIN |

## 6. JWT 토큰 전략

| 항목 | Access Token | Refresh Token |
|------|-------------|---------------|
| 유효기간 | 30분 | 7일 |
| 저장 위치 (클라이언트) | 메모리 (변수) | HttpOnly Cookie |
| 저장 위치 (서버) | 저장 안 함 | DB (refresh_token 테이블) |
| 용도 | API 인가 | Access Token 재발급 |

## 7. 인프라 구성

### Docker Compose - MySQL
| 항목 | 값 |
|------|-----|
| 이미지 | mysql:8.0 |
| 포트 | 3306:3306 |
| 데이터베이스 | auth_board |
| 사용자 | auth_user |
| 비밀번호 | 환경변수로 관리 (.env) |
| 볼륨 | mysql-data (데이터 영속화) |
| 초기화 스크립트 | docker/init.sql (스키마 생성) |

### 환경변수 (.env)
```env
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=auth_board
MYSQL_USER=auth_user
MYSQL_PASSWORD=
```

- `.env`는 `.gitignore`에 포함
- `.env.example`을 커밋하여 필요한 변수 목록 공유
