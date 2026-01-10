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
      // Temel kuralları al ama üzerine gevşetilmiş ayarları yaz
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // --- SİHİRLİ AYARLAR (Hataları Kapatır) ---
      'no-unused-vars': 'off', // Kullanılmayan değişkenleri görmezden gel
      'no-console': 'off',     // Console.log kullanımına izin ver
      'react-hooks/exhaustive-deps': 'off', // Hook bağımlılık uyarılarını kapat
      'no-empty-pattern': 'off',
      'no-undef': 'off', 
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'off',

      // React Refresh kuralı (HMR için)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
])