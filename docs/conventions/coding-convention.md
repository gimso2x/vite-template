# Coding Convention

> 코드 품질 기준은 [Frontend Fundamentals — 좋은 코드를 위한 4가지 기준](https://frontend-fundamentals.com/code-quality/code/)을 따릅니다.

## 코드 품질 4가지 기준

좋은 프론트엔드 코드는 **변경하기 쉬운** 코드입니다. 새로운 요구사항이 들어왔을 때 기존 코드를 수정하고 배포하기 수월한 코드가 좋은 코드입니다. 다음 4가지 기준으로 판단합니다.

### 1. 가독성 (Readability)

코드가 읽기 쉬운 정도입니다. 코드가 변경하기 쉬우려면 먼저 코드가 어떤 동작을 하는지 이해할 수 있어야 합니다. 읽기 좋은 코드는 읽는 사람이 한 번에 머릿속에서 고려하는 맥락이 적고, 위에서 아래로 자연스럽게 이어집니다.

- **맥락 줄이기**
  - [같이 실행되지 않는 코드 분리하기](https://frontend-fundamentals.com/code-quality/code/examples/submit-button.html)
  - [구현 상세 추상화하기](https://frontend-fundamentals.com/code-quality/code/examples/login-start-page.html)
  - [로직 종류에 따라 합쳐진 함수 쪼개기](https://frontend-fundamentals.com/code-quality/code/examples/use-page-state-readability.html)
- **이름 붙이기**
  - [복잡한 조건에 이름 붙이기](https://frontend-fundamentals.com/code-quality/code/examples/condition-name.html)
  - [매직 넘버에 이름 붙이기](https://frontend-fundamentals.com/code-quality/code/examples/magic-number-readability.html)
- **위에서 아래로 읽히게 하기**
  - [시점 이동 줄이기](https://frontend-fundamentals.com/code-quality/code/examples/user-policy.html)
  - [삼항 연산자 단순하게 하기](https://frontend-fundamentals.com/code-quality/code/examples/ternary-operator.html)

### 2. 예측 가능성 (Predictability)

함께 협업하는 동료들이 함수나 컴포넌트의 동작을 얼마나 예측할 수 있는지를 말합니다. 예측 가능성이 높은 코드는 일관적인 규칙을 따르고, 함수나 컴포넌트의 이름과 파라미터, 반환 값만 보고도 어떤 동작을 하는지 알 수 있습니다.

- [이름 겹치지 않게 관리하기](https://frontend-fundamentals.com/code-quality/code/examples/http.html)
- [같은 종류의 함수는 반환 타입 통일하기](https://frontend-fundamentals.com/code-quality/code/examples/use-user.html)
- [숨은 로직 드러내기](https://frontend-fundamentals.com/code-quality/code/examples/hidden-logic.html)

### 3. 응집도 (Cohesion)

수정되어야 할 코드가 항상 같이 수정되는지를 말합니다. 응집도가 높은 코드는 코드의 한 부분을 수정해도 의도치 않게 다른 부분에서 오류가 발생하지 않습니다. 함께 수정되어야 할 부분이 반드시 함께 수정되도록 구조적으로 뒷받침되기 때문입니다.

- [함께 수정되는 파일을 같은 디렉토리에 두기](https://frontend-fundamentals.com/code-quality/code/examples/code-directory.html)
- [매직 넘버 없애기](https://frontend-fundamentals.com/code-quality/code/examples/magic-number-cohesion.html)
- [폼의 응집도 생각하기](https://frontend-fundamentals.com/code-quality/code/examples/form-fields.html)

### 4. 결합도 (Coupling)

코드를 수정했을 때의 영향 범위를 말합니다. 코드를 수정했을 때 영향 범위가 적어서, 변경에 따른 범위를 예측할 수 있는 코드가 수정하기 쉬운 코드입니다.

- [책임을 하나씩 관리하기](https://frontend-fundamentals.com/code-quality/code/examples/use-page-state-coupling.html)
- [중복 코드 허용하기](https://frontend-fundamentals.com/code-quality/code/examples/use-bottom-sheet.html)
- [Props Drilling 지우기](https://frontend-fundamentals.com/code-quality/code/examples/item-edit-modal.html)

### 기준 간 상충

아쉽게도 이 4가지 기준을 모두 한꺼번에 충족하기는 어렵습니다. 기준 사이에는 상충이 존재합니다.

- **응집도 vs 가독성**: 응집도를 높이기 위해 공통화·추상화하면 코드가 한 차례 추상화되어 가독성이 떨어집니다. 함께 수정되지 않으면 오류가 발생할 수 있는 경우에는 응집도를 우선하세요. 위험성이 높지 않은 경우에는 가독성을 우선하여 코드 중복을 허용하세요.
- **결합도 vs 응집도**: 중복 코드를 허용하면 영향 범위를 줄일 수 있어 결합도는 낮아지지만, 한쪽을 수정할 때 다른 쪽을 실수로 수정하지 못할 수 있어 응집도는 떨어집니다.

프론트엔드 개발자는 현재 직면한 상황을 바탕으로, 장기적으로 코드가 수정하기 쉽게 하기 위해 어떤 가치를 우선해야 하는지 고민해야 합니다.

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
