# Coding Convention

## 목표

- 프로젝트 전반에서 일관된 코드 스타일과 작업 방식을 유지합니다.
- lint, format, import, 파일명, Component 구조 규칙을 공통 기준으로 맞춥니다.
- route, feature, shared 영역의 파일 배치 기준을 함께 맞춥니다.

## 기본 원칙

- 패키지 매니저는 pnpm만 사용합니다.
- lint / format 표준은 ESLint + Prettier를 사용합니다.
- TanStack Router 파일 기반 라우팅 규칙을 따릅니다.
- 자동 생성 파일 (`src/routeTree.gen.ts`)은 직접 수정하지 않습니다.

## 파일 / 코드 규칙

- 파일명은 kebab-case를 사용합니다.
- 컴포넌트와 타입은 PascalCase를 사용합니다.
- 함수와 훅은 camelCase를 사용합니다.
- import는 절대경로 `@/` 사용을 우선합니다.
- 사용하지 않는 import는 허용하지 않습니다.
- `import type`을 우선 사용합니다.

## 스타일 규칙

- 들여쓰기는 2칸 공백입니다.
- print width는 120입니다.
- 문자열 quote는 single quote를 사용합니다.
- semicolon을 사용합니다.
- trailing comma는 가능한 곳에 모두 사용합니다.
- bracket spacing은 사용합니다.
- 수동 포맷보다 Prettier 자동 포맷 결과를 우선합니다.

## ESLint 핵심 규칙

- `unused-imports/no-unused-imports`: error
- `@typescript-eslint/no-unused-vars`: error (`_` prefix 허용)
- `@typescript-eslint/consistent-type-imports`: error
- `prefer-const`: error
- `no-debugger`: error
- `no-console`: warn
- `react/no-danger`: warn
- `react/no-array-index-key`: warn
