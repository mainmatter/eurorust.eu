+++
title = "How Rust Compiles"
template = "talk.html"
[extra]
  date = "Friday, October 10, 2025"
  time = "14:30–15:00"
  stage = "Main Stage"
  speakers = ["noratrieb"]
  description = "<p>Whenever you run <code>cargo build</code>, you get a native executable. To see how rustc gets there, we’ll break down the high-level architecture of Rust’s compilation model and understand how the individual parts like LLVM and the linker interact and discover what each of the components is and does. We look into how generics, <code>#[inline]</code>, and LTO behave and relate and will be able to use this knowledge to get more control over how our programs are compiled and optimized for the best runtime or compile time performance.</p>"
  ogimage = "/images/talks/og-images/how-rust-compiles.png"
+++
