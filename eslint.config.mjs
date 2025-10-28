import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [// ✅ Ignores globaux en premier
{
  ignores: [
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'coverage/**',
    '.vercel/**',
    'public/**',
    'next-env.d.ts',
    '*.config.js',
    '*.config.mjs',
  ],
}, ...nextCoreWebVitals, ...nextTypescript, // ✅ Règles personnalisées
{
  rules: {
    // Console warnings
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],

    // TypeScript
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',

    // React
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'warn',

    // Code quality
    'prefer-const': 'error',
    'no-var': 'error',
    eqeqeq: ['error', 'always'],
  },
}];

export default eslintConfig;
