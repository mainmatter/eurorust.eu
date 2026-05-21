+++
title = "Atomic Design Patterns in Rust: From Orderings to Code"
template = "talk.html"
[extra]
  speakers = ["martin-ombura-jr"]
  description = "<p>Modern Rust codebases use atomics for much more than simple shared-state coordination. When multiple atomics interact, subtle behaviors can appear that can look arbitrary at first. With a closer view, a small set of recurring patterns shows up across many production systems, and those patterns can be applied deliberately to solve nuanced coordination problems when both correctness and performance matter.</p><p>This talk classifies these patterns by starting with a short refresher on RustÃ¢â‚¬â„¢s atomic memory model, then framing the problems being solved, describing the structure of each pattern, and connecting it to real implementations in widely used Rust crates and runtimes</p><p>The 5 patterns covered are: 1. Publish and consume with Release and Acquire 2. One time initialization and fast paths, 3. CAS driven state machines for coordination 4. Handoff via RMW and release sequences 5. Snapshot style reads using sequence counters and index publication.</p><p>Along the way, attendees will see common pitfalls, what correctness argument each ordering supports, and where performance wins or losses typically come from. The goal is to make memory ordering choices reviewable, explainable, and repeatable.</p>"
  ogimage = ""
+++
