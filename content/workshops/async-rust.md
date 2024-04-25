+++
title = "Rediscovering the Future. A deep dive into the development of async Rust."
template = "workshop.html"
[extra]
  date = "Oct. 9th, 2024, 10:00 - 16:00"
  sponsor = ""
  mentor = "Conrad Ludgate"
  avatar = "conrad.png"
  avatar_alt = "Conrad Ludgate"
  bio = "Conrad Ludgate is a Systems Software Engineer at Neon building database proxies for their serverless Postgres platform by day. By night, he is highly focused on experimenting with all things low-latency Rust. Over the past couple of years, that focus has been extensively directed at async Rust. Known as 'that async rust guy' with his peers, he has given several talks and technical deep dives under the hood into async Rust."
  url = "https://conradludgate.com/"
  twitter = "conradludgate"
+++

<p class="large">
  Async Rust is a very powerful abstraction for concurrent systems. 
It is being used extensively in web development for its ability to handle many thousands of concurrent requests at a time. As an abstraction, though, async Rust is quite a brittle one. Many of its footguns and complications often need to be learned the hard way. 
In this workshop, we will be practising the hard way—you will redesign async Rust from the ground up. The outcome of this exercise will give you a much better understanding of the abstractions you use on a daily basis, learn the exact reasons behind some of the quirks, and develop your own workarounds for such problems. It will also teach you how to build your own inter-task concurrency mechanisms and even your own specialised async runtimes, should you need it.
</p>
