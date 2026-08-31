// 하이픈 없는 휴대폰 번호를 표시용으로 끊어 준다. 시안의 입력칸은 하이픈 없이 받고(B-30),
// 목록 카드는 `010-1234-1234`로 보여 준다.
//
// 저장은 원본(숫자만)으로 하고 표시할 때만 여기를 거친다. 반대로 하면 서버에 보낼 때마다
// 하이픈을 벗겨야 하고, 벗기는 곳을 하나라도 빠뜨리면 값이 틀어진다.

const MOBILE_PATTERN = /^(01\d)(\d{3,4})(\d{4})$/;

/** 형식을 알 수 없으면 원본을 그대로 돌려준다(숨기는 것보다 낫다). */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const matched = MOBILE_PATTERN.exec(digits);

  return matched === null ? phone : `${matched[1]}-${matched[2]}-${matched[3]}`;
}
