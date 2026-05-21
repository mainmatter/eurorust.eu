+++
title = "Building a high performance, thread-per-core, zero-copy OpenTelemetry engine in Rust"
template = "talk.html"
[extra]
  speakers = ["albert-lockett"]
  description = "<p>This talk explores the architecture and tradeoffs of building a high-performance telemetry pipeline in Rust for OpenTelemetry data. Attendees will learn how thread-per-core execution using multiple async runtimes avoids synchronization overhead while maximizing NUMA locality, leveraging RustÃ¢â‚¬â„¢s type system to naturally enforce !Send and !Sync constraints. It also discusses how DataFusion and Apache Arrow's columnar data layout improves data processing performance with SIMD, efficient usage of CPU cache, and zero-copy data serialization. The session also highlights our innovative approach to accelerating Protobuf parsingÃ¢â‚¬â€bypassing traditional object deserialization (e.g., Prost) in favor of direct conversion to columnar Arrow data using borrowed buffers, achieving faster-than-conventional performance. By examining the design of a high-performance Rust-based telemetry engine, this talk provides valuable insights into applying RustÃ¢â‚¬â„¢s strengths and ecosystem to real-world, performance-critical systems. It highlights practical approaches to solving complex challenges in systems programming, offering inspiration and guidance for engineers building next-generation tools and infrastructure.</p>"
  ogimage = ""
+++
