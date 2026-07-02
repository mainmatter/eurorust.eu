+++
title = "Designing State Machines for Streaming Proxies in Rust"
template = "talk.html"
[extra]
  speakers = ["sanskar-jaiswal"]
  description = "<p>A single HTTP exchange can involve partially consumed request bodies, concurrent upstream and downstream progress, mid-stream failures, conditional buffering decisions, and connection reuse that must leave the transport in a well-defined state.</p><p>This talk examines how to model a proxied exchange as an explicit state machine whose transitions encode protocol and lifecycle events such as establishing a <span>TCP</span> connection, completing a <span>TLS</span> handshake, and returning a connection to the keepalive pool. The session covers practical Rust designs, including coordinating bidirectional streaming while remaining cancel-safe, buffer management and reuse, and how to keep connections alive for reuse.</p><p>The goal is to equip Rust engineers with the mental models and architectural patterns needed to build robust streaming proxies.</p>"
  ogimage = "/images/talks/og-images/designing-state-machines-for-streaming-proxies-in-rust.jpg"
+++
