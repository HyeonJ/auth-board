# Changelog

이 프로젝트의 모든 주요 변경사항을 기록합니다.
형식은 [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)를 따릅니다.

## [Unreleased]

### Added
- 프로젝트 요구사항 정의서 작성 (docs/planning/requirements.md)
- 사용자 시나리오 문서 작성 (docs/planning/scenarios.md)
- DB 스키마 문서 작성 (docs/planning/schema.md)
- 기술 결정 기록 작성 (docs/planning/decisions.md)
- README.md 프로젝트 소개 문서 작성
- TODO.md 작업 상태 추적 문서 작성
- CLAUDE.md 프로젝트 규칙 문서 작성 (금지 패턴, 디렉토리 구조 포함)
- CHANGELOG.md 생성
- Docker Compose 구성 (MySQL 8.0, init.sql 스키마 초기화)
- Spring Boot 백엔드 프로젝트 셋업 (Gradle, Java 21, Security, MyBatis, JWT)
- React 프론트엔드 프로젝트 셋업 (React Router, Axios)
- 헬스체크 API (`GET /api/health`)
- Axios 인스턴스 설정 (baseURL, withCredentials)
- 회원 인증 API 구현 (회원가입, 로그인, 토큰 갱신, 로그아웃)
- JWT 토큰 발급/검증 (Access Token 30분, Refresh Token 7일)
- Spring Security + JWT 인증 필터 구성
- Refresh Token DB 저장 및 HttpOnly Cookie 관리
- CORS 설정 (localhost:3000 허용)
- 통합 예외 처리 (GlobalExceptionHandler)
- 게시판 CRUD API (목록/상세 조회, 작성, 수정, 삭제)
- 게시글 권한 검증 (본인 수정/삭제, ADMIN 전체 삭제)
- 관리자 API (회원 목록 조회, 회원 강제 탈퇴)
