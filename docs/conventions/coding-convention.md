# Coding Convention

> 코드 품질 기준은 [Frontend Fundamentals — 좋은 코드를 위한 4가지 기준](https://frontend-fundamentals.com/code-quality/code/)을 따릅니다.

## 코드 품질 4가지 기준

좋은 프론트엔드 코드는 **변경하기 쉬운** 코드입니다. 새로운 요구사항이 들어왔을 때 기존 코드를 수정하고 배포하기 수월한 코드가 좋은 코드입니다. 다음 4가지 기준으로 판단합니다.

### 1. 가독성 (Readability)

코드가 읽기 쉬운 정도입니다. 읽기 좋은 코드는 한 번에 고려하는 맥락이 적고 위에서 아래로 자연스럽게 이어집니다.

- **맥락 줄이기**: 같이 실행되지 않는 코드는 분리하고, 구현 상세는 추상화합니다.
- **이름 붙이기**: 복잡한 조건과 매직 넘버에 의미 있는 이름을 붙입니다.
- **위에서 아래로**: 시점 이동을 줄이고 삼항 연산자를 단순하게 유지합니다.

### 2. 예측 가능성 (Predictability)

함수나 컴포넌트의 동작을 이름과 시그니처만으로 예측할 수 있어야 합니다.

- **이름 겹치지 않게**: 같은 모듈 내에서 의미가 다르면 다른 이름을 사용합니다.
- **반환 타입 통일**: 같은 종류의 함수는 반환 타입을 통일합니다.
- **숨은 로직 드러내기**: 부작용(네트워크, 네비게이션)이 있으면 시그니처에 드러냅니다.

### 3. 응집도 (Cohesion)

수정되어야 할 코드가 항상 같이 수정되도록 구조화합니다.

- 가독성과 응집도는 상충할 수 있습니다. 함께 수정되지 않으면 오류가 발생할 수 있는 경우 응집도를, 위험성이 낮은 경우 가독성을 우선합니다.
- **함께 수정되는 파일은 같은 디렉토리에**: 타입, 스키마, API 호출, 컴포넌트가 한 기능 단위로 응집합니다.
- **매직 넘버 없애기**: 상태 값은 의미 있는 상수나 타입으로 관리합니다.
- **폼 응집도**: 폼 필드의 변경 단위에 따라 필드 단위 또는 폼 전체 단위로 관리합니다.

### 4. 결합도 (Coupling)

코드를 수정했을 때 영향 범위가 적어야 합니다. 결합도가 낮으면 변경에 따른 범위를 예측할 수 있습니다.

- **책임을 하나씩**: 훅이나 함수가 여러 책임을 가지면 분리합니다.
- **중복 코드 허용**: 얽히지 않는 코드는 과도한 추상화 대신 복제를 허용합니다.
- **Props Drilling 지우기**: 깊이 전달되는 props는 Context나 상태 관리로 대체합니다.

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
