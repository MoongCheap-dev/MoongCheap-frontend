/**
 * 다음(카카오) 우편번호 서비스의 전역 객체 타입.
 *
 * 공식 배포본이 `window.daum`에 붙는 스크립트라 타입 패키지가 없다. 실제로 쓰는 필드만
 * 좁게 선언한다. 전체 스펙은 postcode.map.daum.net/guide 참고.
 */

/** 검색 완료 콜백이 받는 결과. 쓰는 값만 추린다. */
export interface DaumPostcodeResult {
  /** 5자리 우편번호. */
  zonecode: string;
  /** 도로명 주소. `userSelectedType`이 'R'일 때 사용한다. */
  roadAddress: string;
  /** 지번 주소. `userSelectedType`이 'J'일 때 사용한다. */
  jibunAddress: string;
  /** 사용자가 고른 주소 유형. R=도로명, J=지번. */
  userSelectedType: 'R' | 'J';
  /** 참고항목(법정동·건물명 등). 비어 있을 수 있다. */
  buildingName: string;
  bname: string;
  /** 공동주택 여부. 참고항목 조합 규칙에 쓴다. */
  apartment: 'Y' | 'N';
}

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeResult) => void;
        onclose?: (state: 'FORCE_CLOSE' | 'COMPLETE_CLOSE') => void;
        width?: string | number;
        height?: string | number;
      }) => { open: () => void };
    };
  }
}
