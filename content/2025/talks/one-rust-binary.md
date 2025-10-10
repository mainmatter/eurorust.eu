+++
title = "One Rust Binary to Fight Them All: How I Use Rust to Combat Human Trafficking"
template = "2025/talk.html"
[extra]
  date = "Friday, October 10, 2025"
  time = "16:15–16:45"
  stage = "Main Stage" 
  speakers = ["brooke"]
  description = "<p><strong>Summary</strong></p><p>A human trafficking survivor will present Trafficking Free Tomorrow, an open-source, pure Rust application built for digital forensics and legal workflows. You’ll learn how Rust’s zero-cost abstractions, strong type system, and memory safety empower a solo developer to have an outsized impact on by serving forensic investigators, defense council, NGOs, and human rights organizations worldwide.</p><p><strong>Design Constraints</strong></p><p>We’ll review how Trafficking Free Tomorrow’s able to run on constrained government machines and legacy hardware across jurisdictions. Bureaucratic and infrastructural hurdles have led me to take the radical step of targeting thin clients, where spinning disks, low RAM, and high CPU count offers a unique development target. I’ll share lessons on building performant, no-dependency desktop binaries that work identically across Windows, Linux, macOS, and Wasm from a single codebase. Shipping to nontechnical, legal-focused users means that we’ve also included a simple, intuitive GUI that offers a consistent experience across all platforms, especially when it comes to filesystem interactions.</p><p><strong>The Rust-Enabled Solution</strong></p><p>Along the way, we’ll discuss why Rust’s memory safety is especially vital in a domain where tools must pass annual forensic validation, rarely get updates, and can’t tolerate security flaws. This is a talk for anyone curious about using Rust to make a real-world difference—with the kind of constraints most startups never have to consider.</p>"
  ogimage = "/2025/images/talks/og-images/one-rust-binary.png"
+++
