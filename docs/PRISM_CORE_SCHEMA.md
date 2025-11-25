# Prism Core Schema (v0.1)

The Prism Core Schema defines the minimal, universal fields that every Prism intent signal must include. These fields enable Prism to remain lightweight, neutral, and easy to adopt across systems.

---

## Core Fields

### `prism_id`  
**Type:** string (UUID recommended)  
**Description:** Unique identifier for this intent signal.

---

### `timestamp`  
**Type:** string (ISO 8601 UTC)  
**Description:** Timestamp when the intent was formed.

---

### `agent`  
**Type:** string  
**Description:** Name or identifier of the agent/system generating the intent.

---

### `intent_summary`  
**Type:** string  
**Description:** Human-readable description of the action the agent intends to take.

This should NOT include internal reasoning traces, chain-of-thought, or model internals.

---

### `prism_version`  
**Type:** string  
**Allowed Values:** `prism_v0.1`  
**Description:** Identifies the version of the Prism protocol used to form this signal.

---

## Example (Minimal Signal)

```json
{
  "prism_id": "8f766c64-2f1e-4c72-8e33-29a7bcb198a8",
  "timestamp": "2025-11-22T05:14:21Z",
  "agent": "email_assistant_01",
  "intent_summary": "send_email to bob@example.com with quarterly report",
  "prism_version": "prism_v0.1"
}

```

---

## Philosophy

The Core Schema represents the eternal, stable foundation of Prism.
Extended schemas may exist in the future, but these fields MUST remain unchanged.

---





