// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      all: true,
      enabled: true,
      provider: 'v8',
      reporter: ['lcov', 'text-summary', 'html'],
      include: [
        '**/packages/**',
      ],
      exclude: [
        '**/playground/**',
        '.vscode/**',
        '.husky/**',
        '**/dist/**',
        '**/tests/**',
      ],
    },
  },
})
