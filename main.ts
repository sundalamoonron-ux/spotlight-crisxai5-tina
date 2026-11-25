// main.ts — entry for u-tina-spotlight-crisxai5-ai-crypto-expert-on-x-7c1ed9ad.
//
// The entry itself is a spotlight post on X: an original image introducing
// @crisxai5 as a must-follow AI and crypto expert, posted from a public
// account with @crisxai5 and a make.fun play code in its text. This program
// does nothing about the post; it only hands the post's address to the
// grader by copying POST.json from the repository into the output
// directory, where the gate reads it.
//
// POST.json currently holds a placeholder address: replace it with the real
// post URL (https://x.com/humairajahra071/status/<id>) once Len has posted
// to X, before the orchestrator submits.
//
// Node 22, standard library only. Run locally the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(repoDir, 'POST.json');
const target = join(outputDir, 'POST.json');

mkdirSync(outputDir, { recursive: true });

// Read and parse first so a malformed POST.json fails here with a clear
// error instead of handing the gate a file it cannot read. The copy is a
// byte-for-byte copy, so the two grader runs write identical output.
const parsed = JSON.parse(readFileSync(source, 'utf8')) as { url?: unknown };
if (typeof parsed.url !== 'string' || !parsed.url.startsWith('https://')) {
  console.error('POST.json has no valid https url field.');
  process.exit(1);
}
// A placeholder URL (https://x.com/<handle>/status/<id>) copies fine but
// the gate refuses it (valid 0): it must be replaced with the real post
// URL before submitting.

try {
  copyFileSync(source, target);
  // Success is silent: the gate reads /output/POST.json itself, so this
  // program prints nothing when the copy works.
} catch (error) {
  console.error(
    `Failed to copy POST.json from ${repoDir} to ${outputDir}: ${(error as Error).message}`,
  );
  process.exit(1);
}
