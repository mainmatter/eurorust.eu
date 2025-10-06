+++
title = "From any to this: using concrete error types instead of a catchall"
template = "2025/talk.html"
[extra]
  date = "Thursday, October 9, 2025"
  time = "11:45–12:15"
  stage = "Main Stage"
  speakers = ["leo-kettmeir"]
  description = "<p>Ever since the Deno project has been written in Rust, it has used <code>anyhow</code> for error handling across the entire codebase. This has proven to be problematic in various ways, and ergonomically difficult to handle complex errors coming from all over the place. As such, a refactoring project spanning 14 repositories, over 50 crates and multiple months was initiated for which the goal was to remove the “viral” <code>anyhow</code> crate in favour of using thiserror and concrete error types.</p><p>The ways we achieved this, the challenges encountered and the reasons behind this all will be explored.</p>"
  ogimage = "/2025/images/talks/og-images/from-any-to-this.png"
+++
