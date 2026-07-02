+++
title = "Supply Chain Attacks, and how to protect ourselves"
template = "talk.html"
[extra]
  speakers = ["francois-mockers"]
  description = "<p>Supply chain attacks have increased in frequency and reach, and are now also reaching the Rust ecosystem.</p><p>We'll see where we're vulnerable with Rust (build script and macros, and more), the tools we have to protect ourselves (<span>cargo-audit</span> and <span>cargo-deny</span>, <span>cargo-vet</span> and <span>cargo-crev</span>) and when to use them, and the best practices on dependencies (crates.io OIDC publishing, grace period on dependency updates, ...)</p><p>Rust still has a few topics we need to work on, like sandboxed build scripts or deterministic WASM proc macros.</p><p>We'll finish on the solution I've landed on for private projects with private registries, and how it could be generalised with namespaces for public use.</p>"
  ogimage = "/images/talks/og-images/supply-chain-attacks-and-how-to-protect-ourselves.jpg"
+++
