# Repository Guide

## 스택

Vite + React + TypeScript + TanStack Router + TanStack Query.

## 우선순위

1. `docs/conventions/coding-convention.md`
2. `docs/conventions/folder-structure-convention.md`
3. `docs/conventions/git-convention.md`
4. 저장소 루트 설정 파일 (`eslint.config.js`, `.prettierrc.json`, `.editorconfig`, `.gitattributes`)

## 작업 규칙

- 패키지 매니저는 pnpm만 사용합니다.
- lint / format은 ESLint + Prettier 기준을 따릅니다.
- 커밋 메시지는 `[브랜치명] 작업 요약` 형식을 따릅니다.
- git hook 설치는 `pnpm install` 후 `prepare`에서 자동 실행되며, 필요 시 `pnpm run prepare`로 다시 설치합니다.

## 구조 규칙

- import는 절대경로 `@/` 사용을 우선합니다.
- 파일명은 `kebab-case`, 컴포넌트와 타입은 `PascalCase`, 함수와 훅은 `camelCase`를 사용합니다.
- 라우트 파일은 `src/routes/` 하위에 위치하며, TanStack Router 파일 기반 라우팅 규칙을 따릅니다.
- 자동 생성 파일 (`src/routeTree.gen.ts`)은 직접 수정하지 않습니다.

## 검증 흐름

1. 구현 후 `pnpm lint`를 실행합니다.
2. 구현 후 `pnpm format`을 실행합니다.
3. 구현 후 `pnpm build`를 실행합니다.
4. 커밋 전에는 staged 파일 기준 pre-commit 검사를 통과해야 합니다.

## 검증 명령

```bash
pnpm install
pnpm lint
pnpm format
pnpm build
pnpm test:run
```

## 메모

- 공통 규칙은 되도록 `AGENTS.md`와 `docs/conventions/*`에 모으고, 도구별 파일은 얇게 유지합니다.
