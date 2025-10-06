+++
title = "Building a Chatbot Service with Rust, WGPU, and Tokio"
template = "2025/talk.html"
[extra]
  date = "Thursday, October 9, 2025"
  time = "13:45–14:15"
  stage = "Side Stage"
  speakers = ["ada-hieta"]
  description = "<p>This talk is an exploration of what’s currently possible in the Rust ecosystem for running machine learning inference locally – without relying on CUDA or PyTorch. We’ll walk through building a chatbot service powered by Rust, using WGPU for GPU-accelerated compute via WGSL shaders, and Tokio for serving responses asynchronously over an API.</p><p>A key focus will be on bridging the asynchronous world of WGPU’s GPU command submission with Rust’s async ecosystem, especially Tokio. We’ll examine how to coordinate GPU-bound compute tasks with an async server runtime, ensuring responsiveness without blocking critical paths.</p><p>Rather than presenting a production-ready ML stack, this talk is a hands-on look at what developers can achieve today with Rust’s graphics and async tooling. We’ll explore what works well, what doesn’t (yet), and where the ecosystem is headed – aiming to inspire curiosity, discussion, and contributions.</p>"
  ogimage = "/2025/images/talks/og-images/building-a-chatbot-service.png"
+++
