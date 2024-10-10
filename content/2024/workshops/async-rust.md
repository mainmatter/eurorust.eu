+++
title = "Rediscovering the Future: a deep dive into async Rust"
template = "2024/workshop.html"
[extra]
  date = "Oct. 9th, 2024, 10:00 - 16:00"
  sponsor = ""
  mentors = [
    { name = "Conrad Ludgate", avatar = "conrad.png", avatar_alt = "Conrad Ludgate",bio = "Conrad Ludgate is a Systems Software Engineer at Neon building database proxies for their serverless Postgres platform by day. By night, he is highly focused on experimenting with all things low-latency Rust. Over the past couple of years, that focus has been extensively directed at async Rust. Known as 'that async rust guy' with his peers, he has given several talks and technical deep dives under the hood into async Rust.", url = "https://conradludgate.com/", twitter = "conradludgate" }
  ]
  abstract = "Async Rust is a very powerful abstraction for concurrent systems. <br>It is being used extensively in web development for its ability to handle many thousands of concurrent requests at a time. As an abstraction, though, async Rust is quite a brittle one. Many of its footguns and complications often need to be learned the hard way. <br>In this workshop, we will be practising the hard way—you will redesign async Rust from the ground up. The outcome of this exercise will give you a much better understanding of the abstractions you use on a daily basis, learn the exact reasons behind some of the quirks, and develop your own workarounds for such problems. It will also teach you how to build your own inter-task concurrency mechanisms and even your own specialised async runtimes, should you need it."
  ogimage = "2024/images/workshops/og-images/og-image-async.png"
+++

<div class="syllabus mb-10">
  <h2 class="my-7">Syllabus</h2>
  <ol>
   <li class="mb-7 border">
      <h4 class="p-4 border-b">Morning</h4>
      <div class="p-4 mw-80">
        <p>
        <ol>
          <li>Getting started, ensuring that rustc is setup correctly.</li>
          <li>Introducing the Future trait.</li>
          <li>Writing a simple future state machine.</li>
          <li>Writing a simple async channel.</li>
          <li>Writing a simple async mutex.</li>
        </ol>
        </p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4 class="p-4 border-b">Afternoon</h4>
      <div class="p-4 mw-80">
        <p>
        <ol>
          <li>Writing a simple pollster executor.</li>
          <li>Introducing a spawn method to the executor</li>
          <li>Introducing a timer system to build out the runtime.</li>
        </ol>
        </p>
      </div>
    </li>
  </ol>
</div>
<div class="requirements mb-10">
  <h2 class="my-7">Requirements</h2>
  <ol>
    <li><h4 class="p-4">Equipment</h4>
    <div class="p-4 mw-80">
      <p>
      <ol>A working laptop:
        <li>Running a modern OS (with Tier 1 or Tier 2 "with Host Tools" support for rustc)</li>
        <li>Windows 10+</li>
        <li>Linux 3.2+ (preferably 5.0+)</li>
        <li>macOS 10.12+ (preferably 12.0+)</li>
        <li>With an up-to-date rust toolchain (Either use rustup or ensure you have the latest stable compiler)</li>
      </ol>
        <p>Before coming to the session, clone the tokio repository and try run the examples. (https://github.com/tokio-rs/tokio/blob/master/examples/echo.rs)</p>
      </p>
    </div>
    </li>
    <li><h4 class="p-4">Knowledge</h4>
    <div class="p-4 mw-80">
      <p>
      <ol>Attendees should already be comfortable using Rust.
        <li>Must be comfortable with rust memory management and the borrow checker.</li>
        <li>Must be comfortable with traits.</li>
        <li>Good to know some knowledge of Sync concepts.</li>
        <li>Good to be comfortable with writing some async Rust.</li>
      </ol>
      <ol>Attendees do not need to be experts of Rust
        <li>Do not need to be comfortable using unsafe or the Rust memory models.</li>
        <li>Do not need to understand how the synchronisation primitives (Mutex, Channel) are implemented.</li>
        <li>Do not need to know how to use async kernel APIs like epoll or kqueue.</li>
      </ol>
      </p>
    </div>
    </li>
</div>
