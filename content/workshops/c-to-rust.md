+++
title = "C→Rust, Beyond the Basics"
template = "workshop.html"
[[extra.mentors]]
name = "Luca Palmieri"
avatar = "luca-palmieri.webp"
avatar_alt = "Luca Palmieri"
url = "https://www.lpalmieri.com/"
github = "https://github.com/LukeMathWalker"
bio = "Luca Palmieri builds technology products for a living. His current focus is on backend development, software architecture and the Rust programming language.<br/><br/>He currently works at Mainmatter as a Principal Engineering Consultant. He partners with teams across the industry to make sure they succeed in adopting or scaling their Rust usage, where it makes sense to do so. He was formerly at AWS and TrueLayer. He has been part of the Rust community since 2018 and is best known as the author of <a target='_blank' rel='noopener' href='https://www.zero2prod.com/' class='inline'>Zero to Production in Rust</a>, an introduction to using Rust for backend development."

[extra]
  abstract = "Rewriting a C codebase in Rust isn’t a big bang: it’s a marathon, where you execute a series of small, deliberate steps. This workshop teaches you how to do it incrementally, based on hard-won lessons from migrating production C codebases over to Rust.<br/><br/>We’ll start with FFI fundamentals (repr(C), bindgen, cbindgen), move to writing correct extern “C” interfaces, then work through a 4-step module rewrite process: encapsulate, rewrite, bridge, swap. Along the way, we’ll cover the pitfalls (mixed allocators, string encoding, performance overhead) and some of the high-level strategies you can use when planning out a large-scale migration. There will be hands-on exercises at each stage. "
  description = "At the end of the workshop, participants will be able to: <ul class='syllabus'><li>Set up bidirectional C/Rust FFI with appropriate tooling (bindgen, cbindgen)</li><li>Write correct and ergonomic extern “C” functions</li><li>Apply a systematic process to rewrite a C module in Rust</li><li>Avoid common interoperability pitfalls</li>"
  prerequisites = "Participants are expected to bring a laptop to work on hands-on exercises. You’ll receive instructions via email, ahead of the workshop, detailing what software has to be installed beforehand."
  ogimage = "/images/workshops/og-images/og-image-c-to-rust.png"
  heroimage = "/images/workshops/hero-c-to-rust.webp"
  heroimage_alt = "Arrow pointing from C to Rust"
+++


