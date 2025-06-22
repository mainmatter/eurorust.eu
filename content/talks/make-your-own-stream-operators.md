+++
title = "How to make your own stream operators"
template = "talk.html"
[extra]
  date = "Thursday, October 9, 2025"
  time = "17:00–17:30"
  stage = "Side Stage"
  speakers = ["willem-vanhulle"]
  description = "<p>The concept of a <code>Stream</code> in Rust is quite powerful, but it can also be scary, especially when you have to make your own from scratch.</p><p>In this tutorial you can learn:<br/>• In which situation you could use a Stream (vs. iterators, coroutines, …).<br/>• How to consume or redirect a Stream with <code>futures</code> (e.g. map, then, for_each, …).<br/>• What are stream operators and how to use them (e.g. flatten, flatten_unordered, merge, …).<br/>• How to build your own stream operators using <code>Pin</code> and <code>Poll</code> (e.g. <code>clone-stream</code>).</p><p>At the end of the tutorial, I hope, you will feel more comfortable using Streams and related concepts in Rust.</p>"
  ogimage = "/images/talks/og-images/make-your-own-stream-operators.png"
+++
