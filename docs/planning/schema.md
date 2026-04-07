# Auth Board - DB 스키마

## ERD 관계

```
member (1) ──── (N) post
member (1) ──── (1) refresh_token
```

## 테이블 정의

### member

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 회원 ID |
| email | VARCHAR(100) | UNIQUE, NOT NULL | 이메일 |
| password | VARCHAR(255) | NOT NULL | BCrypt 암호화 비밀번호 |
| nickname | VARCHAR(30) | NOT NULL | 닉네임 |
| role | VARCHAR(20) | NOT NULL, DEFAULT 'USER' | USER / ADMIN |
| created_at | DATETIME | NOT NULL, DEFAULT NOW() | 가입일시 |

### post

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 게시글 ID |
| title | VARCHAR(100) | NOT NULL | 제목 |
| content | TEXT | NOT NULL | 내용 |
| member_id | BIGINT | FK → member.id, NOT NULL | 작성자 ID |
| created_at | DATETIME | NOT NULL, DEFAULT NOW() | 작성일시 |
| updated_at | DATETIME | NOT NULL, DEFAULT NOW() | 수정일시 |

### refresh_token

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 토큰 ID |
| member_id | BIGINT | FK → member.id, UNIQUE, NOT NULL | 회원 ID (1:1) |
| token | VARCHAR(500) | NOT NULL | Refresh Token 값 |
| expires_at | DATETIME | NOT NULL | 만료일시 |
| created_at | DATETIME | NOT NULL, DEFAULT NOW() | 발급일시 |

## 인덱스

| 테이블 | 인덱스 | 컬럼 | 용도 |
|--------|--------|------|------|
| member | UQ_member_email | email | 로그인 시 이메일 조회 |
| post | IX_post_member_id | member_id | 특정 회원의 글 조회 |
| post | IX_post_created_at | created_at DESC | 글 목록 최신순 정렬 |
| refresh_token | UQ_refresh_token_member_id | member_id | 회원당 토큰 1개 보장 |

## 삭제 정책

- 회원 강제 탈퇴 시: 해당 회원의 `post`, `refresh_token` 먼저 삭제 후 `member` 삭제
- 논리 삭제가 아닌 물리 삭제 (학습 프로젝트이므로 단순하게 처리)
