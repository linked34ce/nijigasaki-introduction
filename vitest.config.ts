import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig((env) =>
  mergeConfig(
    viteConfig(env),
    defineConfig({
      test: {
        environment: 'jsdom',
        exclude: [
          ...configDefaults.exclude,
          'e2e/**',
          '**/*/*.config.*',
          'src/App.vue',
          'src/main.ts',
          'src/router/**'
        ],
        coverage: {
          exclude: ['*.config.ts', '*.cjs', 'src/App.vue', 'src/main.ts', 'src/router/**'],
          thresholds: {
            lines: 100,
            branches: 100,
            functions: 100,
            statements: 100
          }
        }
      }
    })
  )
);
