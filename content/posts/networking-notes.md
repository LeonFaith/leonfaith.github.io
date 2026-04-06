---
title: "Networking Notes: BGP and the Internet's Backbone"
date: 2026-03-15
tags: ["tech", "networking"]
draft: false
---

BGP (Border Gateway Protocol) is what holds the internet together. Every time you load a webpage, BGP is quietly doing the work of routing your packets across dozens of autonomous systems.

Here's what I find fascinating about it: BGP was designed in the late 1980s, literally sketched on napkins, and it still runs the global internet today. There's something beautiful about that kind of longevity.

## How it actually works

Each network on the internet is an **Autonomous System (AS)** — think ISPs, cloud providers, universities. BGP is how these ASes talk to each other and advertise which IP prefixes they can reach.

When you type `curl https://example.com`, your request hops through multiple ASes. BGP decides which path it takes.

## The trust problem

BGP is famously insecure. Any AS can (accidentally or maliciously) announce that it owns IP space it doesn't. This is called a **BGP hijack**, and it happens more often than you'd think.

The fix is RPKI (Resource Public Key Infrastructure) — cryptographic certificates that prove you own the IP space you're announcing. Adoption is growing but still not universal.

More on this in a future post.
