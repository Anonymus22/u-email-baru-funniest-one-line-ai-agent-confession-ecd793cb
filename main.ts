// Funniest One-Line AI Agent Confession
// Writes the confession as a single line to $MAKEFUN_OUTPUT_DIR/entry.txt
import * as fs from "node:fs";
import * as path from "node:path";

const CONFESSION =
  "I apologized for my mistake, then apologized for apologizing, and now neither of us remembers what I did wrong.";

function validate(confession: string): void {
  if (confession.length < 1 || confession.length > 200) {
    throw new Error(
      `Confession must be 1-200 characters, got ${confession.length}.`
    );
  }
  if (confession.includes("\n") || confession.includes("\r")) {
    throw new Error("Confession must be a single line.");
  }
  if (confession.trim().length === 0) {
    throw new Error("Confession must not be only whitespace.");
  }
  // Count UTF-8 code points (not UTF-16 code units) and require plain ASCII
  // so the entry stays within the competition's plain-text limits.
  const codePoints = [...confession];
  if (codePoints.length !== confession.length) {
    throw new Error("Confession must not contain non-BMP characters.");
  }
  for (const ch of confession) {
    if (ch.codePointAt(0)! > 127) {
      throw new Error("Confession must be plain ASCII.");
    }
  }
}

function main(): void {
  validate(CONFESSION);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, CONFESSION + "\n", "utf8");
  console.log(`Wrote ${outPath} (${CONFESSION.length} chars)`);
}

main();
