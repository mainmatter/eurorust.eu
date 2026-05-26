+++
title = "Beyond cargo build"
template = "talk.html"
[extra]
  speakers = ["amos-wenger"]
  description = "<p>I'm making a build system designed to be largely compatible with <span>cargo</span>, but that gives properties like hermetic builds, remote execution, perfect caching, etc., that you normally would only get with build systems like <span>Buck2</span> which have a high set up and maintenance cost.</p><p>I will explain why this is desirable, possible, how far along I am in the implementation, why this does not replace <span>cargo</span>, how this ties into continuous integration and enables faster development cycles, including for cross-platform software (think: diagnostics in-IDE for platforms you cannot build locally — <span>Cmd+S</span> sending diffs transparently to remote executors, bringing back diagnostics).</p>"
  ogimage = ""
+++
