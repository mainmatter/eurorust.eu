+++
title = "How to Fit an Elephant in a Rusty Refrigerator: Conquering a 7,000-Type API"
template = "talk.html"
[extra]
  date = "Friday, October 10, 2025"
  time = "11:45-12:15"
  stage = "Main Stage" 
  speakers = ["kiril-karaatanssov"]
  description = "<p>Legacy enterprise APIs are behemoths: decades-old, inheritance-heavy interfaces with thousands of types and a reputation for complexity. Building a Rust client for one meant battling dragons—polymorphism mismatches, glacial compile times, and a query API so arcane it’s nicknamed “the API from hell.”</p><p>In this talk, we’ll dissect how Rust’s unique features conquered these challenges:<br/>• Polymorphism Wars: Why traits (with dynamic dispatch) won for inheritance hierarchies, enums triumphed for 3,000+ array types, and serde_json::Value became the hero for chaotic exception/event structures.<br/>• Compile-Time Rebellion: How custom codegen replaced macros, dispatch logic bypassed 7,000-type bottlenecks, and #[derive(Debug)] became public enemy #1.<br/>• Query API Alchemy: Transforming a notoriously complex query system into a GraphQL-like experience using macros that auto-generate type-safe queries, docs, and unmarshalling logic—in Rust.</p><p>You’ll leave with battle-tested strategies for taming legacy APIs, optimizing compile times, and leveraging Rust’s type system to turn “enterprise-grade” complexity into ergonomic, fearless code.</p>"
  ogimage = "/images/talks/og-images/how-to-fit-an-elephant.png"
+++
