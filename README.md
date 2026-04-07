# Auth Board

Spring Security + JWT 인증/인가를 학습하기 위한 회원 인증 게시판

## 주요 기능

- **회원 인증**: 회원가입, 로그인, JWT 기반 인증 (Access Token + Refresh Token)
- **게시판**: 글 목록/상세 조회, 작성, 수정, 삭제
- **권한 제어**: Role 기반 인가 (USER / ADMIN)
- **관리자**: 모든 글 삭제, 회원 관리, 강제 탈퇴

## 기술 스택

| 영역 | 기술 |
|------|------|
| Backend | Java 21, Spring Boot 3.x, Spring Security 6.x, JWT, MyBatis |
| Frontend | React 18, React Router, Axios |
| Database | MySQL 8.x |
| Infra | Docker Compose |

## 실행 방법

### 1. 환경변수 설정

```bash
cp .env.example .env
# .env 파일에 DB 비밀번호, JWT 시크릿 등 설정
```

### 2. MySQL 실행

```bash
docker compose up -d
```

### 3. Backend 실행

```bash
cd backend
./gradlew bootRun
```

### 4. Frontend 실행

```bash
cd frontend
npm install
npm start
```

| 서비스 | 포트 |
|--------|------|
| React | 3000 |
| Spring Boot | 8080 |
| MySQL | 3306 |

## 프로젝트 구조

```
auth-board/
├── backend/             # Spring Boot
├── frontend/            # React
├── docker/
│   └── init.sql         # 테이블 생성 SQL
├── docs/planning/       # 기획 문서
├── docker-compose.yml
├── CLAUDE.md            # AI 컨텍스트 + 프로젝트 규칙
├── CHANGELOG.md         # 버전/릴리즈 이력
└── TODO.md              # 현재 작업 상태
```
