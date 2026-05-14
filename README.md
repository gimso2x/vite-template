# Vite Template

Vite + React 19 + TanStack Router + TanStack Query + Hono BFF + SCSS로 구성된 프로덕션 레디 프론트엔드 템플릿입니다.

## 기술 스택

| 영역      | 기술                                             |
| --------- | ------------------------------------------------ |
| 빌드      | Vite 8 + TypeScript 6                            |
| UI        | React 19 + React Compiler                        |
| 라우팅    | TanStack Router (파일 기반, auto code splitting) |
| 서버 상태 | TanStack Query                                   |
| BFF       | Hono (Vite dev middleware + Node.js production)  |
| 스타일    | SCSS (design tokens, light/dark theme)           |
| 검증      | Zod                                              |
| 테스트    | Vitest + Testing Library                         |
| 린트      | ESLint + Prettier                                |
| Git Hooks | simple-git-hooks + lint-staged                   |
| 배포      | Docker (multi-stage build)                       |

## 시작하기

> Node.js `22.22.0+`와 pnpm `10.30.3+`를 권장합니다. Docker 이미지는 Node.js `24.13.0-slim`을 기본값으로 사용합니다.

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## 프로젝트 구조

```
src/
  routes/             # TanStack Router 파일 기반 라우트
  features/           # 기능 단위 모듈 (components, hooks, api)
  components/         # 공용 UI 컴포넌트
    layout/           # Header, Footer 등 레이아웃
    ui/               # 공용 UI 요소
    common/           # 공통 컴포넌트
  hooks/              # 공용 커스텀 훅
  lib/                # 공용 클라이언트/설정
    api/              # API 클라이언트
    query/            # QueryClient 설정
  store/              # 전역 상태
  types/              # 공용 타입
  constants/          # 공용 상수
  styles/             # 글로벌 스타일 (변수, 믹스인, 리셋)
  server/             # Hono BFF 서버
    routes/           # API 라우트 (health, proxy)
    middleware/        # 인증, OG 인젝터
  utils/              # 유틸리티 함수
  __tests__/          # 테스트 설정 및 공통 테스트
```

자세한 구조 기준은 [docs/conventions/folder-structure-convention.md](docs/conventions/folder-structure-convention.md)을 참고하세요.

## 스타일 시스템

이 템플릿은 외부 사설 디자인 시스템 패키지에 의존하지 않습니다.

- 토큰 원본: `src/styles/global.scss`의 CSS Custom Properties
- SCSS 매핑: `src/styles/_variables.scss`
- 리셋: `src/styles/_reset.scss`
- 버튼 프리셋: `src/styles/_buttons.scss`

새 프로젝트에서 브랜드 색상이나 spacing scale을 바꾸려면 먼저 `global.scss`의 `:root` 토큰을 수정하세요.

## BFF 아키텍처

무거운 SSR 대신 Hono 기반 BFF로 API 프록싱, 보안 검증, 크롤러 OG 태그 주입을 처리합니다.

- **개발**: Vite 플러그인이 `/api/*` 요청을 Hono로 포워딩 (HMR 유지)
- **운영**: Node.js 서버가 정적 파일 서빙 + SPA fallback + API 프록시 수행

| 엔드포인트        | 설명                   |
| ----------------- | ---------------------- |
| `GET /api/health` | 헬스체크 (인증 불필요) |
| `ALL /api/v1/*`   | 내부 API v1 프록시     |
| `ALL /api/v2/*`   | 내부 API v2 프록시     |

## 환경변수

`.env.example`을 복사하여 `.env` 파일을 생성하세요.

```bash
cp .env.example .env
```

| 변수           | 설명                      | 기본값                  |
| -------------- | ------------------------- | ----------------------- |
| `INT_API_URL`  | 내부 API 서버 URL         | `http://localhost:8080` |
| `INT_API2_URL` | 두 번째 내부 API 서버 URL | `http://localhost:8081` |
| `PORT`         | 프로덕션 서버 포트        | `3000`                  |

## 명령어

| 명령어          | 설명                             |
| --------------- | -------------------------------- |
| `pnpm dev`      | 개발 서버 시작 (Vite + Hono BFF) |
| `pnpm build`    | 타입체크 + 프로덕션 빌드         |
| `pnpm start`    | 프로덕션 서버 실행               |
| `pnpm lint`     | ESLint 실행                      |
| `pnpm format`   | Prettier 실행                    |
| `pnpm test`     | Vitest watch 모드                |
| `pnpm test:run` | Vitest 단일 실행                 |
| `pnpm preview`  | 빌드 결과 미리보기               |

## Docker

Dockerfile은 `dockerfile/` 디렉터리에 분리되어 있습니다.

```bash
# production 이미지 빌드
docker build -f dockerfile/Dockerfile-production -t vite-template:prod .

# production 컨테이너 실행
docker run --rm -p 3000:3000 --env-file .env vite-template:prod

# development 이미지 빌드
docker build -f dockerfile/Dockerfile-development -t vite-template:dev .
```

## 컨벤션

- [코딩 컨벤션](docs/conventions/coding-convention.md)
- [폴더 구조 컨벤션](docs/conventions/folder-structure-convention.md)
- [Git 컨벤션](docs/conventions/git-convention.md)

## 커밋 메시지

형식: `[브랜치명] 작업 요약`

```
[master] 초기 템플릿 설정
[feature/202605-로그인] 로그인 폼 구현
```
