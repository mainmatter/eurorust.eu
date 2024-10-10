+++
title = "Navigating Async-heavy Rust"
template = "2024/talk.html"
[extra]
  date = "Oct. 10th, Thursday"
  time = "17:30 - 18:00"
  speakers = ["aida-getoeva"]
  description = "<p>If it compiles it doesn't always work in async Rust. Futures can starve, open connections may expire, many valuable hours can be wasted on the debugging attempts. And, on top of that, <code>FuturesUnordered</code> can give you a back-stab. Scary, I know. There are many well-hidden issues that thrive in a highly concurrent environment and a large magic-box of async scheduling doesn't really help to solve them.</p><p>This talk will give an insight into the Tokio executor, help to navigate through the tricky pitfalls and to write a better async code.</p>"
  ogimage = "2024/images/talks/og-images/navigating-async-heavy-rust.png"
+++
