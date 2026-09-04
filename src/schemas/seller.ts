import { z } from 'zod';

/**
 * 판매자 전환(S-01) 사업자등록번호 검증.
 *
 * 근거는 시안 라벨 "사업자등록번호 10자리" 하나뿐이다. 기능명세에 `FN-S01-xx` 행이 없어
 * 체크섬·중복 규칙 같은 것은 알 수 없고, 실제 유효성은 백엔드(국세청 조회)가 판정한다.
 * 그래서 여기서는 **자릿수만** 본다.
 *
 * ⚠️ 하이픈은 넣지 않는다. 시안 입력값이 `123-12-1234-1`(3-2-4-1)인데 통상 표기는
 *    `123-45-67890`(3-2-5)이라 자동 삽입 위치를 시안에서 읽어낼 수 없다. 규칙이 확정되기 전에
 *    임의로 넣으면 저장값까지 어긋나므로 숫자만 받는다(PM 확인 요청 대상).
 */
export const BUSINESS_NUMBER_LENGTH = 10;

const BUSINESS_NUMBER_PATTERN = /^\d{10}$/;

export const businessNumberSchema = z.string().regex(BUSINESS_NUMBER_PATTERN);
