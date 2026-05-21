+++
title = "Encodings All the Way Down: Building Vortex, an Extensible File Format in Rust"
template = "talk.html"
[extra]
  speakers = ["connor-tsui"]
  description = "There's no one-size-fits-all columnar file format: modern data is too varied. Vortex (an open-source Linux Foundation toolkit for analytical data) composes encodings to handle whatever shape your data takes, pushing extensibility further than current data analytics formats. Users can add new types, plug in new compression schemes, and even layer encodings on top of other encodings, all without needing to fork the entire format. Vortex is built for modern data and AI/ML workloads, where random access patterns and varied data shapes (highly compressible, sparse, structured, etc.) outpace what classic formats were designed for.

This talk examines how users can add new types to Vortex and how cascading compression lets new encodings build on top of existing ones. Along the way, we'll cover where Rust earns its keep on the hot path, and where the abstraction has to bend."
  ogimage = ""
+++
