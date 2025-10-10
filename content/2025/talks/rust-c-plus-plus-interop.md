+++
title = "Rust/C++ Interop: Carcinization or Intelligent Design? "
template = "2025/talk.html"
[extra]
  date = "Thursday, October 9, 2025"
  time = "11:45–12:15"
  stage = "Side Stage"
  speakers = ["victor-ciura"]
  description = "<p>C++/Rust is not a zero-sum game. We need to learn to play nice together… for a looong time! That applies equally to people, but also to code. Rust code everywhere is increasing at an accelerated rate, but so does C++ (and that’s on top of gazillion lines already out there). So, hybrid codebases are quickly becoming the norm.</p><p>Having seamless interop between the C++ and Rust components is essential for the success of this symbiosis. There are many challenges in this process, but people found various ways to make things “work” - from dealing with ABI compatibility and platform/toolchain guarantees, to going down to C and FFI, to various techniques and tools for generating glue-code between the two languages.</p><p>Alas, general-purpose interoperability (not tied to a specific toolchain/IR) without loss of performance has yet to be achieved. Just “making things work” is not enough in the domain space of C++ and Rust; as such, many of the explored solutions so far by the community fail to deliver on all the needed requirements, swinging the wide range between performant and ergonomic.This presentation aims to highlight all of the interop challenges, some of the explored solutions out there, and tease out the avenues at the forefront of this pursuit.</p>"
  ogimage = "/2025/images/talks/og-images/rust-c-plus-plus.png"
+++
