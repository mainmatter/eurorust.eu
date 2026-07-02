+++
title = "Running Safely with Scissors: Lock-free Concurrency for Maximum Throughput"
template = "talk.html"
[extra]
  speakers = ["filip-petkovski"]
  description = "<p>Rust comes with exceptional concurrency primitives, but even a <span>RWLock</span> can be a bottleneck when data changes within microseconds. Under high load such bottlenecks pose a system-wide risk as blocked writers build backpressure and lead to resource exhaustion. In such cases, designing around lock-free, append-only data structures becomes critical for maximizing read and write throughput by guaranteeing that readers and writers never block each other.</p><p>This talk explains these principles through a case study: a metrics database backing [COMPANY]'s monitoring system, ingesting millions of samples per second per process. We will explore how to leverage composite atomic watermarks and segmented arenas for efficient memory management, as well as generation-tagged bitmaps for sparse validity tracking. These primitives will come together into a system where readers and writers operate uninterrupted without tapping the brakes.</p><p>Most importantly, we show how the type system can tame this complexity and enforce single-writer, many-reader semantics at compile time. By safely isolating unsafe code we can expose an ergonomic API and prevent abstraction leaks to the rest of the codebase.</p>"
  ogimage = "/images/talks/og-images/running-safely-with-scissors-lock-free-concurrency-for-maximum-throughput.jpg"
+++
