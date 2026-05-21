+++
title = "Blastbeat: When a Decade of C++ Meets Rust and io_uring"
template = "talk.html"
[extra]
  speakers = ["daniel-rodriguez", "giacomo-bagnoli"]
  description = "<p>At [COMPANY], every server runs a network observability agent sending 500K+ UDP probes per second to detect network faults in all networks: fabrics, AI training and backbone. The original C++ implementation served us for a decade, but its synchronous architecture hit a wall: too much CPU, too many syscalls, and a codebase that 59 contributors had shaped into something nobody dared to refactor.</p><p>We rewrote it in Rust. Results: 81% less CPU, 98% fewer syscalls, and a unified binary replacing two C++ processes. This component includes many advanced features, such as hardware timestamps and bitflip detection, while maintaining sub-100us RTT accuracy.</p><p>This talk covers the journey from code to fleet-scale deployment. We walk through the architectural bets: io_uring for batched zero-syscall I/O, unsafe code with safety discipline for raw sockets, and a pluggable design for incremental shipping. We share how we managed a mass rewrite with a small team and the hard lessons learned: kernel compatibility surprises, performance tuning, and rollout strategies to replace a decade-old, battle-scarred binary without breaking network observability for millions of servers.</p>"
  ogimage = ""
+++
