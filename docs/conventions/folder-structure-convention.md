# Folder Structure Convention

## 적용 범위

Vite + React + TypeScript + TanStack Router + TanStack Query 프로젝트의 폴더·파일 배치 기준입니다.

## 목표

- 프로젝트가 커져도 파일 위치를 쉽게 예측할 수 있게 합니다.
- route, feature, shared 영역의 경계를 분명히 합니다.
- 기능 추가와 코드 이동이 잦아도 `utils`와 `components`가 무한정 커지지 않게 합니다.

## 기본 원칙

- `src/routes`는 TanStack Router 파일 기반 라우팅 entry 중심으로 얇게 유지합니다.
- 기능 전용 코드는 **`src/features/<feature>`** 아래가 기본 위치입니다.
- 여러 기능에서 함께 쓰는 코드만 shared 성격 폴더(`components`, `hooks`, `lib` 등)에 둡니다.
- 파일 위치는 **재사용 범위**로 판단합니다.

## 권장 루트 구조

```text
src/
  routes/           # TanStack Router 파일 기반 라우트 (자동 생성 포함)
  features/
  components/
  hooks/
  lib/
  store/            # 디렉터리명은 store(단수)로 통일
  types/
  constants/        # 디렉터리명은 constants 로 통일
  styles/
  utils/            # 선택. 순수·짧은 helper만 허용
  __tests__/
```

`features` 하위에는 필요에 따라 다음을 조합합니다.

```text
src/features/<feature>/
  components/
  hooks/
  api/
  queries/          # TanStack Query query 모듈
  types/
  constants/
  utils/
  __tests__/
```

## 폴더별 역할

### `src/routes`

- TanStack Router 파일 기반 라우팅 규칙을 따릅니다.
- `__root.tsx`: 루트 레이아웃 및 Devtools 설정
- `index.tsx`, `about.tsx` 등: 각 경로 컴포넌트
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
  ui/
  common/
  layout/
```

### `src/lib`

공용 클라이언트, 설정, 범용 helper를 둡니다.

```text
src/lib/
  api/        # 공용 API 클라이언트
  query/      # QueryClient 초기화 등
```

### `src/store`

전역으로만 타당한 전역 상태를 둡니다. 디렉터리명은 `store`(단수)로 통일합니다.

### `src/types`

여러 feature에 걸치는 최소 타입 모음만 둡니다.

### `src/constants`

전역 공통 상수만 둡니다. 디렉터리명은 **`constants`** 로 통일합니다.

## 네이밍 규칙

- 폴더명: `kebab-case`
- 파일명: `kebab-case`
- React 컴포넌트 export: `PascalCase`
- hook 파일: `use-*.ts` 또는 `use-*.tsx`

## 새 파일을 만들 때 판단 순서

1. 라우트 entry인가? → `src/routes`
2. 특정 기능 전용인가? → `src/features/<feature>`
3. 여러 기능에서 재사용되는가? → `src/components`, `src/hooks`, `src/lib`, `src/types`, `src/constants`
4. 전역 상태인가? → `src/store`
5. 전역 style 자산인가? → `src/styles`
6. 순수·짧은 helper인가? → 필요 시 `src/utils` 또는 feature `utils`

## 테스트

```text
src/__tests__/          # 전역 통합 테스트
src/features/<feature>/__tests__/  # feature 단위 테스트
```

```bash
pnpm test        # watch 모드
pnpm test:run    # 단일 실행
```
