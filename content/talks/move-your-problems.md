+++
title = "Move your problems to compile-time and get new capabilities out of it"
template = "talk.html"
[extra]
  speakers = ["oli-scherer"]
  description = "<p>Rustaceans love it when their compiler tells them 'No'. It's hours of debugging work saved, and prevents whomever uses their software from having to deal with many problems that should never have reached production code.  With the const-eval machinery of the Rust compiler rustaceans can write their own custom logic to perform checks at compile-time, and polish those failures to produce errors that their colleagues can understand. It can also be used to offload some work and checks to compile-time instead of performing it at every startup of the program.</p><p>So wouldn't it be great if you could write some library code that can never be run at runtime at all? All checked by the compiler and you even get new features that would literally be impossible at runtime?</p><p>If you think that, then you've come to the right talk:  In this talk I'm going to introduce the various ideas for <span>comptime</span>, <span>reflection</span>, and other new const-eval capabilities. Some of these you can already try out on nightly, others are very much in the design phase.</p>"
  ogimage = "/images/talks/og-images/move-your-problems.png"
+++
