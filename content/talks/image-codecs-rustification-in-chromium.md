+++
title = "Image codecs rustification in Chromium"
template = "talk.html"
[extra]
  speakers = ["johan-rosengren", "sergio-gonzalez-martin"]
  description = "<p>Modern browsers decode untrusted image data billions of times per day. Formats like PNG, BMP, ICO, and JPEG are parsed automatically when loading web pages, emails, or previewsÃ¢â‚¬â€making image codecs one of the most securityÃ¢â‚¬â€˜critical components in the browser stack.</p><p>In this talk, weÃ¢â‚¬â„¢ll share how a crossÃ¢â‚¬â€˜organization effort between browser engineers and the Rust openÃ¢â‚¬â€˜source ecosystem is progressively migrating image decoding from legacy C++ to Rust in Chromium. WeÃ¢â‚¬â„¢ll explain why image codecs are an ideal target for Rustification, the architecture that allows Rust codecs to integrate safely without destabilizing Chromium, and the process we follow to move from a Rust prototype to a production rollout.</p><p>WeÃ¢â‚¬â„¢ll walk through concrete case studiesÃ¢â‚¬â€starting with a Rust PNG decoder, then extending the approach to BMP and ICO via upstream contributions to existing Rust cratesÃ¢â‚¬â€and outline what it takes to reach field trials, measure realÃ¢â‚¬â€˜world impact, and eventually remove legacy C++ implementations.</p><p>This talk is for anyone interested in applying Rust to realÃ¢â‚¬â€˜world systems, contributing to existing crates, or understanding how Rust can be introduced incrementally into mature C++ platforms.</p>"
  ogimage = ""
+++
