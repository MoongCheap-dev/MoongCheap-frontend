/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'hotfix', 'style', 'refactor', 'chore', 'docs', 'init', 'ci'],
    ],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    // 헤더 최대 길이 완화 (이슈번호 포함)
    'header-max-length': [2, 'always', 120],
    // 영문 고유명사(제품명·컴포넌트명)를 제목 맨 앞에 쓸 수 있도록 subject-case 비활성화
    // (config-conventional 상속값이 sentence-case 등을 막아 'MoongCheap ...' 같은 제목이 걸림)
    'subject-case': [0],
  },
};

export default config;
