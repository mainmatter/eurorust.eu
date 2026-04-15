+++
title = "Programming a line follower robot"
template = "workshop.html"
[extra]
  mentors = [
    { name = "Massimiliano Mantione", avatar = "massimiliano-mantione.webp", avatar_alt = "Massimiliano Mantione",  bio = "I am a software engineer, mostly interested in programming languages and compilers. I have worked on implementing telecom switching stations, the Mono JIT compiler, the Unity3D game engine, the V8 Javascript VM at Google, a collaborative virtual reality system on the web, and blockchains. Currently, I am working on operational research applied to logistics at scale in WorkWave and using Rust full-time to solve logistical vehicle routing problems at scale.", url = "https://www.linkedin.com/in/massimilianomantione" },
    { name = "Michele Mantione", avatar = "michele-mantione.webp", avatar_alt = "Michele Mantione",  bio = "I am a Software Engineering student passionate about music, sound engineering, and robotics.While I am not writing code, I train as a theatrical actor, work as a light and sound engineer, and practice parkour." }
  ]
  abstract = "Have fun programming a line follower robot, and learn embedded <span>no_std</span>, <span>async</span> Rust along the way!  We cannot provide physical robots, but the robot code you will write will run in a very realistic physical simulation, where wheels can lose grip, motor responses are not linear, sensors have noise and other kinds of quirks, and we will see how all these issues become more problematic at higher speeds.  Over the course of the workshop, initially we will implement the robot in a trivial way, then we will see how to make it more precise so that it can travel faster, first with a classical PID controller and then applying extensions to make it more effective.  Then, for added fun, we will make our virtual robots compete head-to-head against each other! "
  description = "This workshop will be at the same time playful and deep.  About Rust, it goes in depth on <span>no_std</span> programming and <span>async</span> code execution in embedded context.  Despite the fact that we will not use physical robots, the environment will faithfully simulate the experience of programming a robot and having limited visibility into what is actually happening during its execution.  We will also use a data collection (telemetry) system, and see that it is the only reasonable way to gain insight into the causes of any robot “misbehavior” (and, thanks to the realistic physical simulation, there will be plenty of them, which will be fun!).  We have extensive experience in controlling small robots, and we will guide the participants through all the pitfalls that they’ll find when programming this line follower."
  prerequisites = "A reasonable knowledge of Rust is required.  No previous knowledge of embedded <span>no_std</span> Rust is needed, and also <span>async</span> experience, while useful, is not mandatory.  Each participant will only need a notebook usable for developing with Rust, with rustup, git, and the editor or IDE of their choice."
  ogimage = "/images/workshops/og-images/og-image-line-follower-robot.png"
  heroimage = "/images/workshops/hero-line-follower-robot.webp"
  heroimage_alt = "Line follower robot"
+++


