import { apiFetch } from './api';

/**
 * 상품 도감(도메인 A) 백엔드 호출.
 *
 * 백엔드 소스(jnj3j3/MoongCheap_backend@develop) `ProductCatalogController`·`ProductCatalogDto`로
 * 규격을 확인해 작성했다. 다른 도메인까지 일반화한 api-client는 규격 합의 전이라 만들지 않는다(CLAUDE.md).
 *
 * ⚠️ 상세 조회는 `anyRequest().authenticated()` 대상이라 **세션(SID)이 필요**하다. `apiFetch`의
 * `credentials:'include'`는 브라우저 호출에서만 쿠키를 싣기 때문에, 이 함수는 **client에서** 부른다
 * (서버 컴포넌트에서 부르면 쿠키가 없어 401). 미로그인/미배선/네트워크 오류는 ApiError로 올라온다.
 */

/** `GET /api/product-catalog/{id}` 응답. 백엔드 `ProductCatalogDto`와 필드가 일치한다. */
export interface ProductCatalogDetailDto {
  id: number;
  name: string;
  thumbnailUrl: string;
  /** 정가. nullable. */
  listPrice: number | null;
  /** 규격 요약(≤500). nullable. */
  specSummary: string | null;
  /** 상품설명 본문(TEXT). nullable. */
  description: string | null;
}

/**
 * 상품 도감 상세 조회(FN-B08-01). `GET /api/product-catalog/{id}`.
 * id는 백엔드에서 Long이라 숫자 문자열이어야 한다(홈 목의 문자열 id로는 404가 난다).
 */
export async function fetchProductCatalogDetail(id: string): Promise<ProductCatalogDetailDto> {
  const response = await apiFetch(`/api/product-catalog/${encodeURIComponent(id)}`);
  return (await response.json()) as ProductCatalogDetailDto;
}
