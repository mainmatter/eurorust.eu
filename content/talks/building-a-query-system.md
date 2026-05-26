+++
title = "Building a Query System"
template = "talk.html"
[extra]
  speakers = ["arya-dradjica"]
  description = "<p>At the heart of the Rust compiler is a query system; it caches intermediate results within the compiler and helps organizing them. It is the key to Rust's efficient incremental compilation. But ... there are _other_ Rust compilers. The <span>rust-analyzer</span> LSP is effectively a compiler unto itself; it uses the <span>salsa</span> query system, not <span>rustc</span>'s internal one.</p><p>I'm writing my own Rust compiler, looking for large-scale changes that could unlock better compilation speed. I looked at the existing query systems and wanted to explore some new ideas, so I built my own! In this talk, I'm going to explain how my compiler's query system works relative to <span>salsa</span>. For a concrete benchmark, I'll implement Cargo dependency resolution using both query systems and compare their performance.</p>"
  ogimage = ""
+++
