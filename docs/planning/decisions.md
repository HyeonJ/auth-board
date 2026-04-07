# Auth Board - Architecture Decision Records (ADR)

## ADR-001: ORM 대신 MyBatis 선택

**결정**: JPA/Hibernate 대신 MyBatis 사용

**이유**:
- SQL을 직접 작성하며 DB 동작을 명확히 이해하기 위함
- 실무에서 MyBatis를 쓰는 환경이 많아 학습 가치가 높음
- 단순 CRUD 프로젝트에서 JPA의 영속성 컨텍스트는 오버스펙

**트레이드오프**:
- 테이블 변경 시 XML 매퍼도 수동 수정 필요
- N+1 해결을 직접 JOIN 쿼리로 처리해야 함

---

## ADR-002: Access Token은 메모리, Refresh Token은 HttpOnly Cookie

**결정**: Access Token은 JS 변수(메모리)에, Refresh Token은 HttpOnly Cookie에 저장

**이유**:
- Access Token을 localStorage에 넣으면 XSS에 취약
- HttpOnly Cookie는 JS로 접근 불가 → Refresh Token 탈취 방지
- 메모리 저장은 탭 새로고침 시 날아가지만, Refresh Token으로 재발급하면 됨

**트레이드오프**:
- 새로고침마다 /api/auth/refresh 호출 필요
- CSRF 방어를 위해 SameSite 설정 필요

---

## ADR-003: Refresh Token DB 저장 (1:1)

**결정**: 회원당 Refresh Token 1개만 DB에 저장

**이유**:
- 로그아웃 시 서버 측에서 토큰을 무효화할 수 있어야 함
- 다중 기기 지원이 필요 없는 학습 프로젝트 → 1:1로 단순하게
- 갱신 시 이전 토큰 삭제 후 새 토큰 저장 (덮어쓰기 의존 금지)

**트레이드오프**:
- 다른 기기에서 로그인하면 기존 세션이 끊김
- 토큰 검증마다 DB 조회 필요 (Redis 도입 시 개선 가능)

---

## ADR-004: React + Spring Boot 분리 구성

**결정**: 프론트엔드를 Thymeleaf가 아닌 React SPA로 분리

**이유**:
- JWT 기반 인증의 클라이언트 측 처리를 직접 구현해보기 위함
- Axios 인터셉터로 토큰 갱신 플로우를 학습
- 프론트/백 분리 아키텍처 경험

**트레이드오프**:
- CORS 설정 필요
- 개발 시 두 서버를 동시에 실행해야 함

---

## ADR-005: 테스트 DB로 Testcontainers 사용

**결정**: H2 인메모리 DB 대신 Testcontainers로 실제 MySQL 컨테이너 사용

**이유**:
- H2와 MySQL의 SQL 문법 차이로 테스트가 깨지는 경우 방지 (ON CONFLICT, INTERVAL 등)
- 운영 환경과 동일한 DB로 테스트해야 신뢰할 수 있음

**트레이드오프**:
- 테스트 실행 속도가 H2보다 느림
- Docker가 설치되어 있어야 함
