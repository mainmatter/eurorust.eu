+++
title = "Optimizing rustc's Next Trait Solver"
template = "talk.html"
[extra]
  speakers = ["jana-doenszelmann"]
  description = "<p>This year, we're stabilizing Rust's next trait solver. <span>lcnr</span> talked about this at length at EuroRust last year. An important blocker has been its performance. Often the answer to \"why is the old solver so fast\" is \"well, <em>it</em> is unsound...\" Counterintuitively, micro-optimizations don't matter much: where we actually gain speed is the algorithmic level. For example, just by being better at figuring out when it's correct to reuse previously cached results, suddenly we gain 60% on some benchmarks. In this talk I'll tell you all about it, and much more!</p>"
  ogimage = "/images/talks/og-images/optimizing-the-new-rust-trait-solver.png"
+++
