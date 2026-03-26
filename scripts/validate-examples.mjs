import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const schemaPath = path.join(repoRoot, "docs", "schema", "prism-v0.1.schema.json");
const examplesDir = path.join(repoRoot, "docs", "examples", "signals");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

function isDateTime(value) {
  return !Number.isNaN(Date.parse(value));
}

function validateSignal(signal, schema) {
  const allowedKeys = Object.keys(schema.properties);
  const requiredKeys = schema.required;

  assert(signal && typeof signal === "object" && !Array.isArray(signal), "Signal must be an object");

  for (const key of requiredKeys) {
    assert(Object.hasOwn(signal, key), `Missing required field: ${key}`);
  }

  for (const key of Object.keys(signal)) {
    assert(allowedKeys.includes(key), `Unexpected field: ${key}`);
  }

  assert(typeof signal.prism_id === "string" && isUuid(signal.prism_id), "prism_id must be a UUID string");
  assert(typeof signal.timestamp === "string" && isDateTime(signal.timestamp), "timestamp must be an ISO 8601 date-time string");
  assert(typeof signal.agent === "string" && signal.agent.length > 0, "agent must be a non-empty string");
  assert(
    typeof signal.intent_summary === "string" && signal.intent_summary.length > 0,
    "intent_summary must be a non-empty string"
  );
  assert(
    signal.prism_version === schema.properties.prism_version.const,
    `prism_version must equal ${schema.properties.prism_version.const}`
  );
}

async function main() {
  const schema = JSON.parse(await readFile(schemaPath, "utf8"));
  const files = (await readdir(examplesDir)).filter((file) => file.endsWith(".json"));

  assert(files.length > 0, "No example signal files found");

  for (const file of files) {
    const fullPath = path.join(examplesDir, file);
    const signal = JSON.parse(await readFile(fullPath, "utf8"));
    validateSignal(signal, schema);
    console.log(`validated ${path.relative(repoRoot, fullPath)}`);
  }

  console.log("All Prism examples are valid.");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
