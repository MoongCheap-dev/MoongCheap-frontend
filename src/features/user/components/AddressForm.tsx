'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';

import { Checkbox } from '@/components/ui/Checkbox';
import {
  ADDRESS_INPUT_CLASS,
  ADDRESS_READONLY_CLASS,
  AddressField,
} from '@/features/user/components/AddressField';
import { toFullAddress, useDaumPostcode } from '@/hooks/useDaumPostcode';
import { cn } from '@/lib/cn';
import { addressSchema, type AddressFormValues } from '@/schemas/address';

// B-30 배송지 등록·수정 폼. `FN-B30-02`.
//
// 시안에 오류 문구가 없고 확인 버튼만 비활성/활성 두 상태로 그려져 있다. 그래서 검증 결과를
// 글로 노출하지 않고 **버튼 잠금**으로만 쓴다(schemas/address.ts 주석 참고).
//
// ⚠️ 저장 동작이 없다. 배송지 API 규격을 아직 받지 못해 제출하면 목록으로 되돌아가기만 한다.
//    규격이 나오면 onSubmit 본문만 채우면 된다.

const EMPTY_VALUES: AddressFormValues = {
  postalCode: '',
  address: '',
  addressDetail: '',
  entranceCode: '',
  noEntranceCode: false,
  name: '',
  recipient: '',
  phone: '',
  isDefault: false,
};

interface AddressFormProps {
  /** 수정 화면에서 기존 값을 채워 넣는다. 없으면 등록. */
  defaultValues?: AddressFormValues;
}

export function AddressForm({ defaultValues = EMPTY_VALUES }: AddressFormProps) {
  const router = useRouter();
  const { open } = useDaumPostcode();

  const { register, handleSubmit, setValue, control, formState } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues,
    // 시안의 버튼이 입력 도중에 활성으로 바뀌므로 매 변경마다 판정한다.
    mode: 'onChange',
  });

  // useWatch는 watch()와 달리 메모이제이션 안전(React Compiler 호환)이라 이걸 쓴다.
  const noEntranceCode = useWatch({ control, name: 'noEntranceCode' });
  const address = useWatch({ control, name: 'address' });

  async function handleFindPostalCode() {
    await open((data) => {
      // 검색으로만 채워지는 값이라 dirty·validation을 함께 갱신해야 버튼이 열린다.
      setValue('postalCode', data.zonecode, { shouldValidate: true });
      setValue('address', toFullAddress(data), { shouldValidate: true });
    });
  }

  function handleNoEntranceCodeChange(checked: boolean) {
    setValue('noEntranceCode', checked, { shouldValidate: true });
    if (checked) {
      // 체크하면 입력칸을 비운다. 값이 남아 있으면 잠긴 칸의 내용이 그대로 저장된다.
      setValue('entranceCode', '', { shouldValidate: true });
    }
  }

  function onSubmit() {
    // TODO: 배송지 등록·수정 API 연결. 규격 확정 전이라 목록으로만 되돌아간다.
    router.push('/mypage/addresses');
  }

  return (
    <form className="flex w-full flex-1 flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-1 flex-col gap-5 px-4 py-2">
        <AddressField label="주소">
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center gap-2">
              {/* 검색 결과만 채우는 칸이라 readOnly. disabled로 두면 제출값에서 빠진다. */}
              <input
                aria-label="우편번호"
                className={cn(ADDRESS_READONLY_CLASS, 'w-[90px]')}
                readOnly
                {...register('postalCode')}
              />
              <button
                className="bg-surface-button-tertiary-default text-content-inverse text-label-13 rounded-8 active:bg-surface-button-tertiary-pressed focus-visible:ring-effect-focus-ring-primary flex h-10 w-[86px] shrink-0 items-center justify-center px-3 outline-none focus-visible:ring-2"
                onClick={handleFindPostalCode}
                type="button"
              >
                우편번호 찾기
              </button>
            </div>

            <input
              aria-label="주소"
              className={cn(ADDRESS_READONLY_CLASS, 'w-full')}
              readOnly
              {...register('address')}
            />
            <input
              aria-label="상세주소"
              className={cn(ADDRESS_READONLY_CLASS, 'w-full')}
              // 시안대로 주소를 고르기 전에는 상세주소를 막는다(FN-B30-02 BR-02).
              // 시안에 플레이스홀더가 없어 넣지 않았다. 어느 칸인지는 aria-label로만 구분된다.
              disabled={address === ''}
              {...register('addressDetail')}
            />
          </div>
        </AddressField>

        <div className="flex w-full flex-col gap-5">
          <AddressField label="공동현관 출입번호">
            <div className="flex w-full flex-col gap-3">
              <input
                className={cn(ADDRESS_INPUT_CLASS, noEntranceCode && 'bg-surface-disabled-primary')}
                disabled={noEntranceCode}
                placeholder="공동현관번호를 입력해주세요. (예 : #1234)"
                {...register('entranceCode')}
              />
              <Checkbox
                checked={noEntranceCode}
                label="공동현관번호 없음"
                onChange={(event) => handleNoEntranceCodeChange(event.target.checked)}
              />
            </div>
          </AddressField>

          <AddressField label="배송지명">
            <input
              className={ADDRESS_INPUT_CLASS}
              placeholder="배송지명을 입력해주세요. (예 : 집, 회사)"
              {...register('name')}
            />
          </AddressField>

          <AddressField label="받는 분">
            <input
              className={ADDRESS_INPUT_CLASS}
              placeholder="받는 분을 입력해주세요."
              {...register('recipient')}
            />
          </AddressField>

          <AddressField label="휴대폰 번호">
            <input
              className={ADDRESS_INPUT_CLASS}
              inputMode="numeric"
              placeholder="-없이 휴대폰 번호를 입력해주세요."
              {...register('phone')}
            />
          </AddressField>
        </div>

        <Checkbox label="기본 배송지로 설정" {...register('isDefault')} />
      </div>

      <div className="w-full p-4">
        <button
          className={cn(
            'text-button-15 rounded-8 focus-visible:ring-effect-focus-ring-primary flex h-12 w-full items-center justify-center px-3 outline-none focus-visible:ring-2',
            formState.isValid
              ? 'bg-surface-button-tertiary-default text-content-inverse active:bg-surface-button-tertiary-pressed'
              : 'bg-surface-disabled-secondary text-content-disabled-secondary',
          )}
          disabled={!formState.isValid}
          type="submit"
        >
          확인
        </button>
      </div>
    </form>
  );
}
