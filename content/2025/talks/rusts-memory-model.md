+++
title = "Rust’s Memory Model: The Logic Behind Safe Concurrency"
template = "2025/talk.html"
[extra]
  date = "Thursday, October 9, 2025"
  time = "15:15–15:45"
  stage = "Side Stage"
  speakers = ["martin-ombura-jr"]
  description = "<p>Concurrency is hard, but Rust gives you tools to make it safe, from <code>Mutex</code> and <code>RwLock</code> to atomic types like <code>AtomicUsize</code> and <code>AtomicPtr</code>. Beneath these familiar abstractions lies something more fundamental and often overlooked: memory ordering. This talk explores how memory ordering governs the visibility and sequencing of reads and writes between threads, and why understanding it is essential for writing correct, performant, and portable concurrent code.</p><p>We’ll demystify Rust’s Ordering API—<code>Relaxed</code>, <code>Acquire</code>, <code>Release</code>, <code>AcqRel</code>, and <code>SeqCst</code>—and examine how it is employed under the hood in synchronization primitives such as <code>Mutex</code>, <code>Once</code>, and <code>Arc</code>.</p><p>Attendees will:<br/>1. Learn how memory ordering works and how it enables these powerful abstractions.<br/>2. Explore real-world usage through examples from popular concurrency crates like <code>parking_lot</code>, <code>once_cell</code>, and <code>crossbeam</code>.</br>3. For the daring, gain the intuition—and tooling—to begin building their own synchronization primitives, such as custom spinlocks or lock-free structures.</p><p>No prior knowledge of memory models is required, though a basic understanding of concurrency and familiarity with Rust will help attendees get the most out of the session.</p>"
  ogimage = "/2025/images/talks/og-images/rusts-memory-model.png"
+++
