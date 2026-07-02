+++
title = "Shipping Temporal: How the Rust Ecosystem Built Chrome’s Newest Web API"
template = "talk.html"
[extra]
  speakers = ["shane-carr"]
  description = "<p>This year, Chrome 144 shipped Temporal, the most significant evolution of JavaScript dates and times since the language's inception. But, the real breakthrough is what happened behind the scenes: for the first time, a major new Web API in Chromium wasn't built in C++, but in Rust.</p><p>This session provides a look at how we integrated <span>temporal_rs</span> into the heart of <span>V8</span>, marking a new chapter for the Rust ecosystem in the browser. We will discuss how we utilized <span>Diplomat</span> to create ergonomic C++ bindings that bridge Rust’s safety with <span>V8</span>’s internal architecture. We’ll also highlight how <span>ICU4X</span> provided high-performance, data-efficient calendrical calculations.</p><p>A key achievement of this journey was using a common library to power both the large, established C++ codebase of <span>V8</span> and the pure-Rust <span>Boa</span> engine. We’ll show how this collaboration between Google, Igalia, the Unicode <span>ICU4X</span> team, the <span>Boa</span> contributors, and the University of Bergen achieved 99% <span>test262</span> compliance.</p><p>Attendees will leave with a practical framework for building Rust-first components that elevate both new and existing platforms alike.</p>"
  ogimage = "/images/talks/og-images/shipping-temporal-how-the-rust-ecosystem-built-chrome-s-newest-web-api.jpg"
+++
