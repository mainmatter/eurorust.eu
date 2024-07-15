+++
title = "Generating ergonomic C++ APIs using Rustdoc, procedural macros, and Serde"
template = "talk.html"
[extra]
  date = "Oct. 10th, Thursday"
  time = "15:00 - 15:30"
  speakers = ["bjorn-wieczoreck"]
  description = "<p>This talk introduces a novel approach to generate C++ APIs from an existing Rust API by using procedural macros, Rustdoc, and Serde. Functions and impl blocks which should be exposed in the C++ API are annotated with a procedural macro attribute. This macro generates low level extern “C” functions for the corresponding function definitions. Arguments and return values of these functions are passed as byte buffers in this case. Ultimately, Rustdoc’s unstable JSON format is used to generate a set of low level bindings for the generated extern “C” functions and, on top of that, a set of ergonomic high level C++ bindings. An intermediate layer handles all the required (de-)serializing of the argument/return type byte buffers to acquire the corresponding native representations.</p>"
  ogimage = "/images/talks/og-images/generating-ergonomic-c-apis-using-rustdoc-procedural-macros-and-serde.png"
+++
