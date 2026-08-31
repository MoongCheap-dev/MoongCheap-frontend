'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/cn';
import { mockSendPhoneCode, mockVerifyPhoneCode } from '@/mocks/auth';

import { ScreenColumn } from './ScreenColumn';
import { StepFooter } from './StepFooter';

// 회원가입 온보딩 휴대폰 인증 스텝(개인정보 동의 다음). Figma "1-1 휴대폰 인증"에 대응.
// ⚠️ 전용 시안을 특정하지 못했고(파일 실시간 편집 중) SMS 발송/검증은 백엔드 규격 미확정이라,
//   표준 플로우의 **UI + 목업**으로 구현한다: 번호 입력 → 인증번호 전송 → 코드 입력(타이머) → 확인.
//   문구·레이아웃은 잠정이며 Figma 확정 시 이 파일만 맞추면 된다(mock은 mocks/auth.ts).
//
// 인증 성공 여부(verified)만 위저드로 올려 "다음" 진행을 게이팅한다. 번호를 고치면 인증이 무효화된다.
// 입력칸/버튼은 공통 UI 프리미티브 규약 확정 전이라 네이티브 요소로 자체 완결한다(CLAUDE.md).

const CODE_LENGTH = 6;
/** 국내 휴대폰 번호 최대 자릿수. 10~11자리를 허용하고 그 이상 입력은 잘라낸다. */
const PHONE_MAX_LENGTH = 11;
const RESEND_SECONDS = 180; // 3:00
/** 국내 휴대폰 번호(하이픈 없이 숫자). 형식만 확인하고 실제 유효성은 서버(목업)가 판단한다. */
const PHONE_PATTERN = /^01\d{8,9}$/;

const FLOATING_LABEL_CLASS =
  'text-content-quarternary bg-background-default text-caption-12 absolute -top-2 left-3 px-1';

// 검정(tertiary) 사이드 버튼. 글씨는 content-inverse(라이트=흰색/다크=검정)라 다크모드에서도 대비 유지.
// 너비를 고정(w-28)한다: 라벨에 따라 폭이 달라지면(인증번호 전송/재전송/확인) 두 행의 flex-1 입력칸
// 너비가 어긋나므로, 가장 긴 "인증번호 전송"이 한 줄에 들어가는 선까지 줄인 고정 너비로 통일한다.
const SIDE_BUTTON_CLASS =
  'bg-surface-button-tertiary-default hover:bg-surface-button-tertiary-hover active:bg-surface-button-tertiary-pressed text-content-inverse focus-visible:ring-effect-focus-ring-primary rounded-8 text-button-14 h-14 w-28 shrink-0 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-40';

function formatTimer(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

interface PhoneVerificationStepProps {
  phone: string;
  onPhoneChange: (phone: string) => void;
  verified: boolean;
  onVerifiedChange: (verified: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function PhoneVerificationStep({
  phone,
  onPhoneChange,
  verified,
  onVerifiedChange,
  onPrev,
  onNext,
}: PhoneVerificationStepProps) {
  // 전송/코드/타이머는 이 스텝에서만 쓰는 일시 상태다(스텝을 벗어나면 초기화). 인증 통과 여부만 위저드가 보관한다.
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const phoneValid = PHONE_PATTERN.test(phone);

  // 인증번호 전송 후 남은 시간 카운트다운. 전송 상태이고 아직 인증 전이며 남은 시간이 있을 때만 돈다.
  // secondsLeft를 의존성에 둬, 0에 닿으면 조기 반환으로 인터벌을 만들지 않아 유휴 tick을 멈춘다
  // (재전송이 secondsLeft를 되돌리면 effect가 다시 돌아 인터벌을 재개한다).
  useEffect(() => {
    if (!sent || verified || secondsLeft <= 0) {
      return;
    }
    const id = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [sent, verified, secondsLeft]);

  const expired = sent && !verified && secondsLeft === 0;

  const handlePhoneChange = (raw: string) => {
    // 숫자만 허용하고 최대 11자리로 자른다(국내 번호 10~11자리). 번호를 고치면 직전 전송/인증을 무효화한다.
    const digits = raw.replace(/\D/g, '').slice(0, PHONE_MAX_LENGTH);
    onPhoneChange(digits);
    setSent(false);
    setCode('');
    setError(null);
    if (verified) {
      onVerifiedChange(false);
    }
  };

  const handleSend = async () => {
    if (!phoneValid || verified || sending) {
      return;
    }
    setSending(true);
    const result = await mockSendPhoneCode(phone);
    setSending(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setSent(true);
    setCode('');
    setError(null);
    setSecondsLeft(RESEND_SECONDS);
  };

  const canVerify = sent && !verified && !expired && code.length === CODE_LENGTH && !verifying;

  const handleVerify = async () => {
    if (!canVerify) {
      return;
    }
    setVerifying(true);
    const result = await mockVerifyPhoneCode(phone, code);
    setVerifying(false);
    if (result.ok) {
      onVerifiedChange(true);
      setError(null);
    } else {
      setError(result.message);
    }
  };

  // 코드 입력칸 아래 헬퍼: 인증 성공(녹색) > 에러(빨강) > 만료(빨강) > 남은 시간(코랄).
  const codeHelper = verified
    ? { text: '인증되었습니다.', tone: 'success' as const }
    : error !== null
      ? { text: error, tone: 'error' as const }
      : expired
        ? { text: '인증 시간이 만료되었습니다. 재전송해주세요.', tone: 'error' as const }
        : { text: `남은 시간 ${formatTimer(secondsLeft)}`, tone: 'muted' as const };

  return (
    <ScreenColumn>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-heading-20">휴대폰 인증</h1>
          <p className="text-content-quarternary text-body-14">
            본인 확인을 위해 휴대폰 번호를 인증해주세요.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* 휴대폰 번호 + 전송. 폼으로 감싸 번호칸에서 Enter 시 전송/재전송이 되게 한다.
              전송 버튼은 type="submit"이고 비활성일 땐 브라우저가 암묵 제출을 안 해 유효할 때만 발송된다. */}
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <label htmlFor="signup-phone" className={FLOATING_LABEL_CLASS}>
                휴대폰 번호
              </label>
              <input
                id="signup-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={PHONE_MAX_LENGTH}
                placeholder="휴대폰 번호를 입력해주세요."
                value={phone}
                // 발송·확인 요청이 진행 중일 때 잠근다: 요청 중 번호를 A→B로 바꾸면 A로 보낸 응답이
                // 뒤늦게 도착해 sent/verified가 켜지고, mock이 아무 번호나 통과시켜 소유하지 않은
                // B가 인증될 수 있다. 요청이 끝나면 다시 풀어, 잘못 인증한 번호를 고칠 수 있게 한다
                // (번호를 고치면 handlePhoneChange가 직전 인증/전송을 무효화한다).
                disabled={sending || verifying}
                onChange={(event) => handlePhoneChange(event.target.value)}
                className={cn(
                  'placeholder:text-content-quinary rounded-8 text-body-14 h-14 w-full border px-4 outline-none disabled:opacity-60',
                  verified
                    ? 'border-border-success'
                    : phone.length > 0
                      ? 'border-border-primary'
                      : 'border-border-subtle focus:border-border-primary',
                )}
              />
            </div>
            <button
              type="submit"
              disabled={!phoneValid || verified || sending || verifying}
              className={SIDE_BUTTON_CLASS}
            >
              {sending ? '전송 중' : sent ? '재전송' : '인증번호 전송'}
            </button>
          </form>

          {/* 인증번호 입력(전송 후 노출) + 확인 */}
          {sent && (
            <div className="flex flex-col gap-2">
              {/* 인증번호칸에서 Enter 시 확인. 확인 버튼 type="submit"이며 비활성일 땐 제출되지 않는다. */}
              <form
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();
                  handleVerify();
                }}
                className="flex gap-2"
              >
                <div className="relative flex-1">
                  <label htmlFor="signup-phone-code" className={FLOATING_LABEL_CLASS}>
                    인증번호
                  </label>
                  <input
                    id="signup-phone-code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="인증번호 6자리"
                    value={code}
                    readOnly={verified}
                    aria-invalid={codeHelper.tone === 'error'}
                    aria-describedby="signup-phone-code-helper"
                    onChange={(event) => {
                      setCode(event.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH));
                      setError(null);
                    }}
                    className={cn(
                      'placeholder:text-content-quinary rounded-8 text-body-14 h-14 w-full border px-4 outline-none',
                      verified
                        ? 'border-border-success'
                        : codeHelper.tone === 'error'
                          ? 'border-border-error'
                          : code.length > 0
                            ? 'border-border-primary'
                            : 'border-border-subtle focus:border-border-primary',
                    )}
                  />
                </div>
                <button type="submit" disabled={!canVerify} className={SIDE_BUTTON_CLASS}>
                  {verifying ? '확인 중' : '확인'}
                </button>
              </form>
              <p
                id="signup-phone-code-helper"
                role={codeHelper.tone === 'error' ? 'alert' : undefined}
                className={cn(
                  'text-caption-12',
                  codeHelper.tone === 'success'
                    ? 'text-content-success'
                    : codeHelper.tone === 'error'
                      ? 'text-content-error'
                      : 'text-content-brand',
                )}
              >
                {codeHelper.text}
              </p>
            </div>
          )}
        </div>
      </div>

      <StepFooter onPrev={onPrev} nextLabel="다음" onNext={onNext} canProceed={verified} />
    </ScreenColumn>
  );
}
