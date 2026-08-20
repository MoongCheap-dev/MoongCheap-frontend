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

/** 이미 가입된 것으로 취급할 이메일. 중복 가입 오류 화면을 확인하기 위한 값이다. */
const TAKEN_EMAIL = 'taken@moongcheap.dev';

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

  if (values.password === 'wrongpassword') {
    return { ok: false, message: '이메일 또는 비밀번호가 올바르지 않습니다' };
  }

  return { ok: true, data: { ...mockUser, email: values.email } };
}

export async function mockSignup(values: SignupValues): Promise<AuthResult<SessionUser>> {
  await delay(MOCK_LATENCY_MS);

  if (values.email === TAKEN_EMAIL) {
    return {
      ok: false,
      message: '가입할 수 없는 정보가 있습니다',
      fieldErrors: [{ field: 'email', message: '이미 사용 중인 이메일입니다' }],
    };
  }

  return {
    ok: true,
    data: { ...mockUser, email: values.email, nickname: values.nickname },
  };
}
