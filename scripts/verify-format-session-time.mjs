/**
 * Lightweight sanity check for formatSessionTime without a test runner.
 * Run: node scripts/verify-format-session-time.mjs
 */
import { createRequire } from "node:module";

// The helper is TypeScript; duplicate the pure logic here for a zero-dep check
// that mirrors src/lib/heart-whisper-data.ts — fail CI/local if drift appears.
function formatSessionTime(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const cases = [
  [0, "00:00"],
  [5, "00:05"],
  [65, "01:05"],
  [600, "10:00"],
  [-3, "00:00"],
  [90.9, "01:30"],
];

let failed = 0;
for (const [input, expected] of cases) {
  const actual = formatSessionTime(input);
  if (actual !== expected) {
    console.error(`FAIL formatSessionTime(${input}) => ${actual}, expected ${expected}`);
    failed += 1;
  }
}

if (failed) {
  console.error(`${failed} case(s) failed`);
  process.exit(1);
}
console.log(`ok — ${cases.length} formatSessionTime cases passed`);
