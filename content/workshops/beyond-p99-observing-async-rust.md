+++
title = "Beyond p99: Observing Async Rust"
template = "workshop.html"
[[extra.mentors]]
name = "Julián Montes de Oca"
github = "https://github.com/jv1i"
bio = "<p>Julián Montes de Oca is a Principal Engineer at WyeWorks, where he works on open source Rust, focusing on profiling and telemetry for services running in production.</p><p>Before observability he worked extensively in the Rust UI ecosystem, on projects like Makepad and Robius.</p><p>Libraries he contributes to include <a target='_blank' rel='noopener' href='https://github.com/dial9-rs/dial9' class='inline'>dial9</a>, <a target='_blank' rel='noopener' href='https://github.com/awslabs/metrique' class='inline'>metrique</a>, and <a target='_blank' rel='noopener' href='https://github.com/tokio-rs/tokio-metrics' class='inline'>tokio-metrics</a>.</p><p>Outside of work he plays the same handful of video games he's been playing since childhood, most of them roughly his own age.</p>"

[extra]
  abstract = "<p>Async Rust programs are hard to observe. Runtimes schedule your work across threads and move tasks between them, so by the time a problem shows up as a latency spike on a dashboard, most of the context that would explain it is long gone.</p><p>The usual response is to add more aggregate metrics or to fall back on tedious print debugging locally. Aggregates throw away the detail you need to explain a single slow request, and sometimes problems don't reproduce on your machine.</p><p>There's a way around this: instrumentation cheap enough that you can leave it running in production, recording rich per-event detail to dig through afterwards. That's what dial9 does, and we'll use it to work out what an application is really doing.</p>"
  description = "<p>You'll start with an application that has almost no observability and add instrumentation a step at a time, each step answering a question you couldn't answer before.</p><p>We'll build up a picture of what a Tokio runtime is doing with dial9, bringing in tracing spans and metrique metrics as we go.</p><p>By the end, you'll be able to:</p><ul class='syllabus'><li>Instrument an async application so spans and contextual data survive await points and spawn boundaries</li><li>Break a slow request down into the polls it took, and see where the time actually went</li><li>Tell a task waiting to be polled apart from a thread the kernel hasn't scheduled yet</li><li>Tell when an aggregate is enough and when only per-event data will do</li><li>Judge what each piece of instrumentation costs, and pick what's worth leaving on in production</li></ul>"
  prerequisites = "<p>You should be comfortable with Rust and ideally have written some async code. No prior experience with these tools is needed.</p><p>Bring a laptop set up for Rust development. We'll email setup instructions ahead of time.</p>"
  ogimage = "/images/workshops/og-images/beyond-p99-observing-async-rust.png"
  heroimage = "/images/workshops/beyond-p99-observing-async-rust.webp"
  heroimage_alt = ""
  sponsor = "AWS"
  sponsor_bio = "AWS builds a wide variety of performance critical services in Rust and is increasingly moving up the stack due to reduced memory usage and correctness benefits."
  sponsor_cta = "Visit our website"
  sponsor_url = "https://aws.amazon.com/?utm_source=eurorust"
+++
