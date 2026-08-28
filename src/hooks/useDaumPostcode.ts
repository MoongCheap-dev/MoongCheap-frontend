'use client';

import { useCallback, useRef } from 'react';

import type { DaumPostcodeResult } from '@/types/daum-postcode';

// 다음(카카오) 우편번호 검색 팝업. B-30 배송지 등록의 [우편번호 찾기]가 쓴다.
//
// 기능정의서 FN-B30-02가 "검색 입력창(카카오 우편번호 팝업 호출)"로 명시하고 있고, 시안의
// 우편번호·기본주소 입력칸이 읽기 전용이라 이 팝업 없이는 폼을 채울 수 없다.
//
// 스크립트를 레이아웃에 상주시키지 않고 **버튼을 처음 누를 때** 넣는다. 배송지 등록은 드물게
// 들어오는 화면인데 모든 페이지가 외부 스크립트를 받을 이유가 없다.
//
// ⚠️ CSP를 적용할 때 이 도메인을 script-src에 넣어야 한다. 토스 SDK와 같은 부류다.
//    먼저 조이면 우편번호 검색이 조용히 막힌다.

const SCRIPT_SRC = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
const SCRIPT_ID = 'daum-postcode-script';

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.daum !== undefined) {
      resolve();
      return;
    }

    // 같은 화면에서 두 번 눌러도 <script>는 하나만 남기고, 먼저 건 로드에 편승한다.
    const existing = document.getElementById(SCRIPT_ID);
    if (existing !== null) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('우편번호 스크립트 로드 실패')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('우편번호 스크립트 로드 실패')), {
      once: true,
    });
    document.body.appendChild(script);
  });
}

/**
 * 도로명·지번 중 사용자가 고른 주소에 참고항목을 붙여 한 줄로 만든다.
 * 다음이 안내하는 조합 규칙 그대로다.
 */
export function toFullAddress(data: DaumPostcodeResult): string {
  const base = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;

  if (data.userSelectedType !== 'R') {
    return base;
  }

  const extras = [
    data.bname !== '' && /[동로가]$/.test(data.bname) ? data.bname : '',
    data.apartment === 'Y' && data.buildingName !== '' ? data.buildingName : '',
  ].filter((value) => value !== '');

  return extras.length > 0 ? `${base} (${extras.join(', ')})` : base;
}

export function useDaumPostcode() {
  // 로드 중 중복 클릭을 막는다. 팝업이 두 개 뜨면 나중 것의 결과만 남아 혼란스럽다.
  const opening = useRef(false);

  const open = useCallback(async (onComplete: (data: DaumPostcodeResult) => void) => {
    if (opening.current) {
      return;
    }
    opening.current = true;

    try {
      await loadScript();
      // 로드 직후에도 window.daum이 없으면 스크립트가 막힌 것이다(차단기·CSP).
      if (window.daum === undefined) {
        throw new Error('우편번호 서비스를 불러오지 못했습니다');
      }
      // open()은 팝업이 닫히기 전에 반환한다. 여기서 바로 잠금을 풀면 연타로 팝업이 두 개
      // 뜨고 나중 것의 결과만 남는다. 닫힘(onclose)까지 잠근다 - 검색 완료·강제 종료 모두 온다.
      new window.daum.Postcode({
        oncomplete: onComplete,
        onclose: () => {
          opening.current = false;
        },
      }).open();
    } catch (error) {
      // 스크립트 로드 실패 등 팝업이 뜨지 못한 경우. onclose가 오지 않으므로 여기서 푼다.
      opening.current = false;
      throw error;
    }
  }, []);

  return { open };
}
