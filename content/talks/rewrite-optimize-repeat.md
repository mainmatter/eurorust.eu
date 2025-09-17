+++
title = "Rewrite, Optimize, Repeat: Our Journey Porting a Triemap from C to Rust"
template = "talk.html"
[extra]
  date = "Thursday, October 9, 2025"
  time = "10:00–10:45"
  stage = "Main Stage"
  speakers = ["luca-palmieri"]
  description = "<p>In this talk, you’ll learn about an experience porting a battle-tested C TrieMap implementation to Rust, as part of a larger C-to-Rust migration of Redis’ search capabilities. We’ll walk through the missteps, the initial design we implemented and then discarded, the profiling rabbit holes, and the eventual breakthroughs that led us to a Rust version that not only matched but outperformed the original, without compromising safety and memory usage. Along the way, we’ll cover design tradeoffs, lessons in data layout, and how custom DSTs and a deep understanding of Rust’s memory model helped one team turn a rewrite into a real upgrade. If you’ve ever been tempted to replace C with Rust (or you’re planning to), this talk is for you.</p>"
  ogimage = "/images/talks/og-images/rewrite-optimize-repeat.png"
+++
