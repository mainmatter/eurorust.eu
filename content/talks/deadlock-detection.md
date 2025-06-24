+++
title = "Compile-time Deadlock Detection in Rust using Petri Nets"
template = "talk.html"
[extra]
  date = "Thursday, October 9, 2025"
  time = "11:00-11:30"
  stage = "Side Stage"
  speakers = ["horacio-lisdero-scaffino"]
  description = "<p>What if your Rust code could be proven free of deadlocks—before you ever run it?<p></p>This talk presents a new tool that analyzes Rust programs at compile time to detect deadlocks and lost signals—two of the trickiest bugs in concurrent programming. By translating Rust’s Mid-level Intermediate Representation (a control-flow graph used internally by the rustc compiler) into a graphical model of program behavior, we can explore all possible thread interleavings and exhaustively verify that nothing goes wrong.<p></p>No prior knowledge of formal methods or Petri nets is required! We’ll start with a visual introduction using simple, animated examples that show how program execution is represented as a dynamic graph. You’ll see how the tool detects when all threads are waiting on each other, and how it reports the exact sequence of function calls that lead to the issue.<p></p>This isn’t just theoretical: the talk includes a live demo where the tool catches real deadlocks in simple programs. It’s a practical, visual way to reason about concurrency—perfect for anyone interested in graphs, program analysis, or making Rust even safer.<p></p>The system is designed to be extensible to work with different kinds of visualizations and analysis tools. By turning your Rust code into a graph of possible program states, we can not only find bugs, but also lay the foundation for stronger compile-time guarantees in the future.<p></p>Come for the graphs, stay for the rustc internals —and leave with a new way to think about concurrency in Rust :)</p>"
  ogimage = "/images/talks/og-images/deadlock-detection.png"
+++
