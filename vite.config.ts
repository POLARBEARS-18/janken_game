/// <reference types="vitest" />

import { defineConfig } from 'vite'
import type { InlineConfig } from 'vitest'
import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import path, { join } from 'path'
import { readdirSync } from 'fs'
import tsconfigPaths from 'vite-tsconfig-paths'

// vitestを使用できるようにinterfaceを拡張
interface VitestConfigExport extends UserConfig {
  test: InlineConfig
}

// インポートする際のエイリアスを動的に作成する。
const absolutePathAliases: { [key: string]: string } = {}
// Root resources folder
const srcPath = path.resolve('./src/')
// A just the regex here to include .vue, .js, .jsx, etc.. files from the resources/ folder
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) =>
  dirent.name.replace(/(\.ts){1}(x?)/, '')
)

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory)
})

// https://vitejs.dev/config/
export default defineConfig(
  {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      }),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          dev: {
            logLevel: ['error'],
          },
        },
      }),
      tsconfigPaths(), //vite-tsconfig-paths
    ],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    resolve: {
      alias: {
        // ...absolutePathAliases,
        '~/': `${__dirname}/src/`,
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [`./src/setupTests.ts`],
      testTimeout: 8000,
      alias: {
        '~': `/src`,
      },
    },
  }
  // as VitestConfigExport
)
