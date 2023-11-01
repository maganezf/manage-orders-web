import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

// const timeout = 1000 * 60 * 1; // 1min

const baseURL = 'http://localhost:5173';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  outputDir: './e2e/test-results',

  // Glob patterns or regular expressions to ignore test files.
  testIgnore: '**/*unit.+(spec|test).{ts,tsx}',

  // Glob patterns or regular expressions that match test files.
  testMatch: '**/*e2e.+(spec|test).ts',

  // timeout,
  // globalTimeout: process.env.CI ? 60 * 60 * 1000 : undefined,

  /* Run tests in files in parallel /*
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  // Run your local dev server before starting the tests.
  webServer: {
    command: 'yarn dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    // Enable screenshot to prove the tests results
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    // desktop
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },

    // mobile
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
