+++
title = "Non-binary Rust: Between Safe and Unsafe"
template = "talk.html"
[extra]
  date = "Oct. 11th, Friday"
  time = "10:45 - 11:15"
  speakers = ["boxy-uwu"]
  description = "<p>When writing unsafe code it is often easy to throw away a lot of the guardrails that safe Rust provides: the language stops helping you write your code, and you take on the burden of being the compiler and ensuring that all the invariants are upheld.</p><p>It might feel like you’re either writing safe Rust or you’re responsible for doing everything yourself. In practice though it is possible to design your unsafe code to find a middle ground. You can offload some of the burden back onto the type system, like in safe Rust, while still being able to use the required unsafe functionality.</p><p>Learning from my experience in refactoring and improving large amounts of unsafe code in Bevy’s ECS, I will explore this middle ground, leveraging the borrow checker and the type system to recover as many guardrails as we can.</p>"
+++
