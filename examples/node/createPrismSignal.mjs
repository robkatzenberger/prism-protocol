import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const PRISM_VERSION = "prism_v0.1";

export function createPrismSignal(agent, summary) {
  return {
    prism_id: randomUUID(),
    timestamp: new Date().toISOString(),
    agent,
    intent_summary: summary,
    prism_version: PRISM_VERSION,
  };
}

const currentFile = fileURLToPath(import.meta.url);
const entryFile = process.argv[1] ? path.resolve(process.argv[1]) : null;

if (entryFile && currentFile === entryFile) {
  console.log(
    createPrismSignal("my_app.backend.worker", "Sending notification email")
  );
}
