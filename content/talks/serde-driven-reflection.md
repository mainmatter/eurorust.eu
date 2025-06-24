+++
title = "A Deep Dive into Serde-Driven Reflection"
template = "talk.html"
[extra]
  date = "Friday, October 10"
  time = "13:45–14:15"
  stage = "Side Stage"
  speakers = ["ohad-ravid"]
  description = "<p>Do you know what code is generated when you use <code>#[derive(Deserialize)]</code>? And what that has to do with API design, reflection, and ergonomics?</p><p>In this talk, we’ll explore a way to use the Serde (de)serialization crate to build an API that would otherwise be painful to use in a statically typed language like Rust.</p><p>We’ll dive into Serde’s internals from two angles: the <code>struct</code> being deserialized, and the deserializer driving the process - and how they are connected by Serde’s unique trait architecture.</p><p>We’ll finish by writing our own deserializer, enabling a form of compile-time reflection and allowing us to materialize user-defined <code>struct</code>s without a custom trait or a complex procedural macro.</p>"
  ogimage = "/images/talks/og-images/serde-driven-reflection.png"
+++
