/**
 * 여러 화면이 공유하는 공통 UI 문구.
 *
 * 컴포넌트에 한글 카피를 박지 않고 여기서 관리한다(문구 통일·재사용·추후 i18n 대비).
 * 인증 전용 문구는 authMessages.ts에, 공통 상태 문구는 여기에 둔다.
 */

/**
 * MVP 미구현(Full 범위) 기능의 진입점을 탭했을 때 노출하는 토스트 문구.
 * 출처: 기능정의서 머리말 — "MVP 미구현 기능의 진입점은 노출하되, 탭 시 '준비 중인 기능이에요' 토스트를 노출한다."
 */
export const COMING_SOON_MESSAGE = '준비 중인 기능이에요';

/** 조회 실패 등 일반 오류 상태 문구. 출처: FN-B03-01 홈 피드 오류 상태. */
export const ERROR_STATE_MESSAGE = '잠시 후 다시 시도해 주세요';

/** 오류 상태의 재시도 버튼 라벨. 출처: FN-B03-01 "[새로고침] 버튼". */
export const RETRY_LABEL = '새로고침';

/* ── B-24 계정 설정 확인 다이얼로그. 문구는 시안 그대로다. ── */

/** 로그아웃 확인. 출처: 시안 453:25474 · FN-B24-02. */
export const LOGOUT_CONFIRM = {
  title: '로그아웃 하시겠습니까?',
  message: '로그아웃 후 다시 이용하려면 로그인이 필요해요.',
  confirmLabel: '로그아웃',
} as const;

/** 회원탈퇴 확인. 출처: 시안 453:25499. */
export const WITHDRAW_CONFIRM = {
  title: '회원 탈퇴하시겠습니까?',
  message: '탈퇴 시 계정 정보와 이용 내역이 삭제되며 복구할 수 없어요.',
  confirmLabel: '회원탈퇴',
} as const;
