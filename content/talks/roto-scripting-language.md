+++
title = "Roto: a fast and safe scripting language"
template = "talk.html"
[extra]
  date = "October 9, 2025"
  time = "14:45-15:15"
  stage = "Main Stage" 
  speakers = ["terts-diepraam"]
  description = "<p>There are many excellent scripting languages for Rust, but, while building our BGP engine Rotonda at [COMPANY], we found that none of the existing languages fit our purpose. They are usually dynamically typed and interpreted. Errors are therefore only caught at runtime and they are slower than we’d like. So,we did the only logical thing and decided to make our own language from scratch.</p><p>That language became Roto; a statically-typed scripting language with Rust-inspired syntax that is compiled to machine code using cranelift. It achieves pretty good performance out of the box and guarantees that there are no type errors at runtime. By virtue of being written in Rust, Roto is easy to embed in any Rust application. In addition, types and functions from Rust can be registered into Roto so they can be used in Roto scripts.</p><p>This talk introduces the Roto language and tells the story of how it came to be. You will learn how to write Roto code and how to integrate it in your own Rust projects. Along the way, you’ll gain some insights about how it works under the hood.</p>"
  ogimage = ""
+++
