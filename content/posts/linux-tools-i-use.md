---
title: "Linux CLI Tools I Actually Use"
date: 2026-01-10
tags: ["tech"]
draft: false
---

Not a comprehensive list. Just the stuff that's genuinely in my muscle memory.

## Navigation & search

- **`fd`** — `find` replacement. Faster, saner defaults, respects `.gitignore`.
- **`ripgrep` (`rg`)** — `grep` replacement. Much faster, great defaults.
- **`fzf`** — fuzzy finder. Pipe anything into it. Life-changing for `Ctrl+R` history search.
- **`zoxide`** — smarter `cd`. Learns your directories, jump anywhere with `z name`.

## File viewing

- **`bat`** — `cat` with syntax highlighting and git diff markers.
- **`eza`** — `ls` replacement. Colors, icons, git status in the listing.

## Networking

- **`ss`** — socket statistics. Replaced `netstat` for me.
- **`mtr`** — `traceroute` + `ping` combined. Essential for diagnosing network paths.
- **`httpie`** — curl but readable. Good for API testing.

## System

- **`htop`** / **`btop`** — process monitoring. `btop` is prettier.
- **`duf`** — `df` replacement. Shows disk usage sanely.

## The underrated one

**`entr`** — runs a command whenever files change. I use it constantly for watch-mode without a framework:

```bash
ls src/**/*.go | entr -r go run ./...
```

That's it. No build system required.
