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
- React 프론트엔드 전체 페이지 구현 (로그인, 회원가입, 글 목록/상세/작성/수정, 관리자)
- 다크/라이트 테마 전환 (Linear 스타일)
- Axios 인터셉터 (토큰 자동 첨부, 401시 refresh 재시도)
- 인증 컨텍스트 (새로고침 시 자동 로그인 복구)

### Changed
- 프론트엔드 디자인 "Liquid Glass" 폴리시 업그레이드
- 다크 테마: 순수 블랙 → 딥 네이비/인디고 틴트 서피스 (프리미엄 느낌)
- 버튼: 그라디언트 배경 (accent → purple) + 상단 글래스 하이라이트 + 액센트 글로우 쉐도우
- 카드: 상단 1px 인너 하이라이트 추가 (유리 깊이감)
- 게시글 목록: 호버 시 왼쪽 그라디언트 액센트 바 + 타이틀 색상 변경
- 게시글 상세: 타이틀에 그라디언트 텍스트 효과 (primary → accent)
- 인증 페이지: 카드 뒤 ambient 그라디언트 오브 + 아이콘 그라디언트 + 강화된 글로우
- 관리자 테이블: ADMIN 배지 그라디언트 스타일링, USER 배지 보더 추가
- Navbar: 아바타 그라디언트 배경, 유저 영역 보더 추가, 테마 토글 회전 애니메이션
- 폼 인풋: 포커스 시 미세한 lift 효과 + 강화된 글로우 쉐도우
- 뒤로가기 링크: 호버 시 왼쪽 이동 애니메이션
- body 배경: ambient 라이트 효과 (상단 래디얼 그라디언트)
- 전체적으로 미세한 트랜지션 및 마이크로인터랙션 강화
- 프론트엔드 디자인 전면 리워크 (Apple HIG 스타일)
- 디자인 시스템: Outfit(디스플레이) + Source Serif 4(본문) 폰트 조합
- 컬러 시스템: Apple Blue 액센트 (#0071e3 라이트 / #0a84ff 다크)
- 라이트 테마: "morning mist" — 반투명 프로스티드 글라스 레이어
- 다크 테마: "midnight glass" — 깊은 블랙 + 발광 글라스 패널
- 카드 컴포넌트: backdrop-filter blur(40px) 프로스티드 글라스 효과
- Navbar: 프로스티드 글라스 바, 0.5px 보더, SVG 테마 토글 아이콘
- 인증 페이지: 액센트 글로우 아이콘 헤더, scaleIn 애니메이션
- 게시글 목록: staggered slideUp 애니메이션, 펜 아이콘 글 작성 버튼
- 게시글 상세: Source Serif 4 본문 서체, "수정됨" pill 배지
- 게시글 폼: pill 형태 제출 버튼
- 관리자 테이블: pill 역할 배지, pill 삭제 버튼, 프로스티드 헤더
- 빈 상태: floating 애니메이션 문서 아이콘
- 에러 메시지: SVG 아이콘 + slideDown 애니메이션
- 버튼: spring 이징 hover lift + active scale 마이크로인터랙션
- 포커스 링: Apple 블루 glow shadow
- 큰 둥근 모서리 (18~24px radius), 부드러운 5단계 그림자 체계
- UX 개선: Apple `< Back` 스타일 뒤로가기 링크 (상세/작성/관리자 페이지)
- UX 개선: 모든 데이터 로딩 페이지에 스피너 추가
- UX 개선: 앱 초기 인증 체크 시 전체 화면 로딩 스피너
- UX 개선: API 실패 시 에러 상태 화면 + 재시도 버튼
- UX 개선: 로그인 상태에서 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트
- UX 개선: 비로그인 시 글 작성/수정 페이지 접근 차단 (ProtectedRoute)
- UX 개선: Navbar 현재 페이지 활성 상태 표시
- UX 개선: 회원가입 완료 → 로그인 페이지 성공 메시지 표시
- UX 개선: 글 작성/수정 완료 → 상세 페이지 성공 메시지 표시
