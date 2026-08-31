import Link from 'next/link';

import { formatPhone } from '@/lib/formatPhone';
import type { Address } from '@/types/address';

// 배송지 목록(B-30)의 카드 한 장. 배송지명 + 기본배송지 뱃지 + 주소 + 연락처 + 수정·삭제.
//
// 수정만 링크로 살리고 삭제는 화면만 그린다. 배송지 삭제(FN-B30-06)는 기능정의서에서 Full
// 범위이고, 확인 모달(AlertDialog) + 삭제 API가 함께 있어야 동작한다. B-24의
// `로그아웃`·`회원탈퇴`를 뺀 것과 같은 기준이다.

interface AddressCardProps {
  address: Address;
  /** 수정 화면 경로. 넘기지 않으면 '수정'도 이동하지 않는다. */
  editHref?: string;
}

const ACTION_CLASS =
  'text-label-12 text-content-quarternary flex w-[54px] items-center justify-center py-2';

export function AddressCard({ address, editHref }: AddressCardProps) {
  const { name, isDefault, postalCode, address: street, addressDetail } = address;
  const { entranceCode, recipient, phone } = address;

  return (
    <li className="border-border-quarternary rounded-12 flex w-full flex-col border px-4">
      <div className="border-border-quarternary flex w-full flex-col gap-3 border-b py-3">
        <div className="flex items-center gap-3">
          <p className="text-label-16 text-content-primary">{name}</p>
          {isDefault && (
            // 기본 배송지 지정(FN-B30-05)은 Full 범위라 표시만 하고 바꾸지는 못한다.
            <span className="bg-surface-button-secondary-default text-content-brand text-caption-10 rounded-4 flex items-center justify-center px-0.5 pb-px">
              기본배송지
            </span>
          )}
        </div>

        <div className="flex w-full flex-col gap-1">
          <p className="text-body-14 text-content-primary w-full">
            {street}, {addressDetail} ({postalCode})
          </p>
          <p className="text-caption-12 text-content-quarternary w-full">
            공동현관번호: {entranceCode ?? '미입력'}
          </p>
          <p className="text-caption-12 text-content-quarternary w-full">
            {recipient} ({formatPhone(phone)})
          </p>
        </div>
      </div>

      <div className="flex items-center py-0.5">
        <div className="border-divider-default border-r">
          {editHref === undefined ? (
            <span className={ACTION_CLASS}>수정</span>
          ) : (
            <Link className={ACTION_CLASS} href={editHref}>
              수정
            </Link>
          )}
        </div>
        {/* 삭제는 Full 범위(FN-B30-06). 시안대로 그리되 동작은 붙이지 않는다. */}
        <span className={ACTION_CLASS}>삭제</span>
      </div>
    </li>
  );
}
