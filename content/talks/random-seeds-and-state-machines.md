+++
title = "Random Seeds and State Machines: An Approach to Deterministic Simulation Testing"
template = "talk.html"
[extra]
  date = "Friday, October 10, 2025"
  time = "11:00–11:30"
  stage = "Side Stage"
  speakers = ["alfonso-subiotto"]
  description = "<p>Have you spent sleepless nights thinking about that heisenbug in production that no matter what you try, you can’t reproduce? The solution is not a sleeping pill; it is attending this talk. Learn how random seeds and state machines can catch the most elusive bugs and restore your sleep.</p><p>Deterministic simulation testing (DST) is a method that explores as many random execution paths of a system as possible, injects random failures, and lets developers reproduce the exact same execution path on failure given an initial random seed. This testing approach shakes out many difficult to find bugs before they reach production and greatly increases developer confidence in system correctness when making new changes.</p><p>DST was first popularized by the FoundationDB team, and is slowly finding its way into the testing arsenal of many products like TigerBeetle, Resonate, and more recently, Turso’s rewrite of SQLLite in Rust. This talk will cover how we implemented DST of our distributed storage system at Polar Signals by modelling our core components as state machines and why this was the right choice for us over other approaches that use deterministic async runtimes (e.g. https://github.com/madsim-rs/madsim).</p><p>Come learn more about DST and how it can help you write better and more resilient software!</p>"
  ogimage = "/images/talks/og-images/random-seeds-and-state-machines.png"
+++
