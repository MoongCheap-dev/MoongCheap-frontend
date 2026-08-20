/**
 * 인증·회원 화면이 요구하는 타입.
 *
 * 백엔드 응답 포맷은 아직 확정되지 않았다. 여기 있는 타입은 **화면이 필요로 하는 모양**이며
 * 백엔드 응답을 그대로 옮긴 것이 아니다. 규격이 나오면 API 계층에서 변환해 이 타입으로 맞춘다.
 * 화면과 폼은 이 타입만 참조하므로, 응답 포맷이 바뀌어도 변환 지점 한 곳만 고치면 된다.
 */

/** 회원 역할. 명세의 판매자 등록 신청·관리자 권한 요구사항에서 도출했다. */
export type UserRole = 'CONSUMER' | 'SELLER' | 'ADMIN';

/** 로그인 이후 화면이 사용하는 최소 정보. */
export interface SessionUser {
  id: string;
  nickname: string;
  email: string;
  role: UserRole;
}

/** 서버가 특정 입력칸을 지목해 돌려주는 오류. */
export interface FieldError {
  /** 폼 필드 이름. 클라이언트 스키마의 키와 일치시켜 해당 입력칸 아래에 표시한다. */
  field: string;
  message: string;
}

/**
 * 폼 제출 결과의 프론트엔드 내부 표현.
 *
 * 보안 요구사항에 따라 클라이언트 검증은 UX 목적일 뿐이므로, 서버가 돌려준 필드 오류를
 * 같은 자리에 표시할 수 있어야 한다. 그래서 전역 메시지와 필드별 오류를 함께 담는다.
 */
export type AuthResult<T> =
  { ok: true; data: T } | { ok: false; message: string; fieldErrors?: FieldError[] };

/** 소셜 로그인 제공자. 채택 예정(피그마 확인). 백엔드 OAuth 규격 확정 후 화면에 노출한다. */
export type OAuthProvider = 'kakao' | 'google';
