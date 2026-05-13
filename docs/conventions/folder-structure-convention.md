# Folder Structure Convention

## 적용 범위

Vite + React + TypeScript + TanStack Router + TanStack Query 프로젝트의 폴더·파일 배치 기준입니다.

## 핵심 원칙: 함께 수정되는 파일을 같은 디렉토리에

> 참고: [Frontend Fundamentals — 함께 수정되는 파일을 같은 디렉토리에 두기](https://frontend-fundamentals.com/code-quality/code/examples/code-directory.html)

파일을 종류별(hooks, components, api 등)로만 나누면 코드 사이의 의존 관계를 파악하기 어렵습니다. **함께 수정되는 파일은 같은 기능 디렉토리에 두어 응집도를 높입니다.**

- 기능 단위 디렉토리 안에 타입, 스키마, API 호출, 훅, 컴포넌트를 함께 둡니다.
- 여러 기능에서 함께 쓰는 코드만 shared 영역으로 분리합니다.
- 파일 위치는 **재사용 범위**와 **수정 단위**로 판단합니다.

## 루트 구조

```text
src/
  routes/           # TanStack Router 파일 기반 라우트 (자동 생성 포함)
  features/         # 기능 단위 모듈 (핵심)
  components/       # 공용 UI (여러 feature에서 사용)
  hooks/            # 공용 훅 (여러 feature에서 사용)
  lib/              # 공용 클라이언트, 설정
  store/            # 전역 상태
  types/            # 전역 타입
  constants/        # 전역 상수
  styles/           # 전역 스타일
  utils/            # 전역 유틸 (최소한)
  __tests__/        # 전역 통합 테스트
```

## Feature 내부 구조

Feature는 기능 단위의 독립적인 모듈입니다. 함께 수정되는 파일을 응집하여 배치합니다.

```text
src/features/<feature>/
  types.ts          # 도메인 타입 (요청/응답, 엔티티)
  schemas.ts        # Zod 검증 스키마 + 파생 타입
  api.ts            # API 호출 함수
  context/          # React Context Provider (필요 시)
  components/       # 기능 전용 UI 컴포넌트
  hooks/            # 기능 전용 훅
  __tests__/        # 기능 단위 테스트
```

### 파일 배치 예시 (auth feature)

```text
src/features/auth/
  types.ts              # AuthUser, LoginParams, SignupParams, AuthResponse
  schemas.ts            # loginSchema, signupSchema + 폼 데이터 타입
  api.ts                # loginApi, signupApi, logoutApi
  validate-form.ts      # 폼 검증 에러 헬퍼
  context/
    auth-provider.tsx   # AuthContext Provider
  components/
    login-form.tsx      # 로그인 폼
    signup-form.tsx     # 회원가입 폼
  hooks/
    use-auth.ts         # 인증 상태 + 액션 통합 훅
    use-auth-submit.ts  # 폼 제출 + 에러 처리 훅
```

> types.ts, schemas.ts, api.ts가 최상위에 위치하는 이유: 이들은 여러 하위 디렉토리(components, hooks, context)에서 함께 참조되며, 한 번의 기능 변경에 같이 수정되기 때문입니다.

## 폴더별 역할

### `src/routes`

- TanStack Router 파일 기반 라우팅 규칙을 따릅니다.
- `__root.tsx`: 루트 레이아웃 및 Devtools 설정
- `routeTree.gen.ts`: 자동 생성 파일, **직접 수정 금지**
- route 파일은 가능한 한 얇게 유지하고 구현은 `features/*`에서 가져옵니다.

### `src/features/<feature>`

한 기능 또는 한 도메인 단위의 코드를 둡니다.

- 특정 기능에서만 쓰는 코드는 feature 아래에 둡니다.
- 재사용이 늘면 shared 영역으로 **승격**합니다.

### `src/components`

여러 feature에서 함께 쓰는 공용 UI만 둡니다.

```text
src/components/
  ui/        # 디자인 시스템 기반 공용 컴포넌트
  common/    # ErrorBoundary, LoadingSpinner 등
  layout/    # Header, Footer 등
```

### `src/lib`

공용 클라이언트, 설정, 범용 helper를 둡니다.

```text
src/lib/
  api/        # 공용 API 클라이언트 (fetchApi, ApiError)
  query/      # QueryClient 초기화 등
```

### `src/store`

전역으로만 타당한 전역 상태를 둡니다. 디렉터리명은 `store`(단수)로 통일합니다.

### `src/types`

여러 feature에 걸치는 최소 타입 모음만 둡니다.

### `src/constants`

전역 공통 상수만 둡니다. 디렉터리명은 `constants`로 통일합니다.

## 네이밍 규칙

- 폴더명: `kebab-case`
- 파일명: `kebab-case`
- React 컴포넌트 export: `PascalCase`
- hook 파일: `use-*.ts` 또는 `use-*.tsx`

## 새 파일을 만들 때 판단 순서

1. 라우트 entry인가? → `src/routes`
2. 특정 기능 전용인가? → `src/features/<feature>` (타입, API, 스키마, 컴포넌트, 훅을 같이 배치)
3. 여러 기능에서 재사용되는가? → `src/components`, `src/hooks`, `src/lib`, `src/types`, `src/constants`
4. 전역 상태인가? → `src/store`
5. 전역 style 자산인가? → `src/styles`
6. 순수·짧은 helper인가? → 필요 시 `src/utils` 또는 feature 내부 파일

## 테스트

```text
src/__tests__/          # 전역 통합 테스트
src/features/<feature>/__tests__/  # feature 단위 테스트
```

```bash
pnpm test        # watch 모드
pnpm test:run    # 단일 실행
```
