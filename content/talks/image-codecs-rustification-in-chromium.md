+++
title = "Image codecs rustification in Chromium"
template = "talk.html"
[extra]
  speakers = ["johan-rosengren", "sergio-gonzalez-martin"]
  description = "<p>Modern browsers decode untrusted image data billions of times per day. Formats like PNG, BMP, ICO, and JPEG are parsed automatically when loading web pages, emails, or previews—making image codecs one of the most security‑critical components in the browser stack.</p><p>In this talk, we’ll share how a cross‑organization effort between browser engineers and the Rust open‑source ecosystem is progressively migrating image decoding from legacy C++ to Rust in Chromium. We’ll explain why image codecs are an ideal target for Rustification, the architecture that allows Rust codecs to integrate safely without destabilizing Chromium, and the process we follow to move from a Rust prototype to a production rollout.</p><p>We’ll walk through concrete case studies—starting with a Rust PNG decoder, then extending the approach to BMP and ICO via upstream contributions to existing Rust crates—and outline what it takes to reach field trials, measure real‑world impact, and eventually remove legacy C++ implementations.</p><p>This talk is for anyone interested in applying Rust to real‑world systems, contributing to existing crates, or understanding how Rust can be introduced incrementally into mature C++ platforms.</p>"
  ogimage = ""
+++
