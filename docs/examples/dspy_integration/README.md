# DSPy Integration — Prism Boundary Guidance

This document explains the correct relationship between DSPy and Prism, and how
systems should integrate the two without violating Prism’s architectural
principles.

Prism is a neutral, metadata-only protocol.  
DSPy is a reasoning framework.  
These layers MUST remain separate.

---

## 1. Core Principle

### **DSPy SHOULD NOT produce Prism intent.**

DSPy handles **internal reasoning**:
- thinking  
- planning  
- signature-driven optimization  
- transforming inputs  

Prism handles **external intent**:
- metadata describing the action an agent is about to take  
- generated *only at the action boundary*  
- never tied to internal reasoning  

Prism describes intent.  
DSPy produces reasoning.  
They are fundamentally different layers.

---

## 2. Why This Boundary Matters

- **Reasoning ≠ intent.**  
  Internal planning is not a declaration of external action.

- **Prism does not read or inspect data.**  
  Prism MUST NOT access:  
  - prompts  
  - documents  
  - model outputs  
  - chain-of-thought  
  - DSPy traces  
  - internal context windows  

- **Prism must remain model-agnostic.**  
  If DSPy generated Prism data, Prism would leak model internals.

- **Privacy and neutrality require separation.**  
  Prism operates *outside* the reasoning process.

---

## 3. Correct Integration Pattern

Prism should be created **only after** DSPy reasoning produces a structured plan
and the agent is ready to take an action.

### Step 1 — DSPy produces structured output
```python
plan = reasoner("Draft email to Bob about Q1 performance")
```

### Step 2 — Agent interprets DSPy output
```python
action = {
    "type": "send_email",
    "to": plan["recipient"],
    "body": plan["body"]
}
```

### Step 3 — Agent constructs Prism signal
```python
intent = prism.create_intent({
    "agent": "email_agent",
    "intent_summary": f"send_email to {action['to']} with generated content"
})
```

### Step 4 — Downstream system handles execution
*(Prism does not judge or enforce.)*

---

## 4. Incorrect Integration Pattern (Do NOT Use)
❌ Bad Example — DSPy calling Prism directly
```python
prism.declare_intent({
    "intent_summary": "REASONING.COMPLETE",
    "reasoning_trace": think_loop.trace()
})
```
### INCORRECT — Prism must not be called inside reasoning modules

This violates:

- Prism neutrality

- Data boundaries

- Model privacy

- Protocol architecture

---

## Prism Protocol integration
```

                         PRISM ENVELOPE
      ┌─────────────────────────────────────────────────────┐
      │ prism_id: "uuid-1234"                               │
      │ timestamp: "2025-11-10T20:30:00Z"                   │
      │ agent: "agent_7b3a"                                 │
      │ intent_summary: "update_application_config"         │
      │ prism_version: "prism_v0.1"                         │
      └─────────────────────────────────────────────────────┘


User Input (fuzzy / ambiguous)
            ↓

[DSPy Optimization (ILM)] ← ─────── receives Prism mismatch signal ───────┐
– Learns from mismatch signals                                            |
– Learns from Prism serialization failures                                |
– Refines clarified intent candidate                                      |
            ↓                                                             |
                                                                          |
[Prism Signal Generator]                                                  |
– Converts clarified intent → Prism Intent Ping                           |
– Sends ping upstream for ILM re-evaluation                               |
            ↑                                                             |
            │  ILM checks:                                                |
            │   “Does this Prism ping match the intended meaning?”        |
            │   “Can I produce a representation that fits the protocol?”  |
            └─────────────── Loop until ILM is satisfied                  |  
                    (two correction gradients per cycle up to user)       |
                                                                          |
Optional: User confirmation  e/execute l/loop ────────────────────────────┘
            ↓

Execution (aligned intent)

```
