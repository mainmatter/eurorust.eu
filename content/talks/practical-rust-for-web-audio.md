+++
title = "Practical Rust for Web Audio"
template = "talk.html"
[extra]
  date = "Oct. 10th, Thursday"
  time = "13:30 - 14:00"
  speakers = ["attila-haraszti"]
  description = "<p>This talk will document the author’s journey utilizing Rust while developing a custom low-level audio processing engine for web targets.</p><p>Audio on the web has long been plagued by the lack of performance guarantees, with many applications and use cases held back due to insufficient API support by select browser engine implementations. The situations has, however, dramatically improved in the last two years, in no small part thanks to the rise of WebAssembly and developments in the ecosystem.</p><p>We will explore:</p><ul><li>navigating web vs. systems programming</li><li>common audio engine internals</li><li>architectural decisions for the web platform</li><li>AudioWorkletProcessor code in Rust</li><li>compilation hacks for minimizing WebAssembly bundle sizes</li><li>using custom allocators, or none</li><li>hand-crafted bindings to JavaScript</li><li>“safe” unsafe code</li><li>practical real-world limitations</li><li>the current state of web audio</li><li>performance tradeoffs we need to deal with for the foreseeable future</li></ul><p>The talk will wrap around technical parts with briefly addressing the important ”why”s: exploring philosophical drivers, implications and futures of interactive, interconnected musical works that could live on the web.</p>"
+++
