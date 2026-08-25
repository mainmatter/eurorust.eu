+++
title = "Rust on the Field: Integrating Real Autonomous Systems"
template = "workshop.html"

[extra]
  sponsor = "Quantum Systems"
  sponsor_logo = "/images/sponsors/quantum-systems.svg"
  sponsor_bio = "Quantum Systems develops MOSAIC-UXS, an open, multi-domain UXV orchestration platform for integrating aerial drones, ground robots, surface vessels, and sensor platforms."
  sponsor_cta = "Visit our website"
  sponsor_url = "https://quantum-systems.com/?utm_source=eurorust"
  abstract = "<p><a target='_blank' rel='noopener' href='https://quantum-systems.com/mosaic-uxs/' class='inline'>MOSAIC-UXS</a> is an open, multi-domain UXV orchestration platform developed by Quantum Systems: a Rust backend, a Lit/TypeScript frontend, and gRPC interfaces for integrating any aerial drone, ground robot, surface vessel, or sensor platform. Teams across the defence and public-safety space build their own drivers against it.</p><p>Teams build two kinds of connectors in Rust: a <strong>CoT bridge</strong>, syncing points of interest bidirectionally with an ATAK/TAK client over Cursor-on-Target UDP multicast; and a <strong>MAVLink connector</strong>, talking to a real or simulated drone/rover over the open ArduPilot MAVLink dialect. Both protocols are public standards used across the robotics and defence industries.</p>"
  description = "<p>At the end of the workshop, participants will be able to:</p><ul class='syllabus'><li>Parse and emit Cursor-on-Target (CoT) XML over UDP multicast</li><li>Talk MAVLink v2 to a real or simulated ArduPilot vehicle from Rust</li><li>Handle unreliable, best-effort UDP transports with proper timeouts and retries</li><li>Reason about bridging heterogeneous, open field protocols into a common data model</li></ul>"
  prerequisites = "<p>Comfortable with async Rust and Tokio. No prior robotics, MAVLink, or CoT experience needed. Bring a laptop with a stable Rust toolchain — setup instructions sent ahead of the workshop. Hardware is provided.</p>"
  ogimage = "/images/workshops/rust-on-the-field-integrating-real-autonomous-systems.webp"
  heroimage = "/images/workshops/rust-on-the-field-integrating-real-autonomous-systems.webp"
  heroimage_alt = "Purple autonomous drone on a pink grid"
+++
