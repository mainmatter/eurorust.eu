+++
title = "The first six years in the development of Polonius, an improved borrow checker"
template = "talk.html"
[extra]
  date = "Oct. 11th, Thursday"
  time = "10:00 - 10:30"
  speakers = ["amanda-stjerna"]
  description = "<p>When the current borrow checker, non-lexical lifetimes (NLL), was developed, one of the patterns the Rust developers wanted to add support for had to be abandoned: <a href=\"https://github.com/rust-lang/rfcs/blob/master/text/2094-nll.md#problem-case-3-conditional-control-flow-across-functions\">Case 3, in which a reference is conditionally returned early from a function</a>. This case is particularly tricky to support as it requires a high-resolution analysis of the conditional flow references beyond the means of the current borrow checker. Therefore, current Rust does not support this code pattern (and <a href=\"https://github.com/rust-lang/rust/issues?q=is%3Aopen+is%3Aissue+label%3Afixed-by-polonius\">others like it</a>), even though it is provably safe.</p><p><a href=\"https://smallcultfollowing.com/babysteps/blog/2018/04/27/an-alias-based-formulation-of-the-borrow-checker/\">Since 2018</a>, work has been ongoing to extend the borrow checker to support this case in the Polonius project. An early prototype implemented in Datalog is available in nightly Rust under an experimental flag. However, its performance and scaling properties make it insufficient for stabilisation. The working group is <a href=\"https://blog.rust-lang.org/inside-rust/2023/10/06/polonius-update.html\">aiming to ship a prototype of Polonius with acceptable performance characteristics for the Rust 2024 edition</a>, this time without Datalog.</p><p>This talk presents a history of the work on Polonius, explains how it differs from the current borrow checker, and describes the path to stabilisation and beyond.<p>"
  ogimage = "/images/talks/og-images/tba-amanda.png"
+++
