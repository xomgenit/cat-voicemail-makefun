// Funniest Cat Voicemail Greeting — make.fun entry program.
// Emits the cat's voicemail greeting as plain text for the sealed scorer.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const greeting = 'Beep. I knocked your call off the table. It was in my way.';

// Mirror the sealed gate locally: UTF-8 text of 1..120 characters, not only whitespace.
const GATE_MIN = 1;
const GATE_MAX = 120;
const charCount = [...greeting].length;
if (charCount < GATE_MIN || charCount > GATE_MAX || greeting.trim().length === 0) {
  throw new Error(`greeting fails the gate: ${charCount} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || 'out';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, greeting, 'utf8');

// Read back and confirm the file on disk is exactly the greeting, byte for byte.
const written = readFileSync(target, 'utf8');
if (written !== greeting) {
  throw new Error('entry.txt does not match the greeting after writing');
}
console.log(`entry.txt written (${charCount} characters) to ${target}`);
