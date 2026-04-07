# Auth Board - 프로젝트 규칙

## 프로젝트 소개
Spring Security + JWT 인증/인가를 학습하기 위한 회원 인증 게시판

## 기술 스택
- Backend: Java 21, Spring Boot 3.x, Spring Security 6.x, JWT, MyBatis, MySQL 8.x
- Frontend: React 18, React Router, Axios
- Infra: Docker Compose (MySQL)

## 디렉토리 구조
```
auth-board/
├── backend/                 # Spring Boot
│   └── src/main/java/
│       ├── controller/
│       ├── service/
│       ├── mapper/
│       ├── dto/
│       ├── domain/
│       ├── security/
│       └── config/
├── frontend/                # React
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── api/
│       └── hooks/
├── docker/
│   └── init.sql
├── docs/planning/           # 기획 문서
│   ├── requirements.md      # 요구사항 정의서
│   ├── scenarios.md         # 사용자 시나리오
│   ├── schema.md            # DB 스키마
│   └── decisions.md         # 기술 결정 (ADR)
├── CLAUDE.md
├── CHANGELOG.md
├── TODO.md
└── README.md
```

## 금지 패턴
- JPA/Hibernate 사용 금지 (MyBatis만 사용)
- Lombok @Data 금지 → @Getter/@Setter 명시적으로
- Map<String, Object> 반환 금지 → 엔티티/DTO 사용
- Access Token을 localStorage에 저장 금지 → 메모리(변수)에만

## 빌드 & 실행
```bash
# MySQL
docker compose up -d

# Backend
cd backend
./gradlew bootRun

# Frontend
cd frontend
npm install
npm start
```

## 규칙 문서
- 문서 업데이트 규칙: docs/conventions/doc-update-rules.md

## 커밋 규칙
- 글로벌 CLAUDE.md의 Git 커밋 메시지 규칙 따를 것
- **커밋할 때마다 CHANGELOG.md의 [Unreleased] 섹션에 변경 내용 추가 필수**
- 카테고리: Added / Changed / Fixed / Removed
