---
title: "How to Actually Use Claude Code Well"
date: 2026-04-05
tags: ["tech", "AI", "tools"]
draft: false
---

Claude Code is not just a chatbot in your terminal. It has a whole set of commands, shortcuts, and patterns that most people never discover. Here's what I actually use day to day.

## The commands worth knowing

### `!command` — run a shell command without leaving Claude

Prefix anything with `!` and it runs in your shell and pipes the output back into the conversation. Useful when you want Claude to see what just happened.

```
! git log --oneline -10
! npm test
! curl -s https://api.example.com/health
```

This is way faster than copying terminal output and pasting it in.

### `/clear` — fresh start, same session

Clears the conversation context without restarting. Use this when you've been debugging one problem for a while and want to switch to something else without the old context bleeding in.

### `/compact` — compress the conversation

When a long session is filling up context, `/compact` summarizes everything so far and keeps going. Useful for large refactors spread across many files.

### `/cost` — check your token usage

Shows how many tokens the current session has used. Good habit to run this before and after a big task so you know what things actually cost.

### `/memory` — what Claude remembers about you

Claude Code has a persistent memory system. `/memory` shows you what it knows. You can also just say "remember that..." and it'll save a note for future sessions.

### `/review` — code review before you commit

Runs a structured review of your diff against the base branch. Catches things like missing error handling, logic bugs, and style inconsistencies. Better than asking "does this look good?" in the chat.

---

## Keyboard shortcuts that save time

| Shortcut | What it does |
|----------|-------------|
| `Ctrl+C` | Cancel the current response |
| `Ctrl+L` | Clear the screen (keeps conversation) |
| `↑` | Previous message in history |
| `Esc` | Stop generating |

On Mac, `Cmd+K` in some terminal setups also works for clearing.

---

## Patterns that actually work

**Give Claude the full picture upfront.** Instead of "fix this bug," say "this function returns null when the user is logged out, here's the stack trace, here's the relevant code." Claude doesn't need hand-holding, but it does need context.

**Use `!` to show, not tell.** Instead of describing an error, run `! npm test` or `! python script.py` and let Claude see the actual output.

**Ask for a plan before a big change.** For anything touching more than two or three files, say "don't write any code yet, just tell me your approach." This catches wrong assumptions before they become wrong code.

**Be specific about what you don't want.** "Don't add error handling I didn't ask for" or "don't refactor anything outside the function I mentioned" saves a lot of back-and-forth.

**CLAUDE.md is your project's config file.** If you put a file called `CLAUDE.md` at the root of your repo, Claude reads it at the start of every session. Put things like: coding conventions, what commands to run for tests, what not to touch. It's like onboarding notes for your AI.

---

## The one thing most people miss

Claude Code isn't just for writing code. It's good at:

- Reading through a codebase you inherited and explaining how it works
- Drafting commit messages from your diff
- Helping you think through a design before you write anything
- Reviewing PRs (paste the diff and ask what it thinks)
- Writing runbooks and documentation

The terminal interface makes it feel like a coding tool, but it's really a thinking partner that happens to live next to your code.

---

The best way to learn it is to use it for one real project, not toy examples. That's when the patterns start clicking.
