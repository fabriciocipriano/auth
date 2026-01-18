export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'FEAT',
        'FIX',
        'DOCS',
        'STYLE',
        'REFACTOR',
        'PERF',
        'TEST',
        'BUILD',
        'CI',
        'CHORE',
        'REVERT',
      ],
    ],
    'type-case': [2, 'always', 'upper-case'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
  },
};
