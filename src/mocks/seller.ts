import type { AuthResult } from '@/types/auth';

/**
 * 판매자 전환 목 데이터.
 *
 * 백엔드 셀러 구현이 MVP에서 빠져 있어(2026-09-02 팀장 확인) 화면만 확인할 수 있게 둔 임시
 * 구현이다. 연동 시 이 함수의 본문만 API 호출로 바꾸고 반환 타입은 그대로 둔다.
 */

const MOCK_LATENCY_MS = 600;

/**
 * 미등록으로 취급할 사업자등록번호. 시안의 error 상태를 화면에서 재현하기 위한 값이다.
 * 그 외 번호는 전부 통과시켜 success 상태와 다음 스텝을 확인할 수 있게 한다.
 */
const UNREGISTERED_BUSINESS_NUMBER = '0000000000';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function mockVerifyBusinessNumber(
  businessNumber: string,
): Promise<AuthResult<{ verified: true }>> {
  await delay(MOCK_LATENCY_MS);

  if (businessNumber === UNREGISTERED_BUSINESS_NUMBER) {
    // 문구는 화면이 상수에서 고른다(시안 error 헬퍼). 목 단계에선 실패 여부만 전달한다.
    return { ok: false, message: '' };
  }

  return { ok: true, data: { verified: true } };
}
