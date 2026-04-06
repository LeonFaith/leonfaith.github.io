---
title: "What Happens to Network Engineers in the Age of AI"
date: 2026-04-03
tags: ["tech", "networking", "career"]
draft: false
---

I'm a network engineer. So when people ask me "will AI take your job?", I actually think about it. Not as a philosophical question, but as a career planning question.

Here's my honest read on where this is going.

---

## What AI is already eating

Let me be direct about what's getting automated, because pretending otherwise helps nobody.

**Configuration generation** is mostly done. If you're still hand-crafting OSPF configs or manually writing ACLs, an AI can do that faster and with fewer typos. This used to be a skill you'd spend years building. Now it's a prompt.

**Basic troubleshooting** is getting there. "BGP neighbor won't come up" — AI can walk through the checklist: check state, check timers, check route-maps, check prefix-lists. It's not perfect, but it handles the 80% of cases that are always the same five things.

**Documentation** is almost fully automated. Generating runbooks, writing change requests, summarizing a topology from configs — AI does this better than most humans, and it doesn't complain about it.

**Ticket triage** is going fast. AI tools can look at a network alert, correlate it with recent changes, and suggest the most likely cause before a human even reads the ticket.

If your current job is mostly these things, the job is changing. That's not speculation — it's already happening.

---

## What AI is not good at (yet)

Here's the other side, and it's equally real.

**Physical reality.** AI cannot plug in a cable, rack a switch, trace a fiber, or tell you why the SFP keeps flaking out in that one chassis. Hands-on work is still hands-on.

**Novel failure modes.** When something breaks in a way nobody's seen before — cascading failures, weird timing issues, hardware bugs — you need someone who can reason from first principles. AI is pattern-matching. If it hasn't seen the pattern, it guesses.

**Vendor relationships and escalations.** "I need a TAC case opened and I need to talk to someone who knows the XR platform deeply" is not an AI workflow yet.

**Architecture under constraints.** Designing a network for a specific business with specific regulatory requirements, specific budget, specific team skills — the context is too rich, too human. AI can generate options but can't make the call.

**Security intuition.** Knowing something feels wrong before you can prove it. Recognizing a traffic pattern that's technically within policy but behaviorally suspicious. This is still a human edge.

---

## The role that's actually growing

Here's what I see happening: the *number* of networking tasks is going up faster than AI can absorb them.

Why? Two reasons.

**First: AI infrastructure needs serious networking.** GPU clusters, inference farms, training data pipelines — these have extreme networking requirements. High-bandwidth, low-latency, lossless fabrics. RoCE, RDMA, InfiniBand. This is specialized work and there aren't enough people who know it. If you can learn AI infrastructure networking, you're in a growth market for the next decade.

**Second: AI is making companies attempt more ambitious things.** More apps, more services, more cloud, more automation. All of it needs networking. The pie is getting bigger even as AI handles more slices.

The engineers who are struggling are the ones doing narrow, repetitive work. The ones doing well are the ones who can reason about the whole system — who understand why a design decision gets made, not just how to implement it.

---

## What to actually do about this

A few things I'm focusing on, and would recommend:

**Learn to code.** Not to become a software engineer, but to automate your own work. Python + Netmiko/NAPALM/Nornir. Ansible. Terraform for cloud networking. If you can write scripts that talk to your network, you multiply what you can do. If you can't, someone else will automate your job before you do.

**Get close to AI infrastructure.** Understand how GPU fabrics work. Learn about RDMA and lossless networking. This is where the interesting new problems live, and it's genuinely hard. Complexity is career protection.

**Build systems thinking, not just technical depth.** The engineers who are hard to replace are the ones who understand how the network connects to the business. Who know why the latency budget is what it is. Who can talk to a developer and understand their constraints. That translation work is hard to automate.

**Use AI tools to amplify your output.** This one sounds obvious but most people aren't doing it. Let AI write your first draft configs and you review them. Let AI draft your change request and you edit it. Let AI suggest the troubleshooting steps and you validate them. You become the judgment layer, not the execution layer. That's a better job.

---

## My honest take

I don't think network engineers are going away. I think the job is shifting — away from execution, toward judgment. Away from typing commands, toward understanding systems.

The engineers who'll have a rough time are the ones who treat their command-line knowledge as the job. The ones who'll do well are the ones who understand *why* the commands exist, what they're trying to accomplish, and how to get there even if the tools change.

AI is a very good executor. It still needs someone to decide what's worth doing.

That's the job now.
