import { z } from 'zod';

/**
 * 배송지 등록·수정(B-30) 폼 검증 스키마.
 *
 * 시안에 오류 문구가 없다. 확인 버튼이 비활성/활성 두 상태로만 그려져 있어, 오류를 글로
 * 보여 주는 대신 **채워질 때까지 버튼을 잠그는** 방식이 시안에 맞는다. 그래서 메시지는
 * 화면에 뜨지 않고 유효/무효 판정에만 쓰인다. 디자인에서 오류 문구가 나오면 그때 노출한다.
 *
 * 서버 규칙(길이 상한 등)은 아직 없다. 확정되면 이 파일만 고치면 되고 화면은 건드리지 않는다.
 */

/** 하이픈 없이 받는다(시안 플레이스홀더 "-없이 휴대폰 번호를 입력해주세요."). */
const PHONE_PATTERN = /^01\d{8,9}$/;

export const addressSchema = z
  .object({
    // 우편번호·기본주소는 검색 결과가 채우는 읽기 전용 값이다. 사용자가 직접 못 쓰므로
    // 형식을 따지지 않고 "검색을 마쳤는지"만 본다.
    postalCode: z.string().min(1),
    address: z.string().min(1),
    addressDetail: z.string().min(1, '상세주소를 입력해주세요.'),
    entranceCode: z.string(),
    /** 공동현관번호 없음. 체크하면 entranceCode를 비우고 잠근다. */
    noEntranceCode: z.boolean(),
    name: z.string().min(1, '배송지명을 입력해주세요.'),
    recipient: z.string().min(1, '받는 분을 입력해주세요.'),
    phone: z.string().regex(PHONE_PATTERN, '휴대폰 번호를 확인해주세요.'),
    isDefault: z.boolean(),
  })
  // 체크를 안 했으면 공동현관번호는 필수다. 둘 다 비면 목록에 '미입력'으로 남는데,
  // 그 상태를 의도한 것인지 실수인지 구분할 수 없어 체크박스로 명시하게 한다.
  .refine((values) => values.noEntranceCode || values.entranceCode.trim().length > 0, {
    path: ['entranceCode'],
    message: '공동현관번호를 입력하거나 없음을 선택해주세요.',
  });

export type AddressFormValues = z.infer<typeof addressSchema>;
