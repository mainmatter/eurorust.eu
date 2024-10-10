+++
title = "Building an extremely fast Python package manager, in Rust"
template = "2024/talk.html"
[extra]
  date = "Oct. 11th, Friday"
  time = "17:30 - 18:00"
  speakers = ["charlie-marsh"]
  description = "<a href=\"https://github.com/astral-sh/uv\">uv</a> is an extremely fast Python package manager, written in Rust.</p><p>Since its release in February, uv has seen adoption across the Python ecosystem, open source and enterprise, with over ten million downloads per month and growing – all grounded in a flagship focus on performance.</p><p>Python packaging is a complex problem space with specifications and tools that date back decades. So what does it take to innovate in that space – to build something new, from scratch, that not only meets those standards, but performs orders of magnitude faster than the alternatives? And what kind of role can Rust play?</p><p>This talk will walk through the architecture, design decisions, and optimizations that make uv so fast (think: allocators, concurrency, and zero-copy tricks), with a focus on the real-world experiments that we ran – and the lessons that we learned – over the course of uv’s development.</p>"
  ogimage = "2024/images/talks/og-images/building-an-extremely-fast-python-package-manager-in-rust.png"
+++
