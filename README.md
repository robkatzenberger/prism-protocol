## PRISM — The Open Intent Signal
v0.1 • Public Protocol • The Trust Signal, Not the Trust Engine

Prism is a lightweight, neutral protocol for generating standardized intent metadata across apps, agents, and AI systems.

It provides a universal pre-execution intent signal — a tiny metadata envelope that documents what an agent is about to do, without enforcing, verifying, judging, or governing the action.

Prism describes intent — it does not judge intent.

 ## Why Prism Exists

Modern applications and AI systems generate billions of actions daily — messages, decisions, API calls, tasks — yet none include a standardized intent signal.

Prism introduces a universal metadata object that represents:

what an agent intends to do

when the intent was formed

a human-readable summary

self-assessed confidence

a simple acknowledgment

This makes intent explicit and portable without imposing policy, cryptography, identity proofs, or governance.

 ## How Prism Works

When an agent prepares to perform an action, it generates a Prism Intent Signal:

Agent → [Generate Prism Signal] → Action Executes


Prism does not approve, deny, judge, score, verify, or modify actions.
It simply documents intent in a universal, metadata-only format.

 ## Prism Intent Signal (v0.1)

The core signal is a tiny, portable metadata object:

```json
{
  "prism_id": "uuid",
  "timestamp": "ISO-8601",
  "agent": "string",
  "intent_summary": "string",
  "acknowledgment": "prism_v0.1"
}
```

## Field Descriptions

| Field            | Purpose                                                                                 |
|------------------|-----------------------------------------------------------------------------------------|
| **prism_id**     | Unique identifier for this intent signal.                                               |
| **timestamp**     | When the intent was formed (ISO 8601 UTC).                                              |
| **agent**        | Name or identifier of the system generating the intent.                                 |
| **intent_summary** | Human-readable description of the intended action.                                     |
| **acknowledgment** | Prism signal version identifier (`prism_v0.1`).                                        |


The envelope is intentionally minimal for maximum safety, clarity, and interoperability.

## Reference Implementation

```python
from uuid import uuid4
from datetime import datetime, timezone

def utc_now():
    return datetime.now(timezone.utc)

def create_prism_signal(agent, summary):
    return {
        "prism_id": str(uuid4()),
        "timestamp": utc_now().isoformat().replace("+00:00", "Z"),
        "agent": agent,
        "intent_summary": summary,
        "acknowledgment": "prism_v0.1"
    }
```

No cryptography.
No network calls.
No dependencies.
Purely a local metadata object.

## Optional Extension: Intent Codes (v0.2)

Developers may optionally assign simple action categories:

ACTION.SEND_MESSAGE  
ACTION.ACCESS_API  
ACTION.EXECUTE_CODE  
ACTION.MODIFY_FILE  
ACTION.AGENT_CHAIN_STEP  
ACTION.MODEL_TO_MODEL  


Intent codes do not expose content — they only classify the general type of action.

This is an optional ecosystem feature and not required for v0.1.

 ## Developer use case

Prism provides:

A standard format for intent signaling

A minimal layer that adds transparency to any workflow

A safe, neutral protocol usable across ecosystems

A bridge between human intent and machine action

Prism is the
Content-Type: application/intent+json
for intelligent systems.

## Why Prism Matters

Prism introduces the world to standardized intent signaling:

explicit intent documentation

portable intent metadata

transparent agent behavior

universal intent primitives

This supports collaborative, interpretable digital ecosystems without requiring governance, identity, cryptography, or enforcement layers.

## Roadmap
v0.1 — Foundation (This Release)

Prism Intent Signal format

Minimal field definitions

Starter libraries (Node, Python)

MIT License

v0.2 — Ecosystem

Extended optional fields

Framework integrations

Intent code taxonomy

Developer examples and tooling

Community-driven enhancements


## Quick Start

The Prism Intent Signal is designed to be lightweight and easy to generate.

### Example (Python)

```python
from uuid import uuid4
from datetime import datetime, timezone

def utc_now():
    return datetime.now(timezone.utc)

def create_prism_signal(agent, summary):
    return {
        "prism_id": str(uuid4()),
        "timestamp": utc_now().isoformat().replace("+00:00", "Z"),
        "agent": agent,
        "intent_summary": summary,
        "acknowledgment": "prism_v0.1"
    }

# Example usage
signal = create_prism_signal(
    agent="my_app.backend.worker",
    summary="Sending notification email"
)

print(signal)
```

### Output Example

```json
{
  "prism_id": "92dcf4e8-47e8-4c65-9ccb-a1e8b8f80a57",
  "timestamp": "2025-02-12T14:31:23.018Z",
  "agent": "my_app.backend.worker",
  "intent_summary": "Sending notification email",
  "acknowledgment": "prism_v0.1"
}
```



## Contributing

Prism is intentionally simple and community-focused.
We welcome contributions in:

client libraries

schemas

framework adapters

documentation

examples

ecosystem tooling

PRs encouraged.

## License

MIT License — open, permissive, friendly to industry and academia.

## Credit

Created by
Robert Katzenberger 

## Acknowledgments

Prism is inspired by the open-source community and the growing need for transparent, interoperable intent signaling across digital systems.

---

_Prism is an open, neutral protocol.  
All implementations are voluntary, vendor-agnostic, and designed for maximum interoperability._

---

**Document Version:** v0.1  
**Release Date:** 11/15/2025  
**Editor:** Robert Katzenberger  
**Status:** Public Draft

This document is part of the Prism Protocol open standard.  
Comments and contributions are welcome.
