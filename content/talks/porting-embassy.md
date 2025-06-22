+++
title = "Porting Embassy to a Rust-based embedded Operating System"
template = "talk.html"
[extra]
  date = "Friday, October 10"
  time = "14:30–15:00"
  stage = "Side Stage"
  speakers = ["danut-aldea"]
  description = "<p>This talk explores the integration of two Rust-based embedded systems concepts: Embassy, an async runtime designed for low level development, and TockOS, a secure, capability-based operating system designed for safety-critical applications. We’ll walk through the motivation and challenges behind porting Embassy’s async executor to run in userland processes on Tock and how we adapt embassy’s executor model to work within Tock’s strict isolation and syscall architecture. Whether you’re building secure IoT systems, exploring Rust for embedded development, or interested in OS design, this talk will highlight what it takes to bring modern async programming together with a robust microkernel. The result is a safer, more composable foundation for concurrent embedded applications.</p>"
  ogimage = "/images/talks/og-images/porting-embassy.png"
+++
