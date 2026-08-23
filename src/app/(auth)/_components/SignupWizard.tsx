'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';

import { AlertDialog } from '@/components/ui/AlertDialog';
import { AUTH_ERROR_MESSAGES, AUTH_SUCCESS_MESSAGES } from '@/constants/authMessages';
import { cn } from '@/lib/cn';
import { mockCheckIdDuplicate, mockSignup } from '@/mocks/auth';
import { signupEmailSchema, signupPasswordSchema, type SignupStep } from '@/schemas/auth';

import { StepField, type FieldStatus } from './StepField';

// 회원가입 위저드. Figma 08.22(수정후) "A. 로그인 및 회원가입" 시안대로 이메일→아이디→비밀번호→
// 가입완료를 한 라우트(/signup)에서 진행한다. 스텝은 URL 쿼리(?step=)로 표현해 브라우저 뒤로가기가
// 이전 스텝으로 가게 하고, 쿼리만 바뀌는 소프트 내비라 이 컴포넌트는 마운트를 유지해 입력값이 스텝
// 간 보존된다. useSearchParams는 클라이언트 훅이라 page.tsx에서 <Suspense>로 감싼다.
//
// 입력 상호작용(포커스 시 키보드 오버레이, 유효 시 CTA 활성)은 모바일 네이티브 키보드 동작이라
// 웹에선 OS가 처리한다. 하단 버튼을 키보드 위로 항상 보이게 고정하는 처리는 후속(visualViewport).
//
// ⚠️ 팔레트는 로그인과 동일한 임시 클래스를 쓴다. 시맨틱 토큰(#15) 머지 후 팀에서 일괄 교체한다.
//   버튼 토큰 매핑(MoongCheap_DS Button 컴포넌트로 확인): 검정 CTA(다음·중복확인·로그인하러가기의
//   bg-primary #17181b)는 DS의 tertiary → bg-surface-button-tertiary(#303030), active는
//   -pressed. 이전(아웃라인)은 quarternary → bg-surface-button-quarternary + border-border-
//   button-quarternary. text-white → text-content-oncolor. 코랄(primary)은 브랜드 CTA용이라
//   여기엔 쓰지 않는다.

function isSignupStep(value: string | null): value is SignupStep {
  return value === 'email' || value === 'id' || value === 'password' || value === 'complete';
}

/** 값이 있으면서 유효하면 success, 값이 있는데 무효이고 한 번 벗어난(touched) 뒤면 error. */
function deriveStatus(value: string, isValid: boolean, isTouched: boolean): FieldStatus {
  if (value.length === 0) {
    return 'default';
  }
  if (isValid) {
    return 'success';
  }
  return isTouched ? 'error' : 'default';
}

export function SignupWizard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const stepParam = searchParams.get('step');
  const step: SignupStep = isSignupStep(stepParam) ? stepParam : 'email';

  const {
    register,
    control,
    setValue,
    setFocus,
    formState: { touchedFields },
  } = useForm<{ email: string; id: string; password: string }>({
    mode: 'onChange',
    defaultValues: { email: '', id: '', password: '' },
  });

  // useWatch는 watch()와 달리 메모이제이션 안전(React Compiler 호환)이라 이걸 쓴다.
  // defaultValue를 줘 첫 렌더부터 문자열을 반환하게 한다(없으면 undefined→'' 전환으로 입력칸이
  // uncontrolled→controlled로 바뀌었다는 React 경고가 난다).
  const emailValue = useWatch({ control, name: 'email', defaultValue: '' });
  const idValue = useWatch({ control, name: 'id', defaultValue: '' });
  const passwordValue = useWatch({ control, name: 'password', defaultValue: '' });

  // 아이디는 형식이 아니라 중복확인(서버/mock)으로 통과가 결정된다. 어떤 값에 대해 확인했는지
  // 함께 저장해, 확인 후 값을 고치면 통과를 무효화한다.
  const [idCheck, setIdCheck] = useState<{
    state: 'idle' | 'checking' | 'available' | 'taken';
    forValue: string;
  }>({
    state: 'idle',
    forValue: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);

  const emailValid = signupEmailSchema.safeParse(emailValue).success;
  const passwordValid = signupPasswordSchema.safeParse(passwordValue).success;
  const idResolved = idCheck.forValue === idValue ? idCheck.state : 'idle';
  const idPassed = idResolved === 'available';

  // 스텝을 건너뛴 진입(딥링크·새로고침) 가드. 선행 조건이 없으면 가능한 앞 스텝으로 되돌린다.
  useEffect(() => {
    if (step === 'id' && !emailValid) {
      router.replace(`${pathname}?step=email`);
    } else if (step === 'password' && (!emailValid || !idPassed)) {
      router.replace(`${pathname}?step=${emailValid ? 'id' : 'email'}`);
    } else if (step === 'complete' && !submitted) {
      router.replace(`${pathname}?step=email`);
    }
  }, [step, emailValid, idPassed, submitted, pathname, router]);

  const goTo = (next: SignupStep) => {
    router.push(`${pathname}?step=${next}`);
  };

  const goPrev = () => {
    // 이후 스텝(아이디·비밀번호)은 push로 쌓인 히스토리를 back()으로 팝해 브라우저 뒤로가기와 맞춘다.
    // 다만 첫 스텝(이메일)에서 back()은 위저드가 브라우저 첫 진입(딥링크·새 탭)일 때 사이트 밖으로
    // 나가버리므로, 앱 내 진입점인 홈으로 명시 이동한다.
    if (step === 'email') {
      router.push('/');
    } else {
      router.back();
    }
  };

  const handleCheckId = async () => {
    if (idValue.length === 0 || idCheck.state === 'checking') {
      return;
    }
    setIdCheck({ state: 'checking', forValue: idValue });
    const result = await mockCheckIdDuplicate(idValue);
    setIdCheck({ state: result.ok ? 'available' : 'taken', forValue: idValue });
  };

  const handleSubmitPassword = async () => {
    if (!passwordValid || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const result = await mockSignup({ email: emailValue, id: idValue, password: passwordValue });
    setIsSubmitting(false);

    if (!result.ok) {
      // happy-path mock이라 실제로는 도달하지 않지만, 서버 연동 시 실패 응답을 대비해 안내한다.
      setDialogMessage(result.message);
      return;
    }
    setSubmitted(true);
    goTo('complete');
  };

  if (step === 'complete') {
    return <CompleteScreen />;
  }

  // 스텝별 화면 구성. 상태·헬퍼 문구는 여기서 결정하고 표현은 StepField가 맡는다.
  const stepView = (() => {
    if (step === 'id') {
      const status: FieldStatus =
        idResolved === 'available' ? 'success' : idResolved === 'taken' ? 'error' : 'default';
      const idField = register('id');
      return {
        subtitle: '아이디를 입력한 뒤 중복확인을 해주세요.',
        field: (
          <StepField
            id="signup-id"
            label="아이디"
            autoComplete="username"
            placeholder="아이디를 입력해주세요."
            status={status}
            helper={
              status === 'success'
                ? AUTH_SUCCESS_MESSAGES.confirmed
                : status === 'error'
                  ? AUTH_ERROR_MESSAGES.id.taken
                  : undefined
            }
            value={idValue}
            field={{
              ...idField,
              onChange: (event) => {
                // 값을 고치면 직전 중복확인 결과를 무효화한다(다시 확인해야 다음으로).
                setIdCheck({ state: 'idle', forValue: '' });
                return idField.onChange(event);
              },
            }}
            onClear={() => {
              setValue('id', '');
              setIdCheck({ state: 'idle', forValue: '' });
              setFocus('id');
            }}
            rightSlot={
              <button
                type="button"
                onClick={handleCheckId}
                disabled={idValue.length === 0 || idCheck.state === 'checking'}
                className="bg-foreground focus-visible:ring-foreground rounded-md px-3 py-1.5 text-xs font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-40"
              >
                {idCheck.state === 'checking' ? '확인 중' : '중복확인'}
              </button>
            }
          />
        ),
        canProceed: idPassed,
        onNext: () => goTo('password'),
      };
    }

    if (step === 'password') {
      const status = deriveStatus(passwordValue, passwordValid, touchedFields.password === true);
      return {
        subtitle: '비밀번호를 설정해주세요.',
        field: (
          <StepField
            id="signup-password"
            label="비밀번호"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 입력해주세요."
            status={status}
            helper={
              status === 'success'
                ? AUTH_SUCCESS_MESSAGES.confirmed
                : AUTH_ERROR_MESSAGES.password.rule
            }
            value={passwordValue}
            field={register('password')}
            onClear={() => {
              setValue('password', '');
              setFocus('password');
            }}
          />
        ),
        canProceed: passwordValid && !isSubmitting,
        onNext: handleSubmitPassword,
      };
    }

    // step === 'email'
    const status = deriveStatus(emailValue, emailValid, touchedFields.email === true);
    return {
      subtitle: '이메일을 입력해주세요.',
      field: (
        <StepField
          id="signup-email"
          label="이메일"
          type="email"
          autoComplete="email"
          placeholder="moongcheap@gmail.com"
          status={status}
          helper={
            status === 'success'
              ? AUTH_SUCCESS_MESSAGES.confirmed
              : status === 'error'
                ? AUTH_ERROR_MESSAGES.email.invalid
                : undefined
          }
          value={emailValue}
          field={register('email')}
          onClear={() => {
            setValue('email', '');
            setFocus('email');
          }}
        />
      ),
      canProceed: emailValid,
      onNext: () => goTo('id'),
    };
  })();

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">계정 정보 입력</h1>
          <p className="text-muted text-sm">{stepView.subtitle}</p>
        </div>

        {stepView.field}

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="border-surface-line bg-surface text-foreground focus-visible:ring-foreground h-13 flex-1 rounded-lg border font-medium outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            이전
          </button>
          <button
            type="button"
            onClick={stepView.onNext}
            disabled={!stepView.canProceed}
            className={cn(
              'focus-visible:ring-foreground h-13 flex-1 rounded-lg font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              stepView.canProceed
                ? 'bg-primary active:bg-primary-pressed'
                : 'bg-surface-line text-muted cursor-not-allowed',
            )}
          >
            {isSubmitting ? '처리 중' : '다음'}
          </button>
        </div>
      </div>

      <AlertDialog
        isOpen={dialogMessage !== null}
        message={dialogMessage ?? ''}
        onClose={() => setDialogMessage(null)}
      />
    </>
  );
}

function CompleteScreen() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">가입이 완료되었습니다!</h1>
        {/* TODO: 완료 화면 부제 정확한 문구 Figma에서 확정. 임시 안내. */}
        <p className="text-muted text-sm">이제 로그인하고 뭉치를 시작해보세요.</p>
      </div>

      {/* Figma: "추후에 여기에 일러스트나 아이콘 추가" 자리. 확정 전 플레이스홀더. */}
      <div className="border-surface-line text-muted flex h-56 items-center justify-center rounded-lg border border-dashed text-sm">
        일러스트 자리
      </div>

      <Link
        href="/login"
        className="bg-primary active:bg-primary-pressed focus-visible:ring-foreground mt-4 flex h-13 items-center justify-center rounded-lg font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        로그인하러 가기
      </Link>
    </div>
  );
}
