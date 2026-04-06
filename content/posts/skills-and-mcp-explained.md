---
title: "Skills and MCP: What They Are, Explained Simply"
date: 2026-04-04
tags: ["tech", "AI"]
draft: false
---

You've probably heard people talking about "MCP" and "skills" when it comes to AI tools like Claude Code. These sound technical, but the ideas are actually simple. Let me explain them the way I'd explain them to a middle schooler.

---

## Start here: what Claude Code can do by default

Imagine you hired a really smart assistant. They can read, write, think, and talk. But out of the box, they can only work with what's in the room — papers on the desk, files you hand them.

That's Claude Code without anything added. Smart, helpful, but limited to what's already in front of it.

---

## Skills: like apps on a phone

Your phone comes with the basics — calls, texts, a camera. But then you install apps. Spotify for music. Maps for navigation. Each app adds a specific power that wasn't there before.

**Skills are the same thing for Claude Code.**

A skill is a set of instructions that teaches Claude how to do a specific job really well. Not just "kinda okay" — properly, with a defined workflow, in the right order.

For example:
- A **QA skill** tells Claude: go open the website in a browser, click through every page, look for broken things, write up a report.
- A **ship skill** tells Claude: check the diff, run the tests, write a commit message, open a pull request.
- A **debug skill** tells Claude: find the error, trace it back to the root cause, don't guess, don't patch symptoms.

Without the skill, Claude might do a decent job if you describe all of this yourself every time. With the skill, you just type `/qa` or `/ship` and it knows exactly what to do.

Skills are just files. Text files with instructions in them. You can write your own, share them, install ones other people made.

---

## MCP: giving your assistant arms and legs

Back to the smart assistant. They're still stuck in the room, right? They can read what you hand them, but they can't go online, check your calendar, or send a message.

**MCP changes that.**

MCP stands for Model Context Protocol. The name is boring but the idea isn't. MCP is a standard way to connect an AI to external tools and services. It's basically a plugin system, but for what the AI can *do*, not just what it can *think about*.

With MCP, you can give Claude:
- **Eyes** — let it look at a database, read your calendar, browse the web
- **Hands** — let it send a Slack message, create a GitHub issue, update a spreadsheet
- **Memory** — let it store and retrieve things across sessions

Each connection is called an MCP server. You set them up once, and then Claude knows it can use them. It's like giving your assistant a phone so they can call people, access files online, and send emails — instead of being stuck at the desk.

### A real example

Say you want Claude to check your Linear board, find all open bugs, and write a daily standup summary. Without MCP: you'd have to copy-paste everything yourself. With an MCP server connected to Linear: Claude can pull the data directly, read it, and write the summary — no copy-paste needed.

---

## Skills vs MCP: what's the difference?

| | Skills | MCP |
|---|---|---|
| **What it is** | A workflow: how to do a job | A connection: what Claude can access |
| **Analogy** | App on your phone | The internet connection the app uses |
| **Example** | "Run the QA checklist" | "Connect to our staging database" |
| **Who makes them** | You, or community | You set up servers, community builds connectors |

They work together. A skill tells Claude *how* to do something. MCP gives Claude the *tools* to actually do it.

---

## Why does this matter?

A year ago, AI tools were mostly autocomplete on steroids. You'd ask a question, get an answer, copy it somewhere.

Now, with skills and MCP, the AI can actually *act* — not just answer. It can run your QA suite, file a bug report, check your calendar before scheduling a meeting, or deploy your code.

The bottleneck isn't intelligence anymore. It's the wiring. Skills and MCP are the wiring.

---

Still confused? Think of it this way: **MCP is the API, skills are the app.** If you've ever built anything with an API, you already understand both concepts — they're just being applied to AI agents instead of software.
