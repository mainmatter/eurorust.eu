+++
title = "The Future of Unmanned Systems Is Built on Rust"
template = "talk.html"
[extra]
  speakers = ["benedikt-wiethof", "theophil-spiegeler-castaneda"]
  description = """
<p>At Quantum Systems, Rust has become a foundational technology for the next generation of unmanned systems.<br />
The path to this architecture was iterative. The first prototype of the Mosaic Ground Control Station (GCS), developed in C++, successfully demonstrated the concept in field trials. At the same time, it exposed familiar challenges in concurrency, memory safety, and system stability. These findings prompted a complete reimplementation of Mosaic in Rust, with the goal of achieving the robustness and high availability required for mission-critical operations. The transition demanded a significant shift in thinking: existing systems-programming experience did not translate directly, and progress was initially slow. Over time, however, the operational and architectural benefits proved substantial.<br />
Traditional ground control stations typically connect one operator to one vehicle. Mosaic introduces a distributed model in which multiple operators, vehicles, vendors, and ground stations must work together securely and reliably. This talk presents the Rust architecture behind that model, from trusted communication between independent Cores to resilient synchronization, airspace coordination, and real-time data exchange.<br />
It also examines the architectural patterns used to manage a mission-critical Rust codebase at scale, including actor-based communication, capability-driven drivers, and compiler-enforced boundaries between system layers. Beyond the technical design, the talk reflects on how Rust’s safety guarantees and expressive type system have shaped engineering practices at Quantum Systems, enabling reliable development in an increasingly complex operational environment.</p>
"""
  ogimage = "/images/talks/og-images/future-of-unmanned-systems.webp"
  sponsor = "Quantum Systems"
  sponsor_logo = "/images/sponsors/quantum-systems.svg"
  sponsor_bio = "Quantum Systems develops MOSAIC-UXS, an open, multi-domain UXV orchestration platform for integrating aerial drones, ground robots, surface vessels, and sensor platforms."
  sponsor_cta = "Visit our website"
  sponsor_url = "https://quantum-systems.com/?utm_source=eurorust"
+++
