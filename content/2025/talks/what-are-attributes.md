+++
title = "What actually are attributes?"
template = "2025/talk.html"
[extra]
  date = "Friday, October 10"
  time = "16:15–16:45"
  stage = "Side Stage"
  speakers = ["jana-doenszelmann"]
  description = "<p>Attributes are a super versatile tool. They can add metadata to almost any part of rust’s syntax. This is great for designing new features in the language: if their syntax can just be an attribute, the parser and therefore high-level syntax doesn’t need to change. And that’s not just useful inside the compiler; Rust gives that power to users through attribute macros, so they can add their own syntax to the language. Think of serde to add serialization, or tokio’s attribute that lets main be async. Of course, with attributes around, every new feature’s syntax looks like an attribute-shaped hole, leaving us with critical parts of the language being just attributes, instead of having proper syntax.</p><p>Over the past year, I’ve worked on refactoring the parts of the compiler that processes attributes, and this talk is about some of the things this taught me about language design. About how they are both critically necessary, and an absolute pain to have. And to motivate that, I’ll show some funny bugs I found in the compiler while refactoring them.</p>"
  ogimage = "/2025/images/talks/og-images/what-are-attributes.png"
+++
