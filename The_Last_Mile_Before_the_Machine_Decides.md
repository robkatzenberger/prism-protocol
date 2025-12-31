# The Last Mile Before the Machine Decides

The moment before the machine decides is the moment that matters. We should not waste it.

---
We are building systems that act on our behalf. They book flights, write code, move money, send emails, negotiate contracts. Every week the list grows longer. Every week the autonomy grows deeper.
And yet we have built almost nothing to answer the simplest question: what is this thing about to do?
This is not a hypothetical. It is not a thought experiment for AI safety researchers to debate in conference halls. It is happening now, in production, at scale. Agents are executing. Decisions are being made. And the humans who are nominally in charge learn what happened the same way everyone else does: after the fact.
We have instrumented the entire stack. We log everything. We trace every request, store every response, index every action. We have built cathedrals of observability. And none of it tells us what matters most: what comes next.
This is the gap. Not in our models. Not in our infrastructure. In our thinking.

## The Difference Between a Record and a Signal

When an agent acts, it leaves traces. Logs fill up. Databases record the outcome. Dashboards update. We have become extraordinarily good at capturing what happened.
But a record is not a signal. A log entry is a historical artifact. It tells you that something occurred. It does not tell you that something is about to occur. By the time you read it, the decision is already made. The email is sent. The trade is executed. The file is deleted. The moment for intervention has passed.
This is the architecture we have inherited. It was designed for a world where humans made decisions and machines carried them out. In that world, logging made sense. The human was the checkpoint. The machine was the executor. You could afford to learn about execution after it happened because a human had already blessed the intent.
That world is ending.
When the agent is the decision maker, the log becomes an obituary. It tells you how things died. It does not give you the chance to save them.

## What Pre-Execution Actually Means

Pre-execution is exactly what it sounds like. It is the moment before. The space between decision and action. The pause that asks: should this happen?
In practice, it means an agent cannot act without first declaring what it intends to do. Not in vague terms. Not in natural language summaries. In structured, verifiable, actionable terms. I am about to call this API. I am about to send this message to this recipient. I am about to move this amount from this account to that one.
The declaration happens before the execution. Always. Without exception.
This is not a new idea. It is one of the oldest ideas in computing. Every critical system that humans have ever trusted with real consequences has some version of this pattern. Air traffic control. Nuclear facilities. Power grids. Financial clearing houses. The principle is the same: you do not act until someone or something has verified that your intended action is acceptable.
We simply forgot to bring this principle with us when we started building autonomous agents.

## What This Is Not

Pre-execution is not a guardrail. Guardrails are restrictions baked into the model itself. They are useful, but they are not sufficient. A guardrail says "never do X." Pre-execution says "before you do anything, tell me what you are planning."
Pre-execution is not observability. Observability shows you what is happening and what has happened. Pre-execution shows you what will happen. The difference is the difference between a security camera and a locked door.
Pre-execution is not a prompt. You cannot engineer your way to trust. System instructions can be ignored, misinterpreted, jailbroken, or simply forgotten over long contexts. Pre-execution is not a suggestion to the model. It is a structural requirement enforced outside the model.
Pre-execution is not slow. The latency cost of checking intent is measured in milliseconds. The cost of not checking it is measured in lawsuits, breaches, and broken trust.

## Why Intent Is the Only Thing That Matters

Here is the uncomfortable truth about autonomous systems: we do not actually care what they do. We care what they mean to do.
An agent that accidentally sends an email to the wrong person has made an error. An agent that intentionally exfiltrates data to an unauthorized endpoint has committed a violation. The action might look similar in the logs. The intent is completely different. And the intent is what determines whether you have a bug or a breach.
But here is the problem. You cannot infer intent from outcome. By the time you see the result, the intent is a black box. You can guess. You can reconstruct. You can interrogate the model after the fact. But you cannot know with certainty what the agent was trying to do unless you capture that intent at the moment it is formed, before it becomes action.
This is what pre-execution gives you. Not a guess at intent. Not a reconstruction of intent. The intent itself, stated plainly, at the moment it matters.

## The Execution Path

So how does this work in practice?
The agent decides to act. Before it can execute, it must emit a structured declaration of intent. This declaration describes exactly what the agent plans to do: the action, the target, the parameters, the context.
This declaration travels to a verification layer. The verification layer is not the agent. It is not the model. It is an independent system whose only job is to answer one question: should this action proceed?
The verification layer checks the intent against policy. The policy might be simple: no external API calls without approval. The policy might be complex: financial transactions over a threshold require multi-party sign off, certain data classifications can never leave the environment, specific actions are prohibited during certain hours. The policy is defined by humans. The enforcement is automatic.
If the intent passes verification, the agent receives approval to proceed. If it does not, the action is blocked before it ever executes. The human is notified. An audit record is created. The system remains in a known good state.

**This is the loop. Intent, verification, execution. In that order. Always.**

## Who Builds This

This is not a feature. It is infrastructure. It does not belong inside any single agent framework. It does not belong to any single vendor. It is a layer, and like all layers, it must be open enough to be universal and structured enough to be trustworthy.
The teams building agents need to emit intent. The teams deploying agents need to verify intent. The teams governing agents need to audit intent. These are different teams with different incentives, and the system must serve all of them without being captured by any of them.
This is why the intent protocol cannot be proprietary.

## Where This Lives

The pre-execution layer sits between the agent and the world. Not inside the agent, where it can be bypassed. Not at the edge, where it lacks context. In the middle, where every action must pass through.
Think of it as a membrane. Permeable, but selective. Everything crosses it. Nothing crosses it without inspection.
This is a different architecture than most teams are building today. Most teams assume the agent is trusted by default and try to catch bad behavior after it happens. The pre-execution layer assumes nothing and requires proof before anything happens.
The difference is not philosophical. It is structural. And structure is what scales.

## When This Matters

It matters now. Not in some imagined future where agents are more powerful. Now, while agents are being deployed into production environments with access to real data, real systems, and real consequences.
Every week that passes without this infrastructure is another week of accumulating risk. Another week of agents acting without oversight. Another week where the answer to "what did the agent do" comes too late to matter.
The organizations that build this capability early will be the ones trusted to deploy agents in environments where trust is required. Healthcare. Finance. Government. Critical infrastructure. The places where "we can check the logs after" is not an acceptable answer.
The organizations that do not build this capability will find themselves locked out of those environments entirely. Not because their agents are less capable. Because their agents are less trustworthy. And in the long run, trust is the only capability that matters.

## Why This Should Exist

We are at an inflection point. The technology to build autonomous agents is here. The infrastructure to govern them is not.
This is not because governance is hard. It is because we have been so focused on making agents capable that we forgot to make them accountable. We optimized for action. We neglected verification.
The result is a gap. A dangerous one. Agents that can do remarkable things, deployed into environments that have no way to ensure those remarkable things are also the right things.
Pre-execution closes that gap. It creates a checkpoint where there was none. It makes intent visible, verifiable, and auditable. It gives humans the ability to trust autonomous systems without requiring them to be omniscient.
This is not about slowing down progress. It is about making progress sustainable. The fastest path forward is not the one with the fewest checks. It is the one that builds trust as it builds capability.
We know how to do this. The patterns exist. The principles are proven. The only question is whether we will apply them before the absence of them becomes a crisis.
The moment before the machine decides is the moment that matters. We should not waste it.

## Why I Built This

I spent fifteen years building control systems for industrial infrastructure. The kind of systems where a mistake does not mean a bug report. It means someone gets hurt. You learn a certain discipline in that world. You learn that you verify before you execute. You learn that trust is not a feeling. It is a structure.
When I started watching the AI agent space, I saw the same patterns I had seen before. Powerful systems. Real consequences. Almost no verification layer. It felt like watching someone wire a power grid without breakers.
So I built what I could not find.
Prism is an open source protocol for pre-execution intent signaling. 
APEX is the policy engine that sits on top. Together they form the verification layer this essay describes.
I open sourced Prism because I believe intent signal this critical cannot be owned. It has to be adopted. It has to be trusted. And trust does not come from a sales pitch. 
I am not from Silicon Valley. I do not have the pedigree or the network. I am just someone who saw a gap and could not look away from it.
The best version of this does not come from one person. It comes from the people in the various industries who understand what is at stake. If you are building in this space and any of this resonates, I want to hear from you. 

Get In Touch

Twitter/X: @RHKatzenberger
Linkedin.com/in/robertkatzenberger 


December 31 2025
