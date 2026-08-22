import { defineConfig, devices } from '@playwright/test';

const chromiumUse = {
  ...devices['Desktop Chrome']
};

/**
 * Suite separation is by tag, not by duplicating specs.
 * - smoke: @smoke
 * - regression: @regression excluding @known-defect (production gate)
 * - known-defects: @known-defect (failures remain visible)
 *
 * Full suite (`npm test`) runs regression + known-defects so smoke-tagged
 * production tests are not executed twice.
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'off'
  },
  projects: [
    {
      name: 'smoke',
      use: chromiumUse,
      grep: /@smoke/
    },
    {
      name: 'regression',
      use: chromiumUse,
      grep: /@regression/,
      grepInvert: /@known-defect/
    },
    {
      name: 'known-defects',
      use: chromiumUse,
      grep: /@known-defect/
    }
  ]
});
