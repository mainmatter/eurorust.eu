+++
title = "Proving macro expansion with expandable"
template = "2024/talk.html"
[extra]
  date = "Oct. 10th, Thursday"
  time = "13:30 - 14:00"
  speakers = ["sasha-pourcelot"]
  description = "<p>Macros are a very powerful Rust feature. They allow developers to quickly and easily build domain-specific languages, with no runtime cost.</p><p>However, the Rust compiler does surprisingly few checks on macros. For instance, it happily accepts a macro whose expansion is not syntactically valid, which makes them hard to debug.</p><p>In this talk, we will see how <code>expandable</code> allows to check at compile time that a macro always expands to valid code and give a brief explanation under the hood.</p><p>Finally, we’ll see a few techniques <code>expandable</code> uses to generate excellent error messages.</p>"
  ogimage = "2024/images/talks/og-images/proving-macro-expansion-with-expandable.png"
+++
