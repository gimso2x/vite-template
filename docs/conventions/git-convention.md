# Git Convention

## 중요

- master(main) 브랜치는 수정불가입니다.
- 수정이 필요한 경우 개발팀장 동의를 받아야 합니다.
- master(main) 직접 push는 금지합니다.
- master(main)은 release/\*, hotfix/\* 브랜치를 통해서만 병합합니다.

## 주요 브랜치

- master(main): 실서버 운영 브랜치
- release/\*: 배포 대기 및 최종 검증 브랜치
- develop: 개발서버 테스트 및 feature 통합 브랜치
- feature/\*: 신규 기능 개발 브랜치, 반드시 master에서 분기
- hotfix/\*: 긴급 수정 브랜치, 반드시 master에서 분기

## 작업 프로세스

### 정기 배포

- feature 브랜치는 master에서 생성합니다.
- 작업 완료 후 필요하면 develop에 병합해서 개발 서버 테스트를 진행합니다.
- 배포 일자에 release 브랜치를 생성합니다.
- release 브랜치에는 feature/\*, hotfix/\* 브랜치만 병합합니다.
- 최종 검증 후 master(main)에 병합합니다.

### 긴급 배포

- hotfix 브랜치는 master에서 생성합니다.
- 작업 완료 후 develop에 병합해 테스트할 수 있습니다.
- 특수한 긴급 배포는 hotfix 브랜치에서 확인 후 바로 master(main)에 병합할 수 있습니다.

## 브랜치 명명 규칙

- feature/{YYYYMM}-{작업명}
- hotfix/{YYYYMMDD}-{작업명}
- release/{YYYYMMDD}
- 여러 단어는 Dash(-)를 사용합니다.
- 언더바(\_)는 사용하지 않습니다.

## 커밋 메시지 규칙

형식:
`[브랜치명] 작업 요약`

예시:

- `[develop] 도로명 주소 암호화 및 복호화 로직 추가`
- `[feature/202512-로그인-개선] 로그인 기능 추가`
- `[hotfix/20251210-긴급수정] 오류 예외 처리`

## Conflict 관리

- release 브랜치 병합 중 충돌이 발생하면 담당 작업자 확인 후 함께 해결합니다.
