+++
title = "Beyond cargo build"
template = "talk.html"
[extra]
  speakers = ["amos-wenger"]
  description = "<p>I'm making a build system designed to be largely compatible with cargo, but that gives properties like hermetic builds, remote execution, perfect caching, etc., that you normally would only get with build systems like Buck2 which have a high set up and maintenance cost.</p><p>I will explain why this is desirable, possible, how far along I am in the implementation, why this does not replace cargo, how this ties into continuous integration and enables faster development cycles, including for cross-platform software (think: diagnostics in-IDE for platforms you cannot build locally Ã¢â‚¬â€ Cmd+S sending diffs transparently to remote executors, bringing back diagnostics).</p>"
  ogimage = ""
+++
