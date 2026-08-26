import { AUTH_ERROR_MESSAGES } from '@/constants/authMessages';
import type { LoginValues, SignupValues } from '@/schemas/auth';
import type { AuthResult, SessionUser } from '@/types/auth';

/**
 * 인증 목 데이터.
 *
 * 백엔드 API 규격이 확정되기 전까지 화면을 완성하기 위한 임시 구현이다.
 * 실제 연동 시 이 파일의 함수를 API 호출로 교체하며, 반환 타입(`AuthResult`)은 그대로 둔다.
 * 화면은 반환 타입만 알고 있으므로 교체 시 화면을 고치지 않는다.
 */

const MOCK_LATENCY_MS = 600;

/** 이미 사용 중인 것으로 취급할 아이디. 중복확인 실패(에러) 화면을 확인하기 위한 값이다. */
const TAKEN_ID = 'moongchi';

/**
 * 목 로그인에 성공하는 데모 계정. 백엔드 인증 규격 확정 전, 로그인 이후 화면
 * (마이페이지·배송지·주문 등)으로 진입해 확인하기 위한 값이다. 이 계정 외의 자격증명은
 * 실패로 돌려 시안의 에러 모달을 그대로 확인할 수 있게 한다.
 */
const DEMO_CREDENTIALS = { id: 'moongchi', password: 'moongchi1!' };

const mockUser: SessionUser = {
  id: 'u_00000000',
  nickname: '뭉치',
  email: 'demo@moongcheap.dev',
  role: 'CONSUMER',
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function mockLogin(values: LoginValues): Promise<AuthResult<SessionUser>> {
  await delay(MOCK_LATENCY_MS);

  // 백엔드 인증이 아직 없어, 데모 계정만 성공시켜 로그인 이후 화면을 확인할 수 있게 한다.
  // 그 외 자격증명은 실패로 돌려 시안의 에러 모달을 그대로 노출한다.
  // 실제 API 연동 시 이 함수 본문만 교체하면 성공/실패 분기가 살아난다(반환 타입은 유지).
  if (values.id === DEMO_CREDENTIALS.id && values.password === DEMO_CREDENTIALS.password) {
    return { ok: true, data: mockUser };
  }

  return { ok: false, message: '아이디 또는 비밀번호가 일치하지 않습니다.' };
}

/**
 * 아이디 중복확인 목. 회원가입 아이디 단계의 `중복확인` 버튼이 호출한다.
 * `TAKEN_ID`만 사용 불가로 돌려 error 화면을 확인하고, 나머지는 사용 가능으로 처리한다.
 * 실제 연동 시 이 본문만 실제 조회 API로 교체한다(반환 타입 유지).
 */
export async function mockCheckIdDuplicate(id: string): Promise<AuthResult<{ available: true }>> {
  await delay(MOCK_LATENCY_MS);

  if (id === TAKEN_ID) {
    return { ok: false, message: AUTH_ERROR_MESSAGES.id.taken };
  }

  return { ok: true, data: { available: true } };
}

/**
 * 회원가입 목. 비밀번호 단계까지 통과한 값으로 계정 생성을 시도한다.
 * 백엔드 미연동이라 항상 성공을 돌려 가입완료 화면으로 진입할 수 있게 한다(happy-path).
 * 실제 연동 시 이 본문만 교체하면 서버 검증 실패(필드 오류)도 `AuthResult`로 흘러온다.
 */
export async function mockSignup(values: SignupValues): Promise<AuthResult<SessionUser>> {
  await delay(MOCK_LATENCY_MS);

  return {
    ok: true,
    data: { ...mockUser, id: values.id, email: values.email },
  };
}
