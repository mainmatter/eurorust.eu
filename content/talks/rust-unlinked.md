+++
title = "Rust Unlinked - a Journey Through `rustc`, Symbols, and Static Libraries"
template = "talk.html"
[extra]
  date = "Friday, October 10"
  time = "16:15–16:45"
  stage = "Side Stage"
  speakers = ["shriram-balaji"]
  description = "<p>In this talk, I’ll take you through my journey of exploring Rust’s linking process. We’ll dive into the rustc compiler, understand symbol resolution, and dissect the ELF format. You’ll learn about Rust’s compilation pipeline, manual static linking and more.</p><p>Here’s what we’ll cover:<br/>• Basics of Linking: How linkers work with Rust Programs, making everything fit together like puzzle pieces.<br/>• Rust Compilation Stages: Understanding the step-by-step process of how Rust source files are turned into executable programs.<br/>• Symbol Resolution: How the linker matches variable and function names to their memory addresses.<br/>• ELF Format: What’s inside an ELF object file, and why it’s important.<br/>• Manual Linking: Trying to manually linking static Rust libraries with simple examples.<br/>• LLVM & Link Time Optimization: Cursory look at how Rust uses LLVM as a compiler backend, and lto</p><p>This talk is perfect for developers eager to understand Rust’s build process. Let’s link all the pieces together and uncover the mysteries of Rust linking!</p>"
  ogimage = ""
+++
