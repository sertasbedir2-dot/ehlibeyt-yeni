import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Derleme çıktılarını ve önbellekleri denetim dışı tut
  globalIgnores(['dist', '.vite', 'node_modules', 'public/sw.js']),

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node, // Build scriptleri için Node desteği
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Önerilen temel kurallar
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // React Refresh kuralları (HMR için)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // OnikiKapı Özel Kuralları
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_' 
      }],
      'no-console': ['warn', { allow: ['warn', 'error'] }], // console.log kullanımını uyarır
      'react/prop-types': 'off', // Modern React'te genellikle TS veya gerek duyulmaz
    },
  },
])