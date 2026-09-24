+++
title = "C→Rust, Beyond the Basics"
template = "workshop.html"
[[extra.mentors]]
name = "Magnus Markling"
avatar = "magnus-markling.webp"
avatar_alt = "Magnus Markling"
bio = "<p>Magnus has been building software professionally since 2006. He has written production code in more than ten languages and Rust is the one he finds most rewarding. For many years he was lead architect of minPension.se, a Swedish pension portal with 3.8 million users, taking it from a small Visual Basic application to a modern distributed system.</p><p>Today he's an independent contractor working with Mainmatter. He is helping migrate the search engine of a widely used open-source data platform from C to Rust, one module at a time. His day-to-day involves the parts of a migration that decide whether it succeeds: FFI boundaries, core data structures like tries, and Unicode validation and conversion.</p><p>He is based in Gothenburg, Sweden. Outside of code, he sings in choral ensembles, plays Swedish and Irish folk music on mandolin and tin whistle, and can be found on the padel court.</p>"

[extra]
  price = 400
  abstract = "<p>Rewriting a C codebase in Rust isn’t a big bang: it’s a marathon, where you execute a series of small, deliberate steps. This workshop teaches you how to do it incrementally, based on hard-won lessons from migrating production C codebases over to Rust.</p><p>We’ll start with FFI fundamentals (repr(C), bindgen, cbindgen), move to writing correct extern “C” interfaces, then work through a 4-step module rewrite process: encapsulate, rewrite, bridge, swap. Along the way, we’ll cover the pitfalls (mixed allocators, string encoding, performance overhead) and some of the high-level strategies you can use when planning out a large-scale migration. There will be hands-on exercises at each stage.</p>"
  description = "<p>At the end of the workshop, participants will be able to:</p> <ul class='syllabus'><li>Set up bidirectional C/Rust FFI with appropriate tooling (bindgen, cbindgen)</li><li>Write correct and ergonomic extern “C” functions</li><li>Apply a systematic process to rewrite a C module in Rust</li><li>Avoid common interoperability pitfalls</li>"
  prerequisites = "<p>Participants are expected to bring a laptop to work on hands-on exercises. You’ll receive instructions via email, ahead of the workshop, detailing what software has to be installed beforehand.</p>"
  ogimage = "/images/workshops/og-images/og-image-c-to-rust.png"
  heroimage = "/images/workshops/hero-c-to-rust.webp"
  heroimage_alt = "Arrow pointing from C to Rust"
+++
